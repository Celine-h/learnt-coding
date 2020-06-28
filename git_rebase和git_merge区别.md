原文：https://blog.csdn.net/liuxiaoheng1992/article/details/79108233

**git merge**  
工作原理就是：git 会自动根据两个分支的共同祖先即这个 commit 和两个分支的最新提交即进行一个三方合并，然后将合并中修改的内容生成一个新的 commit

**git rebase**  
git 会从两个分支的共同祖先 开始提取 当前分支上的修改，再将当前分支指向目标分支的最新提交，然后将刚刚提取的修改应用到这个最新提交后面。如果提取的修改有多个，那git将依次应用到最新的提交后面

**git rebase和git merge区别**
1. 可以看出merge结果能够体现出时间线，但是rebase会打乱时间线。
2. 而rebase看起来简洁，但是merge看起来不太简洁。
3. 最终结果是都把代码合起来了，所以具体怎么使用这两个命令看项目需要。

`git pull`相当于是`git fetch + git merge`  
`git pull -r`，也就是`git pull --rebase`，相当于`git fetch + git rebase`
