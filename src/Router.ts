/**
 * server.route.add({
 *     method,
 *     path,
 *     params||data 结构类型
 * })
 */

interface Request {
    path:string
    // @ts-ignore
    headers: object
    body?:string
}

interface RouterInterface {
    method:string
    path:string
    handler(request: Request):void
}

interface RouteHandlerInterface {
    handlers:Request[]
    add(router:RouterInterface):void
}

class Router implements RouteHandlerInterface {
    handlers: Request[];

    add(router: RouterInterface): void {
    }

}

