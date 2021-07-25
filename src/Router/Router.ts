import {Method, Request, Routing } from "../interface";
import { Response } from '../httpParser/response'
import * as fs from "fs";
import {fileExtensionHeaderMap, getFileExt} from "./fileExtensionHeaderMap";

interface StaticPath {
    path:string,
    absolutePath:string
}

export function findRouting(method:Method, path:string,routingList: Routing[]) {
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

export function findAbsolutePath(path:string,staticRoutings:Map<string,string>):string |undefined{
    for (let entry of Array.from(staticRoutings.entries())) {
        let key = entry[0];//path
        let value = entry[1];//absolutePath

        if (path===key || path===key+"/"){
            return value;
        } else if(path.startsWith(key+"/")){
            return value+path.substring(key.length)
        }
    }
    return undefined;
}

/**
 *
 * @param path 路由路径 如 /static/a/b/c.jpg
 * @param staticRoutings 路由规则
 * @return
 */
export function isStaticRouter(path:string,staticRoutings:Map<string,string>):boolean {
    const paths = Array.from(staticRoutings.keys());
    for (let i=0;i<paths.length;i++){
        if(path===paths[i]||path===paths[i]+"/"||path.startsWith(paths[i]+"/")){
            return true
        }
    }
    return false;
}

export class Router {
    private routingList: Routing[] = [];
    private staticRoutings = new Map<string,string>();

    handle(request: Request, response:Response) {
        const { method, path } = request;
        if(isStaticRouter(path,this.staticRoutings)){
           this.staticHandle(request, response);
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

    staticRouter(staticPath: StaticPath){
       this.staticRoutings.set(staticPath.path,staticPath.absolutePath);
    }

    staticHandle(request: Request, response:Response) {
        const { path } = request;
        const absolutePath = findAbsolutePath(path,this.staticRoutings);

        if(absolutePath){
            fs.readFile(absolutePath,(error,data) => {
                if(!error){
                    const fileExt = getFileExt(absolutePath);
                    const contentType = fileExtensionHeaderMap.get(fileExt);

                    if(contentType){
                        response.addHeader("Content-Type",contentType);
                    }
                    response.send(data);
                }else {
                    //503
                }
            });
        }else {
            //404
        }
    }
}
