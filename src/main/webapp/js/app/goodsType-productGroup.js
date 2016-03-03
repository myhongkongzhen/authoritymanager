kkvooReady(function() {	
	
	kkvoo.core.initHeight();
	//下拉框选择事件
	  console.info("开始绑定下拉框事件...");
	  $('#goodsTypeSelect').change(function(){
  	  var selectedId=$("#goodsTypeSelect option:selected").attr("id").replace(/goodsType/, "");
		  $("#goodsTypeId").val((selectedId=='goodsType')?"":parseInt(selectedId));
		  //
		    $("input[name='rscheckbox']").attr("checked",false);//取消树选中
	         getGoodsTypeProductGroupByGoodsTypeId(selectedId)
		  });
	  
	  //默认
	  if($("#goodsTypeId").val()==''){
		  $('#goodsTypeSelect').get(0).selectedIndex=0;//$('#goodsTypeSelect').prop('selectedIndex', 0);
		  $('#goodsTypeSelect').change();
	  }else{
		  $('#goodsTypeSelect').val($('#goodsType'+$('#goodsTypeId').val()).val());
		  $('#goodsTypeSelect').change();
	  }
	  console.info("渲染默认下拉完毕！");
	  
	   //保存事件
		$("#sumitBtn").click(function(){
			var url=kkvoo.base.getRootPath()+"/admin/app/goodsType-productGroup/doSaveAction";
          var data=JSONString({goodsTypeId:$("#goodsTypeId").val(),productGroupIds:kkvoo.service.getTreeCheckedIds('rscheckbox')});
			var success=function(o){
				console.info("Ajax success:"+JSONString(o));
				kkvoo.base.MyAlert(o.msg,null,false);
				return;
			};
         var error=function(o){
				console.info("Ajax error:"+JSONString(o));
				if(o.readyState==0&&o.status==0)
			    {
					kkvoo.base.MyAlert("错误:网络异常！");//kkvoo.base.MyAlert("错误:"+o.statusText);
			    }else if(o.readyState==4&&o.responseText.indexOf(kkvoo.service.noRightTitle)>0)
				{
					kkvoo.base.MyAlert(kkvoo.service.noRightMsg);
				}
				else if(o.readyState==4&&o.responseText.indexOf(kkvoo.service.hasOutLogin)>0)
				{
					kkvoo.base.MyAlert(kkvoo.service.hasOutMsg);
				}
				return;
			};
			kkvoo.base.AjaxBody(url, data, success, error);
		});
	  //
	  
});

/**
 * 
 * @param o
 */
function  getGoodsTypeProductGroupByGoodsTypeId(o){
	var url=kkvoo.base.getRootPath()+"/admin/app/goodsType-productGroup/getGoodsTypeProductGroupByGoodsTypeId";
    var data={goodsTypeId:o};
	var success=function(o){
			console.info("Ajax success:"+o.flag);
			if(o.flag){
			//选中	
			initTreeChecked(o.data);
			}
			return;
		};
  var error=function(o){
			console.info("Ajax error:"+JSONString(o));
			if(o.readyState==0&&o.status==0)
		    {
				kkvoo.base.MyAlert("错误:网络异常！");//kkvoo.base.MyAlert("错误:"+o.statusText);
		    }else if(o.readyState==4&&o.responseText.indexOf(kkvoo.service.noRightTitle)>0)
			{
				kkvoo.base.MyAlert(kkvoo.service.noRightMsg);
			}
			return;
		};
		kkvoo.base.Ajax(url, data, success, error);
}
/**
 * 
 * @param o
 * @param rscheckbox
 */
function initTree(o,rscheckbox){
	 var treeHtml= '<script>var rstree = new dTree("rstree","'+rscheckbox+'");'+
	               'rstree.config.onLoadClick = false;'+
	               'rstree.config.useLines = false;'+
	               'rstree.config.useSelection = false;'+
	               'rstree.config.folderLinks = false;'+
	               'rstree.add(0,-1,"产品系列资源树","","rs", "","","",true,false);';
 if(o){
	pageDataMap.put("productGroupList",o);
 for(var i=0;i<o.length;i++){
     	treeHtml+='rstree.add('+o[i].productGroupID+','+0+',"【系列】'+o[i].productGroupName+'","","rs","","","",true,true);';  
   }
 }
 treeHtml+='document.write(rstree);</script>';
 $("#treeDiv").html(treeHtml);
}


/**
 * 
 * @param o
 */
function initTreeChecked (o){
    if(o){
	  for(var i=0;i<o.length;i++){
	        eval('document.all.s_'+o[i].productGroupId).checked = true;
      }
	  }
}
