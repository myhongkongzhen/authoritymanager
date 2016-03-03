kkvooReady(function() {
	kkvoo.core.initHeight();
	$('input[type=radio]').iCheck({
    	checkboxClass: 'icheckbox_flat-blue',
    	radioClass: 'iradio_flat-blue'
	});
	
	//输入检查
	$("#queryResult").validate({
		rules:{
			"password":{
				required:true
			},
			"phone":{
				required:true,
				isPhone:true
			}
		  },
		 messages:{
		    "password":{
				required:"密码不能为空！"
			},
			"phone":{
				required:"电话不能为空！",
				isPhone:"请输入合法电话号码！"
			}
	        },
		errorClass: "fontColor",
		errorElement: "span",
		highlight:function(element, errorClass, validClass) {
			$(element).removeClass('has-success').addClass('has-error');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass('has-error').addClass('has-success');
		}
	});
	
	//保存事件
	$("#sumitBtn").click(function(){
		if($("#queryResult").valid()){

		    var data = JSONString(FormJSON("queryResult"));
		    
		    console.info("data:"+data);
			var url=kkvoo.base.getRootPath()+"/admin/sys/user/doSaveAction";
			var success=function(o){
				var sufun=function(){
					window.location.href=kkvoo.base.getRootPath()+"/admin/sys/user";
				}
				console.info("Ajax success:"+JSONString(o));
			    kkvoo.base.MyAlert(o.msg,null,false, ((o.flag==true)?sufun:null));
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
			kkvoo.base.AjaxBody(url, data, success, error);
		}
	  });
});

