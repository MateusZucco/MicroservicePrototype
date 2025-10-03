import { Request, Response } from 'express';
import Model from '../model/serviceFour.model';

export function getAll(_req: Request, res: Response) {
  Model.getAll()
    .then((response: any) => {
      res.status(200).json({ data: { user: response[0][0], accessHistoric: response[1][0]  } });
    })
    .catch((error: any) => {
      res.status(400).json(error || 'Undefined error');
    });
}
