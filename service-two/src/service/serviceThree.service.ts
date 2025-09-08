import axios from 'axios';

const ROOT_URL = process.env.SERVICE_THREE_URL || 'http://localhost:3003';

export function getAll() {
  return axios
    .get(ROOT_URL + `/get-all`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
}