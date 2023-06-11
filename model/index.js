const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operationsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const employee = require("../model/projectEmployeeModel")(sequelize, DataTypes)
const users = require("../model/userModel")(sequelize, DataTypes)
const otps = require("../model/mailOtp")(sequelize, DataTypes)
const projects = require("../model/projectModel")(sequelize, DataTypes)
const tasks = require("../model/taskModel")(sequelize, DataTypes)
const employeeTasks = require("../model/employeeTask")(sequelize, DataTypes)
const comments = require("../model/comments")(sequelize, DataTypes)

tasks.belongsTo(users, { foreignKey: 'employeeId', as: 'employee' });
// tasks.belongsTo(users, { foreignKey: 'managerId', as: 'manager' });
tasks.belongsTo(projects, { foreignKey: 'projectId', as: 'project' });

users.hasMany(tasks, { foreignKey: 'employeeId', as: 'tasksAsEmployee' });
// users.hasMany(tasks, { foreignKey: 'managerId', as: 'tasksAsManager' });
projects.hasMany(tasks, { foreignKey: 'projectId', as: 'tasks' });


users.hasMany(projects, { foreignKey: 'managerId' });
projects.belongsTo(users, { foreignKey: 'managerId' });

users.hasMany(employee, { foreignKey: 'employeeId' })
employee.belongsTo(users, { foreignKey: 'employeeId' })

projects.hasMany(employee, { foreignKey: 'projectId' })
employee.belongsTo(projects, { foreignKey: 'projectId' })

users.hasMany(employeeTasks, { foreignKey: 'taskEmployeeId' })
tasks.hasMany(employeeTasks, { foreignKey: 'taskId' })

employeeTasks.belongsTo(users, { foreignKey: 'taskEmployeeId' })
employeeTasks.belongsTo(tasks, { foreignKey: 'taskId' })

users.hasMany(comments, { foreignKey: 'employeeCommentId' })
comments.belongsTo(users, { foreignKey: 'employeeCommentId' })

tasks.hasMany(comments, { foreignKey: 'taskId' })
comments.belongsTo(tasks, { foreignKey: 'taskId' })


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = users
db.projects = projects
db.employee = employee
db.tasks = tasks
db.employeeTasks = employeeTasks
db.otps = otps
db.comments = comments

module.exports = db

db.sequelize.sync({ force: false }).then(() => {

    console.log("db - connected.");

});