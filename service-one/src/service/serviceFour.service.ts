import axios from 'axios';

const ROOT_URL = process.env.SERVICE_FOUR_URL || 'http://localhost:3004';

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