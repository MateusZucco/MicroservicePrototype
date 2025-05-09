import { Router, Request, Response, NextFunction } from "express";
import * as usersController from "./controller/users.controller";
import { verifyToken } from "./middleware/token.middleware";
import { verifyUserType } from "./middleware/userType.middleware";

const routes = Router();

routes.get("/users", verifyToken, (req: Request, res: Response, next: NextFunction) => {verifyUserType(req, res, next, ['teacher', 'admin'])}, usersController.getAll);
routes.get("/users/:id", verifyToken, usersController.getById);
routes.get("/users/:id/historic", verifyToken, usersController.getHistoric);
routes.post("/login", usersController.login);
routes.post("/users", verifyToken, (req: Request, res: Response, next: NextFunction) => {verifyUserType(req, res, next, ['teacher', 'admin'])}, usersController.create);
routes.put("/users/:id", verifyToken, (req: Request, res: Response, next: NextFunction) => {verifyUserType(req, res, next, ['teacher', 'admin'])}, usersController.update);
routes.delete("/users/:id", verifyToken, (req: Request, res: Response, next: NextFunction) => {verifyUserType(req, res, next, ['teacher', 'admin'])}, usersController.remove);

export default routes;
