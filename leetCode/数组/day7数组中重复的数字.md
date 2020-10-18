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
