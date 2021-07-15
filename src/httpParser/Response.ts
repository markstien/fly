/**
 * 拼接响应http报文
 */

`HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 5
Access-Control-Allow-Origin:*
Access-Control-Allow-Headers:*

hello`

import { Header } from "../interface";

interface ResInterface {
    addHeader(header: Header):void
    Headers(headers: Header[]):void
    sendText(text:string):void
}

export class DefaultHeader {
    public status:number =200;
    public httpVersion:string = "HTTP/1.1";
    public contentType:string = "text/plain";
    public body:string = "";

    public extraHeaders:Header = new Map<any, any>();
}

export function headerToSting(defaultHeader: DefaultHeader){
    let string = `${defaultHeader.httpVersion} ${defaultHeader.status} OK\r\n`;
    string+=`Content-Type:${defaultHeader.contentType}\r\n`;
    string+=`Content-Length:${defaultHeader.body.length}\r\n`;
    defaultHeader.extraHeaders.forEach( (value, key) => {
        string+=`${key}:${value}\r\n`;
    })
    string+=`\r\n`;
    string+=`${defaultHeader.body}`;

    return string;
}

function response():ResInterface {
    const defaultHeader = new DefaultHeader();

    return {
        addHeader(header: Header) {
        },
        Headers(headers: Header[]) {
        },
        sendText(text: string) {
        }
    }
}

export const Response = response();
