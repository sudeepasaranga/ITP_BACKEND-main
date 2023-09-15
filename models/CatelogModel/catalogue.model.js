const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catalogueSchema = new Schema({

    catalogueId: { type: Number, required: false, unique: true, index: true },
    categoryName : { type : String, required : true },
    description : { type : String, required : true },
    itemVariations : { type : String, required : true },

},{
    timestamps: true
}); 

// Pre-save middleware to auto-increment catalogueId
catalogueSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const lastCategory = await Catalogue.findOne({}, {}, { sort: { 'catalogueId': -1 } });
        this.catalogueId = lastCategory ? lastCategory.catalogueId + 1 : 1;
        next();
    } catch (error) {
        return next(error);
    }
});

 const Catalogue = mongoose.model('Catalogue',catalogueSchema);
 module.exports = Catalogue;