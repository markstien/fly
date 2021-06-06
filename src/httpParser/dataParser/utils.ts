import { ContentTypeList } from "./interfaces";
import { ContentType } from "../interfaces";

export const contentTypeIncluded = (contentType:ContentType) => {
    const length = ContentTypeList.length;

    for(let i=0;i<length;i++){
        const target = ContentTypeList[i];
        if(contentType.includes(ContentTypeList[i])){
            return target;
        }
    }
    return "";
}

/**
 * Test
 */

//console.log(isContentTypeIncluded("application/json;charset=utf-8"));
