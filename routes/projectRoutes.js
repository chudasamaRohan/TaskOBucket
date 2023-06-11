const express = require("express")
const { authgaurd } = require("../authgaurd")
const { checkProjectKey, checkGetEmployeKey } = require("../middlewear/checkKey")
const { checkManager, checkTaskBycreator, checkUserById, employeeAvailable } = require("../middlewear/chekar")
const { createproject } = require("../controller/projectController")
const { employeeSaver } = require("../controller/userController")
const checkProjectBycreator = require("../middlewear/projectmiddlewear")
const projectRoutes = express.Router()

projectRoutes.post("/createproject", authgaurd, checkProjectKey, checkManager, createproject)
// projectRoutes.post("/deleteProject", authgaurd, checkProjectBycreator,deleteProject)
projectRoutes.post("/setRequestoer", authgaurd, checkGetEmployeKey, checkManager, checkUserById, employeeAvailable, employeeSaver)


module.exports = projectRoutes 