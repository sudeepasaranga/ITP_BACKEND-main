const jwt = require("jsonwebtoken");
const EMPLOYEE = require("../models/StaffModel/staff.model");

const authEmployee = async (req, res, next) => {

    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token,'MYNAMEISFURNITUREMANAGEMENTSTORESRILANK');

        const rootEmployee = await EMPLOYEE.findOne({ _id: verifyToken._id, "tokens.token":token});

        if(!rootEmployee) { throw new Error('User not found')}

        req.token = token;
        req.rootEmployee = rootEmployee;
        req.employeeID = rootEmployee._id;

        next();

    }catch(err){
        res.status(401).send('Unauthorized: No token provided');
        console.log(err);
    }

}
module.exports = authEmployee;