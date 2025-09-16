import { Request, Response } from 'express';
import Model from '../model/serviceThree.model';
import * as app from '../index';

export async function getAll(_req: Request, res: Response) {
  const allUsersFromCache = (await app.cacheClient.get(
    'allUsersThree'
  )) as string;
  if (allUsersFromCache) {
     res.status(200).json({ cache: true, data: JSON.parse(allUsersFromCache) });
  } else {
    Model.getAll()
      .then((response: any) => {
        app.cacheClient.set('allUsersThree', JSON.stringify(response), {
          expiration: { type: 'EX', value: 30 }
        }),
          res.status(200).json({ cache: false, data: response });
      })
      .catch((error: any) => {
        res.status(400).json(error || 'Undefined error');
      });
  }
}
