import { getPath } from '../../src/httpParser/requestParser';

test('获取请求路径', () => {
  expect(getPath('/')).toBe('/');
  expect(getPath('/?/???a=1')).toBe('/?/??');
});
