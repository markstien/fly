/**
 * 拼接响应http报文
 */
import { Header } from "../interface";

export interface Response {
    addHeader(key:string,value:string):void
    addHeaders(header: Header):void
    sendText(text:string):void
    send(body:any):void
}

/**
 * 默认报文，数据类
 */
export class DefaultHeader {
    public status:number =200;
    public httpVersion:string = "HTTP/1.1";
    public headers:Header = new Map<any, any>();

    constructor() {
        this.headers.set("Content-Type","text/plain");
    }
}

/**
 * 将DefaultHeader类转换成响应报文
 * @param defaultHeader
 */
export function spliceHeader(defaultHeader: DefaultHeader){
    let string = `${defaultHeader.httpVersion} ${defaultHeader.status} OK\r\n`;
    defaultHeader.headers.forEach( (value, key) => {
        string+=`${key}:${value}\r\n`;
    })
    return string;
}

export function ResponseInstance(socketWrite:(text:any)=>void):Response {
    const defaultHeader = new DefaultHeader();

    function addHeader(key:string,value:string) {
        defaultHeader.headers.set(key,value);
    }

    function addHeaders(header: Header) {
        header.forEach( (value,key) =>{
            defaultHeader.headers.set(key,value);
        })
    }

    function sendText(text:string){
        socketWrite(spliceHeader(defaultHeader));
        socketWrite(`\r\n`);
        socketWrite(text);
    }

    function send(body:any) {
        socketWrite(`HTTP/1.1 200 OK\r\n`);
        socketWrite(`Content-Type:image/jpeg\r\n`);
        socketWrite(`Content-Length:1384\r\n`);
        socketWrite(`\r\n`);
        socketWrite(body);
    }

    return { addHeader, addHeaders,sendText, send }
}
