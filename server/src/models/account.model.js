const mongoose = require("mongoose");

const Schema = mongoose.Schema;
/**
 * 1 - Admin
 * 2 - Customer
 */


const accountSchema = new Schema({
    "ID" : {type: String, required: true, default: function(){
        return `u_${String((new Date()).getTime()).slice(-5)}`;
    }},
    "username":{type: String, required: true},
    "phonenumber":{type: String, required: true, unique: true },
    "password" : {type: String, required: true},
    "email" : {type: String},
    "address" : {type: String, default: ""},
    "role" : {type: Number, required: true, default: 2}
},{timestamps: true });

const accounts = mongoose.model("accounts", accountSchema);

module.exports = accounts;
