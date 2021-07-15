import { headerToSting, DefaultHeader } from "../src/httpParser/Response";

const DefaultHeaderResult = "HTTP/1.1 200 OK\r\nContent-Type:text/plain\r\nContent-Length:5\r\n\r\n12345";
const defaultHeader = new DefaultHeader();
defaultHeader.body = "12345";

console.assert(
    JSON.stringify(headerToSting(defaultHeader))===JSON.stringify(DefaultHeaderResult),

);

