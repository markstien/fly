import { getParams } from '../../src/httpParser/methods/GET';

test('获取GET参数', () => {
  expect(getParams('/?a=1&b=2')).toStrictEqual({
    a: '1',
    b: '2',
  });
  expect(getParams('/')).toStrictEqual(undefined);
  expect(getParams('/?')).toStrictEqual(undefined);
  expect(getParams('/?a=1b=2')).toStrictEqual({
    a: '1b=2',
  });
});
