import { Router} from "express";
import * as controller from "./controller/service.controller";


const routes = Router();

routes.get("/test-single",  controller.getSingle);
routes.get("/test-dependecy",  controller.getDependency);
routes.get("/test-heavy-response",  controller.getHeavyResponse);
routes.get("/test-stress",  controller.testStressSimulate);



export default routes;