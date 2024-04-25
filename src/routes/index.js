import { Router } from "express";
export const router = Router();
import { apiRoute } from "./api.route.js";
import { authRoute } from "./auth.route.js";

router.use(authRoute);