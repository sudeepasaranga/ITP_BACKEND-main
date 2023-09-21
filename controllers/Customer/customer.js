const jwt = require('jsonwebtoken');
const router = require("express").Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const authCustomer = require("../../middleware/authCustomer");
let CUSTOMER = require("../../models/CustomerModel/customer.model");
const Customer = require('../../models/CustomerModel/customer.model');

/* GET all customers.('http://localhost:8081/api/customer/customer/getallcustomers')  */
router.route('/getallcustomers').get((req, res) => {
    Customer.find()
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' + err));
});

//register. ('http://localhost:8081/api/customer/customer/signup')

router.post('/signup', async(req,res) =>{
  const {firstName,lastName,email,password,confirmPassword} = req.body;

    if( !firstName || !lastName|| !email || !password || !confirmPassword){
        return res.status(422).json({error:"Plz filled the field properly"});
    }
    try{
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        const patientImp = await CUSTOMER.findOne({email:email});

        if(patientImp){
            return res.status(422).json({error:"Email already Exist"});

        }else if (password !== confirmPassword) {

            return res.status(422).json({error:"Password are not matching"});
        } else{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        
        const customer = new CUSTOMER({firstName,lastName,email,password,confirmPassword});

        await customer.save()
        .then(customer=>{

            res.status(201).json({message:"Thanks for signing up !!"});

        })
        .catch(err=>{
            console.log(err)
        })
    }

    }catch(err){
        console.log(err);
    }
});
    
//Login route ('http://localhost:8081/api/customer/customer/login')
router.post('/login', async(req,res) =>{

    try{
            let token;
            const {email, password} = req.body;

            if(!email || !password){
                return res.status(400).json({error:" Plz! Filled the data"});
            }

            const customerLogin = await CUSTOMER.findOne({email:email});

        if(customerLogin ){

            const isMatch = await bcrypt.compare(password, customerLogin.password);
            
            const  token  = await customerLogin.generateAuthToken(); //see thsis
                console.log(token);

                res.cookie('jwtoken', token, {
                    expires:new Date(Date.now() + 25892000000),
                    httpOnly: true
                });

            if(!isMatch){

            res.status(400).json({error: "Invalid password!"});

            }else{

            res.json({message: "Login successfully!!"})
            }

         } else{

            res.status(400).json({error: "Invalid credentials !"});
        }

    }catch(err){
        console.log(err);
    }
});

//Remove Customer ('http://localhost:8081/api/customer/customer/removecustomer')

router.route('/removecustomer/:id').delete((req, res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(() => res.json(' Successfully remove customer from the system !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//view one ('http://localhost:8081/api/customer/customer/getcustomerbyid')

router.route('/getcustomerbyid/:id').get((req, res) => {
    Customer.findById(req.params.id)
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Get Data 
// router.route('/:id').get((req, res) => {
//     Exercise.findById(req.params.id)
//         .then(exercise => res.json(exercise))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

//Delete Data

// router.route('/:id').delete((req, res) => {
//     Exercise.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Customer deleted.'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });


// Update data
// router.route('/update/:id').post((req, res) => {
//     Exercise.findById(req.params.id)
//         .then(exercise => {
//             exercise.username = req.body.username;
//             exercise.Address = req.body.Address;
//             exercise.Phone = Number(req.body.Phone);
//             exercise.birthday = Date.parse(req.body.birthday);
//             exercise.Gender = req.body.Gender;
//             exercise.Email = req.body.Email;
//             exercise.password = req.body.password;


//             exercise.save()
//                 .then(() => res.json('Customer updated!'))
//                 .catch(err => res.status(400).json('Error: ' + err));
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// });


module.exports = router;