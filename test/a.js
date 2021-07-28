function doIt() {
    const radios = document.querySelectorAll(".radio-pjf");
    const length = radios.length;

    for (let i=0;i<length;i++){
        if((i+1)%5===0){
            const key = i-4;
            const radio = radios[key];
            radio.click();
        }
    }

    document.getElementById("btn_xspj_tj").click()
}

function main() {
   for(let i=3;;i++){
       const page = document.getElementById(i.toString());
       if(!page){
           return;
       }
       setTimeout(()=>{
           page.click();
           setTimeout(()=>{
               doIt();
           },1500)
       },1000)
   }
}
