#

**popup概念**  
popup是个层级管理工具（z-index)

**作用**  
我们知道弹出框都是在触发了某种条件后展示，而一个个的新的弹出框的展示，总是覆盖着上一个弹出框。实现覆盖功能需要保证新的弹出框的z-index要比旧的弹出框的z-index值相等或着更高，为达到这个目的element为所有的弹出框(所有下拉框、提示框、Dialog对话框等等)直接或间接的使用到一个js组件element-ui/src/utils/vue-popper，而这个vue-popper又使用了另一个组件element-ui/src/utils/popup/popup-manager.js。

**popup**  
popup.js是一个mixin混入，功能清单如下：

引入popupManger  
+ beforeMount 周期时，调用PopupManager对象的注册方法
+ beforeDestroy周期中，调用PopupManager对象的注销方法
+ openModa方法，设置弹窗组件的z-index，调用PopupManager.openModal方法
+ closeModal方法，调用PopupManager.closeModal方法

**PopupManager**  
PopupManager中有一个zIndex属性初始值为2000，所有的弹出框的z-index其实都是从这个PopupManager.zIndex中获取的，当要展示一个新的弹出框时，组件便会去获取最新的PopupManager.zIndex，然后为PopupManager.zIndex加1，这样就保证了新的弹出框总是比旧的弹出框z-index大，省去自己一个个设置的麻烦，也减少问题的出现。

