let fs = require('fs');
//npm install cheerio
//cheerio module require
let cheerio = require('cheerio');
let html = fs.readFileSync("./index.html","utf-8");

let $ = cheerio.load(html);

let p = $("p");

console.log(p.text())
