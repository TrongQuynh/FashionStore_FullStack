
const productRouter = require("./product");
const accountRouter = require("./account");
const cartRouter = require("./shoppingCart");
const orderRouter = require("./order");


module.exports = function Router(app){
    app.use("/api/product",productRouter);

    app.use("/api/account", accountRouter);

    app.use("/api/cart", cartRouter);

    app.use("/api/order", orderRouter);
}