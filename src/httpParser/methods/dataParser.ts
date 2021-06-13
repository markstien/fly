import { path, ContentType } from "../interfaces";
import { contentTypeIncluded } from "./utils";
import {
    TextPlain,
    MultipartFromDate,
    ApplicationXWWWFromUrlencoded,
    ApplicationJson
} from "./interfaces";

export const getParams = (path:path) => {
    const lastSlash = path.lastIndexOf("/");
    const paramsString = path.substring(lastSlash+1);
    if(paramsString===""){
        return null;
    }
    //以“？”分割
    const question = paramsString.split("?")[1];
    //以“&”分割
    const versus = question.split("&");
    //以“=”分割
    return versus.map(v => {
        const result = Object();
        const s = v.split("=");
        result[s[0]] = s[1];

        return result;
    })
}

const typeHandleMap = new Map([
    [TextPlain,(data:string) =>{}],
    [MultipartFromDate,()=>{}],
    [ApplicationXWWWFromUrlencoded,()=>{}],
    [ApplicationJson,()=>{}]
])

export const textPlain = (string: String) => {
    const result = Object();
    //以“\r\n”划分
    const str = string.trim().split(`\\r\\n`);
    //以“=”划分
    const params = str.map( s=> {
        if(s!==""){
          return s.split("=");
        }
    });

    const length = params.length;

    for (let i=0;i<length;i++){
        const param = params[i];
        if(param!==undefined){
            const key = param[0];
            const value = param[1];
            result[key] = value;
        }
    }

    return result;
};

export const getData = (contentType: ContentType,body: string) => {
    const type = contentTypeIncluded(contentType);
    if(type===""){
        return "default"
    }

};


/**
 * Tests
 */
const paths = [
    "/vip/height/user?name=hama",
    "/",
    "/?a=a",
    "/user?name=name&password=password",
    "/vip/user/"
]
/*
paths.map( path => {
    console.log(getParams(path));
})*/


//getData("text/plain", 'name=name\\r\\npassword=password\\r\\n');

//textPlain('name=name\r\npassword=password\r\n');
