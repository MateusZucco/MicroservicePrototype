import { Connection } from '../utils/connection.database';
import * as app from '../index';

const connection = new Connection();

const getAll = async () => {
  try {
    const allUsersFromCache = (await app.cacheClient.get('allUsers')) as string;

    if (allUsersFromCache) {
      console.log('cache');
      return JSON.parse(allUsersFromCache);
    } else {
      console.log('new');
      const response = await connection.query(`
         SELECT 
            *
         FROM users 
      `);
      await app.cacheClient.set('allUsers', JSON.stringify(response), {
        expiration: { type: 'EX', value: 40 }
      });
      return response;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default { getAll };
