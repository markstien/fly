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
    params?:string
}

/**
 * 路由规则
 */
interface Routing {
    method:string
    path:string
    handler(request: Request):void
}

interface Router {
    add(routing:Routing):void
}


class Router implements Router {
    private routingList:Routing[]=[]

    add(routing: Routing) {
      this.routingList.push(routing);
    }

    bind(path:string){
        const routingList = this.routingList.map( routing => {
           if(path === routing.path){
               return routing;
           }
        });

    }
}

