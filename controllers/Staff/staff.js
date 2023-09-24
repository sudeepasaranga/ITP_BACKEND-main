const jwt = require('jsonwebtoken');
const router = require("express").Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const authEmployee = require("../../middleware/authEmployee");
let EMPLOYEE = require("../../models/StaffModel/staff.model");
const Employee = require('../../models/StaffModel/staff.model');

/* GET all employees.('http://localhost:8081/api/staff/staff/getallemployees')  */

router.route('/getallemployees').get((_req, res) => {
    Employee.find()
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Add New Member. ('http://localhost:8081/api/staff/staff/addnewemployee')

router.post('/addnewemployee', async(req,res) =>{
    const {empfirstName,empLastName,empEmail,empPassword,empConfirmPassword,empContactNumber, Gender, Position, joinedDate} = req.body;
  
      if( !empfirstName || !empLastName|| !empEmail || !empPassword || !empConfirmPassword || !empContactNumber || !Gender || !Position || !joinedDate){
          return res.status(422).json({error:"Plz filled the field properly"});
      }
      try{
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
          const patientImp = await EMPLOYEE.findOne({empEmail:empEmail});
  
          if(patientImp){
              return res.status(422).json({error:"Email already Exist"});
  
          }else if (empPassword !== empConfirmPassword) {
  
              return res.status(422).json({error:"Password are not matching"});
          } else{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
          
          const employee = new EMPLOYEE({empfirstName,empLastName,empEmail,empPassword,empConfirmPassword,empContactNumber, Gender, Position, joinedDate});
  
          await employee.save()
          .then(employee=>{
  
              res.status(201).json({message:"Successfully add new member !!"});
  
          })
          .catch(err=>{
              console.log(err)
          })
      }
  
      }catch(err){
          console.log(err);
      }
  });
      
  //Login route ('http://localhost:8081/api/staff/staff/adminlogin')
  router.post('/adminlogin', async(req,res) =>{
  
      try{
              let token;
              const {empEmail, empPassword} = req.body;
  
              if(!empEmail || !empPassword){
                  return res.status(400).json({error:" Plz! Filled the data"});
              }
  
              const employeeLogin = await EMPLOYEE.findOne({empEmail:empEmail});
              //console.log(userLogin);
  
          if(employeeLogin ){
  
              const isMatch = await bcrypt.compare(empPassword, employeeLogin.empPassword);
              
              const  token  = await employeeLogin.generateAuthToken(); //see thsis
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

  // Create a logout route ('http://localhost:8081/api/staff/staff/adminlogout')
router.post('/adminlogout', authEmployee, async (req, res) => {
    try {
        req.rootEmployee.tokens = req.rootEmployee.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.rootEmployee.save();
    
          res.clearCookie('jwtoken'); // Clear the cookie
          res.status(200).json({ message: 'Logout successful' });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
  });

// Update Employee details ('http://localhost:8081/api/staff/staff/updateemployee')
router.route('/updateemployee/:id').put((req, res) => {
    const id = req.params.id;

    Employee.findByIdAndUpdate(id)
        .then(employee => {
            if (!employee) {
                return res.status(404).json('Employee not found');
            }

            employee.empfirstName = req.body.empfirstName;
            employee.empLastName = req.body.empLastName;
            employee.empEmail = req.body.empEmail;
			employee.empContactNumber = Number(req.body.empContactNumber);
            employee.Gender = req.body.Gender;
			employee.Position = req.body.Position;
			employee.joinedDate = Date.parse(req.body.joinedDate);
            employee.save()
                .then(() => res.json('Employee details updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Remove Employee ('http://localhost:8081/api/staff/staff/removeemployee')

router.route('/removeemployee/:id').delete((req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json(' Successfully remove employee from the system !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//view one employee details ('http://localhost:8081/api/staff/staff/getemployeebyid')

router.route('/getemployeebyid/:id').get((req, res) => {
    Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;