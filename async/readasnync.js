let fs = require("fs");
console.log("Before");

fs.readFile("./file.txt", function(err, content){
    console.log("the content "+ content);
    console.log("Actual response")
})

console.log("Last response")