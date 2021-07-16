/**
 * server.route.add({
 *     method,
 *     path,
 *     params||data 结构类型
 * })
 */

import {Method, Request, Routing } from "./interface";
import { Response } from './httpParser/Response'

function findRouting(method:Method, path:string,routingList: Routing[]) {
    const length = routingList.length;
    for (let i=0;i<length;i++){
        //找到对应的路由
        if( method === routingList[i].method && path === routingList[i].path){
            return routingList[i];
        }
    }
    //没有对应的路由
    return null;
}

export class Router {
    private routingList: Routing[] = [];

    handle(request: Request, response:Response) {
        const { method, path } = request;
        const routing = findRouting(method,path,this.routingList);
        if(routing){
            routing.handler(request,response);
        }
    }

    add(routing: Routing){
        this.routingList.push(routing)
    }
}
