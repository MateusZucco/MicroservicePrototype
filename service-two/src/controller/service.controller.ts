import { Request, Response } from 'express';
import * as serviceThree from '../service/serviceThree.service';

export function getAll(_req: Request, res: Response) {
  serviceThree
    .getAll()
    .then((response: any) => {
      res.status(200).json({ data: response });
    })
    .catch((error: any) => {
      res.status(400).json(error || 'Undefined error');
    });
}
