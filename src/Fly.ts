import net from 'net';
import parser from './httpParser';

export interface FlyInterface {
    run(port:number,callback:(port:number)=>void):void
}

class Fly implements FlyInterface{
    private  PORT:number = 9090
    private server:net.Server

    constructor() {
        this.server = net.createServer();

        this.server.on('connection',(socket) => {
            socket.setEncoding('binary');
            socket.on('data',(data) => {
                const { method, path, headers } = parser(JSON.stringify(data));
                socket.write(`HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 5

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



/**
 * Test
 */
const fly =new Fly();

fly.run(8080,(port) =>
    console.log(`Fly服务器运行在:http://localhost:${port}`)
);
