/*
 * ! BB Another JavaScript Lib
 * jQuery needed.
 * 
 * 2010~2011 BB9z@live.com 最新版本可在Google
 * Code获得：http://bb9z.googlecode.com/hg/bb.js/current.js
 */

// #namespace
// 命名空间"bb"
// _NAME_SPACE_BB_定义了输出到外部空间的名字，同时库的内容会在初始化后覆盖_NAME_SPACE_BB_
var _NAME_SPACE_BB_ = "bb";

(function(){
	// try{
	// 库起始

	var bb = {}; // 内部的对象
	var bbns = _NAME_SPACE_BB_; // 输出到外部的名字
	var W = window, D = W.document; // 使用window下的document，参照 jQuery

	if(!W[bbns]){
		W[bbns] = bb;
	}
	else{
		// 已经占用
		if(W[bbns].version && W[bbns].defineBy){
			// 可能是再次引用
			// 那么仅提示一下，并返回
			doutc("bb>Lib" + W[bbns].version + " is defined by: " + W[bbns].defineBy);
			// 结束，把现有定义输出到_NAME_SPACE_BB_
			return _NAME_SPACE_BB_ = W[bbns];
		}
		else{
			// 被其他人占用了，输出到_NAME_SPACE_BB_
		}
	}
	// 总是将库的内容输出到_NAME_SPACE_BB_
	_NAME_SPACE_BB_ = W[bbns];

	bb.pressDate = false;
	bb.version = false;
	bb.defineBy = "BB9z";

	// #output
	// /////////////* 调试输出 *//////////////////
	var DEBUG_OUTPUT = true;
	bb.debugMode = DEBUG_OUTPUT; // 调试模式开关
	/**
	 * 用于调试的输出 - 输出到控制台
	 * 
	 * @param str_outputString
	 *            输出的信息
	 * @returns NULL
	 */
	function doutc(str_outputString){
		if(DEBUG_OUTPUT == true){
			try{
				console.log(str_outputString);
			}
			catch(e){
			}
		}
	}
	bb['doutc'] = doutc;
	/**
	 * 用于调试的输出 - 弹出警告
	 * 
	 * @param str_outputString
	 *            输出的信息
	 * @returns NULL
	 */
	function douta(str_outputString){
		if(DEBUG_OUTPUT == true){
			alert(str_outputString);
		}
	}
	bb['douta'] = douta;
	/**
	 * 用于调试的输出 - 列出变量成员
	 * 
	 * @param obj
	 *            被打印的对象
	 * @param str_otherInfo
	 *            可选信息，在输出最前面
	 * @param bool_silentMode
	 *            可选，为真时输出到控制台，否则弹出
	 * @return NULL
	 */
	function douto(obj, str_otherInfo, bool_silentMode){
		if(typeof (arguments[1]) == "boolean"){
			bool_silentMode = arguments[1];
			str_otherInfo = "";
		}
		var output = [str_otherInfo] + " type: " + typeof (obj) + " " + obj + "\n";
		for( var name in obj){
			output += name + ":\t" + obj[name] + "\n";
		}
		if(bool_silentMode)
			doutc(output);
		else
			douta(output);
	}
	bb['douto'] = douto;

	/* 空输出函数，可用替换的方法禁用/恢复指定代码区域的调试输出 */
	function _doutc(){
	}
	bb['_doutc'] = _doutc;
	function _douta(){
	}
	bb['_douta'] = _douta;
	function _douto(){
	}
	bb['_douto'] = _douto;

	if(jQuery){
		var $ = jQuery;
	}
	else{
		var $ = function $(element){
			var elements = [];
			for( var i = 0; i < arguments.length; i++){
				var element = arguments[i];

				// 字符串输入假定为ID
				if(typeof element == 'string'){
					element = D.getElementById(element);
				}
				if(arguments.length == 1) return element;
				elements.push(element);
			}
			return elements;
		};
	}
	bb['$'] = $;

	/* 以Class为标识搜寻元素 
	bool */function getElementByClassName(className, tag, parent){
		parent = parent || D;
		if(!(parent = $(parent))){
			return false;
		}

		var allTags = (tag == "*" && parent.all) ? parent.all : parent.getElementsByTagName(tag);
		var matchingElements = new Array();

		className = className.replace(/\-/g, "\\-");
		var regax = new RegExp("(^|\\s)" + className + "(\\s|$)");

		var element;
		for( var i = 0; i < allTags.length; i++){
			element = allTags[i];
			if(regax.test(element.className)){
				matchingElements.push(element);
			}
		}
		return matchingElements;
	}
	bb['getElementByClassName'] = getElementByClassName;
	/* 将节点插入到指定节点的后面
	bool */function insertAfter(node, referenceNode){
		if(!(node = $(node))) return false;
		if(!(referenceNode = $(referenceNode))) return false;
		return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
	}
	bb['insertAfter'] = insertAfter;
	/* 移除全部子节点 
	parentNode */function removeChildren(parent){
		if(!(parent = $(parent))) return false;
		// 存在子节点就将其移出
		while(parent.firstChild)
			parent.firstChild.parentNode.removeChildren(parent.firstChild);
		return parent;
	}
	bb['removeChildren'] = removeChildren;
	/* 将节点插到子节点最前面 
	parentNode */function prependChildren(parent, newChild){
		if(!(parent = $(parent))) return false;
		if(!(newChild = $(newChild))) return false;
		if(parent.firstChild)
			parent.insertBefore(newChild, parent.firstChild);
		else
			parent.appendChild(newChild);
		return parent;
	}
	bb['prependChildren'] = prependChildren;

	// #style
	// /////////////* 操纵样式 *//////////////////
	/* 切换显示/隐藏状态
	bool */function toggleDisplay(node, value){
		if(!(node = $(node))) return false;

		if(node.style.display != 'none')
			node.style.display = 'none';
		else
			node.style.display = value || '';
		return true;
	}
	bb['toggleDisplay'] = toggleDisplay;

	// #ex_object
	// /////////////* Object扩展 *//////////////////

	// start:@test-env:chrome7
	/* 类型检测核心函数，参照jQuery的实现
		不同之处在于将返回的格式简化了
	string */function getTypeString(obj){
		return Object.prototype.toString.call(obj).replace(/\[object\b(.*)]/, "$1");
	}
	bb['getTypeString'] = getTypeString;

	/* 类型检测：Array
	bool */function isArray(obj){
		return getTypeString(obj) == "Array";
	}
	bb['isArray'] = isArray;
	/* 类型检测：Function
	bool */function isFunction(obj){
		return typeof (obj) === "function";
	}
	bb['isFunction'] = isFunction;
	/* 类型检测：String
	bool */function isString(obj){
		// 直接typeof可否？
		return getTypeString(obj) == "String";
	}
	bb['isString'] = isString;
	/* 类型检测：Number
	bool */function isNumber(obj){
		return getTypeString(obj) == "Number";
	}
	bb['isNumber'] = isNumber;

	/* 类型检测：Undefined
	bool */function isUndefined(obj){
		return typeof obj === "undefined";
	}
	bb['isUndefined'] = isUndefined;
	/* 类型检测：EmptyObject
	bool */function isEmptyObject(obj){
		if(getTypeString(obj) !== "Object") return null;
		for( var name in obj)
			return false;
		return true;
	}
	bb['isEmptyObject'] = isEmptyObject;

	/* 检测第一个参数是否为HTML元素，不包括document本身
	bool */function isHtmlElement(obj){
		return /HTML(\w*)Element/.test(getTypeString(obj));
	}
	bb['isHtmlElement'] = isHtmlElement;
	// end:@test-env:chrome7

	// /////////////* Array扩展 *//////////////////
	bb.array = {};
	/* 返回 element 在 refArray 中的序号，若找不到返回 null 
	index/null */function getIndex(element, refArray){
		if(!isArray(refArray)) return false;
		for( var i = refArray.length - 1; i >= 0; i--){
			refArray[i];
			if(element == refArray[i]){
				return i;
			}
		}
		return null;
	}
	bb['array']['getIndex'] = getIndex;

	// /////////////* String扩展 *//////////////////
	bb.string = {};
	/* 检查一个字符串的格式是否符合Email格式
	用户名、域名首字符为字母或数字。允许下划线、不许连续的点、域名中不许连续的连词符……
	@test-env:wait
	@test-uc:pass
	bool */function isEmail(str){
		return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\W{2,3}$/.test(str);
	}
	bb['string']['isEmail'] = isEmail;

	/* 移除字符串首位空格
	@test-env:wait
	*/function trim(str){
		return str.replace(/^\s+|\s+$/g, '');
	}
	bb['string']['trim'] = trim;

	// #others
	// /////////////* 其他 *//////////////////

	(function(){
		// 闭包内保护
		var uid = 0;
		/* 获得一个UID
			@test-env:skip
		UID number */function guid(){
			return uid++;
		}
		bb['guid'] = guid;
	})();

	/*!#app*/

	/**
	 * 载入指定脚本
	 * 
	 * @param url
	 *            脚本地址
	 * @param callback
	 *            回调函数
	 * @returns NULL
	 */
	function loadScript(url, callback){
		var script = D.createElement("script");
		script.type = "text/javascript";

		if(script.readyState){ // IE
			script.onreadystatechange = function(){
				if(script.readyState == "loaded" || script.readyState == "complete"){
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
	bb['loadScript'] = loadScript;
	// via
	// nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
	// by Nicholas C. Zakas

	function test(){
		doutc('bb>test() in');

		doutc('bb>test() out');
	}
	bb['test'] = test;

	bb.xyz = {};
	bb.xyz.W = {
		screenX : W.screenX,
		screenY : W.screenY,
		screenLeft : W.screenLeft,
		screenTop : W.screenTop,
		innerWidth : W.innerWidth,
		innerHeight : W.innerHeight,
		outerWidrh : W.outerWidth,
		outerHeight : W.outerHeight,
		scrollX : W.scrollX,
		scrollY : W.scrollY,
		pageXOffset : W.pageXOffset,
		pageYOffset : W.pageYOffset
	};
	bb.xyz.get = function(element){
		e = $(element);
		return {

		};
	};

	doutc("end of define bb.js");
	// 库结尾
	// }catch(e){alert("bb>库初始化遇到问题：\n"+e)}
})(); // 一个自执行匿名函数
