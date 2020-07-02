let fs = require('fs')
console.log("before")

let filePromise = fs.promises.readFile("f1.txt");

filePromise.then(function(data){
    console.log("Inside then")
    console.log(data.toString());
})

filePromise.catch(function(err){
    console.log("Inside catch block");
    console.log(err)
})
//settimiout is async funtion too...
setTimeout(function(){
    console.log(filePromise);
},3)

console.log("After")