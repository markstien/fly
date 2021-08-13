import {
  findStaticRouting,
  path,
  absolutePath,
  StaticRoutings,
} from '../../src/Router/Router';

const staticRoutings: StaticRoutings = new Map<path, absolutePath>();
staticRoutings.set('/', '/static');

test('获取静态服务绝对路径', () => {
  expect(findStaticRouting('/', staticRoutings)).toBe('/static/index.html');
  expect(findStaticRouting('/a', staticRoutings)).toBe('/static/a/index.html');
  expect(findStaticRouting('/a/', staticRoutings)).toBe('/static/a/index.html');
});
