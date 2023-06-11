const db = require("../model/index")
const employess = db.employess

const checkAvailibility = async (req, res, next) => {
    const userData = req.userData
    const employ = await employess.findOne({
        where: {
            id: userData.id
        }, order: [['createdAt', 'DESC']]
    })
    if (employ.length == 0) {
        next()
    } else {
        const employeeData = checkDate(employ, req)
    }
}

const checkDate = async (data, req) => {
    const requireStartDate = req.body.startDate
    const requireEnddate = req.body.enddate
    const userData = data
    if (requireStartDate >= userData[0].startDate && requireStartDate <= userData[0].enddate) {
        res.send("at this date employee is allready other side working.")
    } else if (requireEnddate < requireStartDate) {
        res.send("messege  : plz check you date.")
    } else {

    }


}