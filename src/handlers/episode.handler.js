import { Episode } from "../db.js";

export class EpisodeHandler {

    createNewEpisode = async (newEpisode) => {
        try {
            const episode = await Episode.create(newEpisode);
            return episode;
        } catch (error) {
            throw new Error("Error creating episode: " + error.message);
        }
    }

    findEpisodeByName = async (name) => {
        try {
            const episode = await Episode.findOne({ where: { name } });
            return episode;
        } catch (error) {
            throw new Error("Error finding episode: " + error.message);
        }
    }
}