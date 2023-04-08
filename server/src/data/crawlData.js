const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

function generateSizeForProduct(type){
    let result = [];
    let min = 0, max = 250;
    if(type == 1){
        for(let size of ["S","M","L","XL", "XXL"]){
            result.push({
                size,
                quantity: Math.floor(Math.random() * (max - min) + min)
            })
        }
    }else if(type == 2){
        for(let size of ["29","30","31","32", "34","36"]){
            result.push({
                size,
                quantity: Math.floor(Math.random() * (max - min) + min)
            })
        }
    }else if(type == 3){
        for(let size of ["39","40","41","42", "43","44"]){
            result.push({
                size,
                quantity: Math.floor(Math.random() * (max - min) + min)
            })
        }
    }
    return result;
}

async function test(){
    try {
        const res = await axios("https://somehow.vn/products/giay-neon-tone-colorful-string");
        const html = res.data;
        const $ = cheerio.load(html);

        let productSale = $(".product-price__save span.sale-percent").text();
        productSale = productSale.replaceAll("-","").replaceAll("%","");

        console.log(productSale == "");

    } catch (error) {
        
    }
}

async function crawl_product_data(url,type, collection){
    try {
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);

        let result = {};
        let productName = $("h3.product-title").text();
        let productCode = $("p.pro_sku").text();
        productCode = productCode.replaceAll("SKU: ","");

        let productPrice = $(".product-price").find("del").text() == "" ? $(".product-price").find("span").text() :  $(".product-price").find("del").text();
        productPrice = productPrice.replaceAll("₫","").replaceAll(",","");

        let productSale = $(".product-price__save span.sale-percent").text();
        productSale = productSale.replaceAll("-","").replaceAll("%","");

        let productRate = 5;

        let productSlug = url.replaceAll("https://somehow.vn/products/","");

        let productImages = [];
        $("li.product-thumb img").each(function(){
            let img = $(this).attr("src");
            img = img.replaceAll("small","master");
            productImages.push(`https:${img}`);
        })

        let types = [];
        $("div.product-items.variant-color li").each(function(){
            let color = $(this).find("span").text();
            let image = `https:${$(this).find("img").attr("src")}`;
            let sizes = generateSizeForProduct(type);
            types.push({color,image,sizes});
        })
        
        return {
            "code":productCode,
            "name":productName,
            "price":Number(productPrice),
            "sale":Number(productSale),
            "rate":Number(productRate),
            "slug":productSlug,
            "images":productImages,
            "collectionType": collection,
            types
        }

    } catch (error) {
        console.log(error);
    }
}

async function crawl_collection(url,type,collection){
    try {
        const res = await axios(url);
        const html = res.data;
        const $ = cheerio.load(html);

        // let url = "https://somehow.vn/products/ao-khoac-jean-inf-l-mono";
        // let url = "https://somehow.vn/products/ao-khoac-wind-easy-wear";

        // await crawl_product_data(url, type);
        // return;

        let list_url_product = [];
        $(".product-lists > .product-item").each(function(index, element){
            let url = $(this).find("a").attr("href");
            list_url_product.push(url);
        })
        
        let result = [];
        for(let url of list_url_product){
            result.push(await crawl_product_data(`https://somehow.vn${url}`,type,collection));
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function saveFile(fileName, content){
    console.log(content);
   await fs.writeFileSync(`${__dirname}/${fileName}`, JSON.stringify(content));
}

async function main(){
    
    /**
     * 1 - Ao
     * 2 - Quan
     * 3 - Giay
     */
    let collections = [
        {
            id:1,
            name:"ao",
            lists:["ao-khoac"]
        },
        {
            id:2,
            name:"quan",
            lists:["quan-tay"]
        },
        {
            id:3,
            name:"giay",
            lists:['giay-dep']
        },
    ];
    let content = [];
    for(let collection of collections){
        for(let data of collection.lists){
            let url = `https://somehow.vn/collections/${data}`; 
        
            // content.push(await crawl_collection(url,collection.id,data));
            content = [...content,...(await crawl_collection(url,collection.id,data))]
        }
    }

    await saveFile("products.json", content);
}

main();