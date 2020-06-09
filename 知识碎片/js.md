# 节流和防抖

## 防抖
**防抖：就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。**
```C
function debounce(func, wait) {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      if(timeout)clearTimeout(timeout);
      timeout=setTimeout(()=>{
        func.apply(this,args)
      },wait)
    }
}
```

## 节流
**所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。**
```C
function throttle(func, wait) {
    let previous = 0;
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
  }
```
