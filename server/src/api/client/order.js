const express = require('express');
const router = express.Router();

const orderController = require("../../controller/orderController");

// [POST] /api/order/
router.post("/", orderController.addNewOrder);

// [GET] /api/order/:orderCode
router.get("/:orderCode", orderController.getOrder);

module.exports = router;