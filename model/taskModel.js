const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const tasks = sequelize.define('tasks', {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        projectId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        employeeId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        startDate: {
            type: DataTypes.DATE
        },
        endDate: {
            type: DataTypes.DATE
        },
        estimateHours: {
            type: DataTypes.TIME
        },
        taskStatus: {
            type: DataTypes.ENUM,
            values: ['pending', 'ongoing', 'onhold', "closed"]
        },
        createdBy: {
            type: DataTypes.INTEGER
        },
        updatedBy: {
            type: DataTypes.INTEGER
        },
        apporvalStatus: {
            type: DataTypes.ENUM,
            values: ['pending', 'approve', 'reject']
        }
    })
    return tasks
}