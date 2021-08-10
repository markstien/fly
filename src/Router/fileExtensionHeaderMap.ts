/**
 * 文件拓展名与content-type对照
 */

export type fileExtension = string;
export type contentType = string;

export const fileExtensionHeaderMap = new Map<fileExtension, contentType>([
  ['jpg', 'image/jpeg'],
  ['html', 'text/html'],
  ['txt', ' text/plain'],
  ['mp4', ' video/mpeg4'],
  ['css', 'text/css'],
  ['js', ' application/x-javascript'],
]);

export function getFileExt(absolutePath: string): string {
  const afterSplit = absolutePath.split('.');
  return afterSplit[afterSplit.length - 1];
}
