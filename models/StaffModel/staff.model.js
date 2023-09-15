const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    empId : { type: Number, required: false, unique: true, index: true },
    empfirstName: { type: String, required: true },
    empLastName: { type: String, required: true },
    empEmail: { type: String, required: true, match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, },
    empContactNumber: {  type: String,  required: true, maxLength: 10 },
    Gender: { type: String, required: true },
    Position: { type: String, required: true },
    joinedDate: { type: Date, required: true },
    

}, {
    timestamps: true,
});

// Pre-save middleware to auto-increment empId
employeeSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const lastEmployee = await Employee.findOne({}, {}, { sort: { 'empId': -1 } });
        this.empId = lastEmployee ? lastEmployee.empId + 1 : 1;
        next();
    } catch (error) {
        return next(error);
    }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;