# CSS

## 基础

### 定位参照于谁块来定位

1. 没有定位：包含块

2. 相对：元素本来的位置

3. 绝对：包含块

   如果最近的祖先元素中存在定位元素，则这个定位元素就是包含块；如果没有，包含块为初始包含块

4. 固定 : 视口

- 什么是初始包含块：视窗大小的矩形，不等于视窗

## 默认值

1. left top right bottom width height 为 auto
2. margin padding 默认值 0
3. border-width 如果不存在 border-style

4. 百分比参照于谁
   width margin padding: 包含块的 width

   height: 包含块的 height

   left: 包含块的 width

   top: 包含块的 height

5. 浮动
   浮动提升半层

## 清除浮动

1. 给父级加高度

扩展性不好

2. 开启 BFC
   overflow: hidden
   定位
   浮动

ie 6 7 底下不支持 BFC

3. br 标签
   ie6 不支持
   违反了结构 行为 样式相分离的原则
4. 空标签
   违反了结构 行为 样式相分离的原则
   ie6 下元素的最小高度为 19px
   可以尝试给元素的 fontsize 设为 0---> 2px

5. 伪元素 + 开启 haslayout
   因为 ie6 7 下不支持伪元素  
   所以要额外的去开启 haslayout
