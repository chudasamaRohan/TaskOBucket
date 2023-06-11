const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const employee = sequelize.define('employee', {
        employeeId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        projectId: {
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
    return employee
}