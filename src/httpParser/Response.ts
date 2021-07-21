/**
 * 拼接响应http报文
 */
import { Header } from "../interface";

export interface Response {
    addHeader(key:string,value:string):void
    headers(header: Header):void
    sendText(text:string):void
    send(body:any):void
}

/**
 * 默认报文，数据类
 */
export class DefaultHeader {
    public status:number =200;
    public httpVersion:string = "HTTP/1.1";
    public contentType:string = "text/plain";
    public body:string = "";

    public extraHeaders:Header = new Map<any, any>();
}

/**
 * header转换成http响应报文
 * @param defaultHeader
 */
export function headerToMessage(defaultHeader: DefaultHeader){
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

export function ResponseInstance(socketWrite:(text:any)=>void):Response {
    const defaultHeader = new DefaultHeader();

    function addHeader(key:string,value:string) {
        defaultHeader.extraHeaders.set(key,value);
    }

    function headers(header: Header) {
        header.forEach( (value,key) =>{
            defaultHeader.extraHeaders.set(key,value);
        })
    }

    function sendText(text:string){
        defaultHeader.body = text;
        socketWrite(headerToMessage(defaultHeader));
    }

    function send(body:any) {
        console.log("?")
        socketWrite(`HTTP/1.1 200 OK\r\n`);
        socketWrite(`Content-Type:image/jpeg\r\n`);
        socketWrite(`Content-Length:1384\r\n`);
        socketWrite(`\r\n`);
        socketWrite(body);
    }

    return { addHeader, headers,sendText, send }
}
