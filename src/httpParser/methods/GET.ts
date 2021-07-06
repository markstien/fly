import { Request } from "../../interface";

const getParams = (path:string) => {
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



