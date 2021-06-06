import { Request } from "./interfaces";
import { headersMap } from "./header";

const httpParser = (data:String):Request => {
    const httpMessage = data.substring(1,data.length-1);

    const [head,...body] =  httpMessage.split('\\r\\n\\r\\n');
    const [firstLine,...otherLines] = head.toString().split('\\r\\n');

    const [method,path,httpVersion] = firstLine.trim().split(' ');
    const headers = headersMap(otherLines);

    return { method, path, httpVersion, headers };
};

export default httpParser


/**
 * Tests
 */

const httpParserTest = () => {
    const str = `GET /aa?a=1&b=2 HTTP/1.1
Host: localhost:8080
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: zh-CN,en-US;q=0.7,en;q=0.3
Accept-Encoding: gzip, deflate
Connection: keep-alive
Upgrade-Insecure-Requests: 1`;
    const r = httpParser(str);

    console.log(r);
}
//httpParserTest();




