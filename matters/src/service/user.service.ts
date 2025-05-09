import { Response } from 'express';
import axios from 'axios';

const ROOT_URL = process.env.USER_SERVICE_URL || 'http://localhost:3000';

export function getById(res: Response, userId: number, token: string) {
  return axios
    .get(ROOT_URL + `/users/${userId}`, {
      headers: { Authorization: 'Bearer ' + token, type: 'admin' }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => { 
        console.error(err);
        
        res.status(500).send({
        message: 'Server error'
      })});
}
