import { Request, Response } from 'express';
import Model from '../model/serviceThree.model';

export function getAll(_req: Request, res: Response) {
  Model.getAll()
    .then((response: any) => {
      res.status(200).json({ data: response });
    })
    .catch((error: any) => {
            console.error(error);
      res.status(400).json(error || 'Undefined error');
    });
}
