import { Character } from "../db.js";

export class CharacterHandler {

    getAllCharacters = async () => {
        try {
            const characters = await Character.findAll({ raw: true });
            return characters;
        } catch (error) {
            throw new Error("Error loading characters: " + error.message);
        }
    }

    getCharacterByIds = async (characterIds) => {
        try {
            const characters = await Character.findAll({ where: { id: characterIds } });
            return characters;
        } catch (error) {
            throw new Error("Error loading characters: " + error.message);
        }
    }
}