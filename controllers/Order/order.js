const router = require("express").Router();
const Order = require('../../models/OrderModel/order.model');

/* GET all orders.('http://localhost:8081/api/order/order/getallorders')  */

router.route('/getallorders').get((_req, res) => {
    Order.find()
        .then(order => res.json(order))
        .catch(err => res.status(400).json('Error: ' + err));
});

// New Order. ('http://localhost:8081/api/order/order/createorder')

router.route("/createorder").post((req,res)=>{

    const customerId = Number(req.body.customerId);
    const customerName = req.body.customerName;
    const orderDate = Date.parse(req.body.orderDate);
    const totalCost = req.body.totalCost;
    const orderItems = req.body.orderItems;
    const odrerStatus = req.body.odrerStatus;

    const newOrder = new Order({
        customerId, 
        customerName,
        orderDate,
        totalCost,
        orderItems,
        odrerStatus
    })

    newOrder.save()  
    .then(()=>{res.json("Successfully Add New Order.Thank You !") //Order added status
    }).catch(err => res.status(400).json('Error: ' + err));  //display err
});

// change order details ('http://localhost:8081/api/order/order/changeorder')
router.route('/changeorder/:id').put((req, res) => {
    const orderId = req.params.orderId;

    Order.findOneAndUpdate(orderId)
        .then(order => {
            if (!order) {
                return res.status(404).json('Order not found');
            }

            order.customerId = Number(req.body.customerId);
            order.customerName = req.body.customerName;
            order.orderDate = Date.parse(req.body.orderDate);
			order.totalCost = req.body.totalCost;
            order.orderItems = req.body.orderItems;
            order.odrerStatus = req.body.odrerStatus;

            order.save()
                .then(() => res.json('Order changed successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Remove order  ('http://localhost:8081/api/order/order/removeorder')

router.route('/removeorder/:id').delete((req, res) => {
    Order.findOneAndDelete(req.params.orderId)
        .then(() => res.json(' Successfully remove order !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//view one order ('http://localhost:8081/api/order/order/vieworderbyid')

router.route('/vieworderbyid/:id').get((req, res) => {
    Order.findOne(req.params.orderId)
        .then( order => res.json(order))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
