const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../model/index")
const { userSaver, loginService } = require("../services/userServices")
const users = db.users
const employess = db.employee

const updateUser = async(req,res) => {
    const updateId = req.id
    const {userName,email,contact,password,designation} = req.body
    
   const data = await users.update(
        { title: 'a very different title now' },
        { where: { _id: 1 } }
      )
}


const employeeSaver = async (req, res) => {
    try {

        const { startDate, endDate, projectId, employeeId } = req.body
        const emp = await db.employee.create({ startDate, endDate, projectId, employeeId })
        if (emp && emp.id) {
            res.send("msg : employee is in project.")
        } else {
            res.send("msg : employee not save.")
        }
    } catch (error) {
        res.send(error)
    }

}


const changePassword = async (req, res) => {
    const { newPassword, currentPassword } = req.body
    const userId = req.userData.id
    const userPassword = req.userData.password
    try {
        const isValidPassword = await bcrypt.compare(currentPassword, userPassword)
        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid current password' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateData = await users.update({ password: hashedPassword, updatedBy: userId }, { where: { id: userId } })
        if (updateData == 1) {
            res.status(200).send("password updated.")
        }
    } catch (error) {
        res.send(error)
    }

}



const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const loginData = { email, password }
        const user = await loginService(loginData, res)
    } catch (error) {
        res.send(error)
    }
}




const userRegister = async (req, res) => {
    const useradata = req.userData

    try {
        const user = await userSaver(useradata)
        if (user && user.id) {
            res.send({ messege: "registraion succesfully." })
        } else {
            res.send(user)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { userRegister, userLogin, changePassword, employeeSaver }