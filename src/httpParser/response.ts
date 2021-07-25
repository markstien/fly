/**
 * 拼接响应http报文
 */
import { Headers } from "../interface";

export interface Socket {
    write(data: any): void;
    end(): void;
}

export interface Response {
    addHeader(key:string,value:string):void
    addHeaders(header: Headers):void
    sendText(text:string,status?:string,code?:number):void
    send(body:any):void
}

/**
 * 默认报文，数据类
 */
export class DefaultHeader {
    public code:number =200;
    public status:string = "OK";
    public httpVersion:string = "HTTP/1.1";
    public headers:Headers = new Map<any, any>();

    constructor() {
        this.headers.set("Content-Type","text/plain; charset=UTF-8");
    }
}

/**
 * 将DefaultHeader类转换成响应报文
 * @param defaultHeader
 */
export function spliceHeader(defaultHeader: DefaultHeader){
    let string = `${defaultHeader.httpVersion} ${defaultHeader.code} ${defaultHeader.status}\r\n`;
    defaultHeader.headers.forEach( (value, key) => {
        string+=`${key}:${value}\r\n`;
    })
    return string;
}

export function ResponseInstance(socket: Socket):Response {
    const defaultHeader = new DefaultHeader();

    function addHeader(key:string,value:string) {
        defaultHeader.headers.set(key,value);
    }

    function addHeaders(header: Headers) {
        header.forEach( (value,key) =>{
            defaultHeader.headers.set(key,value);
        })
    }

    function sendText(text:string,status?:string,code?:number){
        if(status){
            defaultHeader.status = status;
        }
        if(code){
            defaultHeader.code = code;
        }
        defaultHeader.headers.set("Content-Length",Buffer.byteLength(text,'utf-8'));
        socket.write(spliceHeader(defaultHeader)+
            "\r\n"+
            text);
        socket.end();
    }

    function send(body:any) {
        defaultHeader.headers.set('Content-Length',body.length);

        socket.write(`${spliceHeader(defaultHeader)}`);
        socket.write(`\r\n`);

        socket.write(body);

        socket.end();
    }

    return { addHeader, addHeaders,sendText, send }
}
