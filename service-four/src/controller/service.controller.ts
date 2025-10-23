import { Request, Response } from 'express';
import Model from '../model/serviceFour.model';
import * as app from '../index';

export async function getAll(_req: Request, res: Response) {
  Model.getAll()
    .then(async (response: any) => {
      res
        .status(200)
        .json({
          data: { user: response.user, accessHistoric: response.accessHistoric }
        });
    })
    .catch((error: any) => {
      res.status(400).json(error || 'Undefined error');
    });
}
