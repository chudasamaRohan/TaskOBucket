const { createTask } = require("../controller/taskController")
const db = require("../model/index")
const users = db.users
const projects = db.projects
const tasks = db.tasks




const employeeInproject = async (req, res) => {
    try {

        const projectId = req.body.projectId
        const data = await db.employee.findAll({
            where: {
                projectId: projectId
            },
            include: { model: users, attributes: ['userName', 'contact', 'designation'] },

        })
        if (data.length == 0) {
            res.send("employee not assign.")
        } else {
            res.send(data)
        }
    } catch (error) {
        res.send(error)
    }
}

const checkTaskBycreator = async (req, res, next) => {
    try {

        const taskId = req.body.taskId
        const taskdata = await tasks.findOne({
            where: {
                id: taskId, createdBy: req.id
            }
        })
        if (taskdata && taskdata.id) {
            next()
        } else {
            res.send("this task is not createdBy you or not available.")
        }
    } catch (error) {
        res.send(error)
    }

}

const checkTaskCreator = async (req, res, next) => {
    const createdBy = req.id
    const creator = await tasks.findOne({ where: { createdBy: createdBy } })
    if (creator && creator.id) {
        next()
    } else {
        res.send("no any one task that created By you.")
    }
}


const checkProject = async (req, res, next) => {
    const projectId = req.body.projectId
    try {

        const pro = await projects.findOne({
            where: {
                id: projectId
            }
        })
        if (pro && pro.id) {
            req.projectData = pro
            next()
        } else {
            res.send("in valid project id.")
        }
    } catch (error) {
        res.send(error)
    }

}






const checkRole = async (req, res, next) => {
    const loginId = req.id
    const userRole = req.role
    try {
        if (userRole == "manager") {
            req.taskStatus = "ongoing",
                req.apporvalStatus = 'approve'
            req.createdBy = req.id
            next()
        } else if (userRole == 'employee') {
            req.taskStatus = 'pending'
            req.apporvalStatus = 'pending'
            req.employeeId = req.id
            req.createdBy = req.id
            next()
        }
    } catch (error) {
        res.send(error)
    }

}



const employeeAvailable = async (req, res, next) => {
    try {

        const requirStartDate = req.body.startDate
        const requirEndDate = req.body.endDate
        const emp = req.body.employeeId
        const employee = await db.employee.findOne({
            where: {
                employeeId: emp
            },
            order: [['createdAt', 'DESC']],
            limit: 1
        })
        if (employee == null) {
            next()
        } else if (employee && employee.id) {
            const result = await dateCalculation(employee, requirStartDate, requirEndDate)
            console.log("result", result);
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



const dateCalculation = async (data, requirStartDate, requirEndDate) => {
    const compareStartDate = new Date(requirStartDate)
    const compareEndDate = new Date(requirEndDate)
    if (compareStartDate >= data.startDate && compareStartDate <= data.endDate) {
        return false
    } else if (compareStartDate >= compareEndDate) {
        return false
    } else {
        return true
    }
}




const checkManager = async (req, res, next) => {
    try {

        const managerId = req.id
        const manager = await users.findOne({
            where: {
                id: managerId, role: "manager"
            }
        })
        if (manager && manager.id) {
            next()
        } else {
            res.send("MANAGER CAN ACCES THIS API.")
        }
    } catch (error) {
        res.send(error)
    }

};
const checkUserById = async (req, res, next) => {
    const employeeId = req.body.employeeId
    const employee = await users.findOne({
        where: {
            id: employeeId,
            role: 'employee'
        }
    })
    if (employee && employee.id) {
        req.employeeData = employee
        next()
    } else {
        res.send("checkuserById error.")
    }
}



const checkUserAvailable = async (req, res, next) => {
    const { email, currentPassword } = req.body
    try {
        const user = await users.findOne({
            where: {
                email: email
            }
        })
        if (user && user.id) {
            req.userData = user
            next()
        } else {
            res.send("user not found.")
        }
    } catch (error) {
        res.send(error)
    }

}

const checkUser = async (req, res, next) => {
    const email = req.userData.email
    try {
        const result = await users.findOne({
            where: {
                email: email
            }
        })
        if (result && result.id) {
            res.send("you are allready registered.")
        } else {
            next()
        }
    } catch (error) {
        res.send(error)
    }


}

module.exports = { checkUser, checkUserAvailable, checkTaskBycreator, dateCalculation, checkManager, checkUserById, employeeAvailable, checkRole, checkProject, checkTaskCreator, employeeInproject }