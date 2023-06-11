const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config
const db = require("./model/index")
const users = db.users


const authgaurd = async (req, res, next) => {
    try {

        let token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send({
                message: "No token provided!"
            });
        }
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            req.id = decoded.id
            req.email = decoded.email
            req.role = decoded.role
            next();
        });
    } catch (error) {
        res.send(error)
    }

}

const login = async (loginData) => {
    const user = await users.findOne({ where: { email: loginData.email } });
    if (user) {
        const password_valid = await bcrypt.compare(loginData.password, user.password);
        if (password_valid) {
            token = jwt.sign({ "id": user.id, "email": user.email, "role": user.role, "designation": user.designation }, process.env.SECRET);
            return ({ token: token })
        } else {
            return ({ error: "Password Incorrect" })
        }
    } else {
        return ({ error: "email ID does not exits." })
    }
}

module.exports = { authgaurd, login }