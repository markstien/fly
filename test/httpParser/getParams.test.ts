import { getParams } from '../../src/httpParser/methods/GET';

test('获取GET参数', () => {
  expect(getParams('https://example.com/?a=1&b=2')).toStrictEqual({
    a: '1',
    b: '2',
  });
  expect(getParams('https://example.com/')).toStrictEqual(undefined);
  expect(getParams('https://example.com/?')).toStrictEqual(undefined);
  expect(getParams('https://example.com/?a=1b=2')).toStrictEqual({
    a: '1b=2',
  });
});
