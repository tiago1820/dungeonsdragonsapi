import { Router } from "express";
import { Authenticate } from "../middleware/authenticate.js";
import { EpisodeController } from "../controllers/episode.controller.js";

export const episodeRouter = Router();
const auth = new Authenticate();
const episode = new EpisodeController();
episodeRouter.post("/episode/create", auth.authenticate, episode.createEpisode);
episodeRouter.get("/episode", auth.authenticate, episode.getAllEpisodes);
episodeRouter.get("/episode/:ids", auth.authenticate, episode.getEpisodeByIds);
episodeRouter.put("/episode/:id", auth.authenticate, episode.editEpisode);
episodeRouter.delete("/episode/:id", auth.authenticate, episode.deleteEpisode);