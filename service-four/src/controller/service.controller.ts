import { Request, Response } from 'express';
import Model from '../model/serviceFour.model';
import * as app from '../index';

export async function getAll(_req: Request, res: Response) {
  const allUsersFromCache = (await app.cacheClient.get(
    'allUsersFour'
  )) as string;
  if (allUsersFromCache) {
    res.status(200).json({ cache: true, data: JSON.parse(allUsersFromCache) });
  } else {
    Model.getAll()
      .then(async (response: any) => {
        await app.cacheClient.set('allUsersFour', JSON.stringify({ user: response[0][0], accessHistoric: response[1][0]  } ), {
          expiration: { type: 'EX', value: 30 }
        });
        res.status(200).json({ cache: false, data: { user: response[0][0], accessHistoric: response[1][0]  }  });
      })
      .catch((error: any) => {
        res.status(400).json(error || 'Undefined error');
      });
  }
}
