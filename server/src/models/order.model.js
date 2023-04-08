const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const orderSchema = new Schema({
    userID: {
        type: String,
    },
    orders:[
        {
            orderCode: {type: String, required: true, default: function(){
                return `OD-${String((new Date()).getTime()).slice(-5)}`;
            }},
            username: String,
            products: [
                {
                    productCode: {
                        type: String
                    },
                    quantity: {
                        type: Number,
                        required: true,
                        min: [1, "Quantity can not be less then 1."],
                    },
                    size: String,
                    color: String
                }
            ],
            phonenumber: { type: String, required: true },
            address: { 
                detail:{type: String},
                province: {type: String},
                district: {type: String},
                ward: {type: String},
            },
            /*
                key - ~
                0 - inWaitConfirm
                1 - inPrepareOrder
                2 - inDeliveryOrder
                3 - Success
                4 - isOrderCancel
                
            */
            status: [
                {
                    _id: false,
                    key:{
                        type: Number
                    },
                    value:{
                        type: Boolean
                    },
                    date: { type: Date, default: Date.now },
                }
            ], 
            note: String,
            isPaymentOnline:{type: Boolean, default:false},
            paymentBy: {type: String, default:""},
            orderAt: { type: Date, default: Date.now }
        }
    ]

},{timestamps: true});

const order = mongoose.model("order", orderSchema);

module.exports = order;