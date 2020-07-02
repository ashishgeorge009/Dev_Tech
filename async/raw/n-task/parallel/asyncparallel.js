let files = ["../f1.txt","../f2.txt","../f3.txt","../f4.txt"];
let fs = require("fs");
console.log("before")

function fileReader(i){
    if (i==files.length){
        return;
    }
    fs.readFile(files[i],function(err,data){
        console.log(data.toString());
    })
    //--it is outside
    fileReader(i+1);
}
fileReader(0)
console.log("after")