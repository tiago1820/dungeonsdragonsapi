import { Character } from "../db.js";
import { CharacterHandler } from "../handlers/character.handle.js";

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
        let data = {};
        try {
            const {
                name,
                status,
                occupation,
                powersOrSkills,
                gender,
                image
            } = req.body;
            let existCharacter = await Character.findOne({ where: { name } });
            if (existCharacter) {
                data = { error: `There is already a character with the name ${name}` };
                return res.status(400).json(data);
            }
            const user = await Character.create({
                name,
                status,
                occupation,
                powersOrSkills,
                gender,
                image
            });
            data = { user, message: "Successfully registered." };
            res.status(201).json(data);
        } catch (error) {
            data = { error: "Internal server error." };
            return res.status(500).json(data);
        }
    }

    editCharacter = async (req, res) => {
        let data = {};
        try {
            const characterId = req.params.id;
            const character = await Character.findOne({ where: { id: characterId } });
            if (!character) {
                data["error"] = "Character not found."
                return res.status(404).json(data);
            }
            const { dataValues } = await character.update(req.body);
            data = { character: dataValues };
            return res.status(200).json(data);
        } catch (error) {
            data["error"] = 'Internal Server Error';
            return res.status(500).json(data);
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