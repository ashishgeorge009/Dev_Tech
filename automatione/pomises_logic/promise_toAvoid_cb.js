//using promises avoid cb as cb can create cbhell
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

//-------consumer uses

let fpromise = promisifyFS("./ft.txt");

fpromise.then(function(data){
    console.log(data.toString())
})
fpromise.catch(function(err){
    console.log(err)
})