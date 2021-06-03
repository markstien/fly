import net from 'net';
import parser from './src/httpParser';

const PORT = 8080;

const server = net.createServer();

server.on('connection',(socket) => {
    //创建
    console.log('客户端：',socket.remoteAddress);

    socket.setEncoding('binary');

    socket.on('data',(data) => {
        console.log(JSON.stringify(data));
        const { method, path, headers } = parser(JSON.stringify(data));
        console.log(headers);

        socket.write(`HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 5

hello`);
    });

    socket.on('close',(hadError) => {
        console.log('socket关闭是否有误:',hadError);
    })

    socket.on('error',(error) => {
        console.log('socket-error',error);
    })
})

server.on('error',(error) => {
    console.log("server-error",error);
})

server.listen(PORT);

server.on('listening', () => {
    // @ts-ignore
    const { port } = server.address();
    console.log(`Fly服务器运行在 http://localhost:${port}`);
})
