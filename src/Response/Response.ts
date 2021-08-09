/**
 * 拼接响应http报文
 */
import { Headers, Request } from '../index';
import { Response } from '../index';

export interface Socket {
  write(data: any): void;
  end(): void;
}

/**
 * 默认报文，数据类
 */
export class DefaultHeader {
  public code = 200;
  public status = 'OK';
  public httpVersion = 'HTTP/1.1';
  public headers: Headers = new Map<any, any>();

  constructor(request: Request) {
    if (!(request.method === 'OPTIONS')) {
      this.headers.set('Content-Type', 'text/plain; charset=UTF-8');
    }
  }
}

/**
 * 将DefaultHeader类转换成响应报文
 * @param defaultHeader
 */
export function spliceHeader(defaultHeader: DefaultHeader) {
  let string = `${defaultHeader.httpVersion} ${defaultHeader.code} ${defaultHeader.status}\r\n`;
  defaultHeader.headers.forEach((value, key) => {
    string += `${key}:${value}\r\n`;
  });
  return string;
}


export function ResponseInstance(socket: Socket, request: Request): Response {
  const defaultHeader = new DefaultHeader(request);

  function addHeader(key: string, value: string) {
    defaultHeader.headers.set(key, value);
  }

  function addHeaders(header: Headers) {
    header.forEach((value, key) => {
      defaultHeader.headers.set(key, value);
    });
  }

  function sendText(text: string | undefined, status?: string, code?: number) {
    if (status) {
      defaultHeader.status = status;
    }
    if (code) {
      defaultHeader.code = code;
    }
    if (text) {
      defaultHeader.headers.set(
        'Content-Length',
        Buffer.byteLength(text, 'utf-8'),
      );
      socket.write(spliceHeader(defaultHeader) + '\r\n' + text);
    } else {
      defaultHeader.headers.set('Content-Length', 0);
      socket.write(spliceHeader(defaultHeader) + '\r\n');
    }
    socket.end();
  }

  function send(body: any) {
    defaultHeader.headers.set('Content-Length', body.length);

    socket.write(`${spliceHeader(defaultHeader)}`);
    socket.write(`\r\n`);

    socket.write(body);

    socket.end();
  }

  function enableCROS() {
    defaultHeader.headers.set('Access-Control-Allow-Origin', '*');
  }

  return {
    addHeader,
    addHeaders,
    sendText,
    send,
    socket,
    enableCROS,
  };
}
