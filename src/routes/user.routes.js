import { Router } from "express";
export const userRoute = Router();
import { Authenticate } from "../middleware/authenticate.js";
import { UserController } from "../controllers/user.controller.js";

const auth = new Authenticate();
const user = new UserController();
userRoute.get("/user/profile", auth.authenticate, user.findCurrentUser);
userRoute.put("/user/:id", auth.authenticate, user.editUser);