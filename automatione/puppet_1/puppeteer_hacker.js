let pp = require('puppeteer');
async function hackerrank(){
    let browser = await pp.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        // slowMo: 100
    });
    // let tab = await browser.newPage();
    let AllTabs = await browser.pages();
    let tab = AllTabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", "hehod89961@zkeiw.com");
    await tab.type("#input-2", "autoashish009");
    

    await Promise.all([
        tab.waitForNavigation({ waitUntil: "networkidle0" }),
        tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button")
    ]);

    await tab.click('a[data-analytics="NavBarProfileDropDown"]');
    await
        Promise.all([
            tab.waitForNavigation({ waitUntil: "networkidle0" }),
            tab.click("a[data-analytics='NavBarProfileDropDownAdministration']")]);
    // Performs release event on target element
    // driver.findElements
    let liArr = await tab.$$("ul.nav-tabs li");
    await liArr[1].click();
    let createChallengePageLink = await tab.url();
    console.log(createChallengePageLink);
    // parallely tab open 
    // browser.newPage();
    await handleSinglePage(tab,browser);

}

hackerrank();

//........
async function handleSinglePage(tab,browser){
    //driver.waitforselector
    await tab.waitForSelector(".backbone.block-center",{visible: true})
    //driver.findelements
    console.log("beforeqlink")
    let qlist = await tab.$$(".backbone.block-center");

    console.log(qlist.length)

    let linkPromiseArr =[];
    for(let i=0; i<qlist.length;i++){
        let link = tab.evaluate(function(elem){
            return elem.getAttribute("href")
        }, qlist[i]);
        console.log("hello")
        linkPromiseArr.push(link);
    }
  

    let allLinksArr = await Promise.all(linkPromiseArr);
    let allQonOnePArr = [];
    for(let i=0;i<allLinksArr.length;i++){

        let cLink = `https://www.hackerrank.com${allLinksArr[i]}`;

        let newTab = await browser.newPage();
        let allsolvedP = questionSolver(cLink,newTab);
        allQonOnePArr.push(allsolvedP);
        
    }
    await Promise.all(allQonOnePArr)


    let allLis = await tab.$$('.pagination ul li');
    let nxtBtn = allLis[allLis.length-2];
    let isDisabled = await tab.evaluate(function (elem){
        
    //   let liArr= document.querySelectorAll(".pagination ul li");
        return liArr[liArr.length-2].getAttribute("class");
    });
    console.log(isDisabled);
    if(isDisabled === 'disabled'){
        return;
    }
    else{
        await Promise.all([nxtBtn.click(),tab.waitForNavigation({waitUntil: "networkidle0"})])
        await handleSinglePage(tab,browser);
    }
}


async function questionSolver(cLink,newTab){
    await newTab.goto(cLink,{waitUntil:"networkidle0"});
    await newTab.waitForSelector("li[data-tab='moderators']",{visible: true});
    await Promise.all([newTab.click("li[data-tab='moderators']"), 
        newTab.waitForNavigation({ waitUntil: "networkidle0" })])
    await newTab.waitForSelector("#moderator", { visible: true });
    await newTab.type("#moderator", "JOJO");
    await newTab.keyboard.press("Enter");
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.close();
    console.log("after")
}