import { Router } from "express";
export const router = Router();

import { apiRoute } from "./api.route.js";

router.use(apiRoute);