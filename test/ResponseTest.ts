import { headerToMessage, DefaultHeader, ResponseInstance } from "../src/httpParser/Response";

/**
 * 报文拼接
 */
const DefaultHeaderResult = "HTTP/1.1 200 OK\r\nContent-Type:text/plain\r\nContent-Length:5\r\n\r\n12345";
const defaultHeader = new DefaultHeader();
defaultHeader.body = "12345";
console.assert(
    JSON.stringify(headerToMessage(defaultHeader))===JSON.stringify(DefaultHeaderResult),
    "header转换成http响应报文::没有通过测试"
);

/**
 * addHeader测试
 */
const DefaultHeaderResult1 =
    "HTTP/1.1 200 OK\r\n" +
    "Content-Type:text/plain\r\n" +
    "Content-Length:5\r\n" +
    "x-poweredBy:your-name\r\n"+
    "\r\n12345";
const response = ResponseInstance((text:string)=>{
    console.assert(
        JSON.stringify(DefaultHeaderResult1)===JSON.stringify(text),
        "addHeader测试失败"
    )
} );
response.addHeader("x-poweredBy","your-name");
response.sendText("12345")

/**
 * 同时添加多个header测试
 */

const DefaultHeaderResult2 =
    "HTTP/1.1 200 OK\r\n" +
    "Content-Type:text/plain\r\n" +
    "Content-Length:5\r\n" +
    "A:a\r\n"+
    "B:b\r\n"+
    "C:c\r\n"+
    "D:d\r\n"+
    "E:e\r\n"+
    "F:f\r\n"+
    "\r\n12345";
const headers = new Map<any,any>([
    ["A","a"],
    ["B","b"],
    ["C","c"],
    ["D","d"],
    ["E","e"],
    ["F","f"]
]);

const response2 = ResponseInstance((text:string)=>{
    console.log(text);
    console.assert(
        JSON.stringify(DefaultHeaderResult2)+1===JSON.stringify(text),
        "同时添加多个header测试"
    )
} );
response2.headers(headers);
response2.sendText("12345")

