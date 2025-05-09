import { Connection } from '../utils/mysql.connector';

const connection = new Connection();

const getAll = async () => {
  try {
    const response = await connection.query(`
        SELECT 
          matter_id AS matterId,
          name,
          credits,
          description,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM matters 
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getById = async (matterId: number) => {
  try {
    const response = await connection.query(`
        SELECT 
          matter_id AS matterId,
          name,
          credits,
          description,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM matters 
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
          matter_id AS matterId,
          name,
          credits,
          description,
          matters.created_at AS createdAt,
          matters.updated_at AS updatedAt
        FROM matters 
        INNER JOIN grades USING (matter_id)
        WHERE grades.user_id = ${userId}
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const create = async (data: {
  name: string;
  credits: string;
  description: string;
}) => {
  try {
    const response = await connection.query(`
            INSERT INTO matters (
                name,
                credits,
                description
            ) VALUES (
                '${data.name}',
                ${parseFloat(data.credits)},
                '${data.description}'
            )
        `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default { create, getAll, getById, getByUserId };