const db = require("../model/index")
const projects = db.projects

const deleteProject = async (req,res) => {
    const projectData = req.projectData
    const result = await projectDelete(projectData,)
}




const createproject = async (req, res) => {
    const { projectName, description } = req.body
    const managerId = req.id
    try {

        const projectdata = await projects.create({ projectName, description, managerId })
        if (projectdata && projectdata.id) {
            res.send("project created succesfully.")
        }
    } catch (error) {
        res.send(error)
    }
}


module.exports = { createproject }