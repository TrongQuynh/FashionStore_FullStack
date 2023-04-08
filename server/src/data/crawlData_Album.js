const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');



async function crawlAlbumInfo() {
    try {
        const res = await axios("https://somehow.vn/pages/mix-match");
        const html = res.data;
        const $ = cheerio.load(html);

        let result = [];

        $(".list-collections-lookbook").each(function () {
            
            let albumName = $(this).find("a").attr("data-category");
            console.log(albumName);
            let albumThumb = $(this).find("img.image-lookbook").attr("src");
            let href = $(this).find("a").attr("href");
            let images = [];
            result.push({
                albumName,
                href,
                albumThumb,
                images
            })
        })

        return result;


    } catch (error) {

    }
}


async function saveFile(fileName, content) {
    console.log(content);
    await fs.writeFileSync(`${__dirname}/json/${fileName}`, JSON.stringify(content));
}

async function main() {

    console.log(await crawlAlbumInfo());
    // await saveFile("products.json", content);
}

main();