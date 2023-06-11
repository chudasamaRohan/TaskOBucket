const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userName: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            contact: {
                type: DataTypes.INTEGER,
            },
            password: {
                type: DataTypes.STRING,
            },
            role: {
                type: DataTypes.ENUM,
                values: ['employee', 'manager'],
            },
            designation: {
                type: DataTypes.ENUM,
                values: [
                    'Developer',
                    'Civil_engineer',
                    'Worker',
                    'Finance-manager',
                    'Super-visor',
                    'Sales-manager',
                    'Analyst',
                    'Designer',
                ],
            },
            createdBy: {
                type: DataTypes.INTEGER,
            },
            updatedBy: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        {
            timestamps: true,
        }
    );
    users.beforeSave(async (user) => {
        if (user.changed('password')) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
        }
    },
        users.prototype.comparePassword = async function (password) {
            return bcrypt.compare(password, this.password);
        });
    return users;
};
