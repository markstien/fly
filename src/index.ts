import { Fly } from './Fly';
import { Socket } from './httpParser/response';
export * from './cgi/index';

/**
 * 现阶段支持的http方法
 */
export type Method = 'GET' | 'POST' | 'OPTIONS';
/**
 * http请求头格式
 */
export type Headers = Map<any, any>;

export interface Response {
  addHeader(key: string, value: string): void;
  addHeaders(header: Headers): void;
  sendText(text: string | undefined, status?: string, code?: number): void;
  send(body: any): void;
  socket: Socket;
}

export interface Request {
  method: Method;
  path: string;
  params?: ParamResultInterface;
  body?: string;
  headers: Headers;
  httpVersion: string;
}

/**
 * 请求参数（例如：{a:'1',b:'2'}）
 */
export interface ParamResultInterface {
  [key: string]: any;
}
/**
 * 路由规则
 */
export interface Routing {
  method: Method;
  path: string | '*';
  handler(request: Request, response: Response): void;
}
/**
 * 多条路由规则
 */
export interface Module {
  [key: string]: Routing;
}

export function createFly(modules: Module[]) {
  return new Fly(modules);
}
