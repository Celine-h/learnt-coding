# 观察者模式
>转载请署名。翻了一圈angular网上的文档都很少或者写的不全，之前看过angualr的中文版文档，感觉理解不了。所以个人还是真的比较比推荐看英文文档，因为这些概念都是英译过来的，英文文档就可以傻瓜式的去理解，然而翻译成中文后，只能说我中华文化太博大精深了。以下是在我自己理解的基础上罗列的中文文档

## 观察者模式的概念
**观察者模式(Obeservable)** 是一个软件设计模式；它有一个对象Obsever，称之为主体 Subject，维护一个依赖者的列表(---观察者 Observer），并且在状态变化时自动通知它们;

可观察对象是**声明式**的 —— 也就是说，虽然你定义了一个用于发布值的函数，但是在有消费者订阅它之前，这个函数并不会实际执行。 订阅之后，当这个函数执行完或取消订阅时，订阅者就会收到通知。

该模式和发布/订阅模式非常相似（但不完全一样）。

## 观察者模式的基本使用

作为发布者，你创建一个 `Observable` 的实例，其中定义了一个订阅者函数（`subscriber`）。 当有消费者调用 `subscribe()` 方法时，这个函数就会执行。 **订阅者函数**用于定义“如何获取或生成那些要发布的值或消息”。

要执行所创建的可观察对象，并开始从中接收通知，你就要调用它的 `subscribe()` 方法，并传入一个观察者（`observer`）。 这是一个` JavaScript `对象，它定义了你收到的这些消息的处理器（`handler`）。 subscribe() 调用会返回一个 `Subscription` 对象，该对象具有一个 `unsubscribe()` 方法。 当调用该方法时，你就会停止接收通知。

可见如下示意图：
![观察者模式示意图.png](../../images/观察者模式示意图.png)

下面这个例子中示范了这种基本用法，它展示了如何使用可观察对象来对当前地理位置进行更新
```bash
// Create an Observable that will start listening to geolocation updates
// when a consumer subscribes.
const locations = new Observable((observer) => {
  let watchId: number;

  // Simple geolocation API check provides values to publish
  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition((position: Position) => {
      observer.next(position);
    }, (error: PositionError) => {
      observer.error(error);
    });
  } else {
    observer.error('Geolocation not available');
  }

  // When the consumer unsubscribes, clean up data ready for next subscription.
  return {
    unsubscribe() {
      navigator.geolocation.clearWatch(watchId);
    }
  };
});

// Call subscribe() to start listening for updates.
const locationsSubscription = locations.subscribe({
  next(position) {
    console.log('Current Position: ', position);
  },
  error(msg) {
    console.log('Error Getting Location: ', msg);
  }
});

// Stop listening for location after 10 seconds
setTimeout(() => {
  locationsSubscription.unsubscribe();
}, 10000);
```


## 可观察者（observer)
订阅函数接收可观察对象通知的要实现 Observer 接口。观察者对象`Observer`定义了一些回调函数来处理可观察对象可能会发来的三种通知:

通知类型|说明
-|-
**next**|必要。用来处理每个送达值。在开始执行后可能执行零次或多次。
**error**|可选。用来处理错误通知。错误会中断这个可观察对象实例的执行过程。
**complete**|可选。用来处理执行完毕（complete）通知。当执行完毕后，这些值就会继续传给下一个处理器。

## 订阅
只有当有人订阅 `Observable` 的实例时，它才会开始发布值。 订阅时要先调用该实例的 `subscribe`() 方法，**并把一个观察者对象传给它，用来接收通知。**

>为了展示订阅的原理，我们需要创建新的可观察对象。它有一个构造函数可以用来创建新实例，但是为了更简明，也可以使用 `Observable` 上定义的一些静态方法来创建一些常用的简单可观察对象：  
`of(...items)` —— 返回一个 `Observable` 实例，它用同步的方式把参数中提供的这些值发送出来。  
`from(iterable)`—— 把它的参数转换成一个 `Observable` 实例。 该方法通常用于把一个数组转换成一个（发送多个值的）可观察对象。

下面的例子会创建并订阅一个简单的可观察对象，它的观察者会把接收到的消息记录到控制台中：

```bash
// Create simple observable that emits three values
const myObservable = of(1, 2, 3);

// Create observer object
const myObserver = {
  next: x => console.log('Observer got a next value: ' + x),//接收送达值
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

// Execute with the observer object
myObservable.subscribe(myObserver);
// Logs:
// Observer got a next value: 1
// Observer got a next value: 2
// Observer got a next value: 3
// Observer got a complete notification
```

另外，`subscribe()` 方法还可以接收定义在**同一行**中的回调函数，无论 `next、error` 还是 `complete` 处理器。比如，下面的 `subscribe`() 调用和前面指定预定义观察者的例子是等价的。
```bash
myObservable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  err => console.error('Observer got an error: ' + err),
  () => console.log('Observer got a complete notification')
);
```
无论哪种情况，**`next` 处理器都是必要的，而 error 和 complete 处理器是可选的。**

注意，next() 函数可以接受消息字符串、事件对象、数字值或各种结构，具体类型取决于上下文。 为了更通用一点，**我们把由可观察对象发布出来的数据统称为流**。任何类型的值都可以表示为可观察对象，而这些值会被发布为一个流。

## 创建可观察对象
使用 `Observable` 构造函数可以创建任何类型的**可观察流**。 当执行可观察对象的 `subscribe`() 方法时，这个构造函数就会把它接收到的参数作为订阅函数来运行。 **订阅函数会接收一个 `Observer` 对象，并把值发布给观察者的 `next`() 方法。**

比如，要创建一个与前面的 `of(1, 2, 3)` 等价的可观察对象，你可以这样做：

```bash
// This function runs when subscribe() is called
function sequenceSubscriber(observer) {
  // synchronously deliver 1, 2, and 3, then complete
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();

  // unsubscribe function doesn't need to do anything in this
  
  // because values are delivered synchronously

  return {unsubscribe() {}};
}

// Create a new Observable that will deliver the above sequence

const sequence = new Observable(sequenceSubscriber);

// execute the Observable and print the result of each notification

sequence.subscribe({
  next(num) { console.log(num); },
  complete() { console.log('Finished sequence'); }
});

// Logs:
// 1
// 2
// 3
// Finished sequence
```
如果要略微加强这个例子，我们可以创建一个用来发布事件的可观察对象。在这个例子中，订阅函数是用内联方式定义的。

```bash
function fromEvent(target, eventName) {
  return new Observable((observer) => {
    const handler = (e) => observer.next(e);

    // Add the event handler to the target
    target.addEventListener(eventName, handler);

    return () => {
      // Detach the event handler from the target
      target.removeEventListener(eventName, handler);
    };
  });
}
```
现在，你就可以使用这个函数来创建可发布 keydown 事件的可观察对象了：
```bash
const ESC_KEY = 27;
const nameInput = document.getElementById('name') as HTMLInputElement;

const subscription = fromEvent(nameInput, 'keydown')
  .subscribe((e: KeyboardEvent) => {
    if (e.keyCode === ESC_KEY) {
      nameInput.value = '';
    }
  });
```


