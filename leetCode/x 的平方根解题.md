# x的平方根
```
实现 int sqrt(int x) 函数。

计算并返回 x 的平方根，其中 x 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例 1:

输入: 4
输出: 2
示例 2:

输入: 8
输出: 2
说明: 8 的平方根是 2.82842...,
由于返回类型是整数，小数部分将被舍去
```
**解题思路**  
举个例子，假设输入的是100，我们要找的就是10，由于上面的答案也分析了，0与1可以直接返回，所以left起点可以从2开始，那么右边边界怎么定呢？其实我们可以将右边起点定为Math.floor(x/2)，为啥？0,1不用考虑，紧接着是数字2，2也是唯一一个的2次方后再除以2与自己相等的数，再往上走的任意数字，比如3的2次方为9，9除以2为4.5，显而易见4.5的二次方要比3的二次方大，直接将x除以2求floor的数完全没问题。  

这里有个小技巧，当我们想让9/2为4时，一般的做法是前面说的结合Math.floor，其实还可以使用位运算符，这个跟二进制有关，大家先知道是这么回事就行。
```
9>>1 //4
8>>1 //4
6>>1 //3
```
也就是说，将数字除以2，如果能整除得到的就是这个整数，如果不能，则用floor向下取整，比如9>>1就是因为为4.5经过向下取整得到的结果。
```bash
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    if (x < 2) {
        return x
    };
    let left = 2,
        right = x >> 1;//这里等同于Math.floor(x/2)
    while (left <= right) {
        // 同理，这里也是用了位运算符，保证mid是个整数
        let mid = left + ((right - left) >> 1);
        //使用x/mid而非mid*mid是怕数字越界
        if (mid === x / mid) {
            return mid
        } else if (mid < x / mid) {
            left = mid + 1
        } else {
            right = mid - 1
        };
    };
    // 最后直接用right和x/right相比较，如果大肯定取left，反之取right
    return right > x / right ? left : right
};

```

参考：https://www.cnblogs.com/echolun/p/13200552.html
