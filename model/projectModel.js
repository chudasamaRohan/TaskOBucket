const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const projects = sequelize.define('projects', {
        projectName: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        managerId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    })
    return projects
}