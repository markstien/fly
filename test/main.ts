import fs from 'fs';
import * as path from "path";

fs.readFile("D:/Fly/test/static/index.html",{encoding:"utf-8"},(error,data)=>{
    console.log(data);
});
