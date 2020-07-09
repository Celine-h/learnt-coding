# leetCode 算法练习day1-5
day1  删除中间节点

## day1  删除中间节点

>实现一种算法，删除单向链表中间的某个节点（即不是第一个或最后一个节点），假定你只能访问该节点。

 

示例：

输入：单向链表a->b->c->d->e->f中的节点c
结果：不返回任何数据，但该链表变为a->b->d->e->f

来源：[leetCode](https://leetcode-cn.com/problems/delete-middle-node-lcci/)


**解题思路**  优质解

删除元素 其实就是把删除的那个元素(node)替换成下一个元素(node.next)

代码
```C
/*
* Definition for singly-linked list.
* function ListNode(val) {
*     this.val = val;
*     this.next = null;
* }
*/
/**
* @param {ListNode} node
* @return {void} Do not return anything, modify node in-place instead.
*/
var deleteNode = function(node) {
   let current = node;
   node.val = current.next.val;
   node.next = current.next.next;
};
```

/**

---

## day2 链表反转

>输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

示例 1：  
输入：head = [1,3,2]
输出：[2,3,1]
 
限制：  
0 <= 链表长度 <= 10000

来源：[leetCode](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof)

**解题思路**  
将链表转化为数组，reserse输出

```C
var reversePrint = function (head) {
  if (head === null) return []
  const res = []
  while (head) {
    res.push(head.val)
    head = head.next
  }
  return res.reverse()
}

```
---

## day3 重建二叉树

》输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。



例如，给出

前序遍历 preorder = [3,9,20,15,7]  
中序遍历 inorder = [9,3,15,20,7]  
返回如下的二叉树：
```
    3
   / \
  9  20
 /     \
15      7
```

限制：

0 <= 节点个数 <= 5000

来源：[leetCode](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/solution/qian-xu-zhong-xu-zhong-jian-er-cha-shu-fen-zhi-si-/)

```C
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if (!preorder.length || !inorder.length) {
        return null;
    }

    const rootVal = preorder[0];
    const node = new TreeNode(rootVal);

    let i = 0; // i有两个含义，一个是根节点在中序遍历结果中的下标，另一个是当前左子树的节点个数
    for (; i < inorder.length; ++i) {
        if (inorder[i] === rootVal) {
            break;
        }
    }

    node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
    node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
    return node;
};

```

---

## day4 回文数
>判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:

```
输入: 121
输出: true
示例 2:
```

```
输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
示例 3:
```

```
输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
进阶:
```

你能不将整数转为字符串来解决这个问题吗？

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/palindrome-number)

哈哈哈，终于有道题是我自己做出来的了,思路就是转换为字符串后反转,hhhhhhhh

```C
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    return x.toString().split('').reverse().join('')===x.toString()
};
```

### 官方解题

**思路**

映入脑海的第一个想法是将数字转换为字符串，并检查字符串是否为回文。但是，这需要额外的非常量空间来创建问题描述中所不允许的字符串。

第二个想法是将数字本身反转，然后将反转后的数字与原始数字进行比较，如果它们是相同的，那么这个数字就是回文。
但是，如果反转后的数字大于int.MAX，我们将遇到整数溢出问题。

按照第二个想法，为了避免数字反转可能导致的溢出问题，为什么不考虑只反转 int 数字的一半？毕竟，如果该数字是回文，其后半部分反转后应该与原始数字的前半部分相同。

例如，输入 `1221`，我们可以将数字 “1221” 的后半部分从 “21” 反转为 “12”，并将其与前半部分 “12” 进行比较，因为二者相同，我们得知数字 `1221` 是回文。

**算法**

首先，我们应该处理一些临界情况。所有负数都不可能是回文，例如：`-123` 不是回文，因为 `-` 不等于 `3`。所以我们可以对所有负数返回 `false`。除了 `0` 以外，所有个位是 `0` 的数字不可能是回文，因为最高位不等于 `0`。所以我们可以对所有大于` 0 `且个位是 `0` 的数字返回 `false`。

现在，让我们来考虑如何反转后半部分的数字。

对于数字  `1221 % 10`，我们将得到最后一位数字 `1`，要得到倒数第二位数字，我们可以先通过除以 `10` 把最后一位数字从 `1221` 中移除，`1221 / 10 = 122`，再求出上一步结果除以 `10` 的余数，`122 % 10 = 2`，就可以得到倒数第二位数字。如果我们把最后一位数字乘以 `10`，再加上倒数第二位数字，`1 * 10 + 2 = 12`，就得到了我们想要的反转后的数字。如果继续这个过程，我们将得到更多位数的反转数字。

现在的问题是，我们如何知道反转数字的位数已经达到原始数字位数的一半？

由于整个过程我们不断将原始数字除以 `10`，然后给反转后的数字乘上 `10`，所以，当原始数字小于或等于反转后的数字时，就意味着我们已经处理了一半位数的数字了。


```C
var isPalindrome = function(x: number): boolean {
    // 特殊情况：
    // 如上所述，当 x < 0 时，x 不是回文数。
    // 同样地，如果数字的最后一位是 0，为了使该数字为回文，
    // 则其第一位数字也应该是 0
    // 只有 0 满足这一属性
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    let revertedNumber: number = 0;
    while (x > revertedNumber) {
        revertedNumber = revertedNumber * 10 + x % 10;
        x = Math.floor(x / 10);
    }

    // 当数字长度为奇数时，我们可以通过 revertedNumber/10 去除处于中位的数字。
    // 例如，当输入为 12321 时，在 while 循环的末尾我们可以得到 x = 12，revertedNumber = 123，
    // 由于处于中位的数字不影响回文（它总是与自己相等），所以我们可以简单地将其去除。
    return x === revertedNumber || x === Math.floor(revertedNumber / 10);
};
```
复杂度分析

时间复杂度：O(\log n)O(logn)，对于每次迭代，我们会将输入除以 1010，因此时间复杂度为 O(\log n)O(logn)。
空间复杂度：O(1)O(1)。我们只需要常数空间存放若干变量。

作者：[LeetCode-Solution](https://leetcode-cn.com/problems/palindrome-number/solution/hui-wen-shu-by-leetcode-solution/)

## day5 两数相加

>给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)  
输出：7 -> 0 -> 8  
原因：342 + 465 = 807

**解题**  
嗯，首先我不太懂链表是个什么东西，知识碎片/数据结构——单项列表

**参考解题**  
解题思路

因为是逆序，+10 向后进位


    2 -> 4 -> 3
    5 -> 6 -> 4 +
    --------------
    7 -> 0 -> 8
注意： 第二列 4+6 进一位，向后进 3 + 4 + 1 = 8

代码

```C
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let node = new ListNode('head')
    let temp = node , sum , n = 0
    while( l1 || l2 ){
        const n1 = l1 ? l1.val : 0
        const n2 = l2 ? l2.val : 0
        sum = n1 + n2 + n
        temp.next = new ListNode( sum % 10 )
        temp = temp.next
        n = parseInt( sum / 10 )
        if(l1) l1 = l1.next
        if(l2) l2 = l2.next
    }
    if( n > 0 ) temp.next = new ListNode(n)
    return node.next
};
```

[力扣（LeetCode)](https://leetcode-cn.com/problems/add-two-numbers/solution/liang-shu-xiang-jia-jian-dan-yi-dong-by-luobo-3/)
