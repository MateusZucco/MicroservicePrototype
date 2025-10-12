import { Request, Response } from 'express';
import Model from '../model/serviceOne.model';
import GrpcClientTwo from '../clientTwo';
import GrpcClientFour from '../clientFour';
import * as app from '../index';

// export function getSingle(_req: Request, res: Response) {
//   Model.getAll()
//     .then((response: any) => {
//       res.status(200).json({ data: response });
//     })
//     .catch((error: any) => {
//       res.status(400).json(error || 'Undefined error');
//     });
// }

export async function getDependency(_req: Request, res: Response) {
  try {
    const allUsersFromCache = (await app.cacheClient.get('allUsers')) as string;
    if (allUsersFromCache) {
      GrpcClientTwo.GetUsers(
        {},
        (err: any, { user: usersTwo }: { user: Array<{}> }) => {
          if (err) throw err;
          res
            .status(200)
            .json({ data: [...JSON.parse(allUsersFromCache), ...usersTwo] });
        }
      );
    } else {
      Model.getAll().then(async (responseOne: any) => {
        await app.cacheClient.set('allUsers', JSON.stringify(responseOne), {
          expiration: { type: 'EX', value: 30 }
        });
        GrpcClientTwo.GetUsers(
          {},
          (err: any, { user: usersTwo }: { user: Array<{}> }) => {
            if (err) throw err;
            res.status(200).json({ data: [...responseOne, ...usersTwo] });
          }
        );
      });
    }
  } catch (error) {
    res.status(400).json(error || 'Undefined error');
  }
}

export function getHeavyResponse(_req: Request, res: Response) {
  try {
    GrpcClientFour.GetUsers({}, (err: any, response: any) => {
      if (err) throw err;
      const {
        user,
        accessHistoric
      }: { user: Array<{}>; accessHistoric: Array<{}> } = response;
      res.status(200).json({ data: { ...user, ...accessHistoric } });
    });
  } catch (error) {
    res.status(400).json(error || 'Undefined error');
  }
}

// export function testStressSimulate(_req: Request, res: Response) {
//   serviceFive
//     .simulateStress()
//     .then((ress) => {
//       res.status(200).json({ data: 'OK' });
//     })
//     .catch((error: any) => {
//       res.status(400).json(error || 'Undefined error');
//     });
// }
