import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../model/users.model';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  req.user = undefined;

  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[1]
  ) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET || '12345abcde!@#$%',
      async function (err: any, decode: any) {
        try {
          if (err || !decode) {
            throw 'Token expired';
          }

          const user = await userModel.getById(decode.userId);

          if (!user) {
            throw 'Invalid token';
          }

          req.user = user;

          next();
        } catch (err) {
          res.status(401).send({
            message: err
          });
        }
      }
    );
  } else {
    res.status(401).send({
      message: 'User without token'
    });
  }
}