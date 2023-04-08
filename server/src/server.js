const express = require("express");
const cors = require("cors");
require('dotenv').config({path: require("path").resolve(__dirname, './../.env')});
const PORT = process.env.PORT;
const db = require("./config/db");
const routerClient = require("./api/client/index");
const app = express();

// Body parser (Express 4.16+)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// tài nguyên khác nhau 
//của một trang web có thể được truy vấn từ domain khác
app.use(cors());

// Init router
routerClient(app);

app.listen(PORT,function(){
    console.log(`Server run at http://localhost:${PORT}/`);
    console.log("1. Server is running ...");
});

