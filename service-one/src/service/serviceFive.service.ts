import axios from 'axios';

const ROOT_URL = process.env.GRADES_SERVICE_URL || 'http://localhost:3005';

export function simulateStress() {
  return axios
    .get(ROOT_URL + `/simulate-stress`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
}