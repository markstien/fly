const a = new Map<any,any>();

a.set("first",1);
a.set("second",2);

a.forEach( (value, key) => {
    console.log("??",key,value)
})
