require("chromedriver");
let swd = require("selenium-webdriver");
// nuild browser
let bldr = new swd.Builder();
//build tab
let driver = bldr.forBrowser("chrome").build();
let challenges = require('./challenges')


async function homepage(){
try{
    await driver.get("https://www.hackerrank.com/auth/login")
    await driver.manage().setTimeouts({implicit:10000});
    let emailPromise = driver.findElement(swd.By.css('#input-1'));
    let PasswordBox = driver.findElement(swd.By.css('#input-2'));
    let loginarr= await Promise.all([emailPromise,PasswordBox]);

    let EWillBeep = loginarr[0].sendKeys("hehod89961@zkeiw.com");
    let PWillBeep = loginarr[1].sendKeys("autoashish009");
    await Promise.all([EWillBeep,PWillBeep]);
    
    // console.log("entered")
    let loginButtonclickPromise = navigatorfn(".ui-btn.ui-btn-large.ui-btn-primary.auth-button")
    await loginButtonclickPromise;
    let menuButtonP = navigatorfn(".backbone.nav_link.js-dropdown-toggle.js-link.toggle-wrap");
    await menuButtonP;
    let AdminbtnclickP = navigatorfn('[data-analytics="NavBarProfileDropDownAdministration"]');
    await AdminbtnclickP;
    //a[href="/administration/challenges"]
    let ManageChallP = navigatorfn('a[href="/administration/challenges"]');
    await ManageChallP;
    let CreateChallP = navigatorfn('.btn.btn-green.backbone.pull-right');
    await CreateChallP;
    // let ChalengeName = await driver.findElement(swd.By.css('input.span12'));
    // let EnterCName = ChalengeName
    let createChallengeLink = await driver.getCurrentUrl();
    console.log(createChallengeLink);
    for(i=0; i< challenges.length;i++){
    await  driver.get(createChallengeLink);
    await CreateChallenge(challenges[i]);
    }
    }
    catch(err){
        console.log(err);
    }
}
homepage();

async function navigatorfn(selector){
    try{
        let elemP = driver.findElement(swd.By.css(selector));
        let elem = await elemP
        let clickP = elem.click();
        await clickP;
    }
    catch(err){
        // console.log(err);
        return Promise.reject(err); //to pass on to the main function catch
    }        
   
}

async function CreateChallenge(challenge){
    let cSelector = ".CodeMirror textarea";
    let parent = ".CodeMirror div";
    let selectors = ['#name',"#preview",
                `#problem_statement-container ${cSelector}`,
                `#input_format-container ${cSelector}`,
                `#constraints-container ${cSelector}`,
                `#output_format-container ${cSelector}`,
                "#tags_tag"];
    
    let allElemPArr = selectors.map(function(elselector){
        return driver.findElement(swd.By.css(elselector));
    })
    let allElements = await Promise.all(allElemPArr);
    await allElements[0].sendKeys(challenge['Challenge Name']);
    await allElements[1].sendKeys(challenge['Description']);
    await enterData(allElements[2], `#problem_statement-container ${parent}`, challenge["Problem Statement"]);
    await enterData(allElements[3], `#input_format-container ${parent}`, challenge["Input Format"]);
    await enterData(allElements[4], `#constraints-container ${parent}`, challenge["Constraints"]);
    await enterData(allElements[5], `#output_format-container ${parent}`, challenge["Output Format"]);
    await allElements[6].sendKeys(challenge["Tags"]);
    await allElements[6].sendKeys(swd.Key.ENTER);
    await navigatorfn('.save-challenge.btn')
}

// to change the size of div box in which the text area is
async function enterData(element, parentSelc, data){
    let parent = await driver.findElement(swd.By.css(parentSelc));
    //changing the size
    await driver.executeScript("arguments[0].style.height=`${10}px`", parent);
    await element.sendKeys(data);
    //enter data
}