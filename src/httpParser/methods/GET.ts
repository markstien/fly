/**
 * 获取GET请求参数
 * @param path
 */
export const getParams = (path: string) => {
    const result = new Map<any, any>();

    const lastSlash = path.lastIndexOf("/");
    const paramsString = path.substring(lastSlash + 1);

    if (paramsString === "") {
        return undefined;
    }

    //以“？”分割
    const question = paramsString.split("?")[1];
    if (!question) {
        return undefined;
    }

    //以“&”分割
    const versus = question.split("&");
    //以“=”分割
    const length = versus.length;
    for (let i = 0; i < length; i++) {
        const s = versus[i].split("=");
        result.set(s[0], s[1]);
    }

    return result
};



