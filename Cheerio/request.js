let request = require("request");
let fs = require("fs");
let cheerio = require('cheerio');



let eachMatchHandler = require("./match");

request('https://www.espncricinfo.com/series/_/id/8039/season/2015/icc-cricket-world-cup', dataReciever);



function dataReciever(err, res,html){
    if(err ==null && res.statusCode==200){
        // console.log(type(html))
        parsefile(html)
// console.log(html)
    }
    else if(res.statusCode==404){
        console.log("Page Not Found");
    }
    else{
        console.log(err)
    }
}


function parsefile(html){
    let $ = cheerio.load(html);
    let list = $("ul.list-unstyled.mb-0");
    // console.log(type(list))
    // fs.writeFileSync("match.html", list.toString());
    // console.log(list)
    let a = $("li.widget-items.cta-link a").attr('href');
    console.log(a);
    let fullLink = "https://www.espncricinfo.com"+a;
    request(fullLink, matchPageHandler)
}

function matchPageHandler(err, res, html) {
    if (err == null && res.statusCode == 200) {
        //  console.log(res);
        // console.log(html);
        parseMatch(html);
    } else if (res.statusCode == 404) {
        console.log("Page Not found");
    } else {
        console.log(err);
        console.log(res);
    }
}
function parseMatch(html) {
    let $ = cheerio.load(html);
    // in full Page
    let allCards = $(".col-md-8.col-16");
    // console.log("allCard.html",allCards);
    // fs.writeFileSync("allCard.html",allCards);
    for (let i = 0; i < allCards.length; i++) {
        // find => find in element 
        // let result = $(allCards[i]).find(".extra-small.mb-0.match-description.match-description-bottom").text();
        // let details = $(allCards[i]).find(".small.mb-0.match-description").text();
        let allanchors = $(allCards[i]).find(".match-cta-container a")
        let scoreCardLink = $(allanchors[0]).attr("href");
        console.log("###############################");
        // console.log(result);
        // console.log(details);
        eachMatchHandler("https://www.espncricinfo.com"+scoreCardLink);
        // console.log("###############################");
    }
}

