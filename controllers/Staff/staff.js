const router = require('express').Router();
let Employee = require('../../models/StaffModel/staff.model');

/* GET all employees.('http://localhost:8081/api/staff/staff/getallemployees')  */

router.route('/getallemployees').get((_req, res) => {
    Employee.find()
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add New Employee. ('http://localhost:8081/api/staff/staff/addnewemployee')

router.route("/addnewemployee").post((req,res)=>{

    const empfirstName = req.body.empfirstName;
    const empLastName = req.body.empLastName;
    const empEmail = req.body.empEmail;
    const empContactNumber = Number(req.body.empContactNumber);
	const Gender = req.body.Gender;
    const Position = req.body.Position;
    const joinedDate = Date.parse(req.body.joinedDate);

	

    const newEmployee = new Employee({
        empfirstName, 
        empLastName,
        empEmail,
        empContactNumber,
        Gender,
        Position,
        joinedDate,
    })

    newEmployee.save()  
    .then(()=>{res.json("Successfully add new employee !") //Employee added status
    }).catch(err => res.status(400).json('Error: ' + err));  //display err
});

// Update Employee details ('http://localhost:8081/api/staff/staff/updateemployee')
router.route('/updateemployee/:id').put((req, res) => {
    const empId = req.params.empId;

    Employee.findOneAndUpdate(empId)
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
    Employee.findOneAndDelete(req.params.empId)
        .then(() => res.json(' Successfully remove employee from the system !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//view one employee details ('http://localhost:8081/api/staff/staff/getemployeebyid')

router.route('/getemployeebyid/:id').get((req, res) => {
    Employee.findOne(req.params.empId)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;