import { Router, Request, Response, NextFunction } from "express";
import * as controller from "./controller/service.controller";


const routes = Router();

routes.get("/test-single",  controller.getSingle);
routes.get("/test-dependecy",  controller.getDependency);
routes.get("/test-large-payload",  controller.getAll);
routes.get("/test-large-query",  controller.getAll);
routes.get("/test-small",  controller.getAll);
routes.get("/test-sleeper",  controller.getAll);



export default routes;