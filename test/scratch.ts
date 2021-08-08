const a = `{
  "id": "1",
  "name": "dog-1"
}`;

const b = JSON.stringify(a);

const c = b.replace(/(\\n)/g, '');

//const d = c.replace(/(\\)/g, '');

console.log(JSON.parse(c));
