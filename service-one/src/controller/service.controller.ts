import { Request, Response } from 'express';
import * as serviceTwo from '../service/serviceTwo.service';

export function getSingle(_req: Request, res: Response) {
  serviceTwo
    .getAll()
    .then((response: any) => {
      res.status(200).json({ data: response });
    })
    .catch((error: any) => {
      res.status(400).json(error || 'Undefined error');
    });
}



export function getDependency(_req: Request, res: Response) {
  serviceTwo
    .getAll()
    .then((response: any) => {
      res.status(200).json({ data: response });
    })
    .catch((error: any) => {
      res.status(400).json(error || 'Undefined error');
    });
}
