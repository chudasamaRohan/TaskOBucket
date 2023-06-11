const db = require("../model/index")
const { dateCalculation } = require("./chekar")
const tasks = db.tasks
const employeeTask = db.employeeTasks


const checkemployeeAvailable = async (req, res, next) => {
    try {
        const requirStartDate = req.body.startDate
        const requirEndDate = req.body.endDate
        const taskId = req.body.taskId
        const taskEmployeeId = req.body.taskEmployeeId
        const employee = await employeeTask.findOne({
            where: {
                taskEmployeeId: taskEmployeeId
            },
            order: [['createdAt', 'DESC']],
            limit: 1
        })
        if (employee == null) {
            next()
        } else if (employee && employee.id) {
            const result = await dateCalculation(employee, requirStartDate, requirEndDate)
            if (result) {
                next()
            } else if (!result) {
                res.send("at this date employee busy.")
            }
        }
    } catch (error) {
        res.send(error)
    }

}


module.exports = { checkemployeeAvailable }