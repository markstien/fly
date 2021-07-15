import { Fly } from "../src/Fly";
import { Request, Routing, Response } from "../src/interface";

const fly =new Fly();

const firstRouting:Routing = {
    method:"GET",
    path:"/aaa",
    handler(request: Request,response: Response) {
        console.log("This is handler!");
    }
}


fly.router.add(firstRouting);


fly.run(8080,(port) =>
    console.log(`Fly服务器运行在:http://localhost:${port}`)
);
