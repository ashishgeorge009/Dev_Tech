let fs = require("fs");
function promisifyFS(path){
    let pPromise = new Promise(function(resolve,reject){
        //resolve call
        fs.readFile(path, function(err,data){
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })

    return pPromise
}

let fpromise1 = promisifyFS("../../f1.txt");

fpromise1.then(function(data){
    console.log(data.toString())
}).catch(function(err){
    console.log(err)
})

let fpromise2 = promisifyFS("../../f2.txt");

fpromise2.then(function(data){
    console.log(data.toString())
}).catch(function(err){
    console.log(err)
})

let fpromise3 = promisifyFS("../../f3.txt");

fpromise3.then(function(data){
    console.log(data.toString())
}).catch(function(err){
    console.log(err)
})

let fpromise4 = promisifyFS("../../f4.txt");

fpromise4.then(function(data){
    console.log(data.toString())
}).catch(function(err){
    console.log(err)
})

