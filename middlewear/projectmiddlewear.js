const db = require("../model/index")
const projects = db.projects

const checkProjectBycreator = async (req, res, next) => {
    const { projectId, managerId } = req.body

    const project = await projects.findOne({
        where: {
            id: projectId, managerId: req.id
        }
    })
    if (project && project.id) {
        req.projectData = project
    } else {
        res.send("msg : you can delete only that project was created by you or project not available.")
    }
}

module.exports = checkProjectBycreator