/*!	BB
	Another JavaScript Lib

	2010~2011	BB9z@live.com
	最新版本可在Google Code获得：http://js.bb9z.googlecode.com/hg/bb.js/current.js
*/

/* [一些说明]
本库目前尚不稳定，未来会有巨大的变化。

本库绝大多数内容封装在“bb”内，对外部名字空间干扰小，除少数情况外不会扩展原有对象。
函数式风格，而非链式。

编码风格：
	使用带GUI++渲染的XHei Mono字体显示最佳
	括号、运算符与变量间不加入额外空白。

命名规则：
	库的界面命名一律驼峰形式，缩略语也一样，不采用全部大写。
		如：getXmlHttpRequest
	
	CSS命名：
	
	Html命名：
	

备忘 for me：
	不要过早的优化性能
	不要拘束于形式，先实现出来再说
	多注释
	函数定型后需进行全面的测试
	尽可能用原生方法

发展原则：
	从需求来，到需求中去
	以解决实际问题为优先
	减少预计，合并封装已有代码
*/

/* 导航
	命名空间	#namespace
	打印/输出方法	#output
	性能监测	#performance
	
	事件处理	#event
	Dom操作		#dom
	样式操作	#style
	对象扩展	#ex_object
	
	杂项		#others
	
	具体应用	#app
*/

// #namespace
// 命名空间"bb"
// _NAME_SPACE_BB_定义了输出到外部空间的名字，同时库的内容会在初始化后覆盖_NAME_SPACE_BB_
var _NAME_SPACE_BB_="bb";
// Orz，居然和百度的一个库重名……


(function(){
//try{
// 库起始

var bb={};			// 内部的对象
var bbns=_NAME_SPACE_BB_;	// 输出到外部的名字
var W=window,
	D=W.document;	// 使用window下的document，参照 jQuery

if(!W[bbns]){
	W[bbns]=bb;
}
else{
	// 已经占用
	if(W[bbns].version&&W[bbns].defineBy){
		// 可能是再次引用
		// 那么仅提示一下，并返回
		doutc("bb>Lib"+W[bbns].version+" is defined by: "+W[bbns].defineBy);
		// 结束，把现有定义输出到_NAME_SPACE_BB_
		return _NAME_SPACE_BB_=W[bbns];
	}
	else{
		// 被其他人占用了，输出到_NAME_SPACE_BB_
	}
}
// 总是将库的内容输出到_NAME_SPACE_BB_
_NAME_SPACE_BB_=W[bbns];

bb.pressDate="10:34 2011/1/16"	// 当前版本的发布时间
bb.version	="0.3.0.0116";		// 当前库的版本
bb.defineBy	="BB9z";		// 定义人

/*	模板
function fname(){
	
}	bb['fname']=fname;
*/

// #output
///////////////* 调试输出 *//////////////////
bb.debugMode	=true;			// 调试模式开关
/* 用于调试的输出 - 输出到控制台 
*/	function doutc(str_outputString){
	if(bb.debugMode==true){
		try{
			console.log(str_outputString);
		}
		catch(e){/*
 			// 不支持console.log？
			alert("Warning: 浏览器不支持console.log？\n"+str_outputString);
			// 关闭以减少打断
			bb.debugMode==false; */
		};
	}
}	bb['doutc']=doutc;
/* 用于调试的输出 - 弹出警告
*/	function douta(str_outputString){
	if(bb.debugMode==true){
		alert(str_outputString);
	}
}	bb['douta']=douta;
/* 用于调试的输出 - 列出变量成员
参数说明：
	obj				被打印的对象
	str_otherInfo	可选信息，在输出最前面
	bool_silentMode	可选，为真时输出到控制台，否则弹出
*/	function douto(obj,str_otherInfo,bool_silentMode){
	if(typeof(arguments[1])=="boolean"){
		bool_silentMode=arguments[1];
		str_otherInfo="";
	}
	var output=[str_otherInfo]+" type: "+typeof(obj)+" "+obj+"\n";
	for(var name in obj){
		output+=name+":\t"+obj[name]+"\n"
	}
	if(bool_silentMode) doutc(output);
	else douta(output);
}	bb['douto']=douto;

/* 空输出函数，可用替换的方法禁用/恢复指定代码区域的调试输出 */
function _doutc(){
}	bb['_doutc']=_doutc;
function _douta(){
}	bb['_douta']=_douta;
function _douto(){
}	bb['_douto']=_douto;

/* 注册显示错误信息
*/ if(bb.debugMode){
	onerror=function(errorMsg, pageUrl, errorLine){
		var asw=confirm("bb>发现错误:"+errorMsg+"\n"
		+pageUrl+" at line: "+errorLine+"\n"
		+"是否刷新？");
		if(asw) location.reload();	// 确认刷新
	}
}

// #performance
///////////////* 性能监视 *//////////////////
bb.performanceTimer={};		// 列出各个性能监视器的执行时间

/*
#ms 	function timeCounter(name){
	if(!name) name="timer"+(timeCounters.length+1);
	timeCounters["中文"]=new Date();

	for (var i=0; i<=1000000; i++)
	{
		void(0);
	}
	var end=new Date();
	bb.performanceTimer[name]=end-timeCounters[name];
	
}	bb['timeCounter']=timeCounter;
var timeCounters={};		// 保存性能的时间计数器的相关变量*/

// #event
///////////////* 事件处理 *//////////////////
/* 把一个或多个函数加入到自执行队列
	当if(mode)判定为false时，将加入的函数加入onload函数队列中，否则更改onload函数为当前函数
输入：handels... [bool_mode]	
*/	function setOnLoad(){
	var bool_mode=typeof(arguments[arguments.length-1])=="boolean"?arguments[arguments.length-1] : null;
	if(bool_mode){
		onLoadHandel=[];
	}
	for(var i=0;i<arguments.length && typeof(arguments[i])=="function";i++){
		onLoadHandel.push(arguments[i]);
	}
}	bb['setOnLoad']=setOnLoad;
/* 
*/	function setOnDomReady(){
	var bool_mode=typeof(arguments[arguments.length-1])=="boolean"?arguments[arguments.length-1] : null;
	if(bool_mode){
		onDomReadyHandel=[];
	}
	for(var i=0;i<arguments.length && typeof(arguments[i])=="function";i++){
		onDomReadyHandel.push(arguments[i]);
	}
}	bb['setOnDomReady']=setOnDomReady;

// ref http://www.cn-cuckoo.com/main/wp-content/uploads/2009/12/named-function-expressions-demystified.html
/* 直接根据环境定义要比每次判断性能要好，但也有缺点。
TODO：进行性能测试查看判断这种方式的性能差距，不大的话不考虑下面相对复杂的写法。
// 1) 使用独立的作用域包含声明
var addEvent = (function(){

	var docEl = document.documentElement;

	// 2) 声明要引用函数的变量
	var fn;

	if (docEl.addEventListener) {

		// 3) 有意给函数一个描述性的标识符
		fn = function addEvent(element, eventName, callback) {
			element.addEventListener(eventName, callback, false);
		}
	}
	else if (docEl.attachEvent) {
		fn = function addEvent(element, eventName, callback) {
			element.attachEvent('on' + eventName, callback);
		}
	}
	else {
		fn = function addEvent(element, eventName, callback) {
			element['on' + eventName] = callback;
		}
	}

	// 4) 清除由JScript创建的addEvent函数
	//	一定要保证在赋值前使用var关键字
	//	除非函数顶部已经声明了addEvent
	var addEvent = null;

	// 5) 最后返回由fn引用的函数
	return fn;
})();
*/

/* 增加事件监听 
bool */	function addEvent(node,type,listener){
	if (!(node=$(node))){return false;}
	if (node.addEventListener){
		node.addEventListener(type, listener, false);
		return true;
	}
	else if (node.attachEvent){
	//	IE方法
		node['e'+type+listener]=listener;
		node[type+listener]=function(){
			node['e'+type+listener](W.event);
		}
		node.attachEvent('on'+type, node[type+listener]);
		return true;
	}
	return false;
}	bb['addEvent']=addEvent;
/* 移除事件监听
bool */	function removeEvent(node,type,listener){
	if (!(node=$(node))) return false;
	if (node.removeEventListener){
		node.removeEventListener(type, listener, false);
		return true;
	}
	else if (node.detachEvent){
	//	IE方法
		node.detachEvent('on'+type, node[type+listener]);
		node[type+listener]=null;
		return true;
	}
	return false;
}	bb['removeEvent']=removeEvent;
/* 停止事件的处理过程 
*/	function stopEvent(event){
	if(event.preventDefault){
		event.preventDefault();
		event.stopPropagation();
	}
	else{
		event.returnValue=false;
		event.cancelBubble=true;
	}
}	bb['stopEvent']=stopEvent;
/*
if (document.addEventListener) {
	el.addEventListener('focus', focusHandler, true);
	el.addEventListener('blur', blurHandler, true);
} else {
	el.onfocusin = focusHandler;
	el.onfocusout = blurHandler;
}
*/
// 注册onDomReadyHandel
var onDomReadyHandel=[];	// 保存body完全载入后执行的函数句柄
if(isFunction(D.onreadystatechange)){
	setOnDomReady(D.onreadystatechange);
}
D.onreadystatechange=function(event){
	for(var i=0,length=onDomReadyHandel.length;i<length;i++){
		onDomReadyHandel[i](event);
		D.onreadystatechange=[];	// IE会执行两次？
	}
}
/* 
var DOMRETRYTIMES=20;		// 设定尝试次数
var DOMRETRYTIMER=100;		// 设定间隔
var IntervalHandel;
var onDomReadyHandel=[];	// 保存body完全载入后执行的函数句柄
function _BonDomReady(event){
	if(document.readyState=="complete"){
		for(var i=0,length=onDomReadyHandel.length;i<length;i++){
			onDomReadyHandel[i](event);
		}
		clearInterval(IntervalHandel);
		doutc("bb>_BonDomReady end");
	}
	else{
	// 未载入完，检查计数器是否已过，计数器减
		if(!DOMRETRYTIMES--){
		// 已经超时：停止尝试，把函数加入到onLoadHandel
			clearInterval(IntervalHandel);
			onDomReadyHandel.concat(onLoadHandel);
			onLoadHandel=onDomReadyHandel;
		}
	}
}
IntervalHandel=setInterval(_BonDomReady,DOMRETRYTIMES); */

// 注册onLoadHandel
var onLoadHandel=[];		// 保存页面载入后执行函数的句柄
if(typeof(W.onload)=='function'){
	bb.onLoadHandel.unshift(W.onload);
}
function _BonLoad(event){
	for(var i=0,length=onLoadHandel.length;i<length;i++){
		onLoadHandel[i](event);
	}
	doutc("bb>_BonLoad end");
}
W.onload=_BonLoad;
//addEvent(W, 'load', _BonLoad);

// #dom
///////////////* DOM操作 *//////////////////
bb.nodeTyp	={				// nodeType的值
	ELEMENT_NODE				:1,
	ATTRIBUTE_NODE				:2,
	TEXT_NODE					:3,
	CDATA_SECTION_NODE			:4,
	ENTITY_REFERENCE_NODE		:5,
	ENTITY_NODE					:6,
	PROCESSING_INSTRUCTION_NODE	:7,
	COMMENT_NODE				:8,
	DOCUMENT_NODE				:9,
	DOCUMENT_TYPE_NODE			:10,
	DOCUMENT_FRAGMENT_NODE		:11,
	NOTATION_NODE				:12
};
/* 选择器
TODO: 支持更多选择符 
bool */	function $(element){
	var elements =[];
	for (var i=0 ; i<arguments.length ; i++){
		var element=arguments[i];

		//	字符串输入假定为ID
		if (typeof element=='string'){
			element=D.getElementById(element);
		}
		if (arguments.length==1) return element;
		elements.push(element);
	}
	return elements;
}	bb['$']=$;
/* 以Class为标识搜寻元素 
bool */	function getElementByClassName(className, tag, parent){
	parent=parent || D;
	if (!(parent=$(parent))){return false;}

	var allTags=(tag=="*" && parent.all)?parent.all : parent.getElementsByTagName(tag);
	var matchingElements=new Array();

	className=className.replace(/\-/g,"\\-");
	var regax=new RegExp("(^|\\s)"+className+"(\\s|$)");

	var element;
	for (var i=0 ; i<allTags.length ; i++){
		element=allTags[i];
		if (regax.test(element.className)){
			matchingElements.push(element);
		}
	}
	return matchingElements;
}	bb['getElementByClassName']=getElementByClassName;
/* 将节点插入到指定节点的后面
bool */	function insertAfter(node, referenceNode){
	if (!(node=$(node))) return false;
	if (!(referenceNode=$(referenceNode))) return false;
	return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}	bb['insertAfter']=insertAfter;
/* 移除全部子节点 
parentNode */	function removeChildren(parent){
	if (!(parent=$(parent))) return false;
	//	存在子节点就将其移出
	while(parent.firstChild)
		parent.firstChild.parentNode.removeChildren(parent.firstChild);
	return parent;
}	bb['removeChildren']=removeChildren;
/* 将节点插到子节点最前面 
parentNode */	function prependChildren(parent, newChild){
	if (!(parent=$(parent))) return false;
	if (!(newChild=$(newChild))) return false;
	if(parent.firstChild) parent.insertBefore(newChild, parent.firstChild);
	else parent.appendChild(newChild);
	return parent;
}	bb['prependChildren']=prependChildren;

// #style
///////////////* 操纵样式 *//////////////////
/* 切换显示/隐藏状态
bool */	function toggleDisplay(node, value){
	if(!(node=$(node))) return false;

	if (node.style.display !='none') node.style.display='none';
	else node.style.display=value || '';
	return true;
}	bb['toggleDisplay']=toggleDisplay;

// #ex_object
///////////////* Object扩展 *//////////////////

// start:@test-env:chrome7
/* 类型检测核心函数，参照jQuery的实现
	不同之处在于将返回的格式简化了
string */ function getTypeString(obj){
	return Object.prototype.toString.call(obj).replace(/\[object\b(.*)]/,"$1");
}	bb['getTypeString']=getTypeString;

/* 类型检测：Array
bool */ function isArray(obj) {
	return getTypeString(obj)=="Array";
}	bb['isArray']=isArray;
/* 类型检测：Function
bool */ function isFunction(obj){
	return typeof(obj)==="function";
}	bb['isFunction']=isFunction;
/* 类型检测：String
bool */ function isString(obj){
	// 直接typeof可否？
	return getTypeString(obj)=="String";
}	bb['isString']=isString;
/* 类型检测：Number
bool */ function isNumber(obj){
	return getTypeString(obj)=="Number";
}	bb['isNumber']=isNumber;

/* 类型检测：Undefined
bool */ function isUndefined(obj){
	return typeof obj==="undefined";
}	bb['isUndefined']=isUndefined;
/* 类型检测：EmptyObject
bool */ function isEmptyObject(obj){
	if(getTypeString(obj)!=="Object") return null;
	for(var name in obj) return false;
	return true;
}	bb['isEmptyObject']=isEmptyObject;

/* 检测第一个参数是否为HTML元素，不包括document本身
bool */ function isHtmlElement(obj){
	return /HTML(\w*)Element/.test(getTypeString(obj));
}	bb['isHtmlElement']=isHtmlElement;
// end:@test-env:chrome7

///////////////* Array扩展 *//////////////////
bb.array={};
/* 返回 element 在 refArray 中的序号，若找不到返回 null 
index/null */	function getIndex(element,refArray){
	if(!isArray(refArray)) return false;
	for(var i=refArray.length-1; i>=0; i--){
		refArray[i]
		if(element==refArray[i]){
			return i;
		}
	}
	return null;
}	bb['array']['getIndex']=getIndex;

///////////////* String扩展 *//////////////////
bb.string={};
/* 检查一个字符串的格式是否符合Email格式
用户名、域名首字符为字母或数字。允许下划线、不许连续的点、域名中不许连续的连词符……
@test-env:wait
@test-uc:pass
bool */	function isEmail(str){
	return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\W{2,3}$/.test(str);
}	bb['string']['isEmail']=isEmail;

/* 移除字符串首位空格
@test-env:wait
*/ function trim(str){
	return str.replace(/^\s+|\s+$/g, '');
}	bb['string']['trim']=trim;

// #others
///////////////* 其他 *//////////////////

(function(){
// 闭包内保护
	var uid=0;
/* 获得一个UID
	@test-env:skip
UID number */ function guid(){
	return uid++;
}	bb['guid']=guid;
})()



/* 浏览器判定
*/	function UAver(){
	var ver =top.opera?(opera.version().replace(/\d$/, "")-0)
		:parseFloat((/(?:IE |fox\/|ome\/|ion\/)(\d+\.\d)/.
		exec(navigator.userAgent) || [,0])[1]); 
	var dom={ 
		ie: !!top.VBArray && Math.max(D.documentMode||0, ver),//内核trident 
		firefox: !!top.crypto && ver,// 内核Gecko 
		opera:  !!top.opera && ver,// 内核 Presto 9.5为Kestrel 10为Carakan 
		chrome: !!(top.google && top.chrome ) &&  ver ,// 内核V8 
		safari: /apple/i.test(navigator.vendor) && ver// 内核 WebCore 
	}
	return dom;
}
// via cnblogs.com/rubylouvre/archive/2010/10/02/1840856.html by 司徒正美

// another https://github.com/kissyteam/kissy/blob/master/src/ua/ua-extra.js

/* 载入指定脚本
*/	function loadScript(url, callback){
	var script=D.createElement("script");
	script.type="text/javascript";

	if (script.readyState){	//IE
		script.onreadystatechange = function(){
			if (script.readyState=="loaded"||script.readyState=="complete"){
				script.onreadystatechange = null;
				callback();
			}
		};
	}
	else{
		script.onload = function(){
			callback();
		};
	}

	script.src = url;
	D.getElementsByTagName("head")[0].appendChild(script);
}
// via nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/ by Nicholas C. Zakas


/* 初始化XMLHttpRequest对象
@test-env:skip
XMLHttpRequest Object */ function getXmlHttpRequest(){
	var XHR;
	if(W.XMLHttpRequest)
		XHR=new XMLHttpRequest();
	else if(W.ActiveXObject)
		XHR=new ActiveXObject('Microsoft.XMLHTTP');
	return XHR;
}	bb['getXmlHttpRequest']=getXmlHttpRequest;

// #app
/* 遍历文档，自动生成目录
参数说明：
	参数均为可选
	findInArray		数组，元素被搜寻元素的大写标签字符串，默认查找h2、h3、h4。
	prefixString	加入锚记的前缀，默认为“mk”
	contAnchor		目录的锚记，默认为“content”
	inWhere			在何处寻找，默认为body内
提示：
	不搜索已指定id的元素
@test-env=fail（死循环）
*/	function makeToc(findInArray,prefixString,contAnchor,inWhere){
	findInArray=findInArray		||['H2','H3','H4'];
	prefixString=prefixString	||"mk";
	contAnchor=contAnchor		||"content";

	var topNode=D.getElementById('ui-AutoContents');	// 目录根节点
	if(!topNode) return false;
	var ctNode=D.createElement('ul');	// 目录容器
	ctNode.className='ui-content-c';
	var cNum=new Array(findInArray.length);	// 计数数组
	for(var i=cNum.length-1;i>=0;i--) cNum[i]=0;

	topNode.innerHTML='<h3 class="ui-content-t" title="善用目录可以节约您的时间"><a name="'+contAnchor+'">目录</a></h3>';
	topNode.id='ui-content';

	traverse($(inWhere)||D.body);
	// 返回根部并把生成的目录加入DOM中
	while(ctNode.parentNode) ctNode=ctNode.parentNode;
	topNode.appendChild(ctNode);

	var lastFindIndex=0;
	var ctFindIndex=0;
	/* makeToc>遍历例程 */
	function traverse(node){
		for(var i=0,length=node.children.length;i<length;i++){
			var cvNode=node.children[i];			// 当前遍历节点
			ctFindIndex=bb.array.getIndex(cvNode.nodeName,findInArray);
			if(ctFindIndex!=null){
			// 当前节点是要找的
				doutc("find a h"+cvNode.nodeName);
				cNum[ctFindIndex]++;
				var hashstr=getMkString(ctFindIndex);
				//cvNode.id=getMkString(ctFindIndex);

				// 决定走向+设置标号
				if(lastFindIndex<ctFindIndex){
					// 深入里层
					ctNode=ctNode.children[ctNode.children.length-1];
					for(var k=ctFindIndex-lastFindIndex;k>0;k--){
						ctNode.appendChild(D.createElement('ul'));
						ctNodepp=ctNode.getElementsByTagName('ul')[0];
					}
				}
				else if(lastFindIndex==ctFindIndex){
				}
				else if(ctFindIndex<lastFindIndex){
					// 往外层走，归位标号
					for(var k=lastFindIndex-ctFindIndex;k>0;){
						ctNode=ctNode.parentNode;
						if(ctNode.tagName=='UL') k--;
					}
					cNum[lastFindIndex]=0;
				}

				// 插入元素
				var nodeli=D.createElement('li');
				if(cvNode.textContent){
					nodeli.innerHTML="<a href='#"+hashstr+"'>"+cvNode.textContent+"</a>"
				}
				else if(cvNode.outerText){	// IE方法
					nodeli.innerHTML="<a href='#"+hashstr+"'>"+cvNode.outerText+"</a>"
				}
				ctNode.appendChild(nodeli);
				var nodeA=D.createElement('span');
				nodeA.innerHTML=' <a href="#" class="ui-content-t" title="点击返回顶部">[TOP]</a>';
				cvNode.innerHTML='<a href="#'+contAnchor+'" name="'+hashstr+'" class="ui-content-bb" title="点击返回目录">'+cvNode.innerHTML+'</a>'
				cvNode.appendChild(nodeA);
				lastFindIndex=ctFindIndex;
			};
			// 跳过目录
			if(node.children[i].id!="ui-content")
				traverse(node.children[i]);
		}
	}
	/* makeToc>生成类似1-2-3的编号字串 */
	function getMkString(i){
		var str=prefixString;
		for(var j=0;j<=i;j++){
			str+="-"+String(cNum[j]);
		}
		return str;
	}
}	bb['makeToc']=makeToc;

/*
溢出检测工具
原始思路来自： http://www.chencheng.org/blog/archives/css-overflow-test-script.html

function test-overflow(node){
	var target=node||D.body;
	// 文本
	var f=[];	// 收集数组
	
	// 这里使用了用了callee，免去了单独的函数
	(function(n){
		var p=arguments.callee,l=n.childNodes,m=0,k=l.length;
		for(;m<k;m++){
			var o=l[m];
			if(o.nodeType===1){
				p(o)
			}
			else{
				if(o.nodeType===3) f.push(o)
			}
		}
	})(target);
	
	for(var d=f.length;d>=0;d--){
		var b=f[d],j=b.nodeValue.replace(/^\s+|\s+$/g,"");
		if(j!==""&&j.length!==1)
			b.parentNode.insertBefore(D.createTextNode(j),b);
	}
	
	// 图片
	var g=target.images;
	for(var i=0,length=g.length;i<length;i++){
		g[i].src="test-big-image.jpg"
	}
}
*/

function test(){
	doutc('bb>test() in');
	
	
	doutc('bb>test() out');
}	bb['test']=test;

bb.xyz={};
bb.xyz.W={
	screenX		:W.screenX,
	screenY		:W.screenY,
	screenLeft	:W.screenLeft,
	screenTop	:W.screenTop,
	innerWidth	:W.innerWidth,
	innerHeight	:W.innerHeight,
	outerWidrh	:W.outerWidth,
	outerHeight	:W.outerHeight,
	scrollX		:W.scrollX,
	scrollY		:W.scrollY,
	pageXOffset	:W.pageXOffset,
	pageYOffset	:W.pageYOffset
}
bb.xyz.get=function(element){
	e=$(element)
	return {
		
	}
}

doutc("end of define bb.js");
// 库结尾
//}catch(e){alert("bb>库初始化遇到问题：\n"+e)}
})()	// 一个自执行匿名函数
