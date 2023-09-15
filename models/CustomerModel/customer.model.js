const jwt = require('jsonwebtoken');
const mongoose =require('mongoose');
const bcrypt  = require('bcryptjs');
const Schema = mongoose.Schema;

const customerSchema =new Schema({

    customerid : { type:Number, required:false, unique: true, index: true },
    firstName : {type : String,  required:true },
    lastName : {type : String,  required:true },
    email : {  type : String, required:true },
    password :{type : String, required : true, },
    confirmPassword : {type: String, required: true },
    resetToken:{
            String,
            expireToken:Date,
    },
    tokens: [
        {
            token : {
                type : String,
                required: true
            }
        }
    ]

});

// Pre-save middleware to auto-increment customerid
customerSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const lastCustomer = await Customer.findOne({}, {}, { sort: { 'customerid': -1 } });
        this.customerid = lastCustomer ? lastCustomer.customerid + 1 : 1;
        next();
    } catch (error) {
        return next(error);
    }
});

//Hashing Password

customerSchema.pre('save', async function (next){
    console.log("Hi I am pre");
    if(this.isModified('password')){
        console.log("Hi I am pre password");
        this.password = await bcrypt.hash(this.password,6);
       
    }
    next();
});


// Generate token with  secret key
customerSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, 'MYNAMEISFURNITUREMANAGEMENTSTORESRILANKA');
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer; //Export 



