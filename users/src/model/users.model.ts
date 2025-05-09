import { Connection } from '../utils/mysql.connector';

const connection = new Connection();

const getAll = async () => {
  try {
    const response = await connection.query(`
        SELECT 
          user_id AS userId,
          email,
          password,
          first_name AS firstName,
          last_name AS lastName,
          user_type_id,
          userTypes.title AS userTypes
        FROM users 
        INNER JOIN userTypes USING(user_type_id)
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getById = async (userId: number) => {
  try {
    const response = await connection.query(`
            SELECT 
                user_id AS userId,
                email,
                password,
                first_name AS firstName,
                last_name AS lastName,
                userTypes.title AS userTypes
            FROM users 
            INNER JOIN userTypes USING(user_type_id)
            WHERE user_id = ${userId}
        `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getByEmail = async (email: string) => {
  try {
    const response = await connection.query(`
            SELECT 
                user_id AS userId,
                email,
                password,
                first_name AS firstName,
                last_name AS lastName,
                userTypes.title AS userTypes
            FROM users 
            INNER JOIN userTypes USING(user_type_id)
            WHERE email = '${email}'
          `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const create = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  type: string;
  registrationNumber: string;
  matters: Array<number>;
}) => {
  try {
    const sql = [];
    sql.push(`
            INSERT INTO users (
                email,
                password,
                first_name,
                last_name,
                user_type_id,
                registration_number
            ) VALUES (
                '${data.email}',
                '${data.password}',
                '${data.firstName}',
                '${data.lastName}',
                ${data.type},
                '${data.registrationNumber}'
            )
        `);

    sql.push(`SET @lastUserId = LAST_INSERT_ID();`);

    for (const matter of data.matters) {
      sql.push(`
             INSERT INTO grades (
              matter_id,
              user_id,
              grade_value
            ) VALUES (
                ${matter},
                 @lastUserId,
                ${0}
            )
        `);
    }
    const response = await connection.transaction(sql);

    return response[0][0];
  } catch (err) {
    console.log(err);
    return err;
  }
};

const update = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  type: string;
  userId: number;
  registrationNumber: string;
}) => {
  try {
    const response = await connection.query(`
            UPDATE users SET
                email='${data.email}',
                password='${data.password}',
                first_name='${data.firstName}',
                last_name='${data.lastName}',
                user_type_id=${data.type},
                registration_number='${data.registrationNumber}'
            WHERE user_id = ${data.userId}
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const remove = async (userId: number) => {
  try {
    const response = await connection.query(`
          DELETE FROM users WHERE user_id = ${userId}
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default { create, getAll, getById, update, remove, getByEmail };
