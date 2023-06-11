const express = require("express")
const { authgaurd } = require("../authgaurd")
const { createComments } = require("../controller/commentController")
const commentRoutes = express.Router()

commentRoutes.post("/createDiscuss", authgaurd, createComments)



module.exports = commentRoutes