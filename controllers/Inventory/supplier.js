const router = require("express").Router();
const Supplier = require('../../models/InventoryModel/supplier.model');



/* GET all suppliers.('http://localhost:8081/api/inventory/supplier/getallsuppliers')  */

router.route('/getallsuppliers').get((_req, res) => {
    Supplier.find()
        .then(supplier => res.json(supplier))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add New Supplier. ('http://localhost:8081/api/inventory/supplier/addnewsupplier')

router.route("/addnewsupplier").post((req,res)=>{

    const supplierName = req.body.supplierName;
    const supplierEmail = req.body.supplierEmail;
    const supplierContactNumber = Number(req.body.supplierContactNumber);
    const supplierAddress = req.body.supplierAddress;
    const supplierItemCategory = req.body.supplierItemCategory;

    const newSupplier = new Supplier({
        supplierName, 
        supplierEmail,
        supplierContactNumber,
        supplierAddress,
        supplierItemCategory
    })

    newSupplier.save()  
    .then(()=>{res.json("Successfully Added New Supplier !") //Supplier added status
    }).catch(err => res.status(400).json('Error: ' + err));  //display err
});

// Update supplier details ('http://localhost:8081/api/inventory/supplier/updatesupplier')
router.route('/updatesupplier/:id').put((req, res) => {
    const id = req.params.id;

    Supplier.findByIdAndUpdate(id)
        .then(supplier => {
            if (!supplier) {
                return res.status(404).json('Supplier not found');
            }

            supplier.supplierName = req.body.supplierName;
            supplier.supplierEmail = req.body.supplierEmail;
            supplier.supplierContactNumber = Number(req.body.supplierContactNumber);
			supplier.supplierAddress = req.body.supplierAddress;
            supplier.supplierItemCategory = req.body.supplierItemCategory;

            supplier.save()
                .then(() => res.json('Supplier details updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Remove supplier  ('http://localhost:8081/api/inventory/supplier/removesupplier')

router.route('/removesupplier/:id').delete((req, res) => {
    Supplier.findByIdAndDelete(req.params.id)
        .then(() => res.json(' Successfully remove supplier !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//view one supplier details ('http://localhost:8081/api/inventory/supplier/getsupplierbyid')

router.route('/getsupplierbyid/:id').get((req, res) => {
    Supplier.findById(req.params.id)
        .then(supplier => res.json(supplier))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
