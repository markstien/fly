import net from 'net';
import { requestParser } from './httpParser/requestParser';
import { Router } from './Router/Router';
import { ResponseInstance, Socket } from './httpParser/response';
import { Module } from './index';

export class Fly {
  private router = new Router();
  private port: number | undefined;
  private readonly server: net.Server;

  constructor(modules: Module[]) {
    this.router.addMany(modules);

    this.server = net.createServer();

    this.server.on('connection', (socket) => {
      const responseSocket: Socket = {
        write(data: never) {
          socket.write(data);
        },
        end() {
          socket.end();
        },
      };
      socket.setEncoding('binary');

      socket.on('data', (data) => {
        const request = requestParser(JSON.stringify(data));
        const response = ResponseInstance(responseSocket, request);
        this.router.handle(request, response);
      });

      socket.on('close', (hadError) => {
        console.log('socket关闭是否有误:', hadError);
      });

      socket.on('error', (error) => {
        console.error('socket错误：', error);
      });
    });

    this.server.on('error', (Error) => {
      throw Error;
    });
  }

  start(port = 80): Promise<void> {
    this.port = port;
    this.server.listen(this.port);
    const server = this.server;
    return new Promise((resolve) => {
      server.on('listening', resolve);
    });
  }
}
