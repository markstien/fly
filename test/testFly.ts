import { Fly } from "../src/Fly";

const fly =new Fly();

fly.run(8080,(port) =>
    console.log(`Fly服务器运行在:http://localhost:${port}`)
);
