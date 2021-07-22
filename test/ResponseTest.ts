import { spliceHeader, DefaultHeader, ResponseInstance } from "../src/httpParser/Response";

function spliceHeaderTest() {
    const DefaultHeaderResult =
        "HTTP/1.1 200 OK\r\n" +
        "Content-Type:text/plain\r\n";
    const defaultHeader = new DefaultHeader();

    console.assert(
        JSON.stringify(spliceHeader(defaultHeader))===JSON.stringify(DefaultHeaderResult),
        "spliceHeaderTest:failed."
    );
}

function addHeaderTest() {
    const DefaultHeaderResult =
        "HTTP/1.1 200 OK\r\n" +
        "Content-Type:text/plain\r\n" +
        "x-poweredBy:your-name\r\n"+
        "Content-Length:5\r\n" +
        "\r\n"+
        "12345";
    const socketWrite = (data:any) => {
        console.assert(
            JSON.stringify(DefaultHeaderResult)===JSON.stringify(data),
            "addHeaderTest:failed."
        )
    }
    const response = ResponseInstance(socketWrite);
    response.addHeader("x-poweredBy","your-name");
    response.sendText("12345")
}

function addHeadersTest() {
    const DefaultHeaderResult =
        "HTTP/1.1 200 OK\r\n" +
        "Content-Type:text/plain\r\n" +
        "A:a\r\n"+
        "B:b\r\n"+
        "C:c\r\n"+
        "D:d\r\n"+
        "E:e\r\n"+
        "F:f\r\n"+
        "Content-Length:5\r\n" +
        "\r\n12345";
    const headers = new Map<any,any>([
        ["A","a"],
        ["B","b"],
        ["C","c"],
        ["D","d"],
        ["E","e"],
        ["F","f"]
    ]);
    const response = ResponseInstance((text:string)=>{
        console.assert(
            JSON.stringify(DefaultHeaderResult)===JSON.stringify(text),
            "addHeadersTest:failed."
        )
    } );

    response.addHeaders(headers);
    response.sendText("12345")
}

spliceHeaderTest();

addHeaderTest()

addHeadersTest();




