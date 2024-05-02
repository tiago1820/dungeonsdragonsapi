import { Character } from "../db.js";

export class CharacterController {

    getAllCharacters = async (req, res) => {
        let data = { info: {}, results: "" };
        try {
            const characters = await Character.findAll({ raw: true });
            data.info = { count: characters.length, pages: "", next: "", prev: "" };
            data.results = characters;
            res.status(201).json(data);
        } catch (error) {
            data = { error: "Internal server error." };
            return res.status(500).json(data);
        }
    }

    getCharacterById = async (req, res) => {
        let data = {};
        try {
            const userCharacter = req.params.id;
            const character = await Character.findByPk(userCharacter, { raw: true });
            data = { character };
            res.status(200).json(data);
        } catch (error) {
            data["error"] = "Internal Server Error";
            return res.status(500).json(data);
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

}