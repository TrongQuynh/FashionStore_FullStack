const mongoose = require("mongoose");
require('dotenv').config({path: require("path").resolve(__dirname, '../../../.env')});
let mongoDB = process.env.MONGO_DB;

let connect = mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("2. Connect DB Success!");
    })
    .catch(() => {
        console.log("2. Connect DB Fail :(");
    })
module.exports = { connect };