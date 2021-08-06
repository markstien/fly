import { fly } from '../src';
import { Request, Routing, Response } from '../src';
import { cgi } from '../src/cgi';

const firstRouting: Routing = {
  method: 'GET',
  path: '/',
  async handler(request: Request, response: Response) {
    //await sleep(10);
    response.sendText('Hello,world!');
  },
};

fly.router.staticRouter({
  path: '/static',
  absolutePath: 'D:/Fly/demo/static',
});

fly.router.add({
  path: '/cgi',
  method: 'GET',
  handler(request: Request, response: Response) {
    cgi({ FUCK: 'hama' }, 'D:/Fly/test/cgi_cgi.exe')
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((e) => {
        response.sendText(e);
      })
      .catch(() => response.sendText('501内部错误', '501 internal error', 501));
  },
});

fly.router.add(firstRouting);

fly.router.add({
  method: 'POST',
  path: '/',
  handler(request: Request, response: Response) {
    console.log(request.body);
    response.addHeader('Access-Control-Allow-Origin', '*');
    response.sendText('Hello!');
  },
});

fly.run(8080, (port) =>
  console.log(`Fly服务器运行在:http://localhost:${port}`),
);
