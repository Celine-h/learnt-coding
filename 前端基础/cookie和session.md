# cookie和session的区别
**Session定义**  
因为不太知道session的定义，所以就看了session的定义
      Session是在服务器端保存用户数据。浏览器第一次发送请求时，服务器自动生成了Session ID来唯一标识这个并将其通过响应发送到浏览器。浏览器第二次发送请求会将前一次服务器响应中的Session ID放在请求中一并发送到服务器上，(Session id存在Cookie中，每次访问的时候将Session id传到服务器进行对比。)服务器从请求中提取出Session ID，并和保存的所有Session ID进行对比，找到这个用户的信息。一般这个Session ID会有个时间限制，默认30分钟超时后毁掉这次Session ID。

## cookie和session的区别
1:**存储位置不同**

cookie的数据信息存放造客户端浏览器上

session的数据信息存放在服务器上

**2:存储容量不同**

单个cookie保存的数据<=4kb,一个站点最多保存20个cookie

对于session来说并没有上限,但是出于对服务端的性能的考虑,session内不要存放过多的东西,

并且设置session删除机制

**3存储方式不同**

cookie中只能保管ASCII字符串,并需要通过编码方式存储为Unicode字符串或者二进制数据

session中能够存储任何类型的数据 包括但不限于string,integer,list,map等

**4隐私策略不同**

cookie对客户端是可见的,别有用心的人可以分析存放在本地的cookie并进行cookie欺骗,所以它是不安全的

session存储在服务器上,对客户端是透明的,不存在敏感信息泄露的风险

**5有效期上不同**

开发者可以通过设置cookie的属性,达到使cookie长期有效的效果

session依赖于名为JSESSIONID的cookie,而cookie JSESSIONID的过期时间默认为-1,只需要关闭窗口该session就会失效,因而session不能达到长期有戏的效果

**6服务器压力不同**

cookie保管在客户端,不占用服务器的资源,对于并发用户十分多的网站,cookie是很好的选择

session是保管在服务端的,每个用户都会产生一个session,假如并发访问的用户十分多,会产生十分多的session,耗费大量的内存

**7浏览器支持不同**

假如客户端浏览器不支持cookie

cookie是需要客户端浏览器支持的,假如客户端禁用了cookie,或者不支持cookie,则会话跟踪会失效,关于wap上的应用,常规的cookie就派不上用场了

运用session需要使用url地址重写的方式,一切用到session程序的url都要进行url地址重写,

否则session会话跟踪还会失效

假如客户端浏览器支持cookie

cookie既能够设为本浏览器窗口以及子窗口内有效,也能够设为一切窗口内有效

session只能在本窗口以及子窗口内有效

**8跨域支持上不同**

cookie支持跨域名访问

session不支持跨域名访问
