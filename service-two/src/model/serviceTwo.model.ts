import { Connection } from '../utils/connection.database';
import cacheClient from '..';

const connection = new Connection();

const getAll = async () => {
  try {
    const allUsersFromCache = (await cacheClient.get('allUsersTwo')) as string;
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
      await cacheClient.set('allUsersTwo', JSON.stringify(response), {
        expiration: { type: 'EX', value: 10 }
      });
      return response;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default { getAll };
