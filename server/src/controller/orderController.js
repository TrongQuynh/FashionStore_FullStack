
const orderModel = require("../models/order.model");

module.exports = {

    // [GET] /api/order/:orderCode
    async getOrder(req,res){
        try {
            const userID = req.get("userID");
            const {orderCode} = req.params;
            let orderDB = await orderModel.findOne({ userID }).exec();
            console.log(orderCode);
            let order = orderDB.orders.filter(od => od.orderCode === orderCode);
            return res.json({
                "message" : "Success",
                "status" : 200,
                order
            })
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                "message": 'Error',
                "status": 500
            })
        }
    },

    // [POST] /api/order/
    async addNewOrder(req, res) {
        try {
            const userID = req.get("userID");
            const {orders} = req.body;
            let orderDB = await orderModel.findOne({ userID }).exec();
            let orderID = "";
            if (orderDB) {
                orderDB.orders = [...orderDB.orders, ...orders];
                let tmp = await orderDB.save();
                
                orderID = (tmp.orders[tmp.orders.length - 1]).orderCode;
            } else {
                orderDB = new orderModel({
                    userID,
                    orders: orders
                }).save();

                orderID = (orderDB.orders[orderDB.orders.length - 1]).orderCode;
            }
            return res.status(200).json({
                "message" : "Success",
                "status" : 200,
                "orderID" : orderID
            })
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                "message": 'Error',
                "status": 500
            })
        }

    }
}