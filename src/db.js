import { Sequelize } from "sequelize";
import {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} from "./constants/index.js";

import UserModel from "./models/user.model.js";
import CharacterModel from "./models/character.model.js";
import EpisodeModel from "./models/episode.model.js";
import LocationModel from "./models/location.model.js";
import CharEpisodeModel from "./models/charEpisode.model.js";
import CharLocationModel from "./models/charLocation.model.js";

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false, native: false }
);

UserModel(sequelize);
CharacterModel(sequelize);
EpisodeModel(sequelize);
LocationModel(sequelize);
CharEpisodeModel(sequelize);
CharLocationModel(sequelize);

const {
    User,
    Character,
    Episode,
    Location,
    CharEpisode,
    CharLocation
} = sequelize.models;

export {
    User,
    Character,
    Episode,
    Location,
    CharEpisode,
    CharLocation,
    sequelize as conn
};