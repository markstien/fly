import net from 'net';
import { httpParser } from './httpParser/httpParser';
import { Router } from "./Router";
import { ResponseInstance } from "./httpParser/Response";

export class Fly {
    public router = new Router();
    private PORT:number = 9090
    private server:net.Server

    constructor() {
        this.server = net.createServer();

        this.server.on('connection',(socket) => {
            socket.setEncoding('binary');
            socket.on('data',(data) => {
                const socketWrite = (text:string) => {
                    socket.write(text);
                }
                const request = httpParser(JSON.stringify(data));
                const response = ResponseInstance(socketWrite);
                this.router.handle(request,response);
            });

            socket.on('close',(hadError) => {
                console.log('socket关闭是否有误:',hadError);
            })

            socket.on('error',(error) => {
                console.log('socket-error',error);
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
