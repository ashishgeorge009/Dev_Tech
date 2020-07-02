function myfun(param){
    let rVal = param();
    console.log(rVal);
    console.log(param);
}

myfun(function smallerfn(){
    let a =10;
    a++;
    return a;
})