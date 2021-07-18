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

function staticHandle(request: Request, response:Response) {
    //todo 1.获取路径
    // 2.查找文件
    // 3.返回文件
    const { path } = request;

    console.log(path);
    response.sendText("static")
}

/**
 *
 * @param path 路由路径 如 /static/a/b/c.jpg
 * @param root 文件夹绝对路径 D:a/b/c/
 * @param staticRoutings 路由规则
 */
export function isStaticRouter(path:string,root:string="",staticRoutings:Array<string>):boolean {
    const length = staticRoutings.filter( staticRouting => path.startsWith(staticRouting+"/")).length;
    return  length>0;
}

export class Router {
    private routingList: Routing[] = [];
    private staticRoutings:Array<string> = [];

    handle(request: Request, response:Response) {
        const { method, path } = request;
        if(this.staticRoutings.includes(path)){
           staticHandle(request, response);
        }else {
            const routing = findRouting(method,path,this.routingList);
            if(routing){
                routing.handler(request,response);
            }
        }
    }

    add(routing: Routing){
        this.routingList.push(routing)
    }

    staticRouter(path:string,root:string=""){
        this.staticRoutings.push(path);
    }
}
