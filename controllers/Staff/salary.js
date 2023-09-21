const router = require('express').Router();
let Salary = require('../../models/StaffModel/salary.model');

/* GET all employee salary details .('http://localhost:8081/api/staff/salary/getall')  */
router.get('/getall',async(req,res)=>{
    try{
        const salary = await Salary.find();
        res.json(salary);
    }catch(err){
        console.log("Error "+err);
    }
});

// router.post('/search',async(req,res)=>{
//     try{
//         const s = await Salary.find({employeeId:{$regex:req.body.id,$options:'i'}});
//         res.json(s);
//     }catch(err){
//         console.log("Error "+err);
//     }
// });

// Add New .('http://localhost:8081/api/staff/salary/addnew')

router.route("/addnew").post((req,res)=>{

    const employeeId = Number(req.body.employeeId);
    const employeeName = req.body.employeeName;
    const position = req.body.position;
	const basicSalary = req.body.basicSalary;
    const month = req.body.month;
	const advancePayment = req.body.advancePayment;
	const overtimePayment = req.body.overtimePayment;
	const totalPayment = req.body.totalPayment;
    const perDaySalary = req.body.perDaySalary;
	const totalDays = req.body.totalDays;

    const newSalary = new Salary({
        employeeId, 
        employeeName,
        position,
        basicSalary,
        month,
        advancePayment,
        overtimePayment,
        totalPayment,
        perDaySalary,
        totalDays
    })

    newSalary.save()  
    .then(()=>{res.json("Successfully Added !") //Salary added status
    }).catch(err => res.status(400).json('Error: ' + err));  //display err
});

//  update .('http://localhost:8081/api/staff/salary/updatesalary')
router.route('/updatesalary/:id').put((req, res) => {
    const id = req.params.id;

    Salary.findByIdAndUpdate(id)
        .then(salary => {
            if (!salary) {
                return res.status(404).json('Employee Salary details not found');
            }

            salary.employeeId = Number(req.body.employeeId);
            salary.employeeName = req.body.employeeName;
            salary.position = req.body.position;
			salary.basicSalary = req.body.basicSalary;
            salary.month = req.body.month;
			salary.advancePayment = req.body.advancePayment;
			salary.overtimePayment = req.body.overtimePayment;
			salary.totalPayment = req.body.totalPayment;
            salary.perDaySalary = req.body.perDaySalary;
            salary.totalDays = req.body.totalDays;
            salary.save()
                .then(() => res.json('Salary details updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


//Remove   ('http://localhost:8081/api/staff/salary/remove')

router.route('/remove/:id').delete((req, res) => { 
    Salary.findByIdAndDelete(req.params.id)
        .then(() => res.json(' Successfully remove !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//view one ('http://localhost:8081/api/staff/salary/getonebyid')

router.route('/getonebyid/:id').get((req, res) => {
    Salary.findById(req.params.id)
        .then(salary => res.json(salary))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
