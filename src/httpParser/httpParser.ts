import { Request } from "./interfaces";
import { headersMap } from "./header";

export const httpParser = (data:String):Request => {
    const httpMessage = data.substring(1,data.length-1);

    const [head,...body] =  httpMessage.split('\\r\\n\\r\\n');
    const [firstLine,...otherLines] = head.toString().split('\\r\\n');

    const [method,path,httpVersion] = firstLine.trim().split(' ');
    const headers = headersMap(otherLines);

    return { method, path, httpVersion, headers, body };
};



