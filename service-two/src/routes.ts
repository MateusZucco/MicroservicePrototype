import { Router, Request, Response, NextFunction } from "express";
import * as controller from "./controller/service.controller";


const routes = Router();

routes.get("/get-all",  controller.getAll);



export default routes;