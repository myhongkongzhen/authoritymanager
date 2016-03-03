kkvooReady(function() {
	kkvoo.core.initHeight();
	$('input[type=radio]').iCheck({
    	checkboxClass: 'icheckbox_flat-blue',
    	radioClass: 'iradio_flat-blue'
	});
});



function doChangeLocked(id,disabled){
	var url=kkvoo.base.getRootPath()+"/admin/sys/user/doChangeLocked";
	var data={id:id,disabled:disabled};
	console.info(data);
	var success=function(o){
		console.info("Ajax success:"+JSONString(o));
		kkvoo.base.MyAlert((o.msg)?(o.msg):( (JSONString(o).indexOf(kkvoo.service.noRightTitle)>0)?kkvoo.service.noRightMsg:JSONString(o)),null,o.flag);
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


	