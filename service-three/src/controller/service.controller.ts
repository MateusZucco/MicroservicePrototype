import { Request, Response } from 'express';
import Model from '../model/serviceThree.model';
import * as app from '../index';

export async function getAll(_req: Request, res: Response) {
  Model.getAll()
    .then((response: any) => {
      res.status(200).json({ data: response });
    })
    .catch((error: any) => {
      res.status(400).json(error || 'Undefined error');
    });
}
