var zindex=100;
var hasSelected =false;
function openShim(menu)
{
    if (menu==null) return;
    var shim = getShim(menu);
    if (shim==null) shim = createMenuShim(menu,getShimId(menu));
    
    //Change menu zIndex so shim can work with it
    menu.style.zIndex = 100;
    
    var width =  menu.offsetWidth;
    var height;
    
  
        var height = menu.offsetHeight;
    
    
    shim.style.width = width;
    shim.style.height = height;
    shim.style.top = menu.style.top;
    shim.style.left = menu.style.left;
    shim.style.zIndex = menu.style.zIndex - 1;
    shim.style.position = "absolute";
    shim.style.display = "block";
}

//Closes the shim associated with the menu
function closeShim(menu)
{
    if (menu==null) return;
    var shim = getShim(menu);
    if (shim!=null) shim.style.display = "none";
}

//Creates a new shim for the menu
function createMenuShim(menu)
{
    if (menu==null) return null;

    var shim = document.createElement("<iframe src='javascript:false;' scrolling='no' frameborder='0'"+
                                      "style='position:absolute; top:0px;"+
                                      "left:0px; display:none'></iframe>"); 
    shim.name = getShimId(menu);
    shim.id = getShimId(menu);
    //Unremark this line if you need your menus to be transparent for some reason
    //shim.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)";

    if (menu.offsetParent==null || menu.offsetParent.id=="") 
    {
        window.document.body.appendChild(shim);
    }
    else 
    {
        menu.offsetParent.appendChild(shim); 
    }

    return shim;
}

//Creates an id for the shim based on the menu id
function getShimId(menu)
{
    if (menu.id==null) return "__shim";
    return "__shim"+menu.id;
}

//Returns the shim for a specific menu
function getShim(menu)
{
    return document.getElementById(getShimId(menu));
}

function getMenuItemCount(menu)
{
    var count = 0;
    var child = menu.firstChild;

    while (child)
    {
        if (child.nodeName=="DIV") count = count + 1;
        child = child.nextSibling;
    }
    return count;    
}



function dropit2(whichone){	
if (window.themenu&&themenu.id!=whichone.id){
themenu.style.visibility="hidden";
closeShim(themenu);
}
themenu=whichone;
if (document.all){
themenu.style.left=document.body.scrollLeft+event.clientX-event.offsetX;
themenu.style.top=document.body.scrollTop+event.clientY-event.offsetY+18;
if (themenu.style.visibility=="hidden"){
themenu.style.visibility="visible";
themenu.style.zIndex=zindex+1;
openShim(themenu);
}
else{
hidemenu();
closeShim(themenu);
}
}
}

function dropit(e,whichone){

if (window.themenu&&themenu.id!=eval(whichone).id)

themenu=eval(whichone);
if (themenu.visibility=="hide"){
themenu.visibility="show";
openShim(themenu);
}
else{
themenu.visibility="hide";
closeShim(themenu);
}

themenu.zIndex++;
themenu.left=e.pageX-e.layerX;
themenu.top=e.pageY-e.layerY+19;
return false;
}

function hidemenu(whichone){
if (window.themenu){
themenu.style.visibility="hidden";

}
}

function hidemenu2(){
themenu.visibility="hide";
}

////untied Tree
function insertText(name,value){	
if(name&&value){  
   var style=eval(name+'Style');
   var d=eval( 'document.all.'+name);
   d.value=value;
   if(style=='TWO_TEXTBOX'){
   
  var list=eval(name+'List');
 var desc=    list.getDisplayById(value);
 var code=list.getCodeById(value);

 var compcode=eval('document.all.'+name+'code');
 var compdesc=eval('document.all.'+name+'desc');
 compcode.value=code;
 compdesc.value=desc;
   
   }
   
   
 insertAncestorText(name);
 insertOffSpringText(name);
 //insertOffSpringTextNoEvent(name);
 	  }
}	

function checkText(name,dataList,value){
   var d=eval( 'document.all.'+name);
 if(dataList.isExist(d.value)){
 
 }else{
 alert(value);
 }

}

function build(name,dataList,id,tree,type,leafimg,branchimg,selectedleafimg,selectedbranchimg,branchSytle,leafSytle){
 var style;
 var display;
var isleaf;
var img=''; 
var selectedimg=''; 
var ids=dataList.getChildId(id);
var dis= dataList.getChildDisplay(id); 
var childname=dataList.getChildName(id); 				 	 
				  if(ids.length!=0){
				  
	  for(var i=0;i<ids.length;i++){	
	 
	  		 if(childname[i]==type||type==''){ 
			isleaf=build(name,dataList,ids[i],tree,type,leafimg,branchimg,selectedleafimg,selectedbranchimg,branchSytle,leafSytle);
		if(isleaf==1){
		img=leafimg;
		selectedimg=selectedleafimg;
		if(leafSytle=='IMG'){
		display='';
		}else {
		display=dis[i];
		}
		}else{
		img=branchimg;
		selectedimg=selectedbranchimg;
		if(branchSytle=='IMG'){
		display='';
		}else {
		display=dis[i];
		}
		}
		tree.add(ids[i],id,display,'javascript:insertText(\''+name+'\',\''+ids[i]+'\');','','',img,selectedimg);
		}
	  }	
	  return -1							 
	  }else{
	  return 1;
	  
	  }
	   
}
function buildTreeByUnitedTable(name,tree){
var s=getAncestor(name);
}
  function buildTree(name,dataList,parent,type,dtree,leafimg,branchimg,selectedleafimg,selectedbranchimg,branchSytle,leafSytle){	
	 	
		dtree.add('',-1,'','javascript:insertText();'); 
		
  		var comp;
			if(parent!=''){
			comp=eval('document.all.'+parent);	
			var v=comp.value;
			 build(name,dataList,v,dtree,type,leafimg,branchimg,selectedleafimg,selectedbranchimg,branchSytle,leafSytle);
			 	  
			}else{
			 build(name,dataList,'',dtree,type,leafimg,branchimg,selectedleafimg,selectedbranchimg,branchSytle,leafSytle);
				  
			}  
			
		var str=dtree.toString();	
	
			   	 
  document.getElementById(name+'div').innerHTML=str; 
  	 
  }	   
function getAncestor(name){

  var s=new Array
  var n=eval('parentof'+name);
  var i=0;
 
  while(n!=''){
        
	 s[i++]= n
	 
      n=eval('parentof'+n); 
  
  }
 
return s;
}

function getOffspring(name){
  var s=new Array
  var n;
   
	  n=name;
	  
  var i=0;
  
  while(n!=''&&n){
	
	
	 try{

	n=eval('childof'+n);
	 s[i++]= n
	  
	 }catch(e){
	n='';
	 
	 }
	  
	  
  }

return s;
}

function insertAncestorText(name){
	
var com=  eval('document.all.'+name);
var s=getAncestor(name);
 
var id;
var list=eval(name+'List');
if(list.getParentColumnById(com.value).length==1){
var ss=list.getParentColumnById(com.value)
id=ss[0];
}
for(var i=0;i<s.length;i++){
list= eval(s[i]+'List');
insertComp(s[i],id);
if(list.getParentColumnById(id).length==1){
var ss=list.getParentColumnById(id);
id=ss[0];
}
}
}

function insertOffSpringText(name){
	
 var str='';
var scom= eval('document.all.'+name);
var id=scom.value;
var s=getOffspring(name);
var style='';
var styledesc='';
if(s.length!=0){
style=eval(s[0]+'Style');
styledesc=eval(s[0]+"descStyle");
}
var com=  eval('document.all.'+s[0]);
if(style=='ONE_TEXTBOX'){
com.value='';
}else 
if(style=='TWO_TEXTBOX'){
com.value='';
 var compcode=eval('document.all.'+s[0]+'code');
 var compdesc=eval('document.all.'+s[0]+'desc');
 compcode.value='';
 compdesc.value='';
}else if(style=='ONE_DROPDOWN'||style=='MULTI_LINE_DROPDOWN'){
	var ccom=eval('document.all.'+s[0]);
	var list=eval(s[0]+'List');
	ccom.innerHTML='';
	
	var tree = eval(s[0]+'tree');
	if(tree.config.enableAjax){
		list.clear();
		
		
		if(id){
			// search list
			var url = _getContextPath() + '/getUnitedTableInfo.do?unitedTableAjaxPara='+ eval(s[0]+'AjaxPara');
			url = url + '&parentSelectValue=' + id;
			var str = LoadJSON(url);
			var uData = eval(str);
			
			for(var i=0;i<uData.length;i++){
				list.addData(uData[i].id, uData[i].display, uData[i].parent, s[0], uData[i].parentColumn, uData[i].code);
			}
		}
		
		updateSelect(s[0]);
	}else{
			
		var ids=list.getIdByParent(id);
		var dis=list.getDisplayByParent(id);
		var code=list.getCodeByParent(id);
		
		ccom.options[0]=new Option(eval(s[0]+'nulloption'),'');
		for(var i=0;i<ids.length;i++){
			if(styledesc=='CODE'){
				ccom.options[i+1]=new Option(code[i],ids[i]);
			}
		else if(styledesc=='DESC' || styledesc=='DISPLAY'){ 
			  ccom.options[i+1]=new Option(dis[i],ids[i]);
			}
		else if(styledesc=='CODE_AND_DESC' || styledesc=='CODE_DISPLAY'){
			 ccom.options[i+1]=new Option(dis[i]+'_'+code[i],ids[i]);
			}else {
				 ccom.options[i+1]=new Option(code[i],ids[i]);
				}
		}
		if(ids.length ==1 && ccom.notNull=="true"){
			var ov = ccom.value;
			ccom.value = ccom.options[1].value;
			ccom.options[1].selected = true;
			if (ov != ccom.value){
				fireOnChange(ccom, "3");
			}
		}else{
			ccom.value = ccom.options[0].value;
			ccom.options[0].selected = true;
		}
		
	}
	
	if(isListHas(ccom.name)) {
		insertOffSpringText(ccom.name);
	}
}
}

function updateSelect(name,selectedvalue){
	var scom= eval('document.all.'+name);
	var msg = getI18nMsg('MSG_990006866');
	if(msg==null){
		msg = 'Please Select'
	}
	scom.options.add(new Option(msg,''));
	var list=eval(name+'List');
	var descStyle=eval(name+'descStyle');
	var display=list.getDisplay();
	var id=list.getId();
	var code=list.getCode();
	var num=list.getNum();
	var parentcolumn=list.getParentcolumn();
	
	var parentNode = document.getElementsByName(eval('parentof'+name));
	var parentValue = '';
	if(parentNode!= null && parentNode.length>0)
		parentValue = parentNode[0].value;
	var parentValueInList;
	
	if(num==1 && (selectedvalue+''=='undefined') && scom.notNull=="true"){
		selectedvalue=id[0];
		if (scom.value != selectedvalue){
			fireOnChange(scom, "3");
		}
	}
	
	for(var i=0;i<num;i++){
		parentValueInList = parentcolumn[i];
		if(parentValue!=''&& parentValueInList!=parentValue)
			continue;
		
		var text;
		if(descStyle=='CODE_AND_DESC'){//DESC_AND_CODE
			text=display[i]+'_'+code[i];
		}else if(descStyle=='CODE'){
			text=code[i];
		}else if(descStyle=='DESC'){
			text=display[i];
		}else {
			text=display[i];
		}
		var option = new Option(text,id[i]);
		scom.options.add(option);
		if(selectedvalue&&selectedvalue!=''&&selectedvalue==id[i]){
			option.selected = true;
		}
	}
	
	
var msg = getI18nMsg('MSG_990006866');
if(msg==null){
	msg = 'Please Select'
}
var str='<option selected value=\'\'>'+msg+'<'+'/'+'option>';
var list=eval(name+'List');
var descStyle=eval(name+'descStyle');
var display=list.getDisplay();
var id=list.getId();
var code=list.getCode();
var num=list.getNum();
var parentcolumn=list.getParentcolumn();

var parentNode = document.getElementsByName(eval('parentof'+name));
var parentValue = '';
if(parentNode!= null && parentNode.length>0)
	parentValue = parentNode[0].value;
var parentValueInList;

for(var i=0;i<num;i++){
	parentValueInList = parentcolumn[i];
	if(parentValue!=''&& parentValueInList!=parentValue)
		continue;
	
str+='<option ';
if(selectedvalue&&selectedvalue!=''&&selectedvalue==id[i]){
	str+=' selected ';
	
	
	}
str+=' value=\''+ id[i]+ '\'> ';
if(descStyle=='CODE_AND_DESC'){//DESC_AND_CODE
str+=display[i]+'_'+code[i];
}else if(descStyle=='CODE'){
str+=code[i];
}else if(descStyle=='DESC'){
str+=display[i];
}else {
str+=display[i];
}
str+='<'+'/'+'option>';
}
}

function insertOffSpringTextNoEvent(name){	
 var str='';
var scom= eval('document.all.'+name);
var id=scom.value;
var s=getOffspring(name);
var style='';
var styledesc='';
if(s.length!=0){
style=eval(s[0]+'Style');
styledesc=eval(s[0]+"descStyle");
}
var com=  eval('document.all.'+s[0]);
if(style=='ONE_TEXTBOX'){
com.value='';
}else 
if(style=='TWO_TEXTBOX'){
com.value='';
 var compcode=eval('document.all.'+s[0]+'code');
 var compdesc=eval('document.all.'+s[0]+'desc');
 compcode.value='';
 compdesc.value='';
}else if(style=='ONE_DROPDOWN'||style=='MULTI_LINE_DROPDOWN'){
var list=eval(s[0]+'List');
var ids=list.getIdByParent(id);
var dis=list.getDisplayByParent(id);
var code=list.getCodeByParent(id);
var ccom=eval('document.all.'+s[0]);

ccom.innerHTML='';
 

ccom.options[0]=new Option(eval(s[0]+'nulloption'),'');
 
for(var i=0;i<ids.length;i++){
	if(styledesc=='CODE'){
		  ccom.options[i+1]=new Option(code[i],ids[i]);
	}
else if(styledesc=='DESC' || styledesc=='DISPLAY'){ 
	  ccom.options[i+1]=new Option(dis[i],ids[i]);
	}
else if(styledesc=='CODE_AND_DESC' || styledesc=='CODE_DISPLAY'){
	 
	 ccom.options[i+1]=new Option(dis[i]+'_'+code[i],ids[i]);
	
	
	}else {
		 
		 ccom.options[i+1]=new Option(code[i],ids[i]);

		
		}
		
}	
}
}


function insertComp(name,id){

var str='';
var style=eval(name+'Style');
var styledesc=eval(name+"descStyle");
 var comp=  eval('document.all.'+name);
if(style=='ONE_TEXTBOX'){
 
 if(id){
comp.value=id;
}
}else if(style=='TWO_TEXTBOX'){
var list=eval(name+'List');
 var desc=    list.getDisplayById(id);
 var code=list.getCodeById(id);

 var compcode=eval('document.all.'+name+'code');
 var compdesc=eval('document.all.'+name+'desc');
 if(desc&&code&&id){
  comp.value=id;
 compcode.value=code;
 compdesc.value=desc;}
 
}else if(style=='ONE_DROPDOWN'||style=='MULTI_LINE_DROPDOWN'){
if(id){
	 
var list=eval(name+'List');
var pid=list.getParentColumnById(id);
 var ids=list.getIdByParent(pid);
 var dis=list.getDisplayByParent(pid);
 var code=list.getCodeByParent(pid);
 
 comp.innerHTML='';
 
 // add please select option,so i+1
 comp.options[0]=new Option(eval(name+'nulloption'),'');

for(var i=0;i<ids.length;i++){
if(styledesc=='CODE'){
	 comp.options[i+1]=new Option(code[i],ids[i]);
	}
else if(styledesc=='DESC' || styledesc=='DISPLAY'){
	 comp.options[i+1]=new Option(dis[i],ids[i]);
	}
else if(styledesc=='CODE_AND_DESC' || styledesc=='CODE_DISPLAY'){
	 comp.options[i+1]=new Option(dis[i]+'_'+code[i],ids[i]);
	
	
	}else {
		 comp.options[i+1]=new Option(code[i],ids[i]);

		
		}

if(ids[i]==id){
comp.options[i+1].selected=true;
comp.value=id;
}
}

}

} 


}

function isListHas(name,value){
var comp=  eval('document.all.'+name);
var id=comp.value;
var com=  eval(name+'List');
var s=com.getParentColumnById(id);
 if(s.length==0&&id!=''){
 	

if(eval(name+'tree').config.enableAjax){
	 var initValue = eval('_initUniteTableValue'+name);
	if(typeof initValue != 'undefined' && initValue.id == id)
		return false;
}else{
 alert("error");
 comp.value='';
}
 return false;
 }
 return true;

}

function getArray(s,name){
var num=s.length-1;;
for(var i=0;i<s.length;i++){
var comp=eval('document.all.'+s[i]);


 if(comp.value!=''){
 num=i;
 break;
 }
}
var j=0
var ss=new Array();
for(var i=num;i>=0;i--){
ss[j++]=s[i];
}
ss[j]=name;

return ss;
}



function deleteArray(s){
var ss=new Array();
for(var i=1;i<s.length;i++){
ss[i-1]=s[i]

}
return ss;
}

function buildUnitedTree(name,dataList,id,tree,s){

 var style;
 var display;
var isleaf;
var img=''; 
var selectedimg=''; 
var ids=dataList.getChildId(id);
var dis= dataList.getChildDisplay(id); 
var childname=dataList.getChildName(id); 
 

if(s.length!=0){
		   
			  
			  var list =eval(s[0]+'List');
			  var newname=s[0];
			  var newidsanddis=list.getRootIdAndDisplayByParent(id);
			 
			 if(newidsanddis.length!=0){
			   var  sss=deleteArray(s);
			 for(var j=0;j<newidsanddis.length;j++){
			 tree.add(newidsanddis[j][0],id,newidsanddis[j][1],'javascript:insertText(\''+newname+'\',\''+newidsanddis[j][0]+'\');','','',img,selectedimg);
			 buildUnitedTree(newname,list,newidsanddis[j][0],tree,sss);
			 } 
			 } 
			}

		 	 
				  if(ids.length!=0){
				  
	  for(var i=0;i<ids.length;i++){	
			isleaf=buildUnitedTree(name,dataList,ids[i],tree,s);
		   
			if(isleaf==1){
			 
			tree.add(ids[i],id,dis[i],'javascript:insertText(\''+name+'\',\''+ids[i]+'\');','','',img,selectedimg);
		 }else{
	 
		 tree.add(ids[i],id,dis[i],'javascript:insertText(\''+name+'\',\''+ids[i]+'\');','','',img,selectedimg);
		 }
		 
		
		}
	  return -1							 
	  }else{
	  return 1;
	  }   


}

function createUnitedTree(name,tree){
tree.clear(name+'tree');
if(tree.config.enableAjax==true)
	tree.clearCookie();

var s=getAncestor(name);
var ss=getArray(s,name);
var list =eval(ss[0]+'List');
var newname=ss[0];
var value =eval('document.all.'+ss[0]).value; 

tree.add(value,-1,'root','javascript:insertText();'); 

ss=deleteArray(ss);
buildUnitedTree(newname,list,value,tree,ss);

		var str=tree.toString();	
document.getElementById(name+'div').innerHTML=str; 

tree.updateTree = function(node) {
	var parentNode = document.getElementsByName(eval('parentof'+name));
	var parentValue = '';
	if(parentNode!= null && parentNode.length>0)
		parentValue = parentNode[0].value;
	var url = _getContextPath() + '/getUnitedTableInfo.do?unitedTableAjaxPara='+ eval(name+'AjaxPara');
	url = url + '&parentSelectValue=' + parentValue +'&selectNodeId='+node.id;
	var str = LoadJSON(url);
	var uData = eval(str);
	var img=''; 
	var selectedimg=''; 
	
	if(uData.length < 1){
		node._hc = false;
		node.icon = tree.icon.node;
		node.iconOpen = tree.icon.node;
		var treeStr = tree.toString();	
		document.getElementById(name+'div').innerHTML=treeStr;
		return -1;
	}
	for(var i=0;i<uData.length;i++){
		list.addData(uData[i].id, uData[i].display, uData[i].parent, name, uData[i].parentColumn, uData[i].code);
		tree.add(uData[i].id, uData[i].parent, uData[i].display, 'javascript:insertText(\''+name+'\',\''+uData[i].id+'\');','','',img,selectedimg)
	}
	var treeStr = tree.toString();	
	document.getElementById(name+'div').innerHTML=treeStr;
	
	return uData.length;
	/*var divObj = document.getElementById('d'+name+'tree'+node.id);
	var insertNode = tree.addNode(tree.aNodes[node.id]);
	divObj.innerHTML = insertNode;*/
};
  	 
}
function createTree(name ,tree){
var s=getAncestor(name);
var ss=getArray(s,name);
var list =eval(ss[0]+'List');
var newname=ss[0];
var value =eval('document.all.'+ss[0]).value; 
tree.add(value,-1,'root','javascript:insertText();'); 
ss=deleteArray(ss);
buildUnitedTree(newname,list,value,tree,ss);	  	 
}

function createSelect(name,selectedvalue,needFireOnChange){
	var tree = eval(name+'tree');
	if(tree.config.enableAjax){
		
		var s=getAncestor(name);
		if(s.length<1){
			return;
		}
		
		var list=eval(name+'List');
		var scom= eval('document.all.'+s[0]);
		var id=scom.value;
		list.clear();
		if(id){
			var url = _getContextPath() + '/getUnitedTableInfo.do?unitedTableAjaxPara='+ eval(name+'AjaxPara');
			url = url + '&parentSelectValue=' + id;
			var str = LoadJSON(url);
			var uData = eval(str);
			
			for(var i=0;i<uData.length;i++){
				list.addData(uData[i].id, uData[i].display, uData[i].parent, name, uData[i].parentColumn, uData[i].code);
			}
		}
		
		updateSelect(name,selectedvalue);
	}else{
	
var msg = getI18nMsg('MSG_990006866');
if(msg==null){
	msg = 'Please Select'
}
var str='<option ';
if(selectedvalue+""=="undefined")
	str = str+'selected';
str = str + 'value=\'\'>'+msg+'<'+'/'+'option>';
var list=eval(name+'List');
var descStyle=eval(name+'descStyle');
var display=list.getDisplay();
var id=list.getId();
var code=list.getCode();
var num=list.getNum();
var parentcolumn=list.getParentcolumn();

var parentNode = document.getElementsByName(eval('parentof'+name));
var parentValue = '';
if(parentNode!= null && parentNode.length>0)
	parentValue = parentNode[0].value;
var parentValueInList;
var optionSize = 0;

for(var i=0;i<num;i++){
	parentValueInList = parentcolumn[i];
	if(parentValue!=''&& parentValueInList!=parentValue)
		continue;
	
	optionSize++;
str+='<option ';
if(selectedvalue&&selectedvalue!=''&&selectedvalue==id[i]){
	str+=' selected ';
	}
str+=' value=\''+ id[i]+ '\'> ';
if(descStyle=='CODE_AND_DESC'){//DESC_AND_CODE
str+=display[i]+'_'+code[i];
}else if(descStyle=='CODE'){
str+=code[i];
}else if(descStyle=='DESC'){
str+=display[i];
}else {
str+=display[i];
}
str+='<'+'/'+'option>';
}
document.write(str);
	if(optionSize==1){
		var selectElements = document.getElementsByName(name);
		if(selectElements!= null && selectElements.length>0){
			var selectElement;
			for(var i=0;i<selectElements.length;i++){
				if(selectElements[i].type.indexOf("select")!=-1){
					selectElement = selectElements[i];
					break;
				}
			}
			if(selectElement){
				selectElement.options[1].selected = true;
				if ((!parentNode || parentNode.length == 0) && needFireOnChange){
					windowOnLoad(function(){fireOnChange(selectElement, "3")});
				}
			}
			
		}
	}
}
}

function codeToId(name){

var comcode=eval('document.all.'+name+'code');
var comdesc=eval('document.all.'+name+'desc');
var comid=eval('document.all.'+name);
var code =comcode.value;


if(eval(name+'tree').config.enableAjax){
	var initValue = eval('_initUniteTableValue'+name);
	if(typeof initValue != 'undefined' && initValue.code == code){
		comid.value=initValue.id;
		comdesc.value=initValue.desc;
		return;
	} 
}

	var list=eval(name+'List');
	var id=list.getIdByCode(code);
	var dis=list.getDisplayById(id);
	comid.value=id;
	comdesc.value=dis;

}

function buildCodeAndDescById(name,value,codeValue,descValue){
	if(value){
var comcode=eval('document.all.'+name+'code');
var comdesc=eval('document.all.'+name+'desc');
var list=eval(name+'List');
if(codeValue){
	comcode.value = codeValue;
	comdesc.value = descValue;
}else{
	var code=list.getCodeById(value);
	var dis=list.getDisplayById(value); 
	comcode.value=code;
	comdesc.value=dis;
}
}
	
	
	}
	
////////////////dataList
function DataList(head){ 
 
this.num=0;
this.id=new Array();
this.code=new Array();
this.display=new Array(); 
this.parent=new Array();
this.name=new Array(); 
this.parentcolumn=new Array();
};
DataList.prototype.clear=function(){
	this.num=0;
	this.id=new Array();
	this.code=new Array();
	this.display=new Array(); 
	this.parent=new Array();
	this.name=new Array(); 
	this.parentcolumn=new Array();
}
				 
DataList.prototype.addData=function(id,display,parent,name,parentcolumn,code){	  
				 
		this.id[this.num]=id;
		this.display[this.num]=display;			  
		this.parent[this.num]=parent;
		this.name[this.num]=name;
		this.parentcolumn[this.num]=parentcolumn;
		this.code[this.num]=code;
		this.num++;
};


DataList.prototype.getParentColumnById=function(id){
	    var s=new Array();
  		 var j=0;
 for(var i=0;i<=this.num;i++){
 if( this.id[i]==id){
 	   s[j]=this.parentcolumn[i];
	   j++;	
	   break;
  }
 } 					   

  return s;
}; 	
DataList.prototype.getDisplayById=function(id){
	    var s='';
  		 var j=0;
 for(var i=0;i<=this.num;i++){
 if( this.id[i]==id){
 	   s=this.display[i];
	   j++;	
	   break;
  }
 } 					   

  return s;
}; 	
DataList.prototype.getCodeById=function(id){
	    var s='';
  		 var j=0;
 for(var i=0;i<=this.num;i++){
 if( this.id[i]==id){
 	   s=this.code[i];
	   j++;	
	   break;
  }
 } 					   

  return s;
}; 	
DataList.prototype.getIdByCode=function(code){
	    var s='';
  		 var j=0;
 for(var i=0;i<=this.num;i++){
 if( this.code[i]==code){
 	   s=this.id[i];
	   j++;	
	   break;
  }
 } 					   

  return s;
}; 	
DataList.prototype.getIdByParent=function(id){
	 
	    var s=new Array();
		if(id){
		 var j=0;
		 
 for(var i=0;i<=this.num;i++){
 if( this.parentcolumn[i]==id){
 	   s[j]=this.id[i];
	   j++;
	   }
 } 					   
 }else{
 for(var i=0;i<this.num;i++){
 	   s[i]=this.id[i];
	   } 	
	
 }
  return s;
}; 	
DataList.prototype.getRootIdAndDisplayByParent=function(id){
	 
	    var s=new Array();
  		 var j=0;
 for(var i=0;i<=this.num;i++){
 if( this.parentcolumn[i]==id&&this.parent[i]==''){
 	   s[j]=new Array(this.id[i],this.display[i]);
	   j++;
	   }
 } 					   

  return s;
}; 	
DataList.prototype.getDisplayByParent=function(id){
	    var s=new Array();
		if(id){
  		 var j=0;
 for(var i=0;i<=this.num;i++){
 if( this.parentcolumn[i]==id){
 	   s[j]=this.display[i];
	   j++;
	   }
 } 				
 }else{
 for(var i=0;i<this.num;i++){
 	   s[i]=this.display[i];
	   } 	
}
  return s;
}; 	
DataList.prototype.getCodeByParent=function(id){
	    var s=new Array();
	if(id){
  		 var j=0;
 for(var i=0;i<this.num;i++){
 if( this.parentcolumn[i]==id){
 	   s[j]=this.code[i];
	   j++;
	   }
 } 					   
}else{
 for(var i=0;i<=this.num;i++){
 	   s[i]=this.code[i];
	   } 	
}
  return s;
}; 	

 DataList.prototype.getChildId=function(id){	
  	
 var s=new Array();
 var j=0;
 for(var i=0;i<this.num;i++){ 
    
 if( this.parent[i]==id){
 		 
 	   s[j]=this.id[i];	  
	 		j++;
  }
 } 					   
 
  return s;
 };
DataList.prototype.getChildDisplay=function(id){
	    var s=new Array();
  		 var j=0;
 for(var i=0;i<=this.num;i++){
 if( this.parent[i]==id){
 	   s[j]=this.display[i];
	   j++;	
	   
  }
 } 					   
 
  return s;
}; 	
DataList.prototype.getChildCode=function(id){
	    var s=new Array();
  		 var j=0;
 for(var i=0;i<=this.num;i++){
 if( this.parent[i]==id){
 	   s[j]=this.code[i];
	   j++;	
	   
  }
 } 					   
 
  return s;
}; 
DataList.prototype.getChildName=function(id){
	    var s=new Array();
  		 var j=0;
 for(var i=0;i<=this.num;i++){
 if( this.parent[i]==id){
 	   s[j]=this.name[i];
	   j++;	
	   
  }
 } 					   
 
  return s;
}; 	
 DataList.prototype.isExist=function(id){
	    var s=new Array();
  		 var j=0;
 for(var i=0;i<=this.num;i++){
 if( this.id[i]==id){
 	   return true;
  }
 } 					   
 
  return false;
}; 
DataList.prototype.getId=function(){
	 return this.id;
	 
	 };
DataList.prototype.getNum=function(){
	 return this.num;
	 
	 };
DataList.prototype.getDisplay=function(){
	 return this.display;
	 
	 };
DataList.prototype.getCode=function(){
	 return this.code;
	 
	 };
DataList.prototype.getParentcolumn=function(){
	 return this.parentcolumn;
	 };
	 ////////////////////
 
