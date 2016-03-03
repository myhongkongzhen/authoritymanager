/**
 * base.js
 * 提供更多偏向原子能力组件
 * kkvoo
**/
var kkvoo = {};
kkvoo.uploader={};
kkvoo.base = function() {
   var dom = document,
       escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
       gap,
       indent,
       rep,
       win = window.constructor.prototype;
	function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }
	
	function str(key, holder) {
		var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        switch (typeof value) {
        case 'string':
            return quote(value);
        case 'number':
            return isFinite(value) ? String(value) : 'null';
        case 'boolean':
        case 'null':
            return String(value);
        case 'object':
            if (!value) {
                return 'null';
            }
            gap += indent;
            partial = [];

            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }
	
	window.constructor.prototype.pageDataMap=new Map();//区别于用sessionStore
	
	window.constructor.prototype.JSONString = function(o) {
//		return str('', {'': o});
		return JSON.stringify(o);
	}
	window.constructor.prototype.StringJSON = function(o) {
//		return eval('('+o+')');
		return JSON.parse(o);
	}
	
	window.constructor.prototype.FormJSON = function(o) {
		var data = {};
		var t = $("#"+o).serializeArray();
		    $.each(t, function() {
		    	data[this.name] = this.value;
		    });
		return data;
	}
	
	window.constructor.prototype.formatJsonDateStr = function(o,fmt) {
		fmt=(fmt)?fmt:"yyyy-MM-dd hh:mm:ss";
		if(o)
		return new Date(parseInt(o.time)).pattern(fmt);
		else
		return '';
	}
	
	window.constructor.prototype.kkvooReady = function(o) {
			$(document).ready(function() {
				//........
				o();
			});
	}
	window.constructor.prototype.changeTwoDecimal = function(x) {
		  var f_x = parseFloat(x);
		    if (isNaN(f_x)) {
		        alert('function:changeTwoDecimal->parameter error');
		        return false;
		    }
		    var f_x = Math.round(x * 100) / 100;
		    var s_x = f_x.toString();
		    var pos_decimal = s_x.indexOf('.');
		    if (pos_decimal < 0) {
		        pos_decimal = s_x.length;
		        s_x += '.';
		    }
		    while (s_x.length <= pos_decimal + 2) {
		        s_x += '0';
		    }
		    return s_x;
   }
	try {
		return {
			Ajax: function(url,data,success,error,type) {
				type=(type)?type:"post";
		        $.ajax({
		            type: type,
		            url: url,
		            data: data,
//		            dataType : "json",
//		            contentType:"application/json;charset=UTF-8",
		            async : false,
		            success:success,
		            error:error
		        });
			},
			
			AjaxBody: function(url,data,success,error,type) {
				type=(type)?type:"post";
		        $.ajax({
		            type: type,
		            url: url,
		            data: data,
		            dataType : "json",
		            contentType:"application/json;charset=UTF-8",
		            async : false,
		            success:success,
		            error:error
		        });
			},
			
			AjaxAsync: function(url,data,success,error,type) {
				type=(type)?type:"post";
		        $.ajax({
		            type: type,
		            url: url,
		            data: data,
//		            dataType : "json",
//		            contentType:"application/json;charset=UTF-8",
		            async : true,
		            success:success,
		            error:error
		        });
			},
			MyAlert : function(msg,title,reload,fun) {
				 var myAlertHtml=
		    		 '<div class=" modal-dialog myAlert-dialog">'+
		    		 '<div class="modal-content">'+
		    		 '<div class="modal-header">'+
		    		 '<button data-dismiss="modal" class="close" type="button">x</button>'+
		    		 '<h3>'+((title)?title:'提示')+'</h3>'+
		    		 '</div>'+
		    		 '<div class="form-horizontal">'+
		    		 '<div id="modal_body" class="modal-body">'+
					 '<div class="col-margin-30 bootbox-body">'+
					  msg+
					 '</div>'+
		    		 '</div>'+
		    		 '</div>'+
		    		 '<div id="modal_footer" class="modal-footer">'+
					 '<button data-dismiss="modal" type="button" onClick="" class="btn btn-default">确定</button>'+
		    		 '</div>'+
		    		 '</div>'+
		    		 '</div>';
				if(!$('#myAlert').length>0){
			    var  divHtml='<div id="myAlert" class="modal fade" aria-hidden="true" style="display: none;"></div>'+
		             '<button id="myAlertButton" href="#myAlert" data-toggle="modal" style="display: none;"></button>';
					$(document.body).append(divHtml); 
				}
			    $('#myAlert').html(myAlertHtml);
			    $('#myAlert').on('hidden.bs.modal', function (e) {
			        // 处理代码...
			    	if(reload){
						pageDataMap.clear();
						window.location.reload();
			    	}
			    	if(fun){
			    		fun();
			    	}
			    });
			    $("#myAlertButton").click();
			},
			
			delArray : function(o, del) {
				var temp = [];
				for(var i = 0,j = o.length ; i < j ; i++) {
					if(o[i] !== del) {
						temp.push(o[i]);
					}
				}
				return temp;
			},
			delJSON : function(o, del) {
				var temp = [];
				for(var i = 0,j = o.length ; i < j ; i++) {
					if(o[i].src !== del) {
						temp.push(o[i]);
					}
				}
				return temp;
			},
			delDom : function(o) {
				o = dom.body.removeChild(kkvoo.base.getDom(o));
				o = null;
			},
			getDom : function(o) {
				return (o instanceof Object)?o:dom.getElementById(o);
			},
			injectMethod : function(o,params1, params2) {
				eval(o+'(\''+params1+'\',\''+params2+'\')');
			},
			getHostURL : function() {
				return dom.location.href.substring(0, dom.location.href.lastIndexOf('/')+1);
			},
			
			/**
			 * 获取项目根路径
			 * @returns
			 */
			getRootPath:function(){
			    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
			    var curWwwPath=window.document.location.href;   
			    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
			    var pathName=window.document.location.pathname;
			    var pos=curWwwPath.indexOf(pathName);   
			    //获取主机地址，如： http://localhost:8083
			    var localhostPaht=curWwwPath.substring(0,pos);
			    //获取带"/"的项目名，如：/uimcardprj
			    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
			    return(localhostPaht+projectName);
			},
			init : function() {	
			}
		}
	} catch(e) {
		console.error(e.message);
		throw new Error(e);
	}
}();

/**
 * 增加Map   kkvoo
 * @param linkItems
 * @returns {Map}
 */
function Map(linkItems) { 
    this.current = undefined; 
    this._size = 0; 
    if(linkItems === false){
    	this.disableLinking(); 
    } 
}

/**
 * 获取当前map
 * @return 当前对象
 */
Map.noop = function() { 
    return this; 
}; 
/**
 * 非法操作
 * @return
 */
Map.illegal = function() { 
    throw new Error("非法操作，Map已经被禁用"); 
}; 
/**
 * 
 * @param obj
 * @param foreignKeys
 * @return
 */
Map.from = function(obj, foreignKeys) { 
    var map = new Map; 
    for(var prop in obj) { 
        if(foreignKeys || obj.hasOwnProperty(prop)){
        	map.put(prop, obj[prop]); 
        } 
    } 
    return map; 
}; 
/**
 * 禁用map
 * @return
 */
Map.prototype.disableLinking = function() { 
    this.link = Map.noop; 
    this.unlink = Map.noop; 
    this.disableLinking = Map.noop; 
    this.next = Map.illegal; 
    this.key = Map.illegal; 
    this.value = Map.illegal; 
    this.clear = Map.illegal; 
    return this; 
}; 
/**
 * 返回hash值 例如：number 123
 * @param value key/value
 * @return
 */
Map.prototype.hash = function(value) { 
    return (typeof value) + ' ' + (value instanceof Object ? (value.__hash || (value.__hash = ++arguments.callee.current)) : value.toString()); 
}; 
/**
 * 返回map的长度
 * @return
 */
Map.prototype.size = function() { 
    return this._size;
}; 

Map.prototype.hash.current = 0; 
/**
 * 通过key获取value
 * @param key
 * @return
 */
Map.prototype.get = function(key) { 
    var item = this[this.hash(key)]; 
    return item === undefined ? undefined : item.value; 
}; 
/**
 * 向map中添加数据
 * @param key 键
 * @param value 值
 * @return
 */
Map.prototype.put = function(key, value) { 
    var hash = this.hash(key); 
    if(this[hash] === undefined) { 
        var item = { key : key, value : value }; 
        this[hash] = item; 
        this.link(item); 
        ++this._size; 
    }else{
    	this[hash].value = value;
    } 
    return this; 
}; 
/**
 * 通过key删除数据
 * @param key
 * @return
 */
Map.prototype.remove = function(key) { 
    var hash = this.hash(key); 
    var item = this[hash]; 
    if(item !== undefined) { 
        --this._size; 
        this.unlink(item); 
        delete this[hash]; 
    } 
    return this; 
}; 
/**
 * 清除map
 * @return
 */
Map.prototype.clear = function() { 
    while(this._size){
		this.remove(this.key()); 
	} 
    return this; 
}; 
/**
 * 处理队列
 * @param item
 * @return
 */
Map.prototype.link = function(item) { 
    if(this._size == 0) { 
        item.prev = item; 
        item.next = item; 
        this.current = item; 
    }else { 
        item.prev = this.current.prev; 
        item.prev.next = item; 
        item.next = this.current; 
        this.current.prev = item;
    } 
}; 
Map.prototype.unlink = function(item) { 
    if(this._size == 0){ 
        this.current = undefined;
    }else { 
        item.prev.next = item.next; 
        item.next.prev = item.prev; 
        if(item === this.current){
        	this.current = item.next; 
        } 
    } 
}; 
/**
 * 获取下一个
 * @return
 */
Map.prototype.next = function() { 
    this.current = this.current.next; 
    return this;
}; 
/**
 * 获取key
 * @return
 */
Map.prototype.key = function() { 
    return this.current.key; 
}; 
/**
 * 获取value
 * @return
 */
Map.prototype.value = function() { 
    return this.current.value; 
}; 
/* 
 * 来源自 http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html 
 * 用于日期对象格式化
 * */
Date.prototype.pattern = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
		"H+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
		// 毫秒
	};
	var week = {
		"0" : "/u65e5",
		"1" : "/u4e00",
		"2" : "/u4e8c",
		"3" : "/u4e09",
		"4" : "/u56db",
		"5" : "/u4e94",
		"6" : "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4
						- RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1)
						? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468")
						: "")
						+ week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
							? (o[k])
							: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

