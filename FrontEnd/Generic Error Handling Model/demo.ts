import utils from './utils';
import utils_class from './utils-class';

// 注册错误处理程序
utils.registerErrorHandler((e) => {
  console.log('registerErrorHandler', e);
});

// 不用在单独考虑错误处理的问题了，增强代码健壮性
utils.foo(() => {
  console.log('foo');
});
utils.bar(() => {
  console.log('bar');
});

// 注册错误处理程序
utils_class.registerErrorHandler((e) => {
  console.log('registerErrorHandler', e);
});

// 不用在单独考虑错误处理的问题了，增强代码健壮性
utils_class.foo(() => {
  console.log('foo');
});
utils_class.bar(() => {
  console.log('bar');
});
