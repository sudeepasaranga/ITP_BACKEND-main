const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({

    itemId: { type: Number, required: false, unique: true, index: true },
    itemName : { type : String, required : true },
    itemCategory : { type : String, required : true },
    Material : { type : String, required : true },
    price : { type : String, required : true },
    stockStatus : { type : String, required : true },
    itemDescription : { type : String, required : true },
    image: { type : String, required : true}

},{
    timestamps: true
}); 

// Pre-save middleware to auto-increment itemId
itemSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const lastItem = await Item.findOne({}, {}, { sort: { 'itemId': -1 } });
        this.itemId = lastItem ? lastItem.itemId + 1 : 1;
        next();
    } catch (error) {
        return next(error);
    }
});

 const Item = mongoose.model('Item',itemSchema);
 module.exports = Item;
