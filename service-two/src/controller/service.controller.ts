import { Request, Response } from 'express';
import * as serviceThree from '../service/serviceThree.service';
import Model from '../model/serviceTwo.model';
import * as app from '../index';

export async function getAll(_req: Request, res: Response) {
  Model.getAll()
    .then((responseTwo: any) => {
      serviceThree
        .getAll()
        .then((responseThree) => {
          res.status(200).json({
            data: [...responseTwo, ...responseThree.data.data]
          });
        })
        .catch((error: any) => {
          throw error;
        });
    })
    .catch((error: any) => {
      res.status(400).json(error || 'Undefined error');
    });
}
