/**
 * server.route.add({
 *     method,
 *     path,
 *     params||data 结构类型
 * })
 */

import {Method, Request, Routing} from "./interface";

function findRouting(method:Method, path:string,routingList: Routing[]) {
    const length = routingList.length;

    for (let i=0;i<length;i++){
        if( method === routingList[i].method && path === routingList[i].path){
            return routingList[i];
        }
    }
}

export class Router {
    private routingList: Routing[] = [];

    handle(request: Request) {
        const { method, path } = request;
        const routing = findRouting(method,path,this.routingList);
        if(routing){
            routing.handler(request);
        }
    }

    add(routing: Routing){
        this.routingList.push(routing)
    }
}
