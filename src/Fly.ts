import net from 'net';
import { requestParser } from './httpParser/requestParser';
import { Router, StaticRoutingDTO } from './Router/Router';
import { ResponseInstance, Socket } from './Response/Response';
import { Module } from './index';

export class Fly {
  private router = new Router();
  private port: number | undefined;
  private readonly server: net.Server;
  private CROSEnabled = false;

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
        this.CROSEnabled ? response.enableCROS() : '';
        this.router.handle(request, response);
      });

      socket.on('close', (hadError) => {
        if (hadError) {
          console.log('socket关闭有误:', hadError);
        }
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

  /**
   * 开启跨域
   */
  enableCROS() {
    this.CROSEnabled = true;
  }

  addStatic(staticRouting: StaticRoutingDTO) {
    this.router.addStatic(staticRouting);
  }
}
