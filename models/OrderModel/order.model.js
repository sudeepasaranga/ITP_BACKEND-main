const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    orderId : { type:Number, required:false, unique: true, index: true },
    customerId :  { type:Number, required:true, unique: true},
    customerName : { type:String, required:true},
    orderDate :{ type:Date, required: true },
    totalCost :{ type:String, required: true },
    orderItems :{ type:String, required: true },
    odrerStatus : { type:String, required: true },

});

// Pre-save middleware to auto-increment orderId
orderSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const lastOder = await Order.findOne({}, {}, { sort: { 'orderId': -1 } });
        this.orderId = lastOder ? lastOder.orderId + 1 : 1;
        next();
    } catch (error) {
        return next(error);
    }
});


const Order = mongoose.model('Order',orderSchema);
module.exports = Order;