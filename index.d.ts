import { Response } from './src/httpParser/response';
import { Fly } from './src/Fly';

type Method = 'GET' | 'POST' | 'OPTIONS';

type Headers = Map<any, any>;

export interface ParamResultInterface {
  [key: string]: any;
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
 * 路由规则
 */
interface Routing {
  method: Method;
  path: string | '*';
  handler(request: Request, response: Response): void;
}

export const fly = new Fly();
