import { Request, Response } from 'express';
import usersModel from '../model/users.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getMattersByUserId } from '../service/matters.service';
import { getGradesByUserId } from '../service/grades.service';

export function getAll(_req: Request, res: Response) {
  usersModel
    .getAll()
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function login(req: Request, res: Response) {
  const body = req.body;

  const user = {
    email: body.email,
    password: body.password
  };

  usersModel
    .getByEmail(user.email)
    .then(
      (
        response: Array<{
          userId: number;
          password: string;
          firstName: string;
          lastName: string;
          type: string;
        }>
      ) => {
        if (!response) {
          res.status(404).send({ message: 'User not found' });
          return;
        }

        bcrypt
          .compare(user.password, response[0].password)
          .then((response) => {
            if (!response) res.status(422).send({ message: 'Wrong password' });
          })
          .catch((err) => {
            throw err;
          });

        const secret = process.env.JWT_SECRET || '12345abcde!@#$%';

        jwt.sign(
          { userId: response[0].userId, userType: response[0].type },
          secret,
          {
            expiresIn: '180M'
          },
          (err: any, token: any) => {
            if (err) throw err;
            res.status(200).json({ token, message: 'User loged!' });
          }
        );
      }
    )
    .catch((err) => {
      res.status(500).send({ message: err });
    });
}

export function getById(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  usersModel
    .getById(id)
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function getHistoric(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  usersModel
    .getById(id)
    .then((response) => {
      Promise.all([getMattersByUserId(id, token), getGradesByUserId(id, token)])
        .then((promiseResponse) => {
          console.log( promiseResponse[1].data);
          
          const matters = promiseResponse[0]?.data?.data?.map(
            (matter: any) => ({
              ...matter,
              grades: promiseResponse[1]?.data?.data?.filter(
                (grade: any) => grade.matterId === matter.matterId
              )
            })
          );

          res.status(200).json({  data: { ...response[0], matters } });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function create(req: Request, res: Response) {
  const body = req.body;

  const newUser = {
    email: body.email,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
    type: body.type,
    registrationNumber: body.registrationNumber,
    matters: body.matters
  };

  bcrypt.genSalt(12).then((salt) => {
    bcrypt
      .hash(newUser.password, salt)
      .then(async (hash) => {
        newUser.password = hash;

        usersModel
          .create(newUser)
          .then((response) => {
            if (response.insertId)
              res.status(200).json({
                message: 'User ' + response.insertId + ' was created!',
                data: { ...newUser, userId: response.insertId }
              });
            else throw 'Database error';
          })
          .catch((error) => {
            res.status(400).json(error || 'Undefined error');
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
}

export function update(req: Request, res: Response) {
  const body = req.body;
  const id = parseInt(req.params.id);

  const newUser = {
    email: body.email,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
    type: body.type,
    userId: id,
    registrationNumber: body.registrationNumber
  };

  usersModel
    .update(newUser)
    .then((response) => {
      if (response.affectedRows && response.affectedRows > 0)
        res.status(200).json({
          message: 'User ' + id + ' success updated!',
          data: newUser
        });
      else throw 'Database error';
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function remove(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  usersModel
    .remove(id)
    .then((response) => {
      if (response.affectedRows && response.affectedRows > 0)
        res.status(200).json({ message: 'User ' + id + ' success removed!' });
      else throw 'Database error';
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}
