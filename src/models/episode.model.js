import { DataTypes } from "sequelize";

export default (sequelize) => {
    sequelize.define("Episode", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        airDate: {
            type: DataTypes.STRING
        },
        episode: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: true
    });
}