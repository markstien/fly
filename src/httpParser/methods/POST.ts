/**
 * post请求常见的几种content-type
 */
const contentTypes = [
    "application/json",
    "application/x-www-form-urlencoded"
]

type Handle = Object | null;

/**
 * 获取post请求报文的Content-Type
 * @param contentType
 */
export function whichContentTypeContained(contentType: string): string | undefined {
    for (const ct of contentTypes) {
        if(contentType.includes(ct)){
            return ct;
        }
    }
    return undefined;
}

export function handleJson(body: string): Handle {
    try {
        return JSON.parse(body);
    }catch (e) {
        return null;
    }
}

/**
 * 解析application/x-www-form-urlencoded 格式
 * @param body
 */
export function handleXWWWForm(body: string): Handle {
    interface ResultObject {
        [key: string]: any
    }
    const result: ResultObject = {};
    const decodeBody = decodeURIComponent(body);
    //以'&'分割
    const params = decodeBody.split('&');
    const paramLength = params.length;

    for (let i=0; i<paramLength; i++){
        const [key,value] = params[i].split('=');
        result[key] = value;
    }

    return result;
}

/**
 * 未定义的body类型返回undefined
 */
export function handleUndefined(): undefined {
    return undefined;
}

const maps = new Map<any, any>([
    ["application/json",handleJson],
    ["application/x-www-form-urlencoded",handleXWWWForm],
    [undefined,handleUndefined],
]);

export function getBodyParam(body:string, contentType: string) {
    return maps.get(whichContentTypeContained(contentType))(body);
}
