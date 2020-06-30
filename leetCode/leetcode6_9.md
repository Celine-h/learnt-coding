# leetCode 算法练习day6-10

## day6无重复字符的最长子串

>给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:
```
输入: "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```
示例 2:
```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```
示例 3:
```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

**解题**(作者：LeetCode-Solution)  
方法一：滑动窗口
思路和算法  
我们先用一个例子来想一想如何在较优的时间复杂度内通过本题。

我们不妨以示例一中的字符串`{abcabcbb}abcabcbb` 为例，找出 从每一个字符开始的，不包含重复字符的最长子串，那么其中最长的那个字符串即为答案。对于示例一中的字符串，我们列举出这些结果，其中括号中表示选中的字符以及最长的字符串：

+ 以 (a)bcabcbb 开始的最长字符串为 (abc)abcbb；  
+ 以 a(b)cabcbb 开始的最长字符串为 a(bca)bcbb；
+ 以 ab(c)abcbb 开始的最长字符串为 ab(cab)cbb；
+ 以 abc(a)bcbb 开始的最长字符串为 abc(abc)bb；
+ 以 abca(b)cbb 开始的最长字符串为 abca(bc)bb；
+ 以abcab(c)bb 开始的最长字符串为 abcab(cb)b；
+ 以 abcabc(b)b 开始的最长字符串为 abcabc(b)b；
+ 以 abcabcb(b) 开始的最长字符串为 abcabcb(b)  

发现了什么？如果我们依次递增地枚举子串的起始位置，那么子串的结束位置也是递增的！这里的原因在于，假设我们选择字符串中的第 `k`个字符作为起始位置，并且得到了不包含重复字符的最长子串的结束位置为` r
k`。那么当我们选择第 `k+1` 个字符作为起始位置时，首先从 `k+1` 到 `rk`的字符显然是不重复的，并且由于少了原本的第 `k` 个字符，我们可以尝试继续增大 `rk`，直到右侧出现了重复字符为止。  

这样以来，我们就可以使用**滑动窗口**来解决这个问题了：

+ 我们使用两个指针表示字符串中的某个子串（的左右边界）。其中左指针代表着上文中「枚举子串的起始位置」，而右指针即为上文中的 `rk` ；

+ 在每一步的操作中，我们会将左指针向右移动一格，表示**我们开始枚举下一个字符作为起始位置**，然后我们可以不断地向右移动右指针，但需要保证这两个指针对应的子串中没有重复的字符。在移动结束后，这个子串就对应着**以左指针开始的，不包含重复字符的最长子串**。我们记录下这个子串的长度；

+ 在枚举结束后，我们找到的最长的子串的长度即为答案。

**判断重复字符**

在上面的流程中，我们还需要使用一种数据结构来判断 是否有重复的字符，常用的数据结构为哈希集合（即 C++ 中的 std::unordered_set，Java 中的 HashSet，Python 中的 set, JavaScript 中的 Set）。在左指针向右移动的时候，我们从哈希集合中移除一个字符，在右指针向右移动的时候，我们往哈希集合中添加一个字符。

```C
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};

```

**复杂度分析**

+ 时间复杂度：O(N)，其中 N 是字符串的长度。左指针和右指针分别会遍历整个字符串一次。

+ 空间复杂度：O(∣Σ∣)，其中 Σ 表示字符集（即字符串中可以出现的字符），∣Σ∣ 表示字符集的大小。在本题中没有明确说明字符集，因此可以默认为所有 ASCII 码在 [0,128) 内的字符，即∣Σ∣=128。我们需要用到哈希集合来存储出现过的字符，而字符最多有 ∣Σ∣ 个，因此空间复杂度为 O(∣Σ∣)。



[力扣（LeetCode）](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters)

---
## day7数组中重复的数字
>找出数组中重复的数字。


在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

示例 1：

输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3
 

限制：

2 <= n <= 100000

**解题**
方法一：
第一次我自己解出来，哈哈哈哈,利用数据去重的逆向思维，过滤出数组中重复的，返回题意中的任意一个
```C
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
   repeat = nums.filter((item,index,arr)=>arr.lastIndexOf(item)!=index)
    if(repeat.length>0){
        return repeat[0]
    }
};
```
方法二：
看了解题中提供了哈希表的思路，我又想了一个
```C
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
  let temp=new Set();
  for(let i=0;i<nums.length;i++){
      if(temp.has(nums[i])){
          return nums[i];
      }
      temp.add(nums[i])
  }
};
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## day8 二维数组中的查找
>在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

示例:

现有矩阵 matrix 如下：
```
[  
  [1,   4,  7, 11, 15],  
  [2,   5,  8, 12, 19],  
  [3,   6,  9, 16, 22],  
  [10, 13, 14, 17, 24],  
  [18, 21, 23, 26, 30 ]
]
```
给定 target = 5，返回 true。

给定 target = 20，返回 false。

限制：

0 <= n <= 1000

0 <= m <= 1000

**解题**  
嗯~我又自己做出来了，我已经成熟了，淡定了，喜喜
```C
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    for(let i=0;i<matrix.length;i++){
        if(matrix[i].includes(target)){
            return true
        }
    }
    return false
};
```

**别人的解法**  
解题思路  
从矩阵左下方第一个元素判断，如果此行第一个元素大于目标元素（这一行后面的肯定都大于目标元素），进入下次循环，循环内部用includes查找是否含有目标元素，找到后，手动结束外层循环（无需执行多余的循环内容了）

代码
```C
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
  let flag = false
  for (let i = matrix.length; i > 0; i--) {
    if (matrix[i-1][0] <= target) {
      if (matrix[i-1].includes(target)) {
        flag = true
        i = -1
      }
    }
  }
  return flag
};
```
作者：payne-22

[LeetCode](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof)

## day9 用两个栈实现队列
>用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

 

示例 1：

输入：
```
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出：[null,null,3,-1]
```
示例 2：

输入：
```
["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
[[],[],[5],[2],[],[]]
输出：[null,-1,null,null,5,2]
```
提示：

1 <= values <= 10000
最多会对 appendTail、deleteHead 进行 10000 次调用

**解题**  
栈后进先出，队列先进先出  

双栈可以实现序列倒置：假设有 stack1=[1, 2, 3] 、 stack2=[] ，如果循环出栈 stack1 并将出栈元素进栈 stack2 ，则循环结束后， stack1=[] 、 stack2=[3, 2, 1] ，即通过 stack2 实现了 stack1 中元素的倒置   

当需要删除队首元素时，仅仅需要 stack2 出栈即可；当 stack2 为空时，出队就需要将 stack1 元素倒置倒 stack2 ， stack2 再出队即可；如果 stack1 也为空，即队列中没有元素，返回 -

```C
var CQueue = function() {
    this.instack = [];
    this.outstack = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.instack.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if(this.outstack.length){
        return this.outstack.pop()
    }else{
        while(this.instack.length){
            this.outstack.push(this.instack.pop())
        }
        return this.outstack.pop()||-1
    }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```
来源：力扣（LeetCode）  
链接：https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof
