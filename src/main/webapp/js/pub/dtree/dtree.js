/*--------------------------------------------------|
| dTree 2.05 | www.destroydrop.com/javascript/tree/ |
|---------------------------------------------------|
| Copyright (c) 2002-2003 Geir Landr???               |
|                                                   |
| This script can be used freely as long as all     |
| copyright messages are intact.                    |
|                                                   |
| Updated: 17.04.2003                               |
|--------------------------------------------------*/

// Node object
var IMAGE_CONTEXT_PATH=kkvoo.base.getRootPath();
function Node(id, pid, name, url, title, target, icon, iconOpen, open,hascheckbox, hcEnableAjax) {
	

	this.id = id;
	this.pid = pid;
	this.name = name;
	this.url = url;
	this.title = title;
	this.target = target;
	this.icon = icon;
	this.iconOpen = iconOpen;
	this._io = open || false;
	this._is = false;
	this._ls = false;
	this._hc = hcEnableAjax || false;
	this._ai = 0;
	this._p;
	this.childNodes=[];
	this.hascheckbox=hascheckbox;
};

function dtreeNode(id, pid, name, url, title, target, icon, iconOpen, open,hascheckbox, hcEnableAjax) {
	

	this.id = id;
	this.pid = pid;
	this.name = name;
	this.url = url;
	this.title = title;
	this.target = target;
	this.icon = icon;
	this.iconOpen = iconOpen;
	this._io = open || false;
	this._is = false;
	this._ls = false;
	this._hc = hcEnableAjax || false;
	this._ai = 0;
	this._p;
	this.childNodes=[];
	this.hascheckbox=hascheckbox;
};

// Tree object
function dTree(objName,inputName, useIcons) {
	if (typeof(useIcons) != "boolean"){
		useIcons = true;
	}
	

	this.config = {
		target					: null,
		folderLinks			: true,
		useSelection		: true,
		useCookies			: true,
		useLines				: true,
		useIcons				: useIcons,
		useStatusText		: false,
		closeSameLevel	: false,
		inOrder					: false,
		enableAjax : false,
		onLoadClick : false
	}
this.icon = {
		root				: IMAGE_CONTEXT_PATH + '/img/dtree/icon_tree_base.gif',
		folder			: IMAGE_CONTEXT_PATH + '/img/dtree/icon_tree_5.gif',
		folderOpen	: IMAGE_CONTEXT_PATH + '/img/dtree/icon_tree_1.gif',
		node				: IMAGE_CONTEXT_PATH + '/img/dtree/icon_tree_2.gif',
		empty				: IMAGE_CONTEXT_PATH + '/img/dtree/T.png',
		line				: IMAGE_CONTEXT_PATH + '/img/dtree/T.png',
		join				: IMAGE_CONTEXT_PATH + '/img/dtree/T.png',
		joinBottom	: IMAGE_CONTEXT_PATH + '/img/dtree/T.png',
		plus				: IMAGE_CONTEXT_PATH + '/img/dtree/arrow_1.gif',
		plusBottom	: IMAGE_CONTEXT_PATH + '/img/dtree/arrow_1.gif',
		minus				: IMAGE_CONTEXT_PATH + '/img/dtree/arrow_2.gif',
		minusBottom	: IMAGE_CONTEXT_PATH + '/img/dtree/arrow_2.gif',
		nlPlus			: IMAGE_CONTEXT_PATH + '/img/dtree/arrow_1.gif',
		nlMinus			: IMAGE_CONTEXT_PATH + '/img/dtree/arrow_2.gif',
		allSelectIcon : IMAGE_CONTEXT_PATH +'/img/dtree/icon_tree_4.gif',
		nothingSelectIcon : IMAGE_CONTEXT_PATH + '/img/dtree/icon_tree_5.gif',
		allSelectIconOpen : IMAGE_CONTEXT_PATH + '/img/dtree/icon_tree_4.gif',
		nothingSelectIconOpen : IMAGE_CONTEXT_PATH + '/img/dtree/icon_tree_1.gif',
		noAllSelectIcon :  IMAGE_CONTEXT_PATH + '/img/dtree/icon_tree_3.gif',
		noAllSelectIconOpen :   IMAGE_CONTEXT_PATH + '/img/dtree/icon_tree_3.gif'
	};

	this.obj = objName;
	this.inputName=inputName;
	this.aNodes = [];
	this.aIndent = [];
	this.root = new dtreeNode(-1);
	this.selectedNode = null;
	this.selectedFound = false;
	this.completed = false;
	
	this.checkList=new CheckList();
	
	this.updateTree;
};

// Adds a new node to the node array
dTree.prototype.add = function(id, pid, name, url, title, target, icon, iconOpen, open,hascheckbox) {
    if(this.config.enableAjax){
		this.aNodes[this.aNodes.length] = new dtreeNode(id, pid, name, url, title, target, icon, iconOpen, open,hascheckbox,true);
	}else
		this.aNodes[this.aNodes.length] = new dtreeNode(id, pid, name, url, title, target, icon, iconOpen, open,hascheckbox);
        if(this.inputName){
	this.checkList.addNode(this.aNodes[this.aNodes.length-1]);
 
} 

};

dTree.prototype.getNodeById=function(id){
	for(var i=0;i<this.aNodes.length;i++){
		if(this.aNodes[i].id==id){
			
			return this.aNodes[i];
			
			}
		
		
		
		}
	
	
	};


// Open/close all nodes
dTree.prototype.openAll = function() {
	this.oAll(true);
};
dTree.prototype.closeAll = function() {
	this.oAll(false);
};

// Outputs the tree to the page
dTree.prototype.toString = function() {
	var str = '<div class="dtree">\n';
	var ssN;
	if (document.getElementById) {
		if (this.config.useCookies) ssN = this.selectedNode = this.getSelected();
		//if (this.config.useCookies) this.selectedNode = this.getSelected();
		if (this.config.useCookies){
			var selectedNodeId = this.getSelected();
			for(var n; n<this.aNodes.length; n++) {
				if (this.aNodes[n].id == selectedNodeId) {
					this.selectedNode = n;
					break;
				}
			}
		}
		
		
		
		str += this.addNode(this.root);
	} else str += 'Browser not supported.';
	str += '</div>';
	if (!this.selectedFound) this.selectedNode = null;
	this.completed = true;
	if (this.selectedNode){
		for (var n = 0; n<this.aNodes.length; n++) {
			var cn = this.aNodes[n];
			if (this.config.useSelection && cn.id == ssN){
				var ai = cn._ai;
				if(this.config.onLoadClick == true){
					var treeName = this.obj;
					window.attachEvent("onload", function(){
						document.getElementById("s"+treeName+ai).click();
					});
				}
				break;
			}
		}
	}
	return str;
};

// Creates the tree structure
dTree.prototype.addNode = function(pNode) {
	var str = '';
	var n=0;
	if (this.config.inOrder) n = pNode._ai;
	for (n; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == pNode.id) {
			pNode.childNodes[pNode.childNodes.length]=this.aNodes[n];
			var cn = this.aNodes[n];
			cn._p = pNode;
			cn._ai = n;
			this.setCS(cn);
			if (!cn.target && this.config.target) cn.target = this.config.target;
			if (cn._hc && !cn._io && this.config.useCookies) cn._io = this.isOpen(cn.id);
			if (!this.config.folderLinks && cn._hc) cn.url = null;
			if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {
					cn._is = true;
					this.selectedNode = n;
					this.selectedFound = true;
			}
			str += this.node(cn, n);
			if (cn._ls) break;
		}
	}
	return str;
};
dTree.prototype.defaultCheckBox=function(id,pid){
	
	
	};
dTree.prototype.clickCheckBox=function(id,pid){
	var tNode;
	var node=new dtreeNode(id,pid);
	var result=this.checkList.getOffspringNodes(node);
	 
        var pobj=eval('document.all.s_'+node.id);
        if(pobj){
        for(var i=0;i<result.length;i++){
        //if(pobj.checked==true){
        if(true){
        var obj=eval('document.all.s_'+result[i].id);
        tNode=result[i];
        var imaObj=eval('document.all.i' + this.obj +tNode._ai);
       var tN= result[i];
        if(tN._hc==true){
        	 tN.icon=this.icon.allSelectIcon;
                tN.iconOpen=this.icon.allSelectIconOpen;
            if (imaObj != null && typeof(imaObj) != "undefined") {
        	    imaObj.src=tN.icon;
        	  }
        	}
        obj.checked=pobj.checked;
}
}
var ischecked=pobj.checked;
var ancestorNodes=this.checkList.getAncestors(node);
        for(var i=0;i<ancestorNodes.length;i++){
        	var pNode=ancestorNodes[i];
        	//if(!pNode.hasCheckBox||pNode.hasCheckBox==false){
                tNode=pNode;
        	var thisObj=eval('document.all.i' + this.obj + tNode._ai);
                var isAllSelected=this.isAllOffSpringSelected(pNode);
                var isNoneSelected=this.isNoneOffSpringSelected(pNode);
                var thisTreeNode=pNode;
                if(isAllSelected==true&&isNoneSelected==false){
                thisTreeNode.icon=this.icon.allSelectIcon;
                thisTreeNode.iconOpen=this.icon.allSelectIconOpen;	
                ancestorObj = eval('document.all.s_'+pNode.id);
	                if (ancestorObj){
	                	ancestorObj.checked = true;
	                }
               	
                	}else if(isAllSelected==false&&isNoneSelected==true){	
                 thisTreeNode.icon=this.icon.nothingSelectIcon;
                thisTreeNode.iconOpen=this.icon.nothingSelectIconOpen;	
				ancestorObj = eval('document.all.s_'+pNode.id);
				if (ancestorObj){
	                ancestorObj.checked = false;
				}           		
        		
        		}else if(isAllSelected==false&&isNoneSelected==false){
        	thisTreeNode.icon=this.icon.noAllSelectIcon;
                thisTreeNode.iconOpen=this.icon.noAllSelectIconOpen;
				ancestorObj = eval('document.all.s_'+pNode.id);
					if (ancestorObj){
	                	ancestorObj.checked = true;
					}
        		}
       if (thisObj != null && typeof(thisObj) != "undefined") {
        	if(thisTreeNode._io==false){
                thisObj.src=thisTreeNode.icon;
        }else{
        thisObj.src=thisTreeNode.iconOpen
        
        }}
        	
        	//}

}


  var thisNode= this.getNodeById(id);
  if(thisNode.hascheckbox==true){  	 
  if(thisNode._hc==true){
 	 thisNode.icon=this.icon.allSelectIcon;
         thisNode.iconOpen=this.icon.allSelectIconOpen;	
 var tObj=eval('document.all.i' + this.obj + thisNode._ai);
 var tcobj=eval('document.all.s_'+thisNode.id);
 if(tcobj.checked==false){
     thisNode.icon=this.icon.nothingSelectIcon;
     thisNode.iconOpen=this.icon.nothingSelectIconOpen;	
     	
 	}else{
 	
 	 thisNode.icon=this.icon.allSelectIcon;
                thisNode.iconOpen=this.icon.allSelectIconOpen;	
 	}
 
 
 if (tObj != null && typeof(tObj) != "undefined") {
   if(thisNode._io==false){
        tObj.src=thisNode.icon;
        }else{
        tObj.src=thisNode.iconOpen
        }
 
   }}
}
  
}
	
	
	};
dTree.prototype.isAllOffSpringSelected=function(node){
	var childrenNodes= this.checkList.getOffspringNodes(node);
	 for(var i=0;i<childrenNodes.length;i++){
	  if(this.isTheNodeSelected(childrenNodes[i])!=true){
	  	return false;
	  	
	  	}
	 	}
	 return true;
	
	
	
	
	};
dTree.prototype.isNoneOffSpringSelected=function(node){
	var childrenNodes= this.checkList.getOffspringNodes(node);
	 for(var i=0;i<childrenNodes.length;i++){
	  if(this.isTheNodeNotSelected(childrenNodes[i])!=true){
	  	return false;
	  	
	  	}
	 	}
	 return true;
	
	
	
	
	};

dTree.prototype.isAllChildrenSelected=function(node){
	var childrenNodes= this.checkList.getChildNodes(node);
	 for(var i=0;i<childrenNodes.length;i++){
	  if(this.isTheNodeSelected(childrenNodes[i])!=true){
	  	return false;
	  	
	  	}
	 	}
	 return true;
	
	
	
	
	};
	
	dTree.prototype.isNoneChildrenSelected=function(node){
	var childrenNodes= this.checkList.getChildNodes(node);
	 for(var i=0;i<childrenNodes.length;i++){
	  if(this.isTheNodeSelected(childrenNodes[i])!=false){
	  	return false;
	  	
	  	}
	 	}
	 return true;
	
	
	
	
	};

dTree.prototype.isTheNodeSelected=function(node){
  var obj=eval('document.all.s_'+node.id);
  if(obj){
	return obj.checked;
}else{
return true;
}
	};	
dTree.prototype.isTheNodeNotSelected=function(node){
  var obj=eval('document.all.s_'+node.id);
  if(obj){
	return !obj.checked;
}else{
return true;
}
	};			
	
	
// Creates the node icon, url and text
dTree.prototype.node = function(node, nodeId) {
	
	var str = '<div class="dTreeNode">' + this.indent(node, nodeId);
	if (this.config.useIcons) {
		if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);
		if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
		if (this.root.id == node.pid) {
			node.icon = this.icon.root;
			node.iconOpen = this.icon.root;
		}
		if(this.inputName){
			
			if(node.hascheckbox){
		str += '<input type="checkbox"  name="'+this.inputName+'" value="'+node.id+'" id="s_'+node.id+'" onclick="'+this.obj+'.clickCheckBox(\''+node.id+'\',\''+node.pid+'\')"> ';
	}}
		str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt="" />';
	} else {
		if(this.inputName){
			
			if(node.hascheckbox){
		str += '<input type="checkbox"  name="'+this.inputName+'" value="'+node.id+'" id="s_'+node.id+'" onclick="'+this.obj+'.clickCheckBox(\''+node.id+'\',\''+node.pid+'\')"> ';
	 }}}
	if (node.url&&node.url!=''&&node.url!='null') {
		var realUrl = node.url;
		if (realUrl && realUrl.charAt(0) == '/'){
			realUrl = UrlUtils.getUrlPrefix() + realUrl;
		}
		str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + realUrl + '"';
		if (node.title) str += ' title="' + node.title + '"';
		if (node.target) str += ' target="' + node.target + '"';
		if (this.config.useStatusText) str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';
		if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc))
			str += ' onclick="javascript: ' + this.obj + '.s(' + nodeId + ');"';
		str += '>';
	}
	else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id)
		str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');" class="node">';
	str += node.name;
	if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
	str += '</div>';
	if (node._hc) {
		str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
		//if(!this.config.enableAjax){
			str += this.addNode(node);
		//}
		str += '</div>';
	}
	this.aIndent.pop();
	return str;
};

// Adds the empty and line icons
dTree.prototype.indent = function(node, nodeId) {
	var str = '';
	if (this.root.id != node.pid) {
		for (var n=0; n<this.aIndent.length; n++)
			str += '<img src="' + ( (this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty ) + '" alt="" />';
		(node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);
		if (node._hc) {
			/*if(this.enableAjax){
				//TODO add load xml url
				str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');">';
				
			} else{			
				str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');">';
			}
			str += '<img id="j' + this.obj + nodeId + '" src="';*/
			str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
			if (!this.config.useLines) str += (node._io) ? this.icon.nlMinus : this.icon.nlPlus;
			else str += ( (node._io) ? ((node._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((node._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus ) );
			str += '" alt="" /></a>';
		} else str += '<img src="' + ( (this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join ) : this.icon.empty) + '" alt="" />';
	}
	return str;
};

// Checks if a node has any children and if it is the last sibling
dTree.prototype.setCS = function(node) {
	var lastId;
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.id) node._hc = true;
		if (this.aNodes[n].pid == node.pid) lastId = this.aNodes[n].id;
	}
	if (lastId==node.id) node._ls = true;
};

// Returns the selected node
dTree.prototype.getSelected = function() {
	var sn = this.getCookie('cs' + this.obj);
	return (sn) ? sn : null;
};

// Highlights the selected node
dTree.prototype.s = function(id) {
	if (!this.config.useSelection) return;
	var cn = this.aNodes[id];
	if (cn._hc && !this.config.folderLinks) return;
	if (this.selectedNode != id) {
		if (this.selectedNode || this.selectedNode==0) {
			eOld = document.getElementById("s" + this.obj + this.selectedNode);
			if (eOld){
				eOld.className = "node";
			}
		}
		eNew = document.getElementById("s" + this.obj + id);
		eNew.className = "nodeSel";
		this.selectedNode = id;
		if (this.config.useCookies) this.setCookie('cs' + this.obj, cn.id);
	}
};

// Toggle Open or close
dTree.prototype.o = function(id) {
	if(this.config.enableAjax){
		if(typeof(this.updateTree) == "function"){
		var result = this.updateTree(this.aNodes[id]);
		if(result < 1) {
			return;
		}
		}else{
			alert('Dtree unsupport ajax');
		}
		
	}
	var cn = this.aNodes[id];
	this.nodeStatus(!cn._io, id, cn._ls);
	cn._io = !cn._io;
	if (this.config.closeSameLevel) this.closeLevel(cn);
	if (this.config.useCookies) this.updateCookie();
};

// Open or close all nodes
dTree.prototype.oAll = function(status) {
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) {
			this.nodeStatus(status, n, this.aNodes[n]._ls)
			this.aNodes[n]._io = status;
		}
	}
	if (this.config.useCookies) this.updateCookie();
};

// Opens the tree to a specific node
dTree.prototype.openTo = function(nId, bSelect, bFirst) {
	if (!bFirst) {
		for (var n=0; n<this.aNodes.length; n++) {
			if (this.aNodes[n].id == nId) {
				nId=n;
				break;
			}
		}
	}
	var cn=this.aNodes[nId];
	if (cn.pid==this.root.id || !cn._p) return;
	cn._io = true;
	cn._is = bSelect;
	if (this.completed && cn._hc) this.nodeStatus(true, cn._ai, cn._ls);
	if (this.completed && bSelect) this.s(cn._ai);
	else if (bSelect) this._sn=cn._ai;
	this.openTo(cn._p._ai, false, true);
};

// Opens the tree to a specific node, and click the node
dTree.prototype.openToAndClick = function(nId, bSelect, bFirst) {
	this.openTo(nId, bSelect, bFirst);
	if (!bFirst) {
		for (var n=0; n<this.aNodes.length; n++) {
			if (this.aNodes[n].id == nId) {
				nId=n;
				break;
			}
		}
	}
	var cn=this.aNodes[nId];
	document.getElementById("s"+this.obj+cn._ai).click();
}

// Closes all nodes on the same level as certain node
dTree.prototype.closeLevel = function(node) {
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.pid && this.aNodes[n].id != node.id && this.aNodes[n]._hc) {
			this.nodeStatus(false, n, this.aNodes[n]._ls);
			this.aNodes[n]._io = false;
			this.closeAllChildren(this.aNodes[n]);
		}
	}
}

// Closes all children of a node
dTree.prototype.closeAllChildren = function(node) {
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc) {
			if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls);
			this.aNodes[n]._io = false;
			this.closeAllChildren(this.aNodes[n]);		
		}
	}
}

// Change the status of a node(open or closed)
dTree.prototype.nodeStatus = function(status, id, bottom) {
	eDiv	= document.getElementById('d' + this.obj + id);
	eJoin	= document.getElementById('j' + this.obj + id);
	if (this.config.useIcons) {
		eIcon	= document.getElementById('i' + this.obj + id);
		eIcon.src = (status) ? this.aNodes[id].iconOpen : this.aNodes[id].icon;
	}
	eJoin.src = (this.config.useLines)?
	((status)?((bottom)?this.icon.minusBottom:this.icon.minus):((bottom)?this.icon.plusBottom:this.icon.plus)):
	((status)?this.icon.nlMinus:this.icon.nlPlus);
	eDiv.style.display = (status) ? 'block': 'none';
};


// [Cookie] Clears a cookie
dTree.prototype.clearCookie = function() {
	var now = new Date();
	var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
	this.setCookie('co'+this.obj, 'cookieValue', yesterday);
	this.setCookie('cs'+this.obj, 'cookieValue', yesterday);
};

// [Cookie] Sets value in a cookie
dTree.prototype.setCookie = function(cookieName, cookieValue, expires, path, domain, secure) {
	var protocol = document.location.protocol.toLowerCase();
	secure = (protocol == "https:" || protocol == "ftps:");
	document.cookie =
		escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
};

// [Cookie] Gets a value from a cookie
dTree.prototype.getCookie = function(cookieName) {
	var cookieValue = '';
	var posName = document.cookie.indexOf(escape(cookieName) + '=');
	if (posName != -1) {
		var posValue = posName + (escape(cookieName) + '=').length;
		var endPos = document.cookie.indexOf(';', posValue);
		if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));
		else cookieValue = unescape(document.cookie.substring(posValue));
	}
	return (cookieValue);
};

// [Cookie] Returns ids of open nodes as a string
dTree.prototype.updateCookie = function() {
	var str = '';
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n]._io && this.aNodes[n].pid != this.root.id) {
			if (str) str += '.';
			str += this.aNodes[n].id;
		}
	}
	this.setCookie('co' + this.obj, str);
};

// [Cookie] Checks if a node id is in a cookie
dTree.prototype.isOpen = function(id) {
	var aOpen = this.getCookie('co' + this.obj).split('.');
	for (var n=0; n<aOpen.length; n++)
		if (aOpen[n] == id) return true;
	return false;
};

// If Push and pop is not implemented by the browser
if (!Array.prototype.push) {
	Array.prototype.push = function array_push() {
		for(var i=0;i<arguments.length;i++)
			this[this.length]=arguments[i];
		return this.length;
	}
};
if (!Array.prototype.pop) {
	Array.prototype.pop = function array_pop() {
		lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
		return lastElement;
	}
};
dTree.prototype.clear = function(objName) {
	 this.obj = objName;
	this.aNodes = [];
	this.aIndent = [];
	this.root = new dtreeNode(-1);
	this.selectedNode = null;
	this.selectedFound = false;
	this.completed = false;
};
function defaultCheckBox(list,dtree){
	
     for(var i=0;i<list.length;i++){
		var checkbox=eval('document.all.s_'+list[i]);
		
		if(checkbox){
		checkbox.checked=true;
	}
	 
		 
		//dtree.clickCheckBox(list[i][0],list[i][1]);
	 
		
		
		} 
		 
		for(var i=0;i<dtree.aNodes.length;i++){
			
		var node=dtree.aNodes[i];
		 if(node.pid!='-1'){
		 checkBoxNumflag=0;
                 checkedCheckBoxNumflag=0;
		checkHasCheckBoxTree(node,dtree);
	}
		}
	 
	
	
	}
	function statCheckBox(node){
	var size=node.childNodes.length;
		for(var j=0;j<size;j++){
			var cnode=node.childNodes[j];
		var checkbox=eval('document.all.s_'+cnode.id);
		
		if(checkbox){
			checkBoxNumflag++;
		if( checkbox.checked==true){
		 checkedCheckBoxNumflag++;
			}	
			}else{
			statCheckBox(cnode);
			
			}
			
			}	
		
		
		}
        
 
	
	function checkHasCheckBoxTree(node,dtree){
		 
		statCheckBox(node);	
			
		var thisObj=eval('document.all.i' + dtree.obj + node._ai);	
		if(checkBoxNumflag!=0){
		if(checkedCheckBoxNumflag==0){
		node.icon=dtree.icon.nothingSelectIcon;
                node.iconOpen=dtree.icon.nothingSelectIconOpen;	
                ancestorObj = eval('document.all.s_'+node.id);
                if (ancestorObj){
                	ancestorObj.checked = false;
                }
        	           }else if(checkedCheckBoxNumflag!=0&&checkBoxNumflag!=checkedCheckBoxNumflag){
		           node.icon=dtree.icon.noAllSelectIcon;
                           node.iconOpen=dtree.icon.noAllSelectIconOpen;
                ancestorObj = eval('document.all.s_'+node.id);
                if (ancestorObj){
                	ancestorObj.checked = true;
                }
				}else if(checkedCheckBoxNumflag!=0&&checkBoxNumflag==checkedCheckBoxNumflag){
				 node.icon=dtree.icon.allSelectIcon;
                                  node.iconOpen=dtree.icon.allSelectIconOpen;
				ancestorObj = eval('document.all.s_'+node.id);
				if (ancestorObj){
					ancestorObj.checked = true;
				}
					}
		if(thisObj != null && typeof(thisObj) != "undefined") {
			if(node._io==false){
			 thisObj.src=node.icon;	
				}else{
			 thisObj.src=node.iconOpen;
				}
			}
			}
		
		}
		
var checkBoxNumflag=0;
var checkedCheckBoxNumflag=0;		