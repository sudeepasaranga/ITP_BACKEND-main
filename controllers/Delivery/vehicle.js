const router = require("express").Router();
const Vehicle = require('../../models/DeliveryModel/vehicle.model');

/* GET all vehicles.('http://localhost:8081/api/delivery/vehicle/getallvehicles')  */

router.route('/getallvehicles').get((_req, res) => {
    Vehicle.find()
        .then(vehicle => res.json(vehicle))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Add New Vehicle. ('http://localhost:8081/api/delivery/vehicle/addnewvehicle')

router.route("/addnewvehicle").post((req,res)=>{

    const vehicleType = req.body.vehicleType;
    const vehicleModel = req.body.vehicleModel;
    const vehicleNo = req.body.vehicleNo;
    const Year = Number(req.body.Year);
    const mileage = Number(req.body.mileage);
    const nextServiceReminder = Date.parse(req.body.nextServiceReminder);

    const newVehicle = new Vehicle({
        vehicleType, 
        vehicleModel,
        vehicleNo,
        Year,
        mileage,
        nextServiceReminder
    })

    newVehicle.save()  
    .then(()=>{res.json("Successfully Added New Vehicle !") //Vehicle added status
    }).catch(err => res.status(400).json('Error: ' + err));  //display err
});


// router.get('/_search', function (req, res, next) {
// 	var page = Number((req.query.page ?? 1) - 1);
// 	var size = Number(req.query.size ?? 5);
// 	var searchQuery = req.query.query ?? '*';


// 	const query = { $text: { $search: searchQuery } }

// 	console.log(searchQuery);
// 	Vehicle 
// 		.find(query,
// 			(e, r) => {
// 				res.setHeader('X-Total-Count', r.length) 
// 				Vehicle 
// 					.find(query,
// 						(ee, rr) => { 
// 							res.json(rr)
// 						} 
// 					)
// 					.limit(size)
// 					.skip(size * page);
// 			} 
// 		)

// });


// Update vehicle ('http://localhost:8081/api/delivery/vehicle/updatevehicle')
router.route('/updatevehicle/:id').put((req, res) => {
    const id = req.params.id;

    Vehicle.findByIdAndUpdate(id)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).json('Vehicle not found');
            }

            vehicle.vehicleType = req.body.vehicleType;
            vehicle.vehicleModel = req.body.vehicleModel;
            vehicle.vehicleNo = req.body.vehicleNo;
            vehicle.Year = Number(req.body.Year);
            vehicle.mileage = Number(req.body.mileage);
			vehicle.nextServiceReminder = Date.parse(req.body.nextServiceReminder);

            vehicle.save()
                .then(() => res.json('Vehicle details updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });

//Remove Vehicle ('http://localhost:8081/api/delivery/vehicle/removevehicle')

router.route('/removevehicle/:id').delete((req, res) => {
    Vehicle.findByIdAndDelete(req.params.id)
        .then(() => res.json(' Successfully remove vehicle from the system !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//view one vehicle details ('http://localhost:8081/api/delivery/vehicle/getvehiclebyid')

router.route('/getvehiclebyid/:id').get((req, res) => {
    Vehicle.findById(req.params.id)
        .then(vehicle => res.json(vehicle))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;