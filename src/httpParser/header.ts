/**
 * 解析http报文头部（header）
 * @param headLines 以换行分组后的http报文头部
 * @return Headers header 键值
 */
export const headersMap = (headLines: string[])=>{
    const headerLines = headLines.map( (line:string) => {
        const [header,...content] = line.split(':');
        if(header==="Host"||header==="host"){
            return {
                header,
                content:`${content[0]}:${content[1]}`
            }
        }

        return { header, content: content.toString() }
    });
    const headers = Object();
    const length = headerLines.length;

    for (let i=0; i<length;i++){
        const { header, content } = headerLines[i];
        headers[header] = content;
    }
    return headers;
}
