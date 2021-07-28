import { Response } from './httpParser/response'

type Method = "GET" | "POST" | "OPTIONS";

type Headers = Map<any,any>;

export interface Request {
    method:Method,
    path:string,
    params?:Map<any,any>,
    body?:string,
    headers:Headers,
    httpVersion:string
}

/**
 * 路由规则
 */
interface Routing {
    method:Method
    path:string | "*"
    handler(request: Request, response: Response):void
}

