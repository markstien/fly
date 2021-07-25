export type fileExtension = string;
export type contentType = string;

export const fileExtensionHeaderMap = new Map<fileExtension,contentType>([
    ["jpg","image/jpeg"],
    ["html","text/html"],
    ["txt"," text/plain"],
    ["mp4"," video/mpeg4"],
]);

export function getFileExt(absolutePath:string) {
    const afterSplit = absolutePath.split(".");
    return afterSplit[afterSplit.length-1];
}
