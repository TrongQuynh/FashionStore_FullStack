const mongoose = require("mongoose");

const Schema = mongoose.Schema;
/**
 * 1 - Admin
 * 2 - Customer
 */


const cartSchema = new Schema({
    "userID":{type: String, required: true},
    "ID" : {type: String, required: true, default: function(){
        return String((new Date()).getTime()).slice(-5);
    }},
    "products" :[
        {
            "productCartID": {type: String, default:function(){
                return `PC-${String((new Date()).getTime()).slice(-5)}`;
            }},
            "productCode": {type: String, required: true},
            "name" : {type: String, required: true},
            "price" : Number,
            "size" : {type: String, required: true},
            "quantity" :{type: Number, required: true},
            "color" : {type: String, required: true},
            "image" : String,
            "updatedAt" : {type: Date, default: Date.now()}
        }
    ]
},{timestamps: true });

const shoppingCart = mongoose.model("shoppingCart", cartSchema);

module.exports = shoppingCart;
