import { Method, Request } from "../interface";
import { headersMap } from "./header";
import { getParams } from "./methods/GET";

export function methodCheck(method:string):Method {
    const meth = method.toUpperCase();
    let result = "";
    switch (meth) {
        case "GET": result = "GET"; break;
        case "POST": result = "POST"; break;
        default: throw new Error("httpParser::methodCheck::无法解析method");
    }
    return <"GET" | "POST">result
}

export const httpParser = (data:String):Request => {
    const httpMessage = data.substring(1,data.length-1);

    const [head,...body] =  httpMessage.split('\\r\\n\\r\\n');
    const [firstLine,...otherLines] = head.toString().split('\\r\\n');

    const [ method,path,httpVersion] = firstLine.trim().split(' ');
    const params = getParams(path);
    const headers = headersMap(otherLines);


    return { method:methodCheck(method), path, httpVersion, headers, body, params };
};



