
const cartModel = require("../models/shoppingCart.model");
const productModel = require("../models/product.model");

module.exports = {

    async getProductCart(req, res) {
        try {
            const userID = req.get("userID");
            let products = await cartModel.findOne({userID}).lean().exec();
            return res.status(200).json({
                "status": 200,
                products
            })
        } catch (error) {
            return res.status(200).json({
                "message": "Error",
                "status": 500
            });
        }
    },

    async addNewProductCart(req, res) {
        try {
            const { userID, productCode, name, price, size, quantity, color, image } = req.body;
            let cartDB = await cartModel.findOne({ userID }).exec();

            let productDB = await productModel.findOne({ code: productCode }).lean().exec();
            if (!productDB) {
                return res.status(200).json({
                    "message": "Not found data",
                    "status": 401
                })
            }

            if (cartDB) {
                let product = cartDB.products.find((el) => el.productCode == productCode && el.color == color && el.size == size);
                if (product) {
                    await cartModel.updateOne(
                        // find the cart with userID and matching productCode
                        { userID, "products.productCartID": product.productCartID },
                        // update the quantity of the matching productCode
                        { $set: { "products.$.quantity": (product.quantity + 1) } }
                    )
                } else {
                    cartDB.products.push({
                        productCode,
                        price,
                        size,
                        name,
                        quantity,
                        color,
                        image
                    });
                    await cartDB.save();
                }
            } else {
                new cartModel({
                    userID,
                    products: [
                        {
                            productCode,
                            name,
                            price,
                            size,
                            quantity,
                            color,
                            image
                        }
                    ]
                }).save();

            }
            return res.status(200).json({
                "status": 200,
                "message": "Success"
            });
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                "message": "Error",
                "status": 500
            });
        }
    },

    async updateProductCart(req, res) {
        // Update quantity
        const { userID, productCartID, quantity } = req.body;
        let cartDB = await cartModel.findOne({ userID }).lean().exec();
        if (!cartDB) {
            return res.json({ "message": "Not found cart of user", "status": 404 });
        }
        let product = cartDB.products.find((el) => el.productCartID == productCartID);
        if (product) {
            await cartModel.updateOne(
                // find the cart with userID and matching productCode
                { userID, "products.productCartID": productCartID },
                // update the quantity of the matching productCode
                { $set: { "products.$.quantity": quantity } }
            )
        } else {
            return res.status(200).json({
                "message": "Not found product",
                "status": 404
            });
        }
        return res.status(200).json({
            "message": "Success",
            "status": 200
        });
    },
    // [DELETE] /api/cart/product
    async deleteProductCart(req, res) {
        try {
            const userID = req.get("userID");
            const { productCartID } = req.body;
            let cartDB = await cartModel.findOne({ userID }).lean().exec();
            if (!cartDB) {
                return res.json({ "message": "Not found cart of user", "status": 404 });
            }
            await cartModel.updateOne(
                { userID },
                { $pull: { products: { productCartID } } }
            );
            return res.status(200).json({
                "message": "Success",
                "status": 200
            });
        } catch (error) {
            console.log(error);
        }
    },
    // [DELETE] /api/cart/product/all
    async deleteAllProductCart(req, res) {
        try {
            const userID = req.get("userID");
            let cartDB = await cartModel.findOne({ userID }).exec();
            if (!cartDB) {
                return res.json({ "message": "Not found cart of user", "status": 404 });
            }
            cartDB.products = [];
            await cartDB.save();
            return res.status(200).json({
                "message": "Success",
                "status": 200
            });
        } catch (error) {
            console.log(error);
        }
    }

}