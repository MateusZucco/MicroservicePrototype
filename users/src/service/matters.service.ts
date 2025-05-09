import axios from 'axios';

const ROOT_URL = process.env.MATTERS_SERVICE_URL || 'http://localhost:3001';

export function getMattersByUserId(userId: number, token: string) {
  return axios
    .get(ROOT_URL + `/matters/user/${userId}`, {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
}
