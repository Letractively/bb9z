/*	BB
	Another JavaScript Lib

	2010	BB9z@live.com
	ver 0.1.47
	18:34 2010/11/5
	最新版本可在SVN获得：http://code.google.com/p/bb9z/source/browse/lab/bb.js
*/

/* [一些说明]
使用带GUI++渲染的XHei Mono字体显示最佳，括号内无需加入额外空白。


*/

(function(){
try{
//	命名空间“b”
	if(!window.b){
		window['b']={};
	}
	else{
		try{
			doutc("B>Lib is defined by: "+b.defineBy);
		}
		catch(e){};
	}

b.version	="0.1.47";		// 当前库的版本
b.defineBy	="BB9z";		// 定义人

/*	模板
function fname(){
	
}	window['b']['fname']=fname;
*/

///////////////* 调试输出 *//////////////////
b.debugMode	=true;			// 是否开启调试模式
/* 用于调试的输出 - 输出到控制台 
*/	function doutc(str_outputString){
	if(b.debugMode==true){
		try{
			console.log(str_outputString);
		} catch(e){};
	}
}	window['b']['doutc']=doutc;
/* 用于调试的输出 - 弹出警告
*/	function douta(str_outputString){
	if(b.debugMode==true){
		alert(str_outputString);
	}
}	window['b']['douta']=douta;
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
}	window['b']['douto']=douto;
/* 空输出函数，可用替换的方法禁用/恢复指定代码区域的调试输出 */
function _doutc(){
}	window['b']['_doutc']=_doutc;
function _douta(){
}	window['b']['_douta']=_douta;
function _douto(){
}	window['b']['_douto']=_douto;

/* 注册显示错误信息
*/ if(b.debugMode){
	onerror=function(errorMsg, pageUrl, errorLine){
		var asw=confirm("B>发现错误:"+errorMsg+"\n"
		+pageUrl+" at line: "+errorLine+"\n"
		+"是否刷新？");
		if(asw) location.reload();	// 确认刷新
	}
}

///////////////* 性能监视 *//////////////////
b.performanceTimer={};		// 列出各个性能监视器的执行时间

/*
#ms */	function timeCounter(name){
	if(!name) name="timer"+(timeCounters.length+1);
	timeCounters["中文"]=new Date();

	for (var i=0; i<=1000000; i++)
	{
		void(0);
	}
	var end=new Date();
	b.performanceTimer[name]=end-timeCounters[name];
	
}	window['b']['timeCounter']=timeCounter;
var timeCounters={};		// 保存性能的时间计数器的相关变量

///////////////* 事件处理 *//////////////////
/* 把一个或多个函数加入到自执行队列
	当if(mode)判定为false时，将加入的函数加入onload函数队列中，否则更改onload函数为当前函数
输入：handels... [bool_mode]	
*/	function setOnLoad(){
	var bool_mode=typeof(arguments[arguments.length-1])=="boolean" ? arguments[arguments.length-1] : null;
	if(bool_mode){
		onLoadHandel=[];
	}
	for(var i=0;i<arguments.length && typeof(arguments[i])=="function";i++){
		onLoadHandel.push(arguments[i]);
	}
}	window['b']['setOnLoad']=setOnLoad;
/* 
*/	function setOnDomReady(){
	var bool_mode=typeof(arguments[arguments.length-1])=="boolean" ? arguments[arguments.length-1] : null;
	if(bool_mode){
		onDomReadyHandel=[];
	}
	for(var i=0;i<arguments.length && typeof(arguments[i])=="function";i++){
		onDomReadyHandel.push(arguments[i]);
	}
}	window['b']['setOnDomReady']=setOnDomReady;
/* 增加事件监听 
bool */	function addEvent(node, eventTypeName, handle){
	if (!(node=$(node))){return false;}
	if (node.addEventListener){
		node.addEventListener(eventTypeName, handle, false);
		return true;
	}
	else if (node.attachEvent){
	//	IE方法
		node['e'+eventTypeName+handle]=handle;
		node[eventTypeName+handle]=function(){
			node['e'+eventTypeName+handle](window.event);
		}
		node.attachEvent('on'+eventTypeName, node[eventTypeName+handle]);
		return true;
	}
	return false;
}	window['b']['addEvent']=addEvent;
/* 移除事件监听
bool */	function removeEvent(node, type, listener){
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
}	window['b']['removeEvent']=removeEvent;
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
}

// 注册onDomReadyHandel
var DOMRETRYTIMES=20;		// 设定尝试次数
var DOMRETRYTIMER=100;		// 设定间隔
var IntervalHandel;
var onDomReadyHandel=[];	// 保存body完全载入后执行的函数句柄
function _BonDomReady(event){
	if(document.body){
		for(var i=0,length=onDomReadyHandel.length;i<length;i++){
			onDomReadyHandel[i](event);
		}
		clearInterval(IntervalHandel);
		doutc("B>_BonDomReady end");
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
IntervalHandel=setInterval(_BonDomReady,DOMRETRYTIMES);

// 注册onLoadHandel
var onLoadHandel=[];		// 保存页面载入后执行函数的句柄
if(typeof(window.onload)=='function'){
	b.onLoadHandel.unshift(window.onload);
}
function _BonLoad(event){
	for(var i=0,length=onLoadHandel.length;i<length;i++){
		onLoadHandel[i](event);
	}
	doutc("B>_BonLoad end");
}
window.onload=_BonLoad;
//addEvent(window, 'load', _BonLoad);

///////////////* DOM操作 *//////////////////
b.nodeTyp	={				// nodeType的值
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
			element=document.getElementById(element);
		}
		if (arguments.length==1) return element;			//	TODO: 可以省略？
		elements.push(element);
	}
	return elements;
}	window['b']['$']=$;
/* 以Class为标识搜寻元素 
bool */	function getElementByClassName(className, tag, parent){
	parent=parent || document;
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
}	window['b']['getElementByClassName']=getElementByClassName;
/* 将节点插入到指定节点的后面
bool */	function insertAfter(node, referenceNode){
	if (!(node=$(node))) return false;
	if (!(referenceNode=$(referenceNode))) return false;
	return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}	window['b']['insertAfter']=insertAfter;
/* 移除全部子节点 
parentNode */	function removeChildren(parent){
	if (!(parent=$(parent))) return false;
	//	存在子节点就将其移出
	while(parent.firstChild)
		parent.firstChild.parentNode.removeChildren(parent.firstChild);
	return parent;
}	window['b']['removeChildren']=removeChildren;
/* 将节点插到子节点最前面 
parentNode */	function prependChildren(parent, newChild){
	if (!(parent=$(parent))) return false;
	if (!(newChild=$(newChild))) return false;
	if(parent.firstChild) parent.insertBefore(newChild, parent.firstChild);
	else parent.appendChild(newChild);
	return parent;
}	window['b']['prependChildren']=prependChildren;

///////////////* 操纵样式 *//////////////////
/* 切换显示/隐藏状态
bool */	function toggleDisplay(node, value){
	if(!(node=$(node))) return false;

	if (node.style.display !='none') node.style.display='none';
	else node.style.display=value || '';
	return true;
}	window['b']['toggleDisplay']=toggleDisplay;

///////////////* Object扩展 *//////////////////
var _toString = Object.prototype.toString;
function isArray(object) {
	return _toString.call(object)=="[object Array]";
}	window['b']['isArray']=isArray;
function isFunction(object){
	return typeof(object)==="function";
}	window['b']['isFunction']=isFunction;

b.isString=function isString(object) {
	return _toString.call(object)=="[object String]";
}

b.isNumber=function isNumber(object) {
	return _toString.call(object)=="[object Number]";
}

b.isUndefined=function isUndefined(object) {
	return typeof object==="undefined";
}


///////////////* Array扩展 *//////////////////
b.array={};
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
}	window['b']['array']['getIndex']=getIndex;

///////////////* String扩展 *//////////////////
b.string={};
/* 检查一个字符串的格式是否符合Email格式
用户名、域名首字符为字母或数字。允许下划线、不许连续的点、域名中不许连续的连词符……
@test-env:wait
@test-uc:pass
bool */	function isEmail(str){
	return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w{2,3}$/.test(str);
}	window['b']['string']['isEmail']=isEmail;



///////////////* 其他 *//////////////////

function test(){
	doutc('B>test()')
}	window['b']['test']=test;

/* 浏览器判定
*/	function UAver(){
	var ver =top.opera?(opera.version().replace(/\d$/, "")-0)
		:parseFloat((/(?:IE |fox\/|ome\/|ion\/)(\d+\.\d)/.
		exec(navigator.userAgent) || [,0])[1]); 
	var dom={ 
		ie: !!top.VBArray && Math.max(document.documentMode||0, ver),//内核trident 
		firefox: !!top.crypto && ver,//内核Gecko 
		opera:  !!top.opera && ver,//内核 Presto 9.5为Kestrel 10为Carakan 
		chrome: !!(top.google && top.chrome ) &&  ver ,//内核V8 
		safari: /apple/i.test(navigator.vendor) && ver// 内核 WebCore 
	}
	return dom;
}
// via cnblogs.com/rubylouvre/archive/2010/10/02/1840856.html by 司徒正美

/* 载入指定脚本
*/	function loadScript(url, callback){
	var script=document.createElement("script");
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
	document.getElementsByTagName("head")[0].appendChild(script);
}
// via nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/ by Nicholas C. Zakas


/* 检查兼容性，当前未使用 TODO: 库完成差不多再进行
bool */	function isCompatible(other){
	if(other
		&&	Array.prototype.push
		&&	Object.prototype
		&&	document.createElement
		&&	document.getElementsByTagName
		){
		return true;
	}
	return false;
}	window['b']['isCompatible']=isCompatible;

/* 跨浏览器的获得 XMLHttpRequest 对象方法
@test-env:wait
XMLHttpRequest Object */	function getXMLHttpRequest(){
	var XHR;
	if(window.XMLHttpRequest){
		XHR=new XMLHttpRequest();
		if(XHR.overrideMimeType)
			XHR.overrideMimeType('text/xml');
	}
	else if(window.ActiveXObject)
		XHR=new ActiveXObject('Microsoft.XMLHTTP');
	return XHR;
}	window['b']['getXMLHttpRequest']=getXMLHttpRequest;
/* 将url指定的xml代码直接替换掉id元素下的内容
tagName和nthTag可选，且需要同时使用，指定xml中替换的
完成度低，慎用
*/	function loadHTML(id,url,tagName,nthTag){
	var doc=getXMLHttpRequest();
	try{
		doc.open('GET',url,true);
		doc.send(null);
		doc.onreadystatechange=function(){
			if(doc.readyState==4){
				if(tagName && nthTag){
					var added=doc.responseXML.getElementsByTagName(tagName[nthTag]);
					if(!added.length){
						douta("B>loadHTML>responseXML: added 无返回，xml解析错误？");
						return
					}
					var element=document.getElementById(id);
					if(!element){
						douta("B>loadHTML>getElementById: 未找到指定ID于当前文档");
						return
					}
					element.innerHTML="";
					// 会将节点从XML中移动到文档中，且类型非HTML
					element.appendChild(added);
				}
				else
					// Fix: 直接copy有隐患
					document.getElementById(id).innerHTML=doc.responseText;
			}
		}
	}
	catch(e){};
}	window['b']['loadHTML']=loadHTML;

/* 遍历文档，自动生成目录
TODO: 减少reflow次数
参数说明：
	参数均为可选
	findInArray		数组，元素被搜寻元素的大写标签字符串，默认查找h2、h3、h4。
	prefixString	加入锚记的前缀，默认为“mk”
	contAnchor		目录的锚记，默认为“content”
	inWhere			在何处寻找，默认为body内
提示：
	不搜索已指定id的元素
@test-env=pass: IE6, LvA
@test-uc=wait
*/	function GenerateContents(findInArray,prefixString,contAnchor,inWhere){
	findInArray=findInArray		||['H2','H3','H4'];
	prefixString=prefixString	||"mk";
	contAnchor=contAnchor		||"content";

	var topNode=document.getElementById('ui-AutoContents');	// 目录根节点
	if(!topNode) return false;
	var ctNode=document.createElement('ul');	// 目录容器
	ctNode.setAttribute('class','ui-content-c');
	var cNum=new Array(findInArray.length);	// 计数数组
	for(var i=0;i<cNum.length;i++) cNum[i]=0;

	topNode.innerHTML='<h3 class="ui-content-t" title="善用目录可以节约您的时间"><a name="'+contAnchor+'">目录</a></h3>';
	topNode.id='ui-content';

	traverse($(inWhere)||document.body);
	// 返回根部并把生成的目录加入DOM中
	while(ctNode.parentNode) ctNode=ctNode.parentNode;
	topNode.appendChild(ctNode);

	var lastFindIndex=0;
	var ctFindIndex=0;
	/* GenerateContents>遍历例程 */
	function traverse(node){
		for(var i=0;i<node.children.length;i++){
			var cvNode=node.children[i];			// 当前遍历节点
			ctFindIndex=b.array.getIndex(cvNode.nodeName,findInArray);
			if(ctFindIndex!=null){//&&cvNode.id==""
			// 当前节点是要找的
				_doutc("find a h"+cvNode.nodeName);
				cNum[ctFindIndex]++;
				var hashstr=getMkString(ctFindIndex);
				//cvNode.id=getMkString(ctFindIndex);

				// 决定走向+设置标号
				if(lastFindIndex<ctFindIndex){
					// 深入里层
					ctNode=ctNode.children[ctNode.children.length-1];
					for(var k=ctFindIndex-lastFindIndex;k>0;k--){
						ctNode.appendChild(document.createElement('ul'));
						ctNode=ctNode.getElementsByTagName('ul')[0];
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
				var nodeli=document.createElement('li');
				if(cvNode.textContent){
					nodeli.innerHTML="<a href='#"+hashstr+"'>"+cvNode.textContent+"</a>"
				}
				else if(cvNode.outerText){	// IE方法
					nodeli.innerHTML="<a href='#"+hashstr+"'>"+cvNode.outerText+"</a>"
				}
				ctNode.appendChild(nodeli);
				var nodeA=document.createElement('span');
				nodeA.innerHTML=' <a href="#" class="ui-content-t" title="点击返回顶部">[TOP]</a>';
				cvNode.innerHTML='<a href="#'+contAnchor+'" name="'+hashstr+'" class="ui-content-b" title="点击返回目录">'+cvNode.innerHTML+'</a>'
				cvNode.appendChild(nodeA);
				lastFindIndex=ctFindIndex;
			};
			// 跳过目录
			if(node.children[i].id!="ui-content")
				traverse(node.children[i]);
		}
	}
	/* GenerateContents>生成类似1-2-3的编号字串 */
	function getMkString(i){
		var str=prefixString;
		for(var j=0;j<=i;j++){
			str+="-"+String(cNum[j]);
		}
		return str;
	}
}	window['b']['GenerateContents']=GenerateContents;

}catch(e){alert("B>库初始化遇到问题：\n"+e)}
})()	// 一个自执行匿名函数
