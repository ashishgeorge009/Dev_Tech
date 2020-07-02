let files = ["../f1.txt","../f2.txt","../f3.txt","../f4.txt"];
let fs = require("fs");
console.log("before")

for(i=0;i<files.length;i++){
    // console.log("sadf")
    let data = fs.readFileSync(files[i])
    console.log(data.toString())
}
console.log("after")