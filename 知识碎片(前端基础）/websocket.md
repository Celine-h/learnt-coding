# Websocket——学习阮一峰教程
**概览**
+ 概念
+ websocket构造函数
+ webSocket.readyState
+ websocket.onopen（）
+ webSocket.send()
+ webSocket.ommessage()
+ webSocket.onerror
+ webSocket.bufferedAmount

**概念**  
websoket是一种协议，这种协议上服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。因为http协议只能由客户端发出。那如果服务器有连续的变化，就无法主动向客户端发出，websocket就是解决这一场景的。  

还有一种方法是轮询，每隔一段时间向服务器发出一个请求，了解服务器有没有信息更新；最典型的场景是聊天室。  

其他特点包括：

（1）建立在 TCP 协议之上，服务器端的实现比较容易。

（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

（3）数据格式比较轻量，性能开销小，通信高效。

（4）可以发送文本，也可以发送二进制数据。

（5）没有同源限制，客户端可以与任意服务器通信。

（6）协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。

**客户端简单示例**
```C
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) {
  console.log("Connection open ...");
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};  
```

**WebSocket 构造函数**  

WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例。  
`var ws = new WebSocket('ws://localhost:8080');`  
执行上面语句之后，客户端就会与服务器进行连接。

**webSocket.readyState**  
`readyState`属性返回实例对象的当前状态，共有四种。  

`CONNECTING`：值为0，表示正在连接。  
`OPEN`：值为1，表示连接成功，可以通信了。  
`CLOSING`：值为2，表示连接正在关闭。  
`CLOSED`：值为3，表示连接已经关闭，或者打开连接失败。  

**webSocket.onopen**  
实例对象的onopen属性，用于指定连接成功后的回调函数。  

如果要指定多个回调函数，可以使用addEventListener方法。
```C
ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});
```

**webSocket.onclose**  
实例对象的onclose属性，用于指定连接关闭后的回调函数。

果要指定多个回调函数，可以使用addEventListener方法
```C
ws.addEventListener("close", function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});

```

**webSocket.onmessage**  
实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。
```C
ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});
```
ps：
1. 服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）
2. 除了动态判断收到的数据类型，也可以使用binaryType属性，显式指定收到的二进制数据类型。

```
// 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function(e) {
  console.log(e.data.size);
};

// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};
```

**webSocket.send()**  
实例对象的send()方法用于向服务器发送数据。

**webSocket.bufferedAmount**  
实例对象的bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。

```C
var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```

**webSocket.onerror**  
实例对象的onerror属性，用于指定报错时的回调函数。

```C
socket.onerror = function(event) {
  // handle error event
};

socket.addEventListener("error", function(event) {
  // handle error event
}
```
