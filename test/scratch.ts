import { getBodyParam } from '../src/httpParser/methods/POST';

console.log(
  getBodyParam('{\\"a\\":\\"1\\",\\"b\\":\\"2\\"}', 'application/json'),
);
