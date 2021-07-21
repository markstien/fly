import { spliceHeader, DefaultHeader, ResponseInstance } from "../src/httpParser/Response";

function spliceHeaderTest() {
    const DefaultHeaderResult =
        "HTTP/1.1 200 OK\r\n" +
        "Content-Type:text/plain\r\n" +
        "Content-Length:5\r\n";
    const defaultHeader = new DefaultHeader();

    console.assert(
        JSON.stringify(spliceHeader(defaultHeader))===JSON.stringify(DefaultHeaderResult),
        "spliceHeaderTest:failed."
    );
}

function addHeaderTest() {
    const DefaultHeaderResult1 =
        "HTTP/1.1 200 OK\r\n" +
        "Content-Type:text/plain\r\n" +
        "Content-Length:5\r\n" +
        "x-poweredBy:your-name\r\n"+
        "\r\n"+
        "123";
    const socketWrite = (data:any) => {
        console.assert(
            JSON.stringify(DefaultHeaderResult1)===JSON.stringify(data),
            "addHeaderTest:failed."
        )
    }
    const response = ResponseInstance(socketWrite);
    response.addHeader("x-poweredBy","your-name");
    response.sendText("123")
}

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

