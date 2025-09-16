import { Request, Response } from 'express';
import * as serviceThree from '../service/serviceThree.service';
import Model from '../model/serviceTwo.model';
import * as app from '../index';

export async function getAll(_req: Request, res: Response) {
  const allUsersFromCache = (await app.cacheClient.get(
    'allUsersTwo'
  )) as string;
  if (allUsersFromCache) {
    serviceThree
      .getAll()
      .then((responseThree: any) => {
        res.status(200).json({
          cache: true,
          data: [...JSON.parse(allUsersFromCache), ...responseThree.data.data]
        });
      })
      .catch((error: any) => {
        throw error;
      });
  } else {
    Model.getAll()
      .then((responseTwo: any) => {
        Promise.all([
          app.cacheClient.set('allUsersTwo', JSON.stringify(responseTwo), {
            expiration: { type: 'EX', value: 10 }
          }),
          serviceThree.getAll()
        ])
          .then(([_cache, responseThree]) => {
            res.status(200).json({
              cache: false,
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
}
