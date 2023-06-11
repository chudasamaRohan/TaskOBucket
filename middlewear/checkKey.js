const checkKey = async (obj) => {
    for (let key in obj) {
        if (obj[key] === undefined) {
            return false;
        }
    }
    return true;
}

const checkKeyAssignEmployeeTssk = async (req, res, next) => {
    try {

        const { taskId, taskEmployeeId, startDate, endDate } = req.body
        const obj = { taskId, taskEmployeeId, startDate, endDate }
        const result = await checkKey(obj)
        if (result) {
            next()
        } else {
            res.status(400).send("plz enter required filled.")
        }
    } catch (error) {
        res.send(error)
    }

}
const checkTaskCreateKey = async (req, res, next) => {
    const { name, description, projectId, startDate, endDate, estimateHours } = req.body
    const obj = { name, description, projectId, startDate, endDate, estimateHours }
    try {
        const result = await checkKey(obj)
        if (result) {
            next()
        } else {
            res.status(400).send("plz enter required filled.")
        }

    } catch (error) {
        res.send(error)
    }

}

const checkGetEmployeKey = async (req, res, next) => {
    try {

        const { employeeId, projectId, startDate, endDate } = req.body
        const obj = { employeeId, projectId, startDate, endDate }
        const result = await checkKey(obj)
        if (result) {
            next()
        } else {
            res.status(400).send("plz enter required filled.")
        }
    } catch (error) {
        res.send(error)
    }

}

const checkProjectKey = async (req, res, next) => {
    try {

        const { projectName, description } = req.body
        const obj = { projectName, description }
        const result = await checkKey(obj)
        if (result) {
            next()
        } else {
            res.status(400).send("plz enter requied filled.")
        }
    } catch (error) {
        res.send(error)
    }

}

const checkLoginKey = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const obj = { email, password }
        const result = checkKey(obj)
        if (result) {
            next()
        } else {
            res.send("enter email and password.")
        }

    } catch (error) {
        res.send(error)
    }

}


const checkPasswordakey = async (req, res, next) => {
    const { newPassword, currentPassword } = req.body
    const obj = { newPassword, currentPassword }
    try {
        const result = checkKey(obj)
        if (result) {
            next()
        } else {
            res.send("messege : enter all required value.")
        }
    } catch (error) {
        res.send(error)
    }

}


const checkRegistarionKey = async (req, res, next) => {
    const { userName, email, password, contact, role, designation } = req.body
    const obj = { userName, email, password, contact, role, designation }
    try {
        const result = await checkKey(obj)
        if (result) {
            req.userData = obj
            next()
        } else {
            res.status(400).send("plz enter all required.")
        }
    } catch (error) {
        res.send(error)
    }
}


module.exports = { checkRegistarionKey, checkPasswordakey, checkLoginKey, checkProjectKey, checkKeyAssignEmployeeTssk, checkGetEmployeKey, checkTaskCreateKey }