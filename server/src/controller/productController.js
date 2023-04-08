
const productModel = require("../models/product.model");
require('dotenv').config({path: require("path").resolve(__dirname, '../../.env')});

module.exports = {

    // [GET] /api/product/all
    async getAllProducts(req,res,next){
        let products = await productModel.find();
        return res.json(products);
    },

    // [GET] /api/product/detail/:slug
    async getProductBySlug(req,res,next){
        const slug = req.params.slug;
        let product = await productModel.findOne({slug}).exec();
        return res.json(product);
    },
    
    // [GET] /api/product/search?search=
    async getProductsBySearch(req,res,next){
        let {search} = req.query;
        search = search ? search : "";
        const regex = new RegExp(search, 'i');
        const products = await productModel.find({ name: regex }).exec();
        return res.json(products);
    },

    // [GET] /api/product/:collection?page=_page&limit=_limit
    async getProductByCollection(req,res,next){
        let {collection} = req.params;
        let page = req.query.page ? req.query.page : 1;
        let itemPerPage = req.query.limit ? req.query.limit : process.env.ITEM_PER_PAGE;
        let skip = (Number(itemPerPage) * Number(page)) - Number(itemPerPage);

        let totalPage = Math.ceil(await productModel.countDocuments({collectionType:collection}) / itemPerPage);
        let products = await productModel.find({collectionType:collection}).sort({code: 1}).skip(skip).limit(itemPerPage).lean().exec();
        
        return res.json({products,currentPage: page, totalPage});
        
    }
}