import { Sequelize } from "sequelize";
import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } from "./constants/index.js";

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false, native: false }
);

export { sequelize as conn };