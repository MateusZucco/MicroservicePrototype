import { Router, Request, Response, NextFunction } from "express";
import * as gradesController from "./controller/grades.controller";
import { verifyToken } from "./middleware/token.middleware";
import { verifyUserType } from "./middleware/userType.middleware";

const routes = Router();

routes.get("/grades", verifyToken, (req: Request, res: Response, next: NextFunction) => {verifyUserType(req, res, next, ['teacher', 'admin'])}, gradesController.getAll);
routes.post("/grades", verifyToken,  (req: Request, res: Response, next: NextFunction) => {verifyUserType(req, res, next, ['teacher', 'admin'])}, gradesController.create);
routes.get("/grades/matter/:matter_id", verifyToken, gradesController.getByMatterId);
routes.get("/grades/user/:user_id", verifyToken, gradesController.getByUserId);


export default routes;
