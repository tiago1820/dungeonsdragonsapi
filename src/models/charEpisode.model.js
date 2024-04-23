import { DataTypes } from "sequelize";

export default (sequelize) => {
    sequelize.define("CharEpisode", {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        charId: {
            type: DataTypes.INTEGER,
        },
        episodeId: {
            type: DataTypes.INTEGER,
        },
    },{
        timestamps: true
    });
}