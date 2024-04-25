import { Router } from "express";
export const authRoute = Router();

import { AuthController } from "../controllers/auth.controller.js";
const auth = new AuthController();

authRoute.post("/auth/signup", auth.registerUser);
authRoute.post("/auth/signin",);