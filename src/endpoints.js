
var express = require('express');

module.exports = function (app) {

    // author @Ganeesha (Delivery Management)
    app.use('/api/delivery/drivers', require('../controllers/Delivery/driver'));
    app.use('/api/delivery/vehicle', require('../controllers/Delivery/vehicle'));
    app.use('/api/delivery/delivery', require('../controllers/Delivery/delivery'));
    // @Ganeesha: end

    // author @kithmi (Customer Feedback and Inquiry Management)
    app.use('/api/feedback/feedback', require('../controllers/Feedback/feedback'));
    app.use('/api/feedback/inquiry', require('../controllers/Feedback/inquiry'));
    // @kithmi: end

    //author @Halis (Inventory Management)
    app.use('/api/inventory/inventory', require('../controllers/Inventory/inventory'));
    app.use('/api/inventory/supplier', require('../controllers/Inventory/supplier'));
    // @Halis: end

   //author @Shamrina (Customer Management and Login)
   app.use('/api/customer/customer', require('../controllers/Customer/customer'));
   // @Shamrina: end

    //author @______ (Staff Management)
    app.use('/api/staff/staff', require('../controllers/Staff/staff'));
    app.use('/api/staff/salary', require('../controllers/Staff/salary'));
    app.use('/api/staff/tasks', require('../controllers/Staff/tasks'));
    // @______: end

    //author @Sanka (Payment Management)
    app.use('/api/payment/cardpay', require('../controllers/Payment/cardpay'));
    app.use('/api/payment/payment', require('../controllers/Payment/payment'));
    // @Sanka: end

    //author @Pasindu (Catalogue Management)
    app.use('/api/catalogue/catalogue', require('../controllers/Catalogue/catalogue'));
    app.use('/api/catalogue/item', require('../controllers/Catalogue/item'));
    // @Pasindu: end

    //author @Chamika (Order Management)
    app.use('/api/order/order', require('../controllers/Order/order'));
    app.use('/api/order/cart', require('../controllers/Order/cart'));
    // @Chamika: end
}