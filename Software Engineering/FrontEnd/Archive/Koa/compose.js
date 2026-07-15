// koa 中间件引擎
export function compose(middleware) {
  // 中间件必须存放在一个数组
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!');
  }

  return function (ctx, next) {
    let index = -1;

    return dispatch(0);

    function dispatch(i) {
      if (i < index) {
        return Promise.reject(new Error('next() called multiple times'));
      }

      index = i;

      let fn = middleware[i];

      if (i === middleware.length) {
        fn = next;
      }

      if (!fn) {
        return Promise.resolve();
      }

      try {
        return Promise.resolve(
          fn(ctx, () => {
            return dispatch(i + 1);
          })
        );
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}

// 测试
let middleware = [];
let context = {
  data: [],
};

middleware.push(async (ctx, next) => {
  console.log('action 001');
  ctx.data.push(2);
  await next();
  console.log('action 006');
  ctx.data.push(5);
});

middleware.push(async (ctx, next) => {
  console.log('action 002');
  ctx.data.push(2);
  await next();
  console.log('action 005');
  ctx.data.push(5);
});

middleware.push(async (ctx, next) => {
  console.log('action 003');
  ctx.data.push(2);
  await next();
  console.log('action 004');
  ctx.data.push(5);
});

const fn = compose(middleware);

fn(context).then(() => {
  console.log('end');
  console.log('context = ', context);
});
