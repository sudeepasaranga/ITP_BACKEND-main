const router = require('express').Router();
let Item = require('../../models/CatelogModel/item.model');

/* GET all items.('http://localhost:8081/api/catalogue/item/getallitems')  */

router.route('/getallitems').get((_req, res) => {
    Item.find()
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add New Item. ('http://localhost:8081/api/catalogue/item/addnewitem')

router.route("/addnewitem").post((req,res)=>{

    const itemName = req.body.itemName;
    const itemCategory = req.body.itemCategory;
    const Material = req.body.Material;
    const price = req.body.price;
    const stockStatus = req.body.stockStatus;
    const itemDescription = req.body.itemDescription;
    const image = req.body.image;


    const newItem = new Item({
        itemName, 
        itemCategory,
        Material,
        price,
        stockStatus,
        itemDescription,
        image

    })

    newItem.save()  
    .then(()=>{res.json("Successfully add new item  !!") //Item status
    }).catch(err => res.status(400).json('Error: ' + err));  //display err
});

// Update item details ('http://localhost:8081/api/catalogue/item/updateitem')
router.route('/updateitem/:id').put((req, res) => {
    const id = req.params.id;

    Item.findByIdAndUpdate(id)
        .then(item => {
            if (!item) {
                return res.status(404).json('Item not found');
            }

            item.itemName = req.body.itemName;
            item.itemCategory = req.body.itemCategory;
            item.Material = req.body.Material;
			item.price = req.body.price;
            item.stockStatus = req.body.stockStatus;
            item.itemDescription = req.body.itemDescription;
            item.image = req.body.image;

            item.save()
                .then(() => res.json('Item details updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Remove item  ('http://localhost:8081/api/catalogue/item/removeitem')

router.route('/removeitem/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json(' Successfully remove item !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//view one Item  ('http://localhost:8081/api/catalogue/item/viewitembyid')

router.route('/viewitembyid/:id').get((req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;