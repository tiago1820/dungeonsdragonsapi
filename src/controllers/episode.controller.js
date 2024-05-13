import { EpisodeHandler } from "../handlers/episode.handler.js";

export class EpisodeController {
    constructor() {
        this.handler = new EpisodeHandler();
    }

    createEpisode = async (req, res) => {
        try {
            const { name, airDate, episode } = req.body;
            const existEpisode = await this.handler.findEpisodeByName(name);
            if (existEpisode) {
                return res.status(400).json({ error: `There is already a episode with the name ${name}` });
            }
            const newEpisode = { name, airDate, episode }
            const createdEpisode = await this.handler.createNewEpisode(newEpisode);
            res.status(201).json({ episode: createdEpisode, message: "Successfully registered." });
        } catch (error) {
            console.log("AQUI: ", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    getAllEpisodes = async (req, res) => {
        let data = {};
        try {
            const episodes = await Episode.findAll({ raw: true });
            data.info = { count: episodes.length, pages: "", next: "", prev: "" };
            data.results = episodes;
            res.status(201).json(data);
        } catch (error) {
            data = { error: "Internal server error." };
            return res.status(500).json(data);
        }
    }

    getEpisodeByIds = async (req, res) => {
        let data = {};
        try {
            const query = req.params.ids;
            const episodeIds = query.split(",").map(id => parseInt(id.trim()));
            const results = await Episode.findAll({ where: { id: episodeIds } });
            const data = results.map(item => item.dataValues);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(data.error = "Internal Server Error");
        }
    }

    editEpisode = async (req, res) => {
        let data = {};
        try {
            const episodeId = req.params.id;
            const episode = await Episode.findOne({ where: { id: episodeId } });
            if (!episode) {
                data["error"] = "Episode not found.";
                return res.status(404).json(data);
            }
            const { dataValues } = await episode.update(req.body);
            data = { episode: dataValues };
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(data.error = "Internal Server Error");
        }
    }

    deleteEpisode = async (req, res) => {
        let data = {};
        try {
            const episodeId = req.params.id;
            const episode = await Episode.findByPk(episodeId);
            if (!episode) {
                data["error"] = "Episode not found.";
                return res.status(404).json(data);
            }
            if (!await episode.destroy()) {
                data["error"] = `"Error deleting the character ${episode.name}."`
                return res.status(404).json(data);
            }
            data["message"] = `Episode ${episode.name} successfully deleted.`;
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(data.error = "Internal Server Error");
        }
    }
}