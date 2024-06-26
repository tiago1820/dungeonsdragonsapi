import { Router } from "express";
import { Authenticate } from "../middleware/authenticate.js";
import { CharacterController } from "../controllers/character.controller.js";

export const characterRouter = Router();
const auth = new Authenticate();
const character = new CharacterController();
characterRouter.post("/character/create", auth.authenticate, character.createCharacter);
characterRouter.get("/character", auth.authenticate, character.getAllCharacters);
characterRouter.get("/character/:ids", auth.authenticate, character.getCharacterByIds);
characterRouter.put("/character/:id", auth.authenticate, character.editCharacter);
characterRouter.delete("/character/:id", auth.authenticate, character.deleteCharacter);