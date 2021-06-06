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
        return {};
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
    [TextPlain,() =>{}],
    [MultipartFromDate,()=>{}],
    [ApplicationXWWWFromUrlencoded,()=>{}],
    [ApplicationJson,()=>{}]
])

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


getData(
    "application/json",
    ""
);
