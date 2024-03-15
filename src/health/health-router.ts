import express from "express";
import {Util} from "../shared/libs/util";

import { HealthController } from "./health-controller";

const healthRouter = express.Router();

const util = new Util();

const healthController = new HealthController(util);

healthRouter.get("/", healthController.test);
healthRouter.get("/email", healthController.testmail);

export default healthRouter;
