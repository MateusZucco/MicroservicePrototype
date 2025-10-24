import { Connection } from '../utils/connection.database';
import cacheClient from '..';

const connection = new Connection();

const getAll = async () => {
  try {
    const allUsersFromCache = (await cacheClient.get(
      'allUsersThree'
    )) as string;
    if (allUsersFromCache) {
      console.log('cache');
      return JSON.parse(allUsersFromCache);
    } else {
      const response = await connection.query(`
         SELECT 
            *
         FROM users 
      `);
      cacheClient.set('allUsersThree', JSON.stringify(response), {
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
