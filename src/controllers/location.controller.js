import { Location } from "../db.js";

export class LocationController {

    createLocation = async (req, res) => {
        let data = {};
        try {
            const { name, type } = req.body;
            let existLocation = await Location.findOne({ where: { name } });
            if (existLocation) {
                data.error = `There is already a location with the name ${name}`;
                return res.status(400).json(data);
            }
            const { dataValues: newLocation } = await Location.create({
                name, type
            });
            res.status(201).json(data.episode = newLocation);
        } catch (error) {
            return res.status(500).json(data.error = "Internal Server Error");
        }
    }

    getAllLocation = async (req, res) => {
        let data = {};
        try {
            const location = await Location.findAll({ raw: true });
            data.info = { count: location.length, pages: "", next: "", prev: "" };
            data.results = location;
            res.status(201).json(data);
        } catch (error) {
            data = { error: "Internal server error." };
            return res.status(500).json(data);
        }
    }
}