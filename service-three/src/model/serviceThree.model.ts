import { Connection } from '../utils/connection.database';

const connection = new Connection();

const getAll = async () => {
  try {
    const response = await connection.query(`
         SELECT 
            *
         FROM users 
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default { getAll };
