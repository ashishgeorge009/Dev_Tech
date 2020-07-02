require("chromedriver");
let swd = require("selenium-webdriver");
// nuild browser
let bldr = new swd.Builder();
//build tab
let driver = bldr.forBrowser("chrome").build();
let gCodeArr, gInputBox, gCodeBox;
let i =0;

let GwillBeOpenedP = driver.get("https://www.hackerrank.com/auth/login")


GwillBeOpenedP.then(function () {
    let addImpWaitP = driver.manage().setTimeouts({ implicit: 10000 });
    return addImpWaitP;
})
.then(async function(){

    console.log("Home page opened");
    // using await for login---just to explain
    try{
    let emailPromise = driver.findElement(swd.By.css('#input-1'));
    let PasswordBox = driver.findElement(swd.By.css('#input-2'));
    let loginarr= await Promise.all([emailPromise,PasswordBox]);

    let EWillBeep = loginarr[0].sendKeys("hehod89961@zkeiw.com");
    let PWillBeep = loginarr[1].sendKeys("autoashish009");
    let entered = await Promise.all([EWillBeep,PWillBeep]);
    
    // console.log("entered")
    let loginButtonPromise = driver.findElement(swd.By.css(".ui-btn.ui-btn-large.ui-btn-primary.auth-button"))
    let loginButton =await loginButtonPromise;
    let logedIn = loginButton.click();
    return logedIn;
    }
    catch(err){
        console.log(err)
    }
})
.then(function(){
    //USING NAVIGATOR FUNCTION FOR SELECT AND CLICK//-----------------------------//
    let InterviewKitbutton = navigatorfn("#base-card-1-link");
    return InterviewKitbutton
})
.then(function(){
    let arryBtnP = driver.findElement(swd.By.css('[data-attr1="warmup"]'))
    return arryBtnP
    })
.then(function(arryBtn){
    let arryBtnc = arryBtn.click()
    return arryBtnc
    })
.then(function(){
    let allQP = driver.findElements(swd.By.css('.js-track-click.challenge-list-item'))
    return allQP
})
.then(function(allQ){
    let hrefpArr = [];
    for(let i in allQ){
        hrefpArr.push(allQ[i].getAttribute("href"));

    }

    let allHrefpArr = Promise.all(hrefpArr);
    return allHrefpArr;

})
.then(function(hrefArr){
        
    let allqp = submitAllQP(i,hrefArr);
    return allqp;
    // to run in loop

    // let firstQWillBeSubmitP = questionSubmitter(hrefArr[0]);
    //     for (let i = 1; i < hrefArr.length; i++) {
    //         firstQWillBeSubmitP = firstQWillBeSubmitP.then(function () {
    //             let qsp = questionSubmitter(hrefArr[i]);
    //             return qsp;
    //         })
    //     }

    //     return firstQWillBeSubmitP;

    
})
GwillBeOpenedP.catch(function(err){
    console.log(err)
})

// Navigator func to select and click using Promise Class
function navigatorfn(selector){
    let pPromise = new Promise(function(resolve,reject){
        let elemP = driver.findElement(swd.By.css(selector));
        elemP
            .then(function(elem){
                let clickP = elem.click();
                return clickP;
            })
            .then(function(){
                resolve();
            }).catch(function(err){
                console.log(err);
                reject(err);
            })
    })
    return pPromise
}
//question submitter

function questionSubmitter(qlink){
    return new Promise(function(resolve, reject){
        let qpP = driver.get(qlink);
        qpP.then(function () {
            let editorialWillBECLickedP = navigatorfn(
                "a[data-attr2='Editorial']");
            return editorialWillBECLickedP;
        }).then(function () {
            let handleLockP = handleLockBtn();
            return handleLockP;
        }).then(function () {
            // code find
            let codep = getCode();
            return codep;
            // copy 
            // code paste
        }).then(function (code) {
            // console.log(code);
            let codePasteP = pasteCode(code);
            return codePasteP;
        })
            .then(function () {
                console.log("done");
                resolve();
            }).catch(function (err) {
                reject(err);
            })
    }); 
    
}

function handleLockBtn() {
    // exist => click
    return new Promise(function (resolve, reject) {
        let lockBtnP = driver.findElement(swd.By.css("button.ui-btn.ui-btn-normal.ui-btn-primary .ui-content.align-icon-right"));
        lockBtnP.then(function (lockBtn) {

            let actions = driver.actions({ async: true });
            let elemPressedP = actions.move({ origin: lockBtn }).click().perform();
            // Performs release event on target element
            return elemPressedP
        }).then(function () {
            console.log("clicked editorial")
            resolve();
        }).catch(function (err) {

            console.log("Lock Btn not found");
            resolve();
        })
    })
    // move on
}

function getCode() {
    return new Promise(function (resolve, reject) {
        let h3P = driver.findElements(swd.By.css(".hackdown-content h3"));
        let highlightsP = driver.findElements(swd.By.css(".hackdown-content .highlight"));
        let bArrP = Promise.all([h3P, highlightsP]);
        bArrP
            .then(
                function (bArr) {
                    let h3Arr = bArr[0];
                    let highlightsCodeArr = bArr[1];
                    gCodeArr = highlightsCodeArr;
                    let tPArr = [];

                    for (let i = 0; i < h3Arr.length; i++) {
                        let textP = h3Arr[i].getText();
                        tPArr.push(textP);
                    }
                    let alltEextPArr = Promise.all(tPArr);
                    return alltEextPArr
                })
            .then( function (allLangArr) {
                    console.log(allLangArr);
                    let index = allLangArr.indexOf("C++");
                    let codePromise = gCodeArr[index].getText();
                    return codePromise;
                    // filter out -> C++
                })
            .then(function (code) {
                    resolve(code);
                })
            .catch(function (err) {
                    reject(err);
                })
    })
}

function pasteCode(code){
    return new Promise(function(resolve,reject){
        let goToProblemTab = navigatorfn('a[data-attr2="Problem"]');
        goToProblemTab
        .then(function(){
            let inputWillBeSendP = navigatorfn('.custom-input-checkbox');
            return inputWillBeSendP;
        })
        .then(function(){
            let  inputBoxP = driver.findElement(swd.By.css(".custominput"));
            return inputBoxP
        })
        .then(function(inputBox){
            gInputBox = inputBox;
            let codewillBeSendP = inputBox.sendKeys(code);
            return codewillBeSendP;
        })
        .then(function(){
            let ctrlAWillBePressedP = gInputBox.sendKeys(swd.Key.CONTROL+"a");
            return ctrlAWillBePressedP;

        })
        .then(function(){
            let ctrlXWillBePressedP = gInputBox.sendKeys(swd.Key.CONTROL+"x");
            return ctrlXWillBePressedP;

        })
        .then(function(){
            //selecting the code editor
            let codeBoxP = driver.findElement(swd.By.css(".inputarea"));
            return codeBoxP;
        })
        .then(function(codeBox){
            gCodeBox = codeBox;
            let ctrlAP = codeBox.sendKeys(swd.Key.CONTROL + "a");
            return ctrlAP
        })
        .then(function(){
            let ctrlVP = gCodeBox.sendKeys(swd.Key.CONTROL + "v");
            return ctrlVP;
        })
        .then(function(){
            let submitP = navigatorfn(".pull-right.btn.btn-primary.hr-monaco-submit");
            return submitP;
        })
        .then(function(){
            console.log("Submitted")
            resolve();
        })
        .catch(function(err){
            reject(err)
        })
    })
}
// https://www.selenium.dev/documentation/en/support_packages/mouse_and_keyboard_actions_in_detail/ 
function submitAllQP(n,arr){
    if(n<arr.length){
        return new Promise(function(resolve,reject){
            let nQWillBeSubmitP = questionSubmitter(arr[n]);
            nQWillBeSubmitP
                .then(function(){
                    n++;
                    let QWillBeSubmitP = submitAllQP(n,arr)
                    return QWillBeSubmitP
                }).then(function(){
                    resolve();
                }).catch(function(err){
                    reject(err);
                })
        })
    }
    else{
        console.log("All questions completed")
        return;
    }
}