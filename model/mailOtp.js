const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const otps = sequelize.define('otps', {
        email: {
            type: DataTypes.STRING
        },
        code: {
            type: DataTypes.STRING
        },
        expireTime: {
            type: DataTypes.DATE
        }
    })
    return otps
}



