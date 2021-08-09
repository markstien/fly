import { createFly, Response, Request } from '../src';

async function fly() {
  const app = createFly([
    {
      getHello: {
        path: '/',
        method: 'GET',
        handler(request: Request, response: Response) {
          response.sendText('hello');
        },
      },
      postA: {
        path: '/',
        method: 'POST',
        handler(request: Request, response: Response) {
          console.log('params:', request.body);
          response.sendText('hello');
        },
      },
    },
    {
      getHello: {
        path: '/a',
        method: 'GET',
        handler(request: Request, response: Response) {
          response.sendText('hello');
        },
      },
      postA: {
        path: '/a',
        method: 'POST',
        handler(request: Request, response: Response) {
          console.log('params:', request.body);
          response.sendText('hello');
        },
      },
    },
  ]);
  await app.start();
  console.log('http://localhost/');
}

fly();
