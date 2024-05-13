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

    findCharacterByName = async (name) => {
        try {
            const character = await Character.findOne({ where: { name } });
            return character;
        } catch (error) {
            throw new Error("Error finding character: " + error.message);
        }
    }

    createNewCharacter = async (newCharacter) => {
        try {
            const character = await Character.create(newCharacter);
            return character;
        } catch (error) {
            throw new Error("Error creating character: " + error.message);
        }
    }

    findCharacterById = async (characterId) => {
        try {
            const character = await Character.findOne({ where: { id: characterId } });
            return character;
        } catch (error) {
            throw new Error("Error finding character: " + error.message);
        }
    }

    updateCharacter = async (characterId, newData) => {
        try {
            const [numAffectedRows, affectedRows] = await Character.update(newData, {
                where: { id: characterId },
                returning: true
            });
            return affectedRows[0];
        } catch (error) {
            throw new Error("Error updating character: " + error.message);
        }
    }

    deleteCharacterById = async (characterId) => {
        try {
            const character = await Character.findOne({ where: { id: characterId } });
            if (!character) {
                return null;
            }
            await character.destroy();
            return character;
        } catch (error) {
            throw new Error("Error deleting character: " + error.message);
        }
    }

}