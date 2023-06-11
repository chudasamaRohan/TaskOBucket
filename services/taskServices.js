const db = require("../model/index")
const tasks = db.tasks

const tasksSaver = async (data, req) => {
    if (req.role == "manager") {
        data.employeeId = null
    } else if (req.role == "employee") {
        data.employeeId = req.id
    }
    const task = await tasks.create(data)
    return task
}

module.exports = { tasksSaver }