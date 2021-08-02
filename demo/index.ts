import { fly } from '../src';
import { Request, Routing, Response } from '../src';

async function sleep(ms: number) {
  return new Promise<void>((resolve: () => void) => {
    setTimeout(function () {
      resolve();
    }, ms * 1000);
  });
}

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
