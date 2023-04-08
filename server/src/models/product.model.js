const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;



const productSchema = new Schema({
    "code": { type: String, default: "", unique: true  },
    "name": { type: String, default: "" },
    "price": { type: Number, default: "" },
    "sale": { type: Number, default: "" },
    "slug": { type: String, slug: 'name', unique: true },
    "images" : {type: Array },
    "collectionType" : {type: String},
    "types":[
        {
            "color": String,
            "image": String,
            "sizes": [
                {
                    "size": String,
                    "quantity": Number
                }
            ]
        }
    ]
    
},{timestamps: true });

// Add Plugin
mongoose.plugin(slug);

const products = mongoose.model("products", productSchema);

module.exports = products;
