import { Fly } from "../src/Fly";
import { Request, Routing } from "../src/interface";
import { Response } from "../src/httpParser/Response";

const fly =new Fly();

const firstRouting:Routing = {
    method:"GET",
    path:"/aaa",
    handler(request: Request,response: Response) {
        response.sendText("Hello,world!");
    }
}

fly.router.add(firstRouting);

fly.run(8080,(port) =>
    console.log(`Fly服务器运行在:http://localhost:${port}`)
);
