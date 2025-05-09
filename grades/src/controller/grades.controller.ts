import { Request, Response } from 'express';
import mattersModel from '../model/grade.model';

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


export function getByMatterId(req: Request, res: Response) {
  const matterId = parseInt(req.params.matter_id);
  mattersModel
    .getByMatterId(matterId)
    .then((response) => {
      res.status(200).json({ data: response });
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
      res.status(200).json({ data: response });
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function create(req: Request, res: Response) {
  const body = req.body;

  const newGrade = {
    matterId: body.matterId,
    userId: body.userId,
    gradeValue: body.gradeValue
  };

  mattersModel
    .create(newGrade)
    .then((response) => {
      if (response.insertId)
        res.status(200).json({
          message: 'Grade ' + response.insertId + ' was created!',
          data: { ...newGrade, gradeId: response.insertId }
        });
      else throw 'Database error';
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}
