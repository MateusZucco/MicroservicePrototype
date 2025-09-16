import { Request, Response } from 'express';
import * as serviceTwo from '../service/serviceTwo.service';
import * as serviceFour from '../service/serviceFour.service';
import * as serviceFive from '../service/serviceFive.service';
import Model from '../model/serviceOne.model';
import * as app from '../index';

export async function getSingle(_req: Request, res: Response) {
  const allUsersFromCache = await app.cacheClient.get('allUsers') as string;
  if (allUsersFromCache) {
    res.status(200).json({ data: JSON.parse(allUsersFromCache) });
  } else {
    Model.getAll()
      .then(async (response: any) => {
        await app.cacheClient.set('allUsers', JSON.stringify(response));
        res.status(200).json({ data: response });
      })
      .catch((error: any) => {
        res.status(400).json(error || 'Undefined error');
      });
  }
}

export function getDependency(_req: Request, res: Response) {
  Model.getAll()
    .then((responseOne: any) => {
      serviceTwo
        .getAll()
        .then((responseTwo: any) => {
          res
            .status(200)
            .json({ data: [...responseOne, ...responseTwo.data.data] });
        })
        .catch((error: any) => {
          throw error;
        });
    })
    .catch((error: any) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function getHeavyResponse(_req: Request, res: Response) {
  serviceFour
    .getAll()
    .then((response: any) => {
      res.status(200).json({ data: response.data });
    })
    .catch((error: any) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function testStressSimulate(_req: Request, res: Response) {
  serviceFive
    .simulateStress()
    .then((ress) => {
      console.log(ress);

      res.status(200).json({ data: 'OK' });
    })
    .catch((error: any) => {
      res.status(400).json(error || 'Undefined error');
    });
}
