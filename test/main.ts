import { Buffer } from 'buffer';

const str = '服务器内部错误';

console.log(`${str}: ${str.length} characters, ` +
    `${Buffer.byteLength(str, 'utf8')} bytes`);
// Prints: ½ + ¼ = ¾: 9 characters, 12 bytes
