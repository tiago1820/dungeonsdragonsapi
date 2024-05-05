import { Episode } from "../db.js";

export class EpisodeController {

    createEpisode = async (req, res) => {
        let data = {};
        try {
            const { name, airDate, episode } = req.body;
            let existEpisode = await Episode.findOne({ where: { name } })
            if (existEpisode) {
                data.error = `There is already a episode with the name ${name}`;
                return res.status(400).json(data);
            }
            const { dataValues: newEpisode } = await Episode.create({
                name, airDate, episode
            });
            res.status(201).json(data.episode = newEpisode);
        } catch (error) {
            return res.status(500).json(data.error = "Internal Server Error");
        }
    }
}