/*
 * Sh.js Version 1
 */
var sh = new function(){
console.log('Sh.js v2 By:Zion \r\n\r\n' + 'Github: https://github.com/zionLZH/sh.js')
//  ===== Main Start =====
var $ = this;
//const defind
this.RUNTIME_WEB = 0
this.RUNTIME_PLUS = 1
this.RUNTIME_WXAPP = 2
this.NOOP = function(){}
//Runtime Config
this.CONF = {
	runtime: $.RUNTIME_WEB
}
//Stronger
String.prototype.format = function(){
	var str = this
	var i = 0,ret = str.match(/(%s%)/gi);
	while (i<ret.length){
		if( !arguments[i] ){
			str = str.replace('%s%','')
		}else{
			str = str.replace('%s%',arguments[i])			
		}
		i++;
	}
	return str
}

//Methods
this.err = function(str){
	console.error('[SH: ERROR] ' + str)	
}
this.log = function(str){
	console.log('[SH: LOG] ' +str)
}
this.__extend_ = {}
this.extend = function(name,constructor){
	if( $[name] ){
		$.err('%s% is extended'.format(name))
		return;
	}
	$.__extend_[name] = false;
	(function($v2,$name){
		Object.defineProperty($v2,$name,{
			get:function(){
				if(!$v2.__extend_[$name]){
					$v2.__extend_[$name] = new constructor($v2, $v2.CONF)
					console.log('Load extend: ' + $name)
				}
				return $v2.__extend_[$name];
			},
			set:function(){
				return false;
			}
		})
	}($,name));
}
this.root = function(name,constructor){
	if( $[name] ){
		$.err('root method >> %s% is extend'.format(name));
		return;
	}
	try{
		$[name] = constructor		
	}catch(e){
		//TODO handle the exception
		$.err(e);
		$.err('There is one or more error in the function "%s%"'.format(name))
	}
}
this.plus = function(fn){
	if(window.plus){
		fn();
	}else{
		document.addEventListener('plusready',function(){
			fn();
		})
	}
}
try{
	if(wx){
		this.CONF.runtime = this.RUNTIME_WXAPP
	}	
}catch(e){
	//TODO handle the exception
	if(/(html5plus)/gi.test(navigator.userAgent)){
		this.CONF.runtime = this.RUNTIME_PLUS
	}
}
//  ===== Main End =====
};

/*
 * Storage
 */
sh.extend('storage',function($,CONF){
	var ss = {}
	var SELF = this;
	this.initRuntime = function(){
		switch (CONF.runtime){
			case $.RUNTIME_WEB:
				ss = localStorage
				break;
			case $.RUNTIME_PLUS:
				$.plus(function(){
					ss = window.plus
				})
				break;
			case $.RUNTIME_WXAPP:
				ss = wx
				break;
			default:
				break;
		}
	}
	this.set = function(key,value){
		SELF.initRuntime()
		if(!value)value='';
		if(typeof(value)!='string')value = JSON.stringify(value);
		value = escape(value);
		(CONF.runtime == $.RUNTIME_WXAPP)?ss.setStorageSync(key,value):ss.setItem(key,value);
	}
	this.get = function(key){
		SELF.initRuntime()
		var str = '';
		(CONF.runtime == $.RUNTIME_WXAPP)?str = ss.getStorageSync(key):str = ss.getItem(key);
		str = unescape(str)
		if(str.substr(0,1)=='{' && str.substr(str.length-1,1)=='}')str = JSON.parse(unescape(str));
		if(str=='null')return null;
		return str;
	}
	this.del = function(key){
		SELF.initRuntime()
		(CONF.runtime == $.RUNTIME_WXAPP)?ss.removeStorageSync(key):ss.removeItem(key);
	}
	this.clear = function(force){
		if(!force){
			$.err('You need the force parameter to determine the removal of storage => %s%'.format('[force is false]'))
			return;
		};
		SELF.initRuntime()
		(CONF.runtime == $.RUNTIME_WXAPP)?ss.clearStorageSync():ss.clear();
	}
});

/*
 * Webview
 */
sh.extend('wv',function($,CONF){
	var SELF = this;
	this.open = function(path,extras){
		switch (CONF.runtime){
			case $.RUNTIME_WEB:
				if(extras){
					var _query = '';
					for(key in extras)_query += key + '=' +encodeURI(extras[key]) + '&';
					_query = _query.substr(0,_query.length - 1);  
					location.href = path + '?' + _query;
					return;
				}
				location.href = path
				break;
			case $.RUNTIME_PLUS:
				if(SELF.find(path)!=null)return;
				plus.nativeUI.showWaiting();
				if(extras){
					var wv = plus.webview.create(path,path,{popGesture:'close'},extras);			
				}else{
					var wv = plus.webview.create(path,path);
				}
				wv.addEventListener('loaded',function(){
					wv.show('pop-in',200,function(){
						plus.nativeUI.closeWaiting();
					})
				})
				break;
			case $.RUNTIME_WXAPP:
				if(extras){
					var _query = '';
					for(key in extras)_query += key + '=' +encodeURI(extras[key]) + '&';
					_query = _query.substr(0,_query.length - 1);  
				    wx.navigateTo({
				      url: path + '?' + _query,
				    })
					return;			
				}
			    wx.navigateTo({
			      url: path,
			    })
				break;
			default:
				break;
		}
	}
	this.switch = function(path){
		if(CONF.runtime != $.RUNTIME_WXAPP){
			$.err('This method just can use on RUNTIME_WXAPP');return;
		}
		wx.switchTab({
			url: path
		})
	}
	this.find = function(){
		if(CONF.runtime != $.RUNTIME_PLUS){
			$.err('This method just can use on RUNTIME_PLUS');return null;
		}
		var wvs = plus.webview.all();
		for (var i=0;i<wvs.length;i++) {
			if(wvs[i].id == path)return wvs[i];
		}
		return null;
	}
	this.close = function(){
		switch (CONF.runtime){
			case $.RUNTIME_WEB:
				history.go(-1)
				break;
			case $.RUNTIME_PLUS:
				plus.webview.currentWebview().close()
				break;
			case $.RUNTIME_WXAPP:
				wx.navigateBack({
				  delta: 1
				})
				break;
			default:
				break;
		}
	}
	this.extras = function(){
		switch (CONF.runtime){
			case $.RUNTIME_WEB:
				var localHref = location.href
				if(localHref.indexOf('#')!=-1){
					try{
						var hashkey = localHref.split('#')[1]				
					}catch(e){
						var hashkey = ''
					}
					localHref = localHref.replace('#'+hashkey,'')
				}
				var url = localHref.split('?');
				if(url.length==1)return {};
				var url = url[1].split('&');
				var querys = {}
				for(var i=0;i<url.length;i++){
					var _q = url[i].split('=');
					querys[_q[0]] = decodeURI(_q[1]);
				}
				return querys;
				break;
			case $.RUNTIME_PLUS:
				return plus.webview.currentWebview();
				break;
			case $.RUNTIME_WXAPP:
				$.err('On WeChatApp, You need to get "Extra Data" on "onload" in the "App Service" ')
				return {}
				break;
			default:
				break;
		}
	}
});

/*
 * Request mini 
 * Wran: I think there's one or more mistakes here
 */
sh.extend('http',function($,CONF){
	//Copy:https://www.cnblogs.com/zhiqiangzhang37/archive/2013/10/02/3349647.html
	function webAjax(opt) {
		opt = opt || {};
		var type = opt.type || 'GET';
		type = type.toUpperCase() || 'GET';
		var url = opt.url || '';
		var async = opt.async || true;
		var data = opt.data || null;
		var success = opt.success || function () {};
		var error = opt.error || function(){};
		var xmlHttp = null;
		if (XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();
		}else {
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		}
		var params = [];
		for (var key in data){
			params.push(key + '=' + data[key]);
		}
		var dataStr = params.join('&');
		if (type === 'POST') {
			xmlHttp.open(type, url, async);
			xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
			xmlHttp.send(dataStr);
		}else {
			xmlHttp.open(type, url + '?' + dataStr, async);
			xmlHttp.send(null);
		} 
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				try{
					success(JSON.parse(xmlHttp.responseText));
				}catch(e){
					error({},e,'parse error')
				}
			}
		};
	}
	//CopyEnd & fix one or more
	var wxReq = function(url,data,method,success,error){
		wx.request({
			url: url,
			data: data,
			method: method,
			header: (method=='GET')?{}:{'content-type': 'x-www-form-urlencoded'},
			success: function(res){
				try{
					success(JSON.parse(res))
				}catch(e){
					error(e,'parse error')
				}
			},
			fail: function(){
				error({},'no')
			}
		})
	}
	this.get = function(obj){
		if(obj.data && typeof(obj.data)!='object'){
			$.err('%s% is not\'t a Object'.format(obj.data));return;
		}
		var url = obj.url || ''
		var data = obj.data || {}
		var success = obj.success || $.NOOP
		var error = obj.error || $.NOOP
		data._ = new Date().getTime();
		if(CONF.runtime == $.RUNTIME_WXAPP){
			wxReq(url,data,'GET',success,error)
		}else{
			webAjax({url: url, data: data, type: 'GET', success: success, error: error})
		}
	}
	this.post = function(obj){
		if(obj.data && typeof(obj.data)!='object'){
			$.err('%s% is not\'t a Object'.format(obj.data));return;
		}
		var url = obj.url || ''
		var data = obj.data || {}
		var success = obj.success || $.NOOP
		var error = obj.error || $.NOOP
		data._ = new Date().getTime();
		if(CONF.runtime == $.RUNTIME_WXAPP){
			wxReq(url,data,'POST',success,error)
		}else{
			webAjax({url: url, data: data, type: 'POST', success: success, error: error})
		}		
	}
})

/*
 * Check
 */
sh.extend('check',function($,CONF){
	var SELF = this;
	this.isNoEmpty = function(str){
		str = JSON.stringify(str);
		str = str.replace(/( )/gi,'')
		if(str == "[]" || str == "{}" || str == "\"\"")return false;
		return true;
	}
	this.isMail = function(str){
		if(!SELF.isNoEmpty(str))return false;
		return /(.*?)@(.*?)\.(.*?)/gi.test(str)
	}
	this.isPhone = function(str){
		if(!SELF.isNoEmpty(str))return false;
		if(str.length!=11)return false;
		return /(1[0-9]{2})+\d{8}/gi.test(str)
	}
	this.isId = function(str){
		if(!SELF.isNoEmpty(str))return false;
		if(str.length<6)return false;
		var ret = str.match(/([a-z]|[A-z]|[0-9]|@|\.)/gi)
		if(ret==null || ret.length!=str.length)return false;
		return true
	}
	this.isPwd = function(str){
		if(!SELF.isNoEmpty(str))return false;
		if(str.length<6)return false;
		var ret = str.match(/([a-z]|[A-z]|[0-9]|@|\.)/gi)
		if(ret==null || ret.length!=str.length)return false;
		return true
	}
	this.all = function(arr){
		var i = arr.length;
		while (i>0){
			for(key in arr[i-1]){
				console.log(key)
				var val = arr[i-1][key] + ''
				switch (key){
					case 'mail':
						if(!SELF.isMail(val))return false;
						break;
					case 'pwd':
						if(!SELF.isPwd(val))return false;
						break;
					case 'id':
						if(!SELF.isId(val))return false;
						break;
					case 'phone':
						if(!SELF.isPhone(val))return false;
						break;
					default:
						break;
				}
			}
			i--;
		}
		return true
	}
	this.checkFrom = function(group){
		//this method can't use on RUNTIME_WXAPP'
		var ret = {status: true, key: '', value: '', data: {}}
		if(CONF.runtime==$.RUNTIME_WXAPP)return ret;
		var arr = document.querySelectorAll("[data-check]");
		var i = 0
		while (i<arr.length){
			var opt = arr[i].getAttribute('data-check').split('-');
			if(opt.length!=3){
				$.err('%s% is a Erroneous expression'.format(arr[i].getAttribute('data-check')));
				$.err(arr[i].outerHTML)
				ret.status = false;
				return ret;
			}
			if(opt[0] == group){
				ret.data[opt[1]] = arr[i].value
				switch (opt[2]){
					case 'mail':
						if(!SELF.isMail(arr[i].value)){
							if(ret.status){
								ret.status = false
								ret.key = opt[1]
								ret.value = arr[i].value								
							}
						}
						break;
					case 'id':
						if(!SELF.isId(arr[i].value)){
							if(ret.status){
								ret.status = false
								ret.key = opt[1]
								ret.value = arr[i].value								
							}
						}
						break;
					case 'pwd':
						if(!SELF.isPwd(arr[i].value)){
							if(ret.status){
								ret.status = false
								ret.key = opt[1]
								ret.value = arr[i].value								
							}
						}
						break;
					case 'phone':
						if(!SELF.isPhone(arr[i].value)){
							if(ret.status){
								ret.status = false
								ret.key = opt[1]
								ret.value = arr[i].value								
							}
						}
						break;
					case 'empty':
					default:
						if(!SELF.isNoEmpty(arr[i].value)){
							if(ret.status){
								ret.status = false
								ret.key = opt[1]
								ret.value = arr[i].value								
							}
						}
						break;
				}
			}
			i++;
		}
		return ret
	}
});


