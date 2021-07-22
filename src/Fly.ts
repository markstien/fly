import net from 'net';
import { requestParser } from './httpParser/requestParser';
import { Router } from "./Router";
import { ResponseInstance } from "./httpParser/response";

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
                const request = requestParser(JSON.stringify(data));
                const response = ResponseInstance(socketWrite);
                this.router.handle(request,response);
                socket.end();
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
