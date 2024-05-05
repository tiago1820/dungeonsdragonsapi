import { Router } from "express";
import { Authenticate } from "../middleware/authenticate.js";
import { EpisodeController } from "../controllers/episode.controller.js";

export const episodeRouter = Router();
const auth = new Authenticate();
const episode = new EpisodeController();
episodeRouter.post("/episode/create", auth.authenticate, episode.createEpisode);
