import { Router } from "express";
import { Authenticate } from "../middleware/authenticate.js";
import { LocationController } from "../controllers/location.controller.js";

export const locationRouter = Router();
const auth = new Authenticate();
const location = new LocationController();
locationRouter.post("/location/create", auth.authenticate, location.createLocation);
locationRouter.get("/location", auth.authenticate, location.getAllLocation);