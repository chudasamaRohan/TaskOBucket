const express = require("express")
const bodyparser = require("body-parser")
const userRoutes = require("./routes/userRoutes")
const projectRoutes = require("./routes/projectRoutes")
const taskRoutes = require("./routes/taskRoutes")
const commentRoutes = require("./routes/commentRoutes")
require("dotenv").config()
const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))


app.use("/user", userRoutes)
app.use("/project", projectRoutes)
app.use("/task", taskRoutes)
app.use("/comment", commentRoutes)

app.listen(process.env.PORT, (error) => {
    if (error) {
        res.send(error)
    }
    console.log("server connected.");
})
