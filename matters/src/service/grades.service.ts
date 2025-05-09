import { Response } from 'express';
import axios from 'axios';

const ROOT_URL = process.env.GRADES_SERVICE_URL || 'http://localhost:3002';

export function getGradesByMatterId( matterId: number, token: string) {
  return axios
    .get(ROOT_URL + `/grades/matter/${matterId}`, {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
}
