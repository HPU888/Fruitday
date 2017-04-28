function $(id) {
	return document.getElementById(id);
}
function TagName (tagname) {
	return document.getElementsByTagName(tagname);
}
function Create (name) {
	return document.createElement(name);
}

function setCookie(name, value, expires, path) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + expires);

	// 写入cookie
	document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + oDate + ';path=' + path;
}

function getCookie(name) {
	var aCookie = document.cookie.split('; ');
	for(var i = 0; i < aCookie.length; i++) {
		var oTemp = aCookie[i].split('=');

		if(oTemp[0] === name) {
			return decodeURIComponent(oTemp[1]);
		}
	}
	return false;
}

//运动封装
function bufferMove(obj, oTarget, fn){
	clearInterval(obj.oTimer);
	obj.oTimer = setInterval(function () {
		// 假设所有的属性均已运动完毕
		var bBtn = true;
		// 遍历对象
		for(var sAttr in oTarget) {
			// 获取当前值
			if(sAttr === 'opacity') {
				var iCur = parseInt(getStyle(obj, sAttr) * 100);
			} else {
				var iCur = parseInt(getStyle(obj, sAttr));
			}
			// 计算速度
			var iSpeed = (oTarget[sAttr] - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			// 开始赋值
			var iNext = iCur + iSpeed;
			if(sAttr === 'opacity') {
				obj.style.opacity = iNext / 100;
				obj.style.filter = 'alpha(opacity=' + iNext + ')';
			} else {
				obj.style[sAttr] = iNext + 'px';
			}

			// 检测当前属性是否真的已经运动完毕
			if(iNext !== oTarget[sAttr]) {
				bBtn = false;
			}
		}

		if(bBtn) {
			clearInterval(obj.oTimer);
			fn && fn();
		}
	}, 50);
}

function getStyle(obj, sAttr) {
	if(obj.currentStyle) {
		return obj.currentStyle[sAttr];
	} else {
		return getComputedStyle(obj, false)[sAttr];
	}
}


/*
	type  请求类型， 值为 get、post
	url   请求地址
	data  往后台发送的数据 数据类型为对象或者字符串
	// 字符串格式：a=b&c=d&e=f
	// 对象格式：{a:b,c:d,e:f}
	fn    回调函数
	async 是否为异步， 默认值为true
*/

function ajax ({type, url, data, fn, async = true} = {}) {
	type = type.toUpperCase();
	//第一步：创建AJAX对象
	var oXhr = null;
	if (window.ActiveXObject) {
		oXhr = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		oXhr = new XMLHttpRequest();
	}
	
	//处理数据
	var sData = "";
	if (typeof data === "object") {
		for (var sAttr in data) {
			sData += sAttr + "=" + encodeURIComponent(data[sAttr]) + "&";
		}
		//去点最后一个&符号
		sData = sData.slice(0, -1);
	} else {
		sData = data;
	}
	
	//GET请求，将数据追加到URL后面
	if (type === "GET") {
		url += "?" + sData;
	}
	
	//第二步：配置
	oXhr.open(type, url, async);
	
	//POST请求
	if (type === "POST") {
		oXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		oXhr.send(sData);
	} else {
		//第三步：发送数据
		oXhr.send();
	}
	
	//第四步：接收数据
	oXhr.onreadystatechange = function () {
		if (oXhr.readyState === 4 && oXhr.status === 200) {
			fn && fn(oXhr.responseText);
		}
	}
}



//使用promise完成ajax效果
function PromiseAjax ({type, url, data, fn, async = true} = {}) {
	return new Promise(function (resolve, reject){
		type = type.toUpperCase();
		
		var oXhr = null;
		if (window.ActiveXObject) {
			oXhr = new ActiveXObject("Microsoft.XMLHTTP");
		}else {
			oXhr = new XMLHttpRequest();
		}
		
		var sData = "";
		if (typeof data === "object") {
			for (var sAttr in data) {
				sData += sAttr + "=" + encodeURIComponent(data[sAttr]) + "&"; 
			}
			sData.slice(0, -1);
		}else {
			sData = data;
		}
		
		if (type === "GET") {
			url += "?" + sData;
		}
		
		oXhr.open(type, url, async);
		
		if (type === "POST") {
			oXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			oXhr.send(sData);
		}else {
			oXhr.send();
		}
		
		oXhr.onreadystatechange = function () {
			if (oXhr.readyState === 4 && oXhr.status === 200) {
				resolve(oXhr.responseText);
			}else {
				reject();
			}
		}
	});
}
