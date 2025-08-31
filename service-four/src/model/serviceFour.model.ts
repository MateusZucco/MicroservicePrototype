import { Connection } from '../utils/connection.database';

const connection = new Connection();

const getAll = async () => {
  try {
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

    return await connection.transaction(queries);
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default { getAll };
