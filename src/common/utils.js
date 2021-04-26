//防抖函数，将函数封装成防抖函数
export function debounce(fun, delay = 500) {
  let timer = null;
  //返回包装好的函数
  return function(...args) {
    //清除上一次执行
    if (timer) {
      clearTimeout(timer);
    }
    //创建本次执行
    timer = setTimeout(() => {
      fun.apply(this, args);
    }, delay);
  };
}
