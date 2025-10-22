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

    const users: any = [];
    const callUsers = GrpcClientTwo.GetUsers();

    callUsers.on('data', (response: any) => {
      console.log(response);

      if (response.user) {
        users.push(response.user);
      }
    });

    callUsers.on('error', (e: any) => {
      console.error('Erro no stream:', e.details);
    });

    callUsers.on('end', () => {
      res.status(200).json({ data: [...responseOne, ...users] });
    });

  } catch (error) {
    res.status(400).json(error || 'Undefined error');
  }
}

export function getHeavyResponse(_req: Request, res: Response) {
  try {
    let users: Array<{}> = [];
    let accessHistoric: Array<{}> = [];
    const callUsers = GrpcClientFour.GetUsers();

    callUsers.on('data', (response: any) => {
      console.log(response);

      if (response.user) {
        users.push(response.user);
      } else if (response.accessHistoric) {
        accessHistoric.push(response.accessHistoric);
      }
    });

    callUsers.on('error', (e: any) => {
      console.error('Erro no stream:', e.details);
    });

    callUsers.on('end', () => {
      res.status(200).json({ data: { users, accessHistoric } });
    });
  } catch (error) {
    console.error(error);

    res.status(400).json(error || 'Undefined error');
  }
}
