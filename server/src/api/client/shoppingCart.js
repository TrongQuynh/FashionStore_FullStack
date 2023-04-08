const express = require('express');
const router = express.Router();

const cartController = require("../../controller/cartController");

// [POST] /api/cart/product
router.post("/product", cartController.addNewProductCart);

// [GET] /api/cart/product
router.get("/product", cartController.getProductCart);

// [PATCH] /api/cart/product
router.patch("/product", cartController.updateProductCart);

// [DELETE] /api/cart/product
router.delete("/product", cartController.deleteProductCart);

// [DELETE] /api/cart/product/all
router.delete("/product/all", cartController.deleteAllProductCart);


module.exports = router;