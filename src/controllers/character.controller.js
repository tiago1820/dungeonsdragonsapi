import { Character } from "../db.js";
import { CharacterHandler } from "../handlers/character.handler.js";

export class CharacterController {
    constructor() {
        this.handler = new CharacterHandler();
    }

    getAllCharacters = async (req, res) => {
        try {
            const characters = await this.handler.getAllCharacters();
            const count = characters.length;
            const results = characters;
            const data = { info: { count }, results };
            res.status(201).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    getCharacterByIds = async (req, res) => {
        try {
            const query = req.params.ids;
            const characterIds = query.split(",").map(id => parseInt(id.trim()));
            const results = await this.handler.getCharacterByIds(characterIds);
            const data = results.map(item => item.dataValues);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    createCharacter = async (req, res) => {
        try {
            const {
                name,
                status,
                occupation,
                powersOrSkills,
                gender,
                image
            } = req.body;
            const existCharacter = await this.handler.findCharacterByName(name);
            if (existCharacter) {
                return res.status(400).json({ error: `There is already a character with the name ${name}` });
            }
            const newCharacter = { name, status, occupation, powersOrSkills, gender, image }
            const character = await this.handler.createNewCharacter(newCharacter);
            res.status(201).json({ character, message: "Successfully registered." });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    editCharacter = async (req, res) => {
        try {
            const characterId = req.params.id;
            const newData = req.body;
            const existCharacter = await this.handler.findCharacterById(characterId);
            if (!existCharacter) {
                return res.status(404).json({ error: "Character not found." });
            }
            const characterUpdated = await this.handler.updateCharacter(characterId, newData);
            return res.status(200).json({ characterUpdated });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    deleteCharacter = async (req, res) => {
        let data = {};
        try {
            const characterId = req.params.id;
            const character = await Character.findByPk(characterId);
            if (!character) {
                data["error"] = "Character not found."
                return res.status(404).json(data);
            }
            if (!await character.destroy()) {
                data["error"] = `"Error deleting the character ${character.name}."`
                return res.status(404).json(data);
            }
            data["message"] = `Character ${character.name} successfully deleted.`
            return res.status(200).json(data);
        } catch (error) {
            data["error"] = 'Internal Server Error';
            return res.status(500).json(data);
        }
    }
}