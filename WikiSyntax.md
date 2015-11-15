|[官方说明](http://code.google.com/p/support/wiki/WikiSyntax)|[中文译文](http://code.google.com/p/chinese-room/wiki/WikiSyntax)|
|:-------------------------------------------------------|:------------------------------------------------------------|



# 语法说明 #
比维基那头简介，但没有像模板这样的强力工具。空行换行依旧。

仅识别根目录中的文件，多语言有特殊规定。

**`<wiki:toc max_depth="1" />` —— 目录**`<wiki:comment>` —— 注释

# 页面参数 #
有三：
|Pragma 	|Value |
|:-------|:-----|
|#summary 	|One-line summary of the page |
|#labels 	|Comma-separated list of labels (filled in automatically via the web UI) |
|#sidebar 	|See [Side navigation](http://code.google.com/p/support/wiki/WikiSyntax#Side_navigation)|


# 格式化 #
|`*`	|**加粗**|
|:---|:-----|
|`_`	|_斜体_  |
|```或{{{}}}``	|`代码`  |
|`^`	|su<sup>p</sup>|
|`,,`	|su<sub>b</sub>|
|`~~`	|~~删除~~|

> 空格开头是引用，不变

## 表格 ##
简化了，只用`||`分隔，行末不可省。

## HTML代码 ##
可用的不少，属性基本限制为title，dir，lang。无object，Media维基的html注释不可用。

# 链接 #
语法不变，有好玩的比如可以直接掉Google的API，如
`http://chart.apis.google.com/chart?chs=200x125&chd=t:48.14,33.79,19.77|83.18,18.73,12.04&cht=bvg&nonsense=something_that_ends_with.png`=> ![http://chart.apis.google.com/chart?chs=200x125&chd=t:48.14,33.79,19.77|83.18,18.73,12.04&cht=bvg&nonsense=something_that_ends_with.png](http://chart.apis.google.com/chart?chs=200x125&chd=t:48.14,33.79,19.77|83.18,18.73,12.04&cht=bvg&nonsense=something_that_ends_with.png)