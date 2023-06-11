const db = require("../model/index")
const users = db.users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSaver = async (data) => {
    const user = await users.create(data)
    if (user && user.id) {
        user.createdBy = user.id
        user.save()
        return user
    } else {
        return ({ error: "userSaver error." })
    }
}
const loginService = async (data, res) => {
    try {
        const user = await users.findOne({ where: { email: data.email } });
        if (user) {
            const password_valid = await bcrypt.compare(data.password, user.password);
            if (password_valid) {
                token = jwt.sign({ "id": user.id, "email": user.email, "role": user.role, "designation": user.designation }, process.env.SECRET);
                res.status(200).json({ token: token });
            } else {
                res.status(400).json({ error: "Password Incorrect" });
            }
        } else {
            res.status(404).json({ error: "user not found" });
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = { userSaver, loginService }