import { Request, Response } from 'express';
import mattersModel from '../model/matters.model';
import { getGradesByMatterId } from '../service/grades.service';

export function getAll(_req: Request, res: Response) {
  mattersModel
    .getAll()
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function getById(req: Request, res: Response) {
  const matterId = parseInt(req.params.matter_id);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  mattersModel
    .getById(matterId)
    .then((response) => {
      getGradesByMatterId(matterId, token)
        .then((gradesResponse) => {
          res.status(200).json({
            data: { ...response[0], grades: gradesResponse?.data?.data }
          });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function getByUserId(req: Request, res: Response) {
  const userId = parseInt(req.params.user_id);

  mattersModel
    .getByUserId(userId)
    .then((response) => {
      res.status(200).json({
        data: response
      });
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function create(req: Request, res: Response) {
  const body = req.body;

  const newMatter = {
    name: body.name,
    credits: body.credits,
    description: body.description
  };

  mattersModel
    .create(newMatter)
    .then((response) => {
      if (response.insertId)
        res.status(200).json({
          message: 'Matter ' + response.insertId + ' was created!',
          data: { ...newMatter, matterId: response.insertId }
        });
      else throw 'Database error';
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}
