import { Method, Module, Request, Routing } from '../index';
import { Response } from '../index';
import * as fs from 'fs';
import { fileExtensionHeaderMap, getFileExt } from './fileExtensionHeaderMap';
import { access, readFile } from 'fs/promises';
import { getLogger } from 'log4js';

export type path = string;
export type absolutePath = string;
export type StaticRoutings = Map<path, absolutePath>;

export interface StaticRoutingDTO {
  path: string;
  absolutePath: string;
}

export function findRouting(
  method: Method,
  path: string,
  routingList: Routing[],
) {
  const length = routingList.length;
  for (let i = 0; i < length; i++) {
    //找到对应的路由
    if (method === routingList[i].method && path === routingList[i].path) {
      return routingList[i];
    }
  }
  //没有对应的路由
  return null;
}

const defaultOptionsRouting: Routing = {
  method: 'OPTIONS',
  path: '*',
  handler(request: Request, response: Response) {
    response.addHeader('Allow', 'POST');
    response.addHeader('Access-Control-Allow-Headers', '*');
    response.addHeader('Access-Control-Allow-Origin', '*');
    response.sendText(undefined);
  },
};

async function staticHandler(
  absolutePath: string,
  request: Request,
  response: Response,
) {
  if (absolutePath) {
    try {
      await access(absolutePath, fs.constants.R_OK);
      const data = await readFile(absolutePath);

      const fileExt = getFileExt(absolutePath);
      const contentType = fileExtensionHeaderMap.get(fileExt);

      if (contentType) {
        response.addHeader('Content-Type', contentType);
      }

      response.send(data);
    } catch (e) {
      //404
      response.sendText('没有相关文件！', 'Not Found', 404);
    }
  } else {
    //404
    response.sendText('没有相关文件！', 'Not Found', 404);
  }
}

export function isFile(path: string) {
  return path.substr(path.lastIndexOf('/')).includes('.');
}

/**
 *
 * @param requestPath  url请求路径
 * @param staticRoutings
 * @return 文件绝对路径 | undefined
 */
export function findStaticRouting(
  requestPath: path,
  staticRoutings: StaticRoutings,
) {
  const paths = Array.from(staticRoutings.keys());
  const length = paths.length;

  for (let i = 0; i < length; i++) {
    const staticPath = paths[i];
    if (requestPath.includes(staticPath)) {
      const subRequestPath = '/' + requestPath.substr(staticPath.length);
      const starts = staticRoutings.get(staticPath);
      if (isFile(subRequestPath)) {
        return starts + subRequestPath;
      } else {
        if (subRequestPath.endsWith('/')) {
          return starts + subRequestPath + 'index.html';
        } else {
          return starts + subRequestPath + '/index.html';
        }
      }
    }
  }
  //不存在路由
  return undefined;
}

export class Router {
  private routingList: Routing[] = [];
  private staticRoutings: StaticRoutings = new Map<path, absolutePath>();
  private logger = getLogger();

  constructor() {
    this.logger.level = 'debug';
  }

  async handle(request: Request, response: Response) {
    const { method, path } = request;

    if (method == 'OPTIONS') {
      defaultOptionsRouting.handler(request, response);
      return;
    }

    const absolutePath = findStaticRouting(path, this.staticRoutings);
    if (absolutePath) {
      await staticHandler(absolutePath, request, response);
      return;
    }

    const routing = findRouting(method, path, this.routingList);
    if (routing) {
      routing.handler(request, response);
      return;
    } else {
      console.log('no routing for: ' + path);
    }
  }

  addMany(modules: Module[]) {
    modules.map((module) => {
      const routings = Object.values(module);
      this.routingList.push(...routings);
    });

    this.logger.mark('接口');
    this.routingList.map((routing) =>
      this.logger.info(routing.method, routing.path),
    );
  }

  addStatic(staticRouting: StaticRoutingDTO) {
    this.logger.info(staticRouting.path, staticRouting.absolutePath);
    this.staticRoutings.set(staticRouting.path, staticRouting.absolutePath);
  }
}
