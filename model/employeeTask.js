const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const employeetasks = sequelize.define('employeetasks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        taskId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        taskEmployeeId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        startDate: {
            type: DataTypes.DATE
        },
        endDate: {
            type: DataTypes.DATE
        }

    })
    return employeetasks
}