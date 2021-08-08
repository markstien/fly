import { ParamResultInterface } from '../../index';

/**
 * 获取GET请求参数
 * @param path http path
 */
export const getParams = (path: string): ParamResultInterface | undefined => {
  const result: ParamResultInterface = {};
  const lastSlash = path.lastIndexOf('?');
  if (lastSlash === -1) {
    return undefined;
  }
  const str = path.substring(lastSlash + 1);

  if (str === '') {
    return undefined;
  }

  //以“&”分割
  const versus = str.split('&');
  //以“=”分割
  const length = versus.length;
  for (let i = 0; i < length; i++) {
    const v = versus[i];
    const firstEqualSign = v.indexOf('=');

    const key = v.substr(0, firstEqualSign);
    result[key] = v.substr(firstEqualSign + 1);
  }

  return result;
};
