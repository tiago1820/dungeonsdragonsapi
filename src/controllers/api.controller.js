import { CHARACTER_URL, LOCATION_URL, EPISODE_URL } from "../constants/index.js";

export class APIController {
    getApiInfo = async (req, res) => {
        try {
            const apiInfo = {
                characters: CHARACTER_URL,
                locations: LOCATION_URL,
                episodes: EPISODE_URL
            };
            return res.status(200).json(apiInfo);
        } catch (error) {
            console.log("HaHaHa", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}