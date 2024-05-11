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

    getLocationByIds = async (req, res) => {
        let data = {};
        try {
            const query = req.params.ids;
            const locationIds = query.split(",").map(id => parseInt(id.trim()));
            const results = await Location.findAll({ where: { id: locationIds } });
            const data = results.map(item => item.dataValues);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(data.error = "Internal Server Error");
        }
    }

    editLocation = async (req, res) => {
        let data = {};
        try {
            const locationId = req.params.id;
            const location = await Location.findOne({ where: { id: locationId } });
            if (!location) {
                data["error"] = "Location not found.";
                return res.status(404).json(data);
            }
            const { dataValues } = await location.update(req.body);
            data = { location: dataValues };
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(data.error = "Internal Server Error");
        }
    }

    deleteLocation = async (req, res) => {
        let data = {};
        try {
            const locationId = req.params.id;
            const location = await Location.findByPk(locationId);
            if (!location) {
                data["error"] = "Location not found."
                return res.status(404).json(data);
            }
            if (!await location.destroy()) {
                data["error"] = `"Error deleting the location ${location.name}."`
                return res.status(404).json(data);
            }
            data["message"] = `Location ${location.name} successfully deleted.`
            return res.status(200).json(data);
        } catch (error) {
            data["error"] = 'Internal Server Error';
            return res.status(500).json(data);
        }
    }
}