const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeTaskSchema = new Schema({

    employeeTaskId: { type:Number, required:false, unique: true, index: true },
    employeeName: { type: String, required: true},
    taskName: { type: String, required: true},
    description: { type: String, required: true},
    assignDates: { type: String, required: true },
});


// Pre-save middleware to auto-increment employeeTaskId
employeeTaskSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const lastTask = await Task.findOne({}, {}, { sort: { 'employeeTaskId': -1 } });
        this.employeeTaskId = lastTask ? lastTask.employeeTaskId + 1 : 1;
        next();
    } catch (error) {
        return next(error);
    }
});

const Task = mongoose.model('Task',employeeTaskSchema);
module.exports = Task;