import { HeaderInterface, Headers } from "./interfaces";

export const headersMap = (httpLines: string[]): Headers=>{
    const headerLines:HeaderInterface[] = httpLines.map( (line:string) => {
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
