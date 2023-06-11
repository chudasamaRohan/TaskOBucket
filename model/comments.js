const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define('comments', {
        taskId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        employeeCommentId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        comment: {
            type: DataTypes.STRING
        }
    })
    return comments
}