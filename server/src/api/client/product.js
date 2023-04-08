const express = require('express');
const router = express.Router();

// Controller
const productController = require("../../controller/productController");

// /api/product/all
router.get("/all",productController.getAllProducts);

// /api/product/search
router.get("/search",productController.getProductsBySearch);

// /api/product/:collection?page=_page
router.get("/:collection",productController.getProductByCollection);

// /api/product/detail/:slug
router.get("/detail/:slug",productController.getProductBySlug);

module.exports = router;