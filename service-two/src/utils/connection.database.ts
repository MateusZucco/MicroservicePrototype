const mysql = require('mysql2/promise');

export class Connection {
  private connectionPool: any;

  async connect() {
    if (this.connectionPool) {
      return this.connectionPool;
    }

    let pool;
    if (process.env.DB_SOCKET_PATH)
      pool = await mysql.createPool({
        socketPath: process.env.DB_SOCKET_PATH,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        max: 15,
        waitForConnections: true, // Espera se todas as conexões estiverem em uso
        queueLimit: 0 // Sem limite para a fila de espera
      });
    else
      pool = await mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        max: 15,
        waitForConnections: true, 
        queueLimit: 0 
      });

    try {
      const conn = await pool.getConnection();
      await conn.query('USE service_two;');
      this.connectionPool = pool;
      conn.release(); 
      console.log('Connection Pool established successfully.');
    } catch (err) {
      console.error('Failed to establish connection pool:', err);
      await pool.release();
      this.connectionPool = undefined;
      throw err;
    }

    return pool;
  }

  async query(query: String) {
    let conn;
    try {
      const pool = await this.connect();
      conn = await pool.getConnection();
      const [rows] = await conn.query(query);
      await conn.release();
      return rows;
    } catch (err: any) {
      throw { error: err, message: err.message, success: false };
    } finally {
      if (conn) conn.release();
    }
  }

  async transaction(queries: String[]) {
    const pool = await this.connect();

    let conn: any;
    try {
      conn = await pool.getConnection();
      await conn.beginTransaction();

      const queryPromises: any[] = [];

      queries.forEach((query) => {
        queryPromises.push(conn.query(query));
      });
      const results = await Promise.all(queryPromises);
      await conn.commit();
      return results;
    } catch (err) {
      if (conn) {
        await conn.rollback();
      }
      return Promise.reject(err);
    } finally {
      if (conn) conn.release();
    }
  }
}