var old_subclassId;
kkvooReady(function() {
	$('input[type=radio]').iCheck({
    	checkboxClass: 'icheckbox_flat-blue',
    	radioClass: 'iradio_flat-blue'
	});
	var goodsId=$("#id").val();
//	var goodsId=$("#goodsId").val();
	kkvoo.core.gmsUploaderInit("imageUrl",1,goodsId);//1 list 2 detail
	kkvoo.core.gmsUploaderInit("imageUrl2",2,goodsId);
	
	//下拉框选择事件
	  $('#goodsTypeSelect').change(function(){
    	  var selectedId=$("#goodsTypeSelect option:selected").attr("id").replace(/goodsType/, "");
		  $("#goodsType").val((selectedId=='goodsType')?"":parseInt(selectedId));
		  });
	  if($("#goodsType").val()==''){
		  $('#goodsTypeSelect').get(0).selectedIndex=0;//$('#goodsTypeSelect').prop('selectedIndex', 0);
		  $('#goodsTypeSelect').change();
	  }else{
		  $('#goodsTypeSelect').val($('#goodsType'+$('#goodsType').val()).val());
		  $('#goodsTypeSelect').change();
	  }
	  
	//输入检查
	$("#queryResult").validate({
		rules:{
			"goodsTitle":{
				required:true
			},
			"brand":{
				required:true
			},
			"goodsAmount":{
				required:true,
			},
			"defaultPayPercent":{
				required:true,
			},
			"defaultPayAmount":{
				required:true,
			},
			"defaultPhaseAmount":{
				required:true,
			},
			"defaultLoanTerm":{
				required:true,
			}
			
		  },
		 messages:{
		  "goodsTitle":{
				required:"商品名称不能为空！"
			},
			"brand":{
				required:"品牌不能为空！"
			},
			"goodsAmount":{
				required:"商品价格不能为空！",
			},
			"defaultPayPercent":{
				required:"首付比例不能为空！",
			},
			"defaultPayAmount":{
				required:"首付金额不能为空！",
			},
			"defaultPhaseAmount":{
				required:"每期还款金额不能为空！",
			},
			"defaultLoanTerm":{
				required:"默认分期数不能为空！",
			}
			
	        },
		errorClass: "fontColor",
		errorElement: "span",
		highlight:function(element, errorClass, validClass) {
			$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
		}
	});
	
	//保存事件
	$("#sumitBtn").click(function(){
		if($("#queryResult").valid()){

		    var data = JSONString(FormJSON("queryResult"));
		    
		    console.info("data:"+data);
			var url=kkvoo.base.getRootPath()+"/admin/app/goodsInfo/doSaveAction";
			var success=function(o){
				var sufun=function(){
					$("[name='step2']").removeClass('badge-default').addClass('badge-success')
					//设置goodsId
					$("#id").val(o.msg);
					kkvoo.core.gmsUploaderInit("imageUrl",1,o.msg);//1 list 2 detail
					kkvoo.core.gmsUploaderInit("imageUrl2",2,o.msg);
				}
				console.info("Ajax success:"+JSONString(o));
			    kkvoo.base.MyAlert("保存成功",null,false, ((o.flag==true)?sufun:null));
				return;
			};
			
			
           var error=function(o){
				console.info("Ajax error:"+JSONString(o));
				if(o.readyState==0&&o.status==0)
			    {
					kkvoo.base.MyAlert("错误:网络异常！");//kkvoo.base.MyAlert("错误:"+o.statusText);
			    }
				else if(o.readyState==4&&o.responseText.indexOf(kkvoo.service.noRightTitle)>0)
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
		}
	  });
});

