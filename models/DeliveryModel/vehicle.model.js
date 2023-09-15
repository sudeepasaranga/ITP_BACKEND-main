const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    vehicleId: { type: Number, required: false, unique: true, index: true },
    vehicleType : { type : String, required : true },
	vehicleModel : { type : String, required : true },
    vehicleNo : { type : String, required : true, unique: true},
    Year : { type : Number, required : true},
	mileage: { type : Number, required : true},
    nextServiceReminder : { type: Date, required: true },
},{
    timestamps: true
}); 

// Pre-save middleware to auto-increment inquiryId
vehicleSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const lastVehicle = await Vehicle.findOne({}, {}, { sort: { 'vehicleId': -1 } });
        this.vehicleId = lastVehicle ? lastVehicle.vehicleId + 1 : 1;
        next();
    } catch (error) {
        return next(error);
    }
});

 const Vehicle = mongoose.model('Vehicle',vehicleSchema);
 module.exports = Vehicle;




// const mongoose = require('mongoose');

// const VehicleModel = new mongoose.Schema({
// 	_id: mongoose.ObjectId,
// 	vehicleID: String,
// 	vehicleLicenseNO: String,
// 	mileage: String,
// 	nextServiceReminder: Date,

// });
// VehicleModel.index({'$**': 'text'});

// module.exports = VehicleModel;
