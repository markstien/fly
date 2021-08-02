/**
 * 解析http请求
 */
import { Headers, Method, Request } from '../index';
import { getParams } from './methods/GET';
import { getBodyParam } from './methods/POST';
/**
 * 将报文头部转换为Headers类型
 * @param headerLines 一行报文头
 */
export function parserRequestHeader(headerLines: string[]): Headers {
  const headers: Headers = new Map<any, any>();
  const length = headerLines.length;
  for (let i = 0; i < length; i++) {
    const [header, ...content] = headerLines[i].split(':');
    headers.set(header, content.toString());
  }
  return headers;
}

/**
 * 检查method是否存在
 * @param method
 */
export function methodCheck(method: string): Method {
  const meth = method.toUpperCase();
  let result = '';
  switch (meth) {
    case 'GET':
      result = 'GET';
      break;
    case 'get':
      result = 'GET';
      break;

    case 'post':
      result = 'POST';
      break;
    case 'POST':
      result = 'POST';
      break;

    case 'options':
      result = 'OPTIONS';
      break;
    case 'OPTIONS':
      result = 'OPTIONS';
      break;

    default:
      throw new Error('requestParser::methodCheck::无法解析method');
  }
  return <'GET' | 'POST'>result;
}

/**
 * 将请求报文转换成Request对象
 * @param message
 */
export const requestParser = (message: string): Request => {
  //去掉头尾的引号
  const httpMessage = message.substring(1, message.length - 1);

  const split = '\\r\\n\\r\\n';
  const half = httpMessage.indexOf(split);
  const head = httpMessage.substr(0, half);
  const body = httpMessage.substr(half + split.length);

  const [firstLine, ...otherLines] = head.toString().split('\\r\\n');
  const [method, path, httpVersion] = firstLine.trim().split(' ');

  const headers = parserRequestHeader(otherLines);
  //GET参数
  const GETParams = getParams(path);
  //POST参数
  const POSTParams = getBodyParam(body, headers.get('Content-Type'));

  return {
    method: methodCheck(method),
    path,
    httpVersion,
    headers,
    body: POSTParams,
    params: GETParams,
  };
};
