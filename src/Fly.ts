import net from 'net';
import { httpParser } from './httpParser/httpParser';
import { Router } from "./Router";

export class Fly {
    public router = new Router();
    private  PORT:number = 9090
    private server:net.Server

    constructor() {
        this.server = net.createServer();

        this.server.on('connection',(socket) => {
            socket.setEncoding('binary');
            socket.on('data',(data) => {
                //console.log(data);
                const request = httpParser(JSON.stringify(data));
                this.router.handle(request);

                //todo 路由
                socket.write(`HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 5
Access-Control-Allow-Origin:*
Access-Control-Allow-Headers:*

hello`);
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
