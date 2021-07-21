import net from 'net';
import { httpParser } from './httpParser/httpParser';
import { Router } from "./Router";
import { ResponseInstance } from "./httpParser/Response";
import * as fs from "fs";

export class Fly {
    public router = new Router();
    private PORT:number = 9090
    private server:net.Server

    constructor() {
        this.server = net.createServer();

        this.server.on('connection',(socket) => {
            const socketWrite = (data:any) => {
                socket.write(data);
            }
            socket.setEncoding('binary');
            socket.on('data',(data) => {
                const request = httpParser(JSON.stringify(data));
                const response = ResponseInstance(socketWrite);
                this.router.handle(request,response);

                /*
                fs.readFile("D:/Fly/test/static/c.jpg",(error,data) => {
                    if(!error){
                        socket.write(`HTTP/1.1 200 OK\r\n`);
                        socket.write(`Content-Type:image/jpeg\r\n`);
                        socket.write(`Content-Length:1384\r\n`);
                        socket.write(`\r\n`);
                        socket.write(data);
                        socket.end();
                    }else {
                        console.log("fuck!")
                    }
                })
                */
            });

            socket.on('close',(hadError) => {
                console.log('socket关闭是否有误:',hadError);
            })

            socket.on('error',(error) => {
                console.log('socket错误：',error);
            })
        })

        this.server.on('error',(Error) => {
            throw Error;
        })
    }

    run(port: number, callback: (port: number) => void): void {
        this.PORT = port;
        this.server.listen(this.PORT);
        this.server.on('listening', ()=>callback(this.PORT));
    }
}
