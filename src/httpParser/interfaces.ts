export interface HeaderInterface {
    header: string,
    content: string
}

export interface Request {
    method:string,
    path:string,
    params?:string,
    body?:string[],
    headers:Headers,
    httpVersion:string
}

export type Headers = Map<string,string>

export type path = string;

export type ContentType = string;

