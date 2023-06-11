const express = require('express')
const { authgaurd } = require('../authgaurd')
const { checkTaskCreateKey, checkKeyAssignEmployeeTssk } = require('../middlewear/checkKey')
const { checkProject, checkRole, checkManager, employeeInproject, checkTaskBycreator } = require('../middlewear/chekar')
const { createTask, taskApprove, getApproveTask, myAllTask, taskTeam, assignEmployeeInTask } = require('../controller/taskController')
const { checkemployeeAvailable } = require('../middlewear/taskmiddlewear')
const taskRoutes = express.Router()



taskRoutes.post("/createtask", authgaurd, checkTaskCreateKey, checkProject, checkRole, createTask)
taskRoutes.post("/approveTask", authgaurd, checkManager, taskApprove)
taskRoutes.get("/approveTaskList", authgaurd, getApproveTask)
taskRoutes.get("/myTask", authgaurd, myAllTask)
taskRoutes.post("/allemployeeInProject", authgaurd, employeeInproject)
taskRoutes.post("/taskTeam", authgaurd, taskTeam)
taskRoutes.post("/assignEmployeeInTask", authgaurd, checkKeyAssignEmployeeTssk, checkTaskBycreator, checkemployeeAvailable, assignEmployeeInTask)



module.exports = taskRoutes