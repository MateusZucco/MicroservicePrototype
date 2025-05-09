import { Connection } from '../utils/mysql.connector';

const connection = new Connection();

const getAll = async () => {
  try {
    const response = await connection.query(`
        SELECT 
          grade_id AS gradeId,
          matter_id AS matterId,
          user_id AS userId,
          grade_value AS gradeValue,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM grades 
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getByMatterId = async (matterId: number) => {
  try {
    const response = await connection.query(`
        SELECT 
          grade_id AS gradeId,
          matter_id AS matterId,
          user_id AS userId,
          grade_value AS gradeValue,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM grades 
        WHERE matter_id = ${matterId}
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getByUserId = async (userId: number) => {
  try {
    const response = await connection.query(`
        SELECT 
          grade_id AS gradeId,
          matter_id AS matterId,
          user_id AS userId,
          grade_value AS gradeValue,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM grades 
        WHERE user_id = ${userId}
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const create = async (data: {
  matterId: number;
  userId: number;
  gradeValue: string;
}) => {
  try {
    const response = await connection.query(`
            INSERT INTO grades (
              matter_id,
              user_id,
              grade_value
            ) VALUES (
                ${data.matterId},
                ${data.userId},
                ${parseFloat(data.gradeValue)}
            )
        `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default { create, getAll, getByMatterId, getByUserId };
