import { isStaticRouter } from "../src/Router/Router";
import { getFileExt } from "../src/Router/fileExtensionHeaderMap";
/*
const staticRoutings = new Map([
    ["/static","/D:Fly/test/static"]
])

const paths = [
    "/static",
    "/static/",
    "/static/a.jpg",
    "/static/a/b/c.jpg"
]


paths.map( path =>{
    console.assert(isStaticRouter(path,staticRoutings))
})

import { findAbsolutePath } from "../src/Router/Router";
const sts = new Map([
    ["/static","D:Fly/test/static"],
    ["/public","/D:public"]
])

const paths1 = [
    "/static",
    "/static/",
    "/static/a.jpg",
    "/static/a/b/c.jpg"
]

paths1.map( path => {
    console.log(path,findAbsolutePath(path,sts))
})
*/

function getFileExtTest() {
    const path = "D:/Fly/test/static/c.jpg";
    const expected = "jpg";
    console.assert(getFileExt(path)===expected,"getFileExt:failed.");
}
