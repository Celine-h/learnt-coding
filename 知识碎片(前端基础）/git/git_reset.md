## --mixed  
　**仅仅只是撤销已提交的版本库和暂存区，不会修改工作区**  
>意思是：不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。
　　　　`git reset --mixed 版本库ID`
 

## --soft  
**仅仅只是撤销已提交的版本库，不会修改暂存区和工作区**  
>不删除工作空间改动代码，撤销commit，不撤销git add . 

　　　　`git reset --soft 版本库ID`
 
## --hard
**彻底将工作区、暂存区和版本库记录恢复到指定的版本库**  
>删除工作空间改动代码，撤销commit，撤销git add . 
　　　　`git reset --hard 版本库ID`

注意完成这个操作后，就恢复到了上一次的commit状态。

+  代码编辑部份 // 工作区
+  git add .  暂存区
+  git commit // 版本库
+  git push //远程仓库
