const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salarySchema = new Schema({

    salaryId: { type:Number, required:false, unique: true, index: true },
    employeeId: { type: Number,  required: true, unique: true},
    employeeName: { type: String, required: true},
    position: { type: String, required: true},
    basicSalary: { type: String, required: true},
    month: { type: String, required: true },
    advancePayment: { type: String, required: true },
    overtimePayment: { type: String, required: true },
    totalPayment: { type: String, required: true },
    perDaySalary: { type: String, required: true},
    totalDays: { type: String, required: true },
});


// Pre-save middleware to auto-increment salaryId
salarySchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const lastSalary = await Salary.findOne({}, {}, { sort: { 'salaryId': -1 } });
        this.salaryId = lastSalary ? lastSalary.salaryId + 1 : 1;
        next();
    } catch (error) {
        return next(error);
    }
});

const Salary = mongoose.model('Salary',salarySchema);
module.exports = Salary;
