import { Router } from "express";
import { Authenticate } from "../middleware/authenticate.js";
import { APIController } from "../controllers/api.controller.js";

export const apiRoute = Router();
const auth = new Authenticate();
const api = new APIController();

apiRoute.get("/", auth.authenticate, api.getApiInfo);