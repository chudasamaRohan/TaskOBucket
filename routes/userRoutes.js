const express = require("express")
const { checkRegistarionKey, checkPasswordakey, checkLoginKey } = require("../middlewear/checkKey")
const { userRegister, userLogin, changePassword, updateUser } = require("../controller/userController")
const { checkUser, checkUserAvailable } = require("../middlewear/chekar")
const { authgaurd } = require("../authgaurd")
const { createComments } = require("../controller/commentController")
const userRoutes = express.Router()

userRoutes.post("/register", checkRegistarionKey, checkUser, userRegister)
userRoutes.post("/login", checkLoginKey, userLogin)
userRoutes.post("/changePassword", checkPasswordakey, checkUserAvailable, changePassword)
// userRoutes.post("/update", authgaurd, updateUser)
// userRoutes.post("/forgotPassword", )


userRoutes.post("/createDiscuss", authgaurd, createComments)


module.exports = userRoutes
