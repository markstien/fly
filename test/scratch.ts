import { requestParser } from "../src/httpParser/requestParser";


const request = requestParser(`"POST / HTTP/1.1\\r\\nHost: localhost:8080\\r\\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0\\r\\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\\r\\nAccept-Language: zh-CN,en-US;q=0.7,en;q=0.3\\r\\nAccept-Encoding: gzip, deflate\\r\\nContent-Type: multipart/form-data; boundary=---------------------------171037321129054628532173553811\\r\\nContent-Length: 294\\r\\nOrigin: http://localhost:8080\\r\\nConnection: keep-alive\\r\\nReferer: http://localhost:8080/static/index.html\\r\\nCookie: Webstorm-ca8b2c1e=fab6e07e-cb14-4c0c-9021-88052164bf97; Webstorm-ca8b2c1f=ab89d8a1-e9b1-4e23-9594-c4af3b030cf9\\r\\nUpgrade-Insecure-Requests: 1\\r\\nSec-Fetch-Dest: document\\r\\nSec-Fetch-Mode: navigate\\r\\nSec-Fetch-Site: same-origin\\r\\nSec-Fetch-User: ?1\\r\\nPragma: no-cache\\r\\nCache-Control: no-cache\\r\\n\\r\\n-----------------------------171037321129054628532173553811\\r\\nContent-Disposition: form-data; name=\\"name\\"\\r\\n\\r\\nname\\r\\n-----------------------------171037321129054628532173553811\\r\\nContent-Disposition: form-data; name=\\"password\\"\\r\\n\\r\\n123\\r\\n-----------------------------171037321129054628532173553811--\\r\\n"`)
console.log(request.body);


