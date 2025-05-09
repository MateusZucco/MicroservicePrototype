const mysql = require('mysql2/promise');

export class Connection {
  private connectionStatus: any;

  async connect() {
    if (this.connectionStatus && this.connectionStatus.state !== 'disconnected')
      return this.connectionStatus;

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || '3333',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'academy_schema'
    });

    await connection.connect((err: any) => {
      if (err) throw err;
      this.connectionStatus = connection;
    });

    await connection.query('USE academy_schema;');
    
    return connection;
  }

  async query(query: String) {
    try {
      const conn = await this.connect();
      const [rows] = await conn.query(query);
      await conn.end();
      return rows;
    } catch (err: any) {
      throw { error: err, message: err.message, success: false };
    }
  }

  async transaction(queries: String[]) {
    const conn = await this.connect();
    try {
      await conn.beginTransaction();
      const queryPromises: any[] = [];

      queries.forEach((query) => {
        queryPromises.push(conn.query(query));
      });
      const results = await Promise.all(queryPromises);
      await conn.commit();
      await conn.end();
      return results;
    } catch (err) {
      await conn.rollback();
      await conn.end();
      return Promise.reject(err);
    }
  }
}

// declare var module: any;
// exports = Connection;