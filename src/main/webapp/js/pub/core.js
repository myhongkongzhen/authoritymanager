/**
 * core.js
 * 提供偏向业务能力组件,基于base.js
 * kkvoo
**/
kkvoo.core=function() {
try {
//#############################业务组件能力######################################################################################
		return {
			getHtmlSparkline_bar:function(o,title){
				 var rate=kkvoo.core.getRate(o);
				 var rThtml;
					 if(rate>0)
					 rThtml= '<div class="left sparkline_bar_good"><span>'+o.listData+'</span><i class="fa fa-double-angle-up"></i> +'+rate+'%</div>';
					 else if(rate<0)
					 rThtml= '<div class="left sparkline_bar_bad"><span>'+o.listData+'</span><i class="fa fa-double-angle-down"></i> '+rate+'%</div> ';
					 else
					 rThtml= '<div class="left sparkline_bar_neutral"><span>'+o.listData+'</span><i class="fa fa-minus"></i> 0%</div>';
					
					 rThtml+='<div class="right"><strong>'+o.mapData.total+'</strong>'+title+'</div>';
					 return rThtml;
				},
				getRate:function(o){
					var today=o.mapData.today;
					var yesterday=o.mapData.yesterday;
	                if(yesterday==0){
	                	if(today==yesterday){
	                		return 0;
	                	}
	                return 100;
	                }else{
	                	return changeTwoDecimal((today-yesterday)*100/yesterday);
	                }
					},
			
			/**
			 *
			 * @param inputName
			 * @param thumbnailsWidth
			 * @param thumbnailsHeight
			 */
			uploaderInit :function(inputName,thumbnailsWidth,thumbnailsHeight,useOldImage,ifThumbnails){
				var tempHtml=
				'<div class="item">'+
				'<a class="thumbnail"> <img style="width: '+thumbnailsWidth+'px;height: '+thumbnailsHeight+'px;" id="'+inputName+'ThumbnailImg" onerror=\'this.src="'+kkvoo.base.getRootPath()+'/img/img-error.jpg"\' src="'+kkvoo.base.getRootPath()+$('#'+inputName).val()+'" alt="图片无法显示">'+
				'<div id="'+inputName+'imgMsg" align="center" class="img-fonttxt"></div>'+
				'</a>'+
				'<div class="actions">'+
			    '<div class="actions-inner">'+
			    '<a title="点击重新上传" href="javascript:void(0);" id="'+inputName+'UploadBtn" name="'+inputName+'UploadBtn" ><i class="fa fa-arrow-up">上传</i></a>'+
			    '</div>'+
			    '</div>'+
				'</div>'+
				'<div class="item">'+
				'<ul id="'+inputName+'file-list"></ul>'+
				'<ul ><a disabled id="'+inputName+'UpLoadsumitBtn" class="btn btn-dark-green fa fa-chevron-up">上传</a></ul>'+
				'</div>';
				$('#'+inputName+'Thumbnail').html(tempHtml);
				kkvoo.core.uploaderConfig(inputName,thumbnailsWidth, thumbnailsHeight,useOldImage);
			},
			
			uploaderConfig :function(inputName,thumbnailsWidth,thumbnailsHeight,useOldImage){
				var imageUploadBtn=inputName+'UploadBtn';
				var upLoadsumitBtn=inputName+'UpLoadsumitBtn';
				var imageUrl=inputName;
				useOldImage=(useOldImage)?useOldImage:false;
				kkvoo.uploader[inputName]= new plupload.Uploader({
					browse_button : imageUploadBtn,//绑定触发按钮
					runtimes : 'html5,flash,silverlight,html4',
					url : kkvoo.base.getRootPath()+'/file/image/upload-file/'+thumbnailsWidth+'/'+thumbnailsHeight+"/"+useOldImage,
					flash_swf_url : 'js/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
			        silverlight_xap_url:'js/Moxie.xap', //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
					filters : {
						max_file_size : '10mb',//不超过10M
						mime_types : [ //只允许上传图片文件和rar压缩文件
						    		    { title : "图片文件", extensions : "jpg,gif,png,bmp" }, 
						    		    { title : "RAR压缩文件", extensions : "zip" }
						    		  ],
					    prevent_duplicates : false //重复文件可以
					},
					multi_selection:false,
					init: {
						FilesAdded: function(up, files) {
							if(up.files.length>1) 
							{
							  $("#"+inputName+"imgMsg").html("限制了最多只能传送一个文件!");
							  return false;
							}
							for(var i = 0, len = files.length; i<len; i++){
								//构造html来更新UI
								var html = '<li id="'+inputName+'file-' + files[i].id +'"><p class="file-name">' + files[i].name + ' (' + plupload.formatSize(files[i].size) + ') </p><p class="upload-progress"></p></li>';
								$(html).appendTo('#'+inputName+'file-list');
							}
							$("#"+upLoadsumitBtn).attr("disabled",false);
							$("#"+inputName+"imgMsg").html("等待上传...");
						},
						UploadProgress: function(up, file) {
							$("#"+inputName+"imgMsg").html("上传ing...");
							$("#"+inputName+"file-"+file.id+" .upload-progress").css("width",file.percent + "%");//控制进度条
						},
						Error: function(up, err) {
							$("#"+inputName+"imgMsg").html("Error：(" + err.code + "): " + err.message);
							kkvoo.uploader[inputName].removeFile(err.file);
							kkvoo.uploader[inputName].files=[];
							$('#file-list').html("");
						},
						UploadComplete:function(up,files){
							//当上传队列中所有文件都上传完成后触发
						},
						FileUploaded :function(up,file,responseObject){//单个文件完成后
						    var o=StringJSON(responseObject.response);
						    console.info("FileUploaded:"+responseObject.status);
							console.info("FileUploaded success:"+o);
							kkvoo.base.MyAlert(o.msg);
							if(o.flag){
								var uploadStatus=(o.data)[0];
								var useNewImage=(useOldImage)?(uploadStatus.fileUrl):(uploadStatus.thumbnailsUrl);
								$('#'+imageUrl).val(useNewImage);
//								$('#'+imageThumbnailUrl).val(uploadStatus.thumbnailsUrl);//对于web而言没有，既要大图，又要小图的地方。
								$('#'+inputName+'ThumbnailImg').attr("src",kkvoo.base.getRootPath()+useNewImage);
								console.info("更新缩略图地址:"+kkvoo.base.getRootPath()+useNewImage);
							}
							$("#"+upLoadsumitBtn).attr("disabled",true);
							kkvoo.uploader[inputName].removeFile(file);
							$('#'+inputName+'file-list').html("");
							$("#"+inputName+"imgMsg").html("上传完成！");
						}
					}
				});
				
				$("#"+upLoadsumitBtn).click(function(){
					
					kkvoo.uploader[inputName].start(); //开始上传
					$("#"+upLoadsumitBtn).attr("disabled",true);
				});
				kkvoo.uploader[inputName].init();
			},
			
			/***
			 * gms
			 */
			gmsUploaderInit :function(inputName,uploadType,goodsId){
				var tempHtml=
				'<div class="item">'+
				'<a class="thumbnail"> <img id="'+inputName+'ThumbnailImg" onerror=\'this.src="'+kkvoo.base.getRootPath()+'/img/img-error.jpg"\' src="'+kkvoo.base.getRootPath()+$('#'+inputName).val()+'" alt="图片无法显示">'+
				'<div id="'+inputName+'imgMsg" align="center" class="img-fonttxt"></div>'+
				'</a>'+
				'<div class="actions">'+
			    '<div class="actions-inner">'+
			    '<a title="点击重新上传" href="javascript:void(0);" id="'+inputName+'UploadBtn" name="'+inputName+'UploadBtn" ><i class="fa fa-arrow-up">上传</i></a>'+
			    '</div>'+
			    '</div>'+
				'</div>'+
				'<div class="item">'+
				'<ul id="'+inputName+'file-list"></ul>'+
				'<ul ><a disabled id="'+inputName+'UpLoadsumitBtn" class="btn btn-dark-green fa fa-chevron-up">上传</a></ul>'+
				'</div>';
				$('#'+inputName+'Thumbnail').html(tempHtml);
				kkvoo.core.gmsUploaderConfig(inputName,uploadType,goodsId);
			},
			
			gmsUploaderConfig :function(inputName,uploadType,goodsId){
				var imageUploadBtn=inputName+'UploadBtn';
				var upLoadsumitBtn=inputName+'UpLoadsumitBtn';
				var imageUrl=inputName;
//				useOldImage=(useOldImage)?useOldImage:false;
				kkvoo.uploader[inputName]= new plupload.Uploader({
					browse_button : imageUploadBtn,//绑定触发按钮
					runtimes : 'html5,flash,silverlight,html4',
					url : kkvoo.base.getRootPath()+'/file/image/gms/upload-file/'+uploadType+'/'+goodsId,
					flash_swf_url : 'js/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
			        silverlight_xap_url:'js/Moxie.xap', //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
					filters : {
						max_file_size : '1mb',//不超过10M
						mime_types : [ //只允许上传图片文件和rar压缩文件
						    		    { title : "图片文件", extensions : "png" }
						    		  ],
					    prevent_duplicates : false //重复文件可以
					},
					multi_selection:false,
					init: {
						FilesAdded: function(up, files) {
							if(up.files.length>1) 
							{
							  $("#"+inputName+"imgMsg").html("限制了最多只能传送一个文件!");
							  return false;
							}
							for(var i = 0, len = files.length; i<len; i++){
								//构造html来更新UI
								var html = '<li id="'+inputName+'file-' + files[i].id +'"><p class="file-name">' + files[i].name + ' (' + plupload.formatSize(files[i].size) + ') </p><p class="upload-progress"></p></li>';
								$(html).appendTo('#'+inputName+'file-list');
							}
							$("#"+upLoadsumitBtn).attr("disabled",false);
							$("#"+inputName+"imgMsg").html("等待上传...");
						},
						UploadProgress: function(up, file) {
							$("#"+inputName+"imgMsg").html("上传ing...");
							$("#"+inputName+"file-"+file.id+" .upload-progress").css("width",file.percent + "%");//控制进度条
						},
						Error: function(up, err) {
							$("#"+inputName+"imgMsg").html("Error：(" + err.code + "): " + err.message);
							kkvoo.uploader[inputName].removeFile(err.file);
							kkvoo.uploader[inputName].files=[];
							$('#file-list').html("");
						},
						UploadComplete:function(up,files){
							//当上传队列中所有文件都上传完成后触发
						},
						FileUploaded :function(up,file,responseObject){//单个文件完成后
						    var o=StringJSON(responseObject.response);
						    console.info("FileUploaded:"+responseObject.status);
							console.info("FileUploaded success:"+o);
							kkvoo.base.MyAlert(o.msg);
							if(o.flag){
								var uploadStatus=(o.data)[0];
//								var useNewImage=(useOldImage)?(uploadStatus.fileUrl):(uploadStatus.thumbnailsUrl);
								var useNewImage=uploadStatus.fileUrl+"?version="+new Date().getTime();
								$('#'+imageUrl).val(useNewImage);
//								$('#'+imageThumbnailUrl).val(uploadStatus.thumbnailsUrl);//对于web而言没有，既要大图，又要小图的地方。
								$('#'+inputName+'ThumbnailImg').attr("src",kkvoo.base.getRootPath()+useNewImage);
								console.info("更新缩略图地址:"+kkvoo.base.getRootPath()+useNewImage);
							}
							$("#"+upLoadsumitBtn).attr("disabled",true);
							kkvoo.uploader[inputName].removeFile(file);
							$('#'+inputName+'file-list').html("");
							$("#"+inputName+"imgMsg").html("上传完成！");
						}
					}
				});
				
				$("#"+upLoadsumitBtn).click(function(){
					
					kkvoo.uploader[inputName].start(); //开始上传
					$("#"+upLoadsumitBtn).attr("disabled",true);
				});
				kkvoo.uploader[inputName].init();
			},
			
			
			
			/**
			 * 新打开页面后，给菜单加上打开状态，和选中状态等.
			 */
			refreshNode :function(){
				if(!sessionStorage._CURRENT_MENU_NAME_){
					sessionStorage._CURRENT_MENU_NAME_="主页";
				}
//				        $('#idHome').html(sessionStorage._CURRENT_MENU_NAME_);
				        
						$('#node'+sessionStorage._CURRENT_MENU_PID_).attr("class","submenu open");
						$('#node'+sessionStorage._CURRENT_MENU_ID_).attr("class","active");
//						$('#p'+sessionStorage._CURRENT_MENU_PID_).addClass("open");
//						$('#c'+sessionStorage._CURRENT_MENU_ID_).addClass("active");
						$('#aCurrentName').text(sessionStorage._CURRENT_MENU_NAME_);
						$('#aCurrentName').attr("href",sessionStorage._CURRENT_MENU_FULL_PATH_);
						
						if(sessionStorage._CURRENT_MENU_ID_==1||!sessionStorage._CURRENT_MENU_ID_){
							$('#aHome').html('<i class="fa fa-home"></i>'+'主页');
//							$('#aHome').attr("href","");
							$('#aHome').attr("title",'返回主页');
							$('#aHome').attr("onclick","kkvoo.core.recordCurrentNodeInfo(1, null, '主页', '','#');");							
							$('#aHome').addClass("current");
							$('#node1').addClass("active");
							$('#aCurrentName').remove();
						}
						else{
							var currentPNode=pageDataMap.get("node"+sessionStorage._CURRENT_MENU_PID_);
							if(currentPNode){
								$('#aHome').html('<i class="'+currentPNode.icon+'"></i>'+currentPNode.name);
//								$('#aHome').attr("href",currentPNode.link);
								$('#aHome').attr("title",'返回'+currentPNode.name);
								$('#aHome').attr("onclick","kkvoo.core.recordPOnClick("+currentPNode.id+");");
							}
						}
				console.info("加载菜单完毕！");
			 },
			 
			 /**
				 * 提供给页面点击触发，记录点击事件存储
				 * @param id
				 * @param pid
				 * @param name
				 * @param link
				 * @param base
				 */
		 recordCurrentNodeInfo:function (id, pid, name, link,base){
				 kkvoo.core.initNodeInfo(id, pid, name, link, base);
				 window.location =sessionStorage._CURRENT_MENU_FULL_PATH_;
			 },
				    
		 initNodeInfo:function (id, pid, name, link,base){
							sessionStorage._LAST_MENU_ID_=sessionStorage._CURRENT_MENU_ID_;
							sessionStorage._LAST_MENU_PID_=sessionStorage._CURRENT_MENU_PID_;
							sessionStorage._LAST_MENU_NAME_=sessionStorage._CURRENT_MENU_NAME_;
							sessionStorage._LAST_MENU_LINK_=sessionStorage._CURRENT_MENU_LINK_;
							sessionStorage._LAST_MENU_BASE_=sessionStorage._CURRENT_MENU_BASE_;
							sessionStorage._LAST_MENU_FULL_PATH_=sessionStorage._CURRENT_MENU_FULL_PATH_;
							
							sessionStorage._CURRENT_MENU_ID_=id;
							sessionStorage._CURRENT_MENU_PID_=pid;
							sessionStorage._CURRENT_MENU_NAME_=name;
							sessionStorage._CURRENT_MENU_LINK_=link;
							sessionStorage._CURRENT_MENU_BASE_=base;
							sessionStorage._CURRENT_MENU_FULL_PATH_=base+link;
				    },
				    
			 clearCurrentNodeInfo:function (){
				 kkvoo.core.initNodeInfo("", "", "", "", "");
			  },	    
				    
			 recordCurrentPOpen:function (o){
				 sessionStorage._LAST_MENU_P_OPEN_=sessionStorage._CURRENT_MENU_P_OPEN_;
				 sessionStorage._CURRENT_MENU_P_OPEN_=o;
			 },
		    /**
		     * 
		     * @param o
		     * @returns
		     */
			 
			 recordPOnClick:function (o){
					kkvoo.core.recordCurrentPOpen(o);
					var currentPNode=pageDataMap.get("node"+sessionStorage._CURRENT_MENU_P_OPEN_);
					var lastPNode=pageDataMap.get("node"+sessionStorage._LAST_MENU_P_OPEN);
					if(lastPNode){
						if(currentPNode.sort>lastPNode.sort){//开关顺序
							$('#node'+sessionStorage._LAST_MENU_P_OPEN).removeClass('open');
							$('#node'+sessionStorage._CURRENT_MENU_P_OPEN_).addClass('open');
						}else{
							$('#node'+sessionStorage._CURRENT_MENU_P_OPEN_).addClass('open');
							$('#node'+sessionStorage._LAST_MENU_P_OPEN).removeClass('open');
						}
					}else{
						$('#node'+sessionStorage._CURRENT_MENU_P_OPEN_).addClass('open');
					}
		        },
		        
		        openMenuNode:function (o){
					$('#node'+o).addClass('open');
			        },
		        
				
			/**
			 * 展示大图片
			 * @param o
			 */
			showBigImg:function (o){
			    		var bigImgBodyHtml=
			    			'<div class="form-group" align="center">'+
			    			  '<div id="gallery-masonry">'+
			    				'<div>'+
			    				 	'<a> <img class="img-responsive img-thumbnail" onerror="this.src=\'../img/img-error.jpg\'" src="'+o+'" alt="图片无法显示"></a>'+
			    				'</div>'+	
			    			  '</div>'+	
			    			'</div>';
			    		var myBigImgHtml=kkvoo.core.makeModalHtml(bigImgBodyHtml,"","原图");
			    		$("#myBigImg").html(myBigImgHtml);
				   },

		   	/**
		   	 * 根据省被选中，主动带出市
		   	 * @param selectedId
		   	 * @returns
		   	 */
		   	drawingRegionCity:function(selectedId){
				  var regionList=pageDataMap.get("regionList");
				  //带出城市
				  var cityHtml='<option id="cityDefault">请选择市</option>';
				  var temp=regionList.result;
                  for(var i=0;i<temp.length;i++){
                	  if(temp[i].pid==selectedId){
                		  cityHtml+='<option id="city'+temp[i].id+'">'+temp[i].name+'</option>';  
                	  }
                  }
                  $("#city").html(cityHtml); 
		   	},
			onColorTr:function(key){
				 if(sessionStorage._CURRENT_TR_)
				 $('#'+sessionStorage._CURRENT_TR_).removeClass("onColorTr");
					 
	          	 var trId="tr"+key;
				 $('#'+trId).addClass("onColorTr");
	          	 sessionStorage._CURRENT_TR_=trId;
			},
			
			InitValidateInputOnReady:function(){
				if($("form[name='queryResult']").length!=0)
				{
				$("form[name='queryResult']").validate({
					rules:{
						"user.businessId":{
							required:false,
							number:true
						},
						"businessId":{
							required:false,
							number:true
						},
						"mobilePhone":{
							required:false,
							isPhone:true
						},
						"taskId":{
							required:false,
							number:true
						},
						"beginTime":{
							required:true
						},
						"endTime":{
							required:true
						},
						"msg":{
//							min:2,
//							max:100,
							required:true
						},
						"oldPassWord":{
							required:true
						},
						"newPassWord":{
							required:true
						},
						"password2":{
							required:true,
							equalTo:"#newPassWord"
						},
						"reply":{
							required:true
						}
					  },
					 messages:{
						 "user.businessId":{
							 number:"<br>帐户必须为数字!"
				            },
				          "businessId":{
						    number:"<br>用户ID必须为数字!"
					            },
					       "mobilePhone":{
					    	   isPhone:"<br>请输入合法手机号码!"
						   },
						   "taskId":{
								number:"<br>订单号为数字!"
							},
						   "beginTime":{
							   required:"<br>不能为空!"
							},
							"endTime":{
							  required:"<br>不能为空!"
						    },
						    "msg":{
//								  min:"<br>至少2个字!",
//								  max:"<br>最多100个字!",
								  required:"<br>系统消息不能为空!"
							    },
							"oldPassWord":{
								required:" 不能为空!"
							},
							"newPassWord":{
								required:" 不能为空!"
							},
							"password2":{
								required:" 不能为空!",
							    equalTo:"两次密码需要一致！"
							},
							"reply":{
								required:"不能回复空信息。"
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
					
				});}
			},
			
			InitValidateInput:function(){
				$("#showDetail2Form").validate({
					rules:{
						remark:{
							required:true
						}
					},
					errorClass: "help-inline",
					errorElement: "span",
					highlight:function(element, errorClass, validClass) {
						$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
					},
					unhighlight: function(element, errorClass, validClass) {
						$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
					}
				});
			},
			/**
			 * 
			 * @param o
			 * @returns
			 */
			initHeight:function(o){
				var clientHeight=document.body.clientHeight;//可见区域高度
				var contentHeight=$("#content").height();
				var wrapperHeight=$("#wrapper").height();
				console.info(clientHeight);
				console.info(contentHeight);
				console.info(wrapperHeight);
				if(contentHeight<=590)
					$("#content").height(clientHeight+'px'); 
				},
			initSelectAndCheckbox:function(o){
//				$('input[type=checkbox],input[type=radio]').iCheck({
//				if($('input[type=radio]').length>0)
//				$('input[type=radio]').iCheck({
//			    	checkboxClass: 'icheckbox_flat-blue',
//			    	radioClass: 'iradio_flat-blue'
//				});
				if($('#userSelect').length>0)
			    $('#userSelect').select2();
				
				if($('#roleSelect').length>0)
				$('#roleSelect').select2();
				
				if($('#goodsTypeSelect').length>0)
				$('#goodsTypeSelect').select2();
				}
		}
	} catch(e) {
		console.error(e.message);
		throw new Error(e);
	}
}();
