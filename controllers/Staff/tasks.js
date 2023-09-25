const router = require('express').Router();
let Task = require('../../models/StaffModel/EmployeeTasks.model');

/* GET all employee Tasks .('http://localhost:8081/api/staff/tasks/getallemployeetasks')  */
router.get('/getallemployeetasks',async(req,res)=>{
    try{
        const task = await Task.find();
        res.json(task);
    }catch(err){
        console.log("Error "+err);
    }
});

// Add New .('http://localhost:8081/api/staff/tasks/assigntask')

router.route("/assigntask").post((req,res)=>{

    // const employeeTaskId = Number(req.body.employeeTaskId);
    const employeeName = req.body.employeeName;
    const taskName = req.body.taskName;
	const description = req.body.description;
    const assignDates = req.body.assignDates;

    const newTask = new Task({

        // employeeTaskId, 
        employeeName,
        taskName,
        description,
        assignDates
    })

    newTask.save()  
    .then(()=>{res.json("Successfully Assign New Task !") //Task added status
    }).catch(err => res.status(400).json('Error: ' + err));  //display err
});

//  update .('http://localhost:8081/api/staff/tasks/updatetask')
router.route('/updatetask/:id').put((req, res) => {
    const id = req.params.id;
    Task.findByIdAndUpdate(id)
        .then(task => {
            if (!task) {
                return res.status(404).json('Employee Task details not found');
            }
            // task.employeeTaskId = Number(req.body.employeeTaskId);
            task.employeeName = req.body.employeeName;
            task.taskName = req.body.taskName;
			task.description = req.body.description;
            task.assignDates = req.body.assignDates;

            task.save()
                .then(() => res.json('Employee task details updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


//Remove   ('http://localhost:8081/api/staff/tasks/removetask')

router.route('/removetask/:id').delete((req, res) => { 
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json(' Successfully remove !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//view one ('http://localhost:8081/api/staff/tasks/gettaskbyid')

router.route('/gettaskbyid/:id').get((req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;