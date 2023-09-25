const router = require('express').Router();
let Cart = require('../../models/OrderModel/cart.model');

/* GET all items.('http://localhost:8081/api/order/cart/getallcart')  */

router.route('/getallcart').get((_req, res) => {
    Cart.find()
        .then(cart => res.json(cart))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add New Item. ('http://localhost:8081/api/order/cart/addNewcart')

router.route("/addNewcart").post((req,res)=>{

    const itemName = req.body.itemName;
    const price = req.body.price;
    const itemDescription = req.body.itemDescription;
    const image = req.body.image;
    const quantity = Number(req.body.quantity);

    const newCart = new Cart({
        itemName, 
        price,
        itemDescription,
        image,
        quantity,
    })

    newCart.save()  
    .then(()=>{res.json("Successfully add new Cart  !!") //Item status
    }).catch(err => res.status(400).json('Error: ' + err));  //display err
});

// Update item details ('http://localhost:8081/api/order/cart/updatecart')
router.route('/updatecart/:id').put((req, res) => {
    const id = req.params.id;

    Cart.findByIdAndUpdate(id)
        .then(cart => {
            if (!cart) {
                return res.status(404).json('Cart not found');
            }

            cart.itemName = req.body.itemName;
			cart.price = req.body.price;
            cart.itemDescription = req.body.itemDescription;
            cart.image = req.body.image;
            cart.quantity = req.body.quantity;
            cart.total = req.body.total;


            cart.save()
                .then(() => res.json('Cart details updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Remove item  ('http://localhost:8081/api/order/cart/removecart')

router.route('/removecart/:id').delete((req, res) => {
    Cart.findByIdAndDelete(req.params.id)
        .then(() => res.json(' Successfully remove Cart !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//view one Item  ('http://localhost:8081/api/order/cart/viewcart')

router.route('/viewcart/:id').get((req, res) => {
    Cart.findById(req.params.id)
        .then(cart => res.json(cart))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;