import { Connection } from '../utils/connection.database';
const connection = new Connection();

import { cacheClient } from '..';

const getAll = async () => {
  try {
    const allUsersFromCache = (await cacheClient.get('allUsersFour')) as string;

    if (allUsersFromCache) {
      console.log('cache');
      return {
        user: JSON.parse(allUsersFromCache).user,
        accessHistoric: JSON.parse(allUsersFromCache).accessHistoric
      };
    } else {
      console.log('new');

      const queries = [];
      queries.push(`
        SELECT 
            *,
            (SELECT 
                    COUNT(id)
                FROM
                    users AS U
                WHERE
                    U.best_friend_id = users.id) AS countBestFriends
        FROM
            users
      `);

      queries.push(`
          SELECT 
              *
          FROM
              users
          LEFT JOIN users_access_historic ON (users.id = users_access_historic.user_id)
        `);

      const result = await connection.transaction(queries);

      await cacheClient.set(
        'allUsersFour',
        JSON.stringify({ user: result[0][0], accessHistoric: result[1][0] }),
        {
          expiration: { type: 'EX', value: 10 }
        }
      );

      return { user: result[0][0], accessHistoric: result[1][0] };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default { getAll };
