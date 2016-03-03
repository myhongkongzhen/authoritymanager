function CheckStack(){
	this.head=-1;
	this.stack=[];
	};
CheckStack.prototype.addNode=function(node){
   this.stack[++this.head]=node;
   };
 CheckStack.prototype.push=function(node){
   this.stack[++this.head]=node;
   };
 CheckStack.prototype.pop=function(){
	var o=this.stack[this.head];
	if(this.head>-1){
	this.head--;
	}
	return o;
	};  
CheckStack.prototype.peek=function(){
	var o=this.stack[this.head];
 
	return o;
};  	
CheckStack.prototype.empty=function(){
	this.head=-1;
	this.stack.length=0;
};  	  
CheckStack.prototype.deleteNode=function(){
	var o=this.stack[this.head];
	if(this.head>-1){
	this.head--;
	}
	return o;
	};   
CheckStack.prototype.isEmpty=function(){
	if(this.head==-1){
		return true;
		}else{
		return false;
		}
	};	
function CheckNode(id,pid){
	this.id=id;
	this.pid=pid;
	
	this.hasCheckBox=false;	
	};
function CheckList(){
	this.objects=[];
	};
CheckList.prototype.addNode=function(node){
	this.objects[this.objects.length]=node;
	};
CheckList.prototype.getChildNodes=function(pnode){
	var result=[];
	for(var i=0,j=0;i<this.objects.length;i++){
		var cnode=this.objects[i];
		if(cnode.pid==pnode.id){
		result[j++]=cnode;
		}
		}
		return result;
	};
CheckList.prototype.getParentNode=function(cnode){
	var parentNode;
	for(var i=0,j=0;i<this.objects.length;i++){
		var pnode=this.objects[i];
		if(cnode.pid==pnode.id){
		parentNode=pnode;
		break;
		}
		}
		 
	return parentNode;
	
	};	
CheckList.prototype.getAncestors=function(cnode){
	var result=[];
	
	var parentNode=this.getParentNode(cnode);
	
	while(parentNode.pid!=-1){
		result[result.length]=parentNode;
	parentNode=this.getParentNode(parentNode);	
	
		
		}
	 
	
	return result;
	
	};	
CheckList.prototype.getOffspringNodes=function(pnode){
	var result=[];
	var checkStack=new CheckStack();
	checkStack.addNode(pnode);
	while(!checkStack.isEmpty()){
		var o=checkStack.deleteNode();
		if(o.id!=pnode.id)
		result[result.length]=o;
		var cr=this.getChildNodes(o);
		for(var i=0;i<cr.length;i++){
		 	checkStack.addNode(cr[i]);
			}
		
		
		}
	return result;
	
};	
CheckList.prototype.getNodeById=function(id){
	for(var i=0;i<this.objects.length;i++){
	if(this.objects[i].id==id){
		return this.objects[i];
		}
	
       }
	};
