const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({

    itemName : { type : String, required : true },
    price : { type : String, required : true },
    itemDescription : { type : String, required : true },
    image: { type : String, required : true},
    quantity: {type : Number, required: true},

},{
    timestamps: true
}); 


 const Cart = mongoose.model('Cart',cartSchema);
 module.exports = Cart;
