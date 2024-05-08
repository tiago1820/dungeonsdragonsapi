import { Router } from "express";
export const router = Router();
import { apiRoute } from "./api.route.js";
import { authRoute } from "./auth.route.js";
import { userRoute } from "./user.routes.js";
import { characterRouter } from "./character.router.js";
import { episodeRouter } from "./episode.route.js";
import { locationRouter } from "./location.route.js";

router.use(apiRoute);
router.use(authRoute);
router.use(userRoute);
router.use(characterRouter);
router.use(episodeRouter);
router.use(locationRouter);