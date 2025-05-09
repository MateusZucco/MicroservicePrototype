import { Router, Request, Response, NextFunction } from "express";
import * as mattersController from "./controller/matters.controller";
import { verifyToken } from "./middleware/token.middleware";
import { verifyUserType } from "./middleware/userType.middleware";

const routes = Router();

routes.get("/matters", verifyToken, (req: Request, res: Response, next: NextFunction) => {verifyUserType(req, res, next, ['teacher', 'admin'])}, mattersController.getAll);
routes.post("/matters", verifyToken,  (req: Request, res: Response, next: NextFunction) => {verifyUserType(req, res, next, ['teacher', 'admin'])}, mattersController.create);
routes.get("/matters/:matter_id", verifyToken, mattersController.getById);
routes.get("/matters/user/:user_id", verifyToken, mattersController.getByUserId);


export default routes;
