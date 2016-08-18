# 侧滑弹层插件--mSlider.js

####用法：
1. 引入jquery(或zepto)库和mSlide.js;
2. new一个实例：
```javascript
var demo = new mSlider({dom: $("#xxx")})
```
3.绑定方法:
```javascript
demo.open()
```

####参数说明：
<table>
<tbody>
<tr>
<td>参数</td>
<td>说明</td>
<td>举例</td>
</tr>
<tr>
<td>dom</td>
<td>容器节点(必填)</td>
<td>如：$("#xxx") 、 $(".xxx")</td>
</tr>
<tr>
<td>distance</td>
<td>弹层宽度%(默认"60%")</td>
<td>如："50%"</td>
</tr>
<tr>
<td>direction</td>
<td>弹出方向(默认"left")</td>
<td>"left":从左弹出，"right":从右弹出，"top":从上弹出，"bottom":从下弹出</td>
</tr>
</tbody>
</table>

####演示地址: [demo](http://denghao.me/demo/2016/mslider.html) (请用手机观看)
