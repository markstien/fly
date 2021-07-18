import { isStaticRouter } from "../src/Router";

const staticRoutings = [
    "/static"
]

//console.assert(isStaticRouter("/static/", "", staticRoutings));
console.assert(isStaticRouter("static/", "", staticRoutings));
console.assert(isStaticRouter("static", "", staticRoutings));
