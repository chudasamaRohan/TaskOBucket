const db = require("../model/index")
const tasks = db.tasks
const employeeTasks = db.employeeTasks
const users = db.users


const { tasksSaver } = require("../services/taskServices")

const taskTeam = async (req, res) => {
    try {

        const taskId = req.body.taskId
        const data = await employeeTasks.findAll({
            where: {
                taskId: taskId
            },
            include: {
                model: users,
                attributes: ["userName", "contact"]
            }
        })
        if (data.length == 0) {
            res.send("any employee not assign in this task.")

        } else {
            res.send(data)
        }
    } catch (error) {
        res.send(error)
    }

}



const myAllTask = async (req, res) => {
    try {

        const data = await tasks.findAll({
            where: {
                employeeId: req.id
            }
        })
        if (data.length == 0) {
            res.send("you have not task")
        } else {
            res.send(data)
        }
    } catch (error) {
        res.send(error)
    }

}

const assignEmployeeInTask = async (req, res) => {
    try {
        const { startDate, endDate, taskId, taskEmployeeId } = req.body
        const emp = await employeeTasks.create({ startDate, endDate, taskId, taskEmployeeId })
        if (emp && emp.id) {
            res.send("msg : employee is in task.")
        } else {
            res.send("msg : employee not save.")
        }

    } catch (error) {
        res.send(error)
    }

}




const getApproveTask = async (req, res) => {
    try {

        const task = await tasks.findAll({
            where: {
                apporvalStatus: "approve"
            }
        })
        if (task.length == 0) {
            res.send("msg : no any task approve.")
        } else {
            res.send(task)
        }
    } catch (error) {
        res.send(error)
    }

}



const taskApprove = async (req, res) => {
    try {

        const managerId = req.id
        const taskId = req.body.taskId
        const task = await tasks.findOne({
            where: {
                id: taskId
            }
        })
        if (task && task.id) {
            const result = await taskUpdate(task, managerId)
            if (result == 1) {
                res.send("task approved.")
            } else {
                res.send("task update error.")
            }
        }
    } catch (error) {
        res.send(error)
    }

}

const taskUpdate = async (task, managerId) => {
    const updateData = await tasks.update({ updatedBy: managerId, apporvalStatus: "approve" }, {
        where: {
            id: task.id
        }
    })
    return updateData
}

const createTask = async (req, res) => {
    try {
        const taskStatus = req.taskStatus
        const apporvalStatus = req.apporvalStatus
        const createdBy = req.createdBy
        const employeeId = req.employeeId
        const { name, description, projectId, startDate, endDate, estimateHours } = req.body
        const data = { name, description, projectId, startDate, endDate, estimateHours, taskStatus, apporvalStatus, createdBy, employeeId }
        const task = await tasksSaver(data, req)
        if (task && task.id) {
            res.send(task)
        } else {
            res.send("taskSaver error.")
        }
    } catch (error) {
        res.send(error)
    }

}

module.exports = { createTask, taskApprove, taskTeam, getApproveTask, myAllTask, assignEmployeeInTask }