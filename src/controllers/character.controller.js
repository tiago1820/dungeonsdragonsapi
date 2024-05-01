import { Character } from "../db.js";

export class CharacterController {
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
            return res.status(400).json(data);
        }
    }
}