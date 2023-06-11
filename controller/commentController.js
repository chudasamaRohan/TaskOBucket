const db = require("../model/index")
const comments = db.comments


const createComments = async (req, res) => {
    const { taskId, comment } = req.body
    const employeeCommentId = req.id
    try {
        const cmt = await comments.create({ taskId, comment, employeeCommentId })
        if (cmt && cmt.id) {
            res.send(cmt)
        } else {
            res.send(cmt)
        }
    } catch (error) {
        res.send(error)
    }

}

module.exports = { createComments }