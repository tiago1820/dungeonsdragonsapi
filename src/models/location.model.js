import { DataTypes } from "sequelize";

export default (sequelize) => {
    sequelize.define("Location", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: true
    });
}