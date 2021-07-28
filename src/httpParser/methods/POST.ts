/**
 * post请求常见的几种content-type
 */
import * as URL from "url";

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

export function handleXWWWForm(body: string): Handle {
    const str = decodeURIComponent(body);
    //

    return Object;
}

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
