import { DataTypes } from "sequelize";

export default (sequelize) => {
    sequelize.define("CharLocation", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        charId: {
            type: DataTypes.INTEGER,
        },
        locationId: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: true
    });
}