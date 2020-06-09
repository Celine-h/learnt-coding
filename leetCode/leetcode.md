# leetCode 算法练习

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
