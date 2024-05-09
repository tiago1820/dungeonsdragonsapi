import { Router } from "express";
import { Authenticate } from "../middleware/authenticate.js";
import { LocationController } from "../controllers/location.controller.js";

export const locationRouter = Router();
const auth = new Authenticate();
const location = new LocationController();
locationRouter.post("/location/create", auth.authenticate, location.createLocation);
locationRouter.get("/location", auth.authenticate, location.getAllLocation);
locationRouter.get("/location/:ids", auth.authenticate, location.getLocationByIds);
locationRouter.put("/location/:id", auth.authenticate, location.editLocation);
locationRouter.delete("/location/:id", auth.authenticate, location.deleteLocation);