import { Request, Response } from 'express';
import Model from '../model/serviceOne.model';
import GrpcClientTwo from '../clientTwo';
import GrpcClientFour from '../clientFour';

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
    const responseOne = await Model.getAll();

    GrpcClientTwo.GetUsers(
      {},
      (err: any, { user: usersTwo }: { user: Array<{}> }) => {
        if (err) throw err;
        res.status(200).json({ data: [...responseOne, ...usersTwo] });
      }
    );
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
      res.status(200).json({ data: { user, accessHistoric } });
    });
  } catch (error) {
    console.error(error);

    res.status(400).json(error || 'Undefined error');
  }
}
