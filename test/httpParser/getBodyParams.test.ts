import { getBodyParam } from '../../src/httpParser/methods/POST';

test('获取POST参数', () => {
  expect(
    getBodyParam('a=1&b=2', 'application/x-www-form-urlencoded'),
  ).toStrictEqual({
    a: '1',
    b: '2',
  });

  expect(getBodyParam('{"a":"1","b":"2"}', 'application/json')).toStrictEqual({
    a: '1',
    b: '2',
  });
});
