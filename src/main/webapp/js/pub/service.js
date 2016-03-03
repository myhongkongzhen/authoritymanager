/**
 * service.js
 * 提供页面对外面js响应接口服务，基于base.js和core.js
 * kkvoo
**/
kkvooReady(function() {
    // 更新Node的信息
	kkvoo.core.refreshNode();
    //初始化validate	
//	kkvoo.core.InitValidateInputOnReady();
	//initHeight
//	kkvoo.core.initHeight();
	//
	kkvoo.core.initSelectAndCheckbox();
}); 

/**
 * 服务组件
 */
kkvoo.service=function() {
	try {

		
//#############################外部接口##############################################################	
		return {
			
			
//##################################################################################################################################			
			
			/**
			 * 初始化按钮
			 * @returns
			 */
			initPriceRegionSelect:function(o){
				  //o全部数据 ，或者绑定点击再请求
				  pageDataMap.put("regionList", o);
				  console.info("开始渲染省份...");
				  var provinceHtml='<option id="provinceDefault">请选择省</option>';
				  var temp=o.result;
                  for(var i=0;i<temp.length;i++){
                	  if(temp[i].pid==-1){
                		  provinceHtml+='<option id="province'+temp[i].id+'">'+temp[i].name+'</option>';  
                	  }
                  }
                  $("#province").html(provinceHtml);
				  console.info("渲染省份完毕！");
				  console.info("开始绑定下拉框事件...");
				  $('#province').change(function(){
					  sessionStorage._CURRENT_PROVINCE_NAME_=$('#province').val();
                	  var selectedId=$("#province option:selected").attr("id").replace(/province/, "");
					  $("#pid").val((selectedId=='Default')?"":parseInt(selectedId));
					  $("#id").val("");
					  kkvoo.core.drawingRegionCity(selectedId);
					  console.info("加载市完毕！");
					  });
				  $('#city').change(function(){
                	  var selectedId=$("#city option:selected").attr("id").replace(/city/, "");
					  $("#id").val((selectedId=='Default')?"":parseInt(selectedId));
					  });
				  console.info("绑定下拉框事件完毕！");
				  console.info("开始渲染某个被选中...");
				  $("#province").find('option[id="province'+$("#pid")[0].value+'"]').attr("selected",true);
				  if($("#pid")[0].value){
					  var selectedId=parseInt($("#pid")[0].value);
					  kkvoo.core.drawingRegionCity(selectedId);
					  $("#city").find('option[id="city'+$("#id")[0].value+'"]').attr("selected",true);
				  }
				  console.info("渲染selected完毕！");
			},
			
			   initUserSelect: function (o,first,needFirst){
				      var userHtml='';
				      if(needFirst){
						  userHtml='<option id="userDefault">'+((first)?first:"请选择用户")+'</option>';
				      }
				      else{
				    	  if(!$("#userId").val()){
		                	  $("#userId").val(o[0].id);
		                  }
				      }
				      
	                  for(var i=0;i<o.length;i++){
	                	  userHtml+='<option id="user'+o[i].id+'">'+o[i].nickName+'</option>';  
	                  }
	                  $("#userSelect").html(userHtml);
	                 
					  console.info("渲染用户下拉完毕！");
					  console.info("开始绑定用户下拉框事件...");
					  $('#userSelect').change(function(){
	                	var selectedId=$("#userSelect option:selected").attr("id").replace(/user/, "");
	                	selectedId=(selectedId=='Default')?"":parseInt(selectedId);
					    $("#userId").val(selectedId);
					   });
					  
					  console.info("开始渲染某个被选中...");
					  $("#userSelect").find('option[id="user'+$("#userId")[0].value+'"]').attr("selected",true);
					  console.info("渲染user selected完毕！");
			   },
			
		   initRoleSelect: function (o,ajax,first,needFirst){
			      var roleHtml='';
			      if(needFirst){
					  roleHtml='<option id="roleDefault">'+((first)?first:"请选择角色")+'</option>';
			      }
                  for(var i=0;i<o.length;i++){
                	  roleHtml+='<option id="role'+o[i].id+'">'+o[i].name+'</option>';  
                  }
                  $("#roleSelect").html(roleHtml);
                  if(!$("#roleId").val()){
                	  $("#roleId").val(o[0].id);
                  }
                  
				  console.info("渲染角色下拉完毕！");
				  console.info("开始绑定角色下拉框事件...");
				  $('#roleSelect').change(function(){
                	var selectedId=$("#roleSelect option:selected").attr("id").replace(/role/, "");
                	selectedId=(selectedId=='Default')?"":parseInt(selectedId);
				    $("#roleId").val(selectedId);
				    $("input[name='rscheckbox']").attr("checked",false);//取消树选中
				    
                	if(ajax){
                	/**
                	 * ajax方式带出TreeChecked
                	 */	
                    console.info("Ajax模式");	
                    kkvoo.service.getRoleResourcesByRoleId(selectedId)
                	}
				   });
				  console.info("开始渲染某个被选中...");
				  $("#roleSelect").find('option[id="role'+$("#roleId")[0].value+'"]').attr("selected",true);
				  console.info("渲染role selected完毕！");
		   },
		   
		   initTreeChecked:function (o){
			     if(o){
				  for(var i=0;i<o.length;i++){
				        eval('document.all.s_'+o[i].resourceId).checked = true;
                   }
				  }
		   },
		   
		   initTree:function(o,rscheckbox){
				 var treeHtml= '<script>var rstree = new dTree("rstree","'+rscheckbox+'");'+
				               'rstree.config.onLoadClick = false;'+
				               'rstree.config.useLines = false;'+
				               'rstree.config.useSelection = false;'+
				               'rstree.config.folderLinks = false;'+
				               'rstree.add(0,-1,"菜单资源树","","rs", "","","",true,false);';
			  if(o){
				pageDataMap.put("resourceList",o);
              for(var i=0;i<o.length;i++){
            	if(o[i].resourceType=='menu'){
                  	treeHtml+='rstree.add('+o[i].id+','+o[i].pid+',"【目录】'+o[i].name+'","","rs","","","",true,true);';  
            	}
            	else if(o[i].resourceType=='action'){
                  	treeHtml+='rstree.add('+o[i].id+','+o[i].pid+',"【动作】'+o[i].name+'","","rs","","","",true,true);';  
            	}
              }
			  }
			  treeHtml+='document.write(rstree);</script>';
              $("#treeDiv").html(treeHtml);
			},
			
			/**
			 * 
			 * @param ElementsName
			 * @returns
			 */
			getTreeCheckedIds:function(ElementsName){
				var o=$('input[name^="'+ElementsName+'"]');
              var checkedList=[];
              if(o)
          	{
          	   for(var i = 0 ; i < o.length ; i++) {
          	   if(o[i].checked){
          		 var id = (o[i].id).substr(2, (o[i].id).length); 
          		 checkedList.push(id);
          	   } 
          	  }
          	}
				return  checkedList;
			},
		   
		   /**
			 * 
			 * @returns
			 */
			    getRoleResourcesByRoleId:function(o){
				var url=kkvoo.base.getRootPath()+"/admin/sys/role-resource/getRoleResourcesByRoleId";
                var data={roleId:o};
				var success=function(o){
					console.info("Ajax success:"+o.flag);
					if(o.flag){
					//选中	
					kkvoo.service.initTreeChecked(o.data);
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
			},
		   
			
			
			/**
			 * 
			 * @returns
			 */
			doSaveRoleResource:function(){
				var url=kkvoo.base.getRootPath()+"/admin/sys/role-resource/doSaveAction";
                var data=JSONString({roleId:$("#roleId").val(),resourceIds:kkvoo.service.getTreeCheckedIds('rscheckbox')});
				var success=function(o){
					console.info("Ajax success:"+JSONString(o));
					kkvoo.base.MyAlert(o.msg,null,false);
//					if(o.flag){
//						pageDataMap.clear();
//						window.location.reload();
//					}
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
			},
			
			/**
			 * 背景轮播初始化
			 * @returns
			 */
			initBackstretch:function(){
				 var hostURL=kkvoo.base.getRootPath();
				 $.backstretch([hostURL+"/img/login/bg/5.jpg",
				                hostURL+"/img/login/bg/6.jpg",
				                hostURL+"/img/login/bg/2.jpg"
				                   ],{
				        fade:1000,
				        duration:3000
				    });
			},
			loginOut:function(){
				 kkvoo.core.clearCurrentNodeInfo();
				 var hostURL=kkvoo.base.getRootPath();
				 window.location =hostURL+"/logout";
			},
			
			/**
			 * 初始化welcomeInterface界面报表控件数据
			 * @returns
			 */
			InitWelcomeInterface:function(o){
				kkvooReady(function() {
				var downApp=o.downApp;
				var newOrders=o.newOrders;
				var finishedOrders=o.finishedOrders;
				var demanderCompany=o.demanderCompany;
				var supplierCompany=o.supplierCompany;
				var supplierSingle=o.supplierSingle;
				
				$("#newOrders").html(kkvoo.service.getHtmlSparkline_bar(newOrders,'订单新建量'));
				$("#demanderCompany").html(kkvoo.service.getHtmlSparkline_bar(demanderCompany,'客户(公司)'));
				$("#supplierCompany").html(kkvoo.service.getHtmlSparkline_bar(supplierCompany,'提供方(公司)'));
				$("#supplierSingle").html(kkvoo.service.getHtmlSparkline_bar(supplierSingle,'提供方(个人)'));
				
				$(".sparkline_line_good span").sparkline("html", {
					type: "line",
					fillColor: "#B1FFA9",
					lineColor: "#459D1C",
					width: "50",
					height: "24"
				});
				$(".sparkline_line_bad span").sparkline("html", {
					type: "line",
					fillColor: "#FFC4C7",
					lineColor: "#BA1E20",
					width: "50",
					height: "24"
				});	
				$(".sparkline_line_neutral span").sparkline("html", {
					type: "line",
					fillColor: "#CCCCCC",
					lineColor: "#757575",
					width: "50",
					height: "24"
				});
				
				$(".sparkline_bar_good span").sparkline('html',{
					type: "bar",
					barColor: "#459D1C",
					barWidth: "5",
					height: "24"
				});
				$(".sparkline_bar_bad span").sparkline('html',{
					type: "bar",
					barColor: "#BA1E20",
					barWidth: "5",
					height: "24"
				});	
				$(".sparkline_bar_neutral span").sparkline('html',{
					type: "bar",
					barColor: "#757575",
					barWidth: "5",
					height: "24"
				});

				// === jQeury Gritter, a growl-like notifications === //
				$.gritter.add({
					title:	'系统消息',
					text:	'您有9条消息',
					image: 	'img/demo/envelope.png',
					sticky: false
				});	
			    
			    // === Popovers === //
			    var placement = 'bottom';
			    var trigger = 'hover';
			    var html = true;

			    //App下载量
			    $('#downApp').popover({
			       placement: placement,
			       content: '<span class="content-big">36094</span> <span class="content-small">总下载量</span><br />'+
			                '<span class="content-big">10987</span> <span class="content-small">总IOS下载量</span><br />'+
			                '<span class="content-big">20387</span> <span class="content-small">总安卓下载量</span><br />'+
			                '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
			                '<span class="content-big">220</span> <span class="content-small">今日下载</span><br />'+
			                '<span class="content-big">200</span> <span class="content-small">昨日下载</span><br />'+
			                '<span class="content-big">2677</span> <span class="content-small">本月下载</span><br />'+
			                '<span class="content-big">3277</span> <span class="content-small">上月下载</span>',
			       trigger: trigger,
			       html: html   
			    });
			    
			    //新建订单量
			    $('#newOrders').popover({
				       placement: placement,
				       content: '<span class="content-big">'+newOrders.mapData.total+'</span> <span class="content-small">总计新建</span><br />'+
				    	        '<span class="content-big">'+newOrders.mapData.today+'</span> <span class="content-small">今日新建</span><br />'+
				    	        '<span class="content-big">'+newOrders.mapData.yesterday+'</span> <span class="content-small">昨日新建</span><br />'+
				                '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
				    	        '<span class="content-big">'+newOrders.mapData.currentMonth+'</span> <span class="content-small">本月新建</span><br />'+
				    	        '<span class="content-big">'+newOrders.mapData.lastMonth+'</span> <span class="content-small">上月新建</span>',
				       trigger: trigger,
				       html: html   
				    });
			    //完成量
			    $('#finishedOrders').popover({
				       placement: placement,
				       content: '<span class="content-big">39</span> <span class="content-small">总完成</span><br />'+
				                '<span class="content-big">2</span> <span class="content-small">今日完成</span><br />'+
				                '<span class="content-big">18</span> <span class="content-small">昨日完成</span><br />'+
				                '<span class="content-big">25</span> <span class="content-small">本月完成</span>',
				       trigger: trigger,
				       html: html   
				    });
			    //客户公司
			    $('#demanderCompany').popover({
			       placement: placement,
			       content: '<span class="content-big">'+demanderCompany.mapData.total+'</span> <span class="content-small">总计公司客户</span><br />'+
			                '<span class="content-big">'+demanderCompany.mapData.today+'</span> <span class="content-small">今天新注册</span><br />'+
			                '<span class="content-big">'+demanderCompany.mapData.yesterday+'</span> <span class="content-small">昨日新注册</span><br />'+
			                '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
			                '<span class="content-big">'+demanderCompany.mapData.currentMonth+'</span> <span class="content-small">本月新注册</span><br />'+
			    	        '<span class="content-big">'+demanderCompany.mapData.lastMonth+'</span> <span class="content-small">上月新建</span>',
			       trigger: trigger,
			       html: html   
			    });
			    //提供方公司
			    $('#supplierCompany').popover({
			       placement: placement,
			       content: '<span class="content-big">'+supplierCompany.mapData.total+'</span> <span class="content-small">总计公司提供方</span><br />'+
			                '<span class="content-big">'+supplierCompany.mapData.today+'</span> <span class="content-small">今天新注册</span><br />'+
			                '<span class="content-big">'+supplierCompany.mapData.yesterday+'</span> <span class="content-small">昨日新注册</span><br />'+
			                '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
			                '<span class="content-big">'+supplierCompany.mapData.currentMonth+'</span> <span class="content-small">本月新注册</span><br />'+
			    	        '<span class="content-big">'+supplierCompany.mapData.lastMonth+'</span> <span class="content-small">上月新建</span>',
			       trigger: trigger,
			       html: html   
			    });
			    //提供方个人
			    $('#supplierSingle').popover({
			       placement: placement,
			       content: '<span class="content-big">'+supplierSingle.mapData.total+'</span> <span class="content-small">总计个人提供方</span><br />'+
	                        '<span class="content-big">'+supplierSingle.mapData.today+'</span> <span class="content-small">今天新注册</span><br />'+
			                '<span class="content-big">'+supplierSingle.mapData.yesterday+'</span> <span class="content-small">昨日新注册</span><br />'+
			                '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
			                '<span class="content-big">'+supplierSingle.mapData.currentMonth+'</span> <span class="content-small">本月新注册</span><br />'+
			    	        '<span class="content-big">'+supplierSingle.mapData.lastMonth+'</span> <span class="content-small">上月新建</span>',
			       trigger: trigger,
			       html: html   
			    });

			    $('#bootbox-confirm').click(function(e){
			    	e.preventDefault();
			    	bootbox.confirm("Are you sure?", function(result) {
			    		var msg = '';
			    		if(result == true) {
			    			msg = 'Yea! You confirmed this.';
			    		} else {
			    			msg = 'Not confirmed. Don\'t worry.';
			    		}
						bootbox.dialog({
							message: msg,
							title: 'Result',
							buttons: {
								main: {
									label: 'Ok',
									className: 'btn-default'
								}
							}
						});
					}); 
			    });
			    $('#bootbox-prompt').click(function(e){
			    	e.preventDefault();
			    	bootbox.prompt("What is your name?", function(result) {
						if (result !== null && result !== '') {
							bootbox.dialog({
								message: 'Hi '+result+'!',
								title: 'Welcome',
								buttons: {
									main: {
										label: 'Close',
										className: 'btn-danger'
									}
								}
							});
						}
					});
			    });
			    $('#bootbox-alert').click(function(e){
			    	e.preventDefault();
			    	bootbox.alert('Hello World!');
			    });
				});
			},
			
			getHtmlSparkline_bar:function(o,title){
			 var rate=kkvoo.service.getRate(o);
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
                	return (today-yesterday)/yesterday*100;
                }
				},
				
			initWeightSlider:function(o){
				kkvooReady(function() {
				$( "#weightSlider" ).slider({
				    range: "min",
				    min: 0,
				    max: 10,
				    value: (o?o:5),
				    slide: function (event, ui) {
				        $("#weight").val(ui.value);
				        $("#weightLabel").html(ui.value);
				    }
			        /*,
				    formatter: function(value) {
						return '当前值:' + value;
					}*/
			    });
				$("#weight").val($("#weightSlider").slider("value"));
				$("#weightLabel").html($("#weightSlider").slider("value"));
			    }); 
			},
				goodsStatus2zhCN:function(code){
					document.write(kkvoo.service.goodsStatus2zhCNJs(code));
				},
				goodsStatus2zhCNJs:function(code){
					var zhCN=code;
					var o=kkvoo.service.baseData.goodsStatus;
					test:
					for(var i=0;i<o.length;i++){
						if(code==o[i].code) {zhCN=o[i].name; break test;} 
					}
					return ((zhCN)?zhCN:'');
				},
				goodsType2zhCN:function(code){
					document.write(kkvoo.service.goodsType2zhCNJs(code));
				},
				goodsType2zhCNJs:function(code){
					var zhCN=code;
					var o=kkvoo.service.baseData.goodsType;
					test:
					for(var i=0;i<o.length;i++){
						if(code==o[i].code) {zhCN=o[i].name; break test;} 
					}
					return ((zhCN)?zhCN:'');
				}
				
		}
	} catch(e) {
		console.error(e.message);
		throw new Error(e);
	}
}();

/**
 * 基础静态数据
 */
kkvoo.service.noRightTitle="<title>管理系统_错误提示信息_无权限</title>";
kkvoo.service.hasOutLogin="<title>登录页</title>";
kkvoo.service.noRightMsg="您没有权限这么做！请联系管理员！";
kkvoo.service.hasOutMsg="您没有已经退出登录，请重新登录！";

kkvoo.service.baseData={
		goodsStatus:[  {code:"0",name:" 正常中"},
		               {code:"1",name:" 已删除"},
		               {code:"2",name:" 初始化"}
		           ],
        goodsType:[ {code:"1",name:" 手机"},
	               {code:"2",name:" 平板"},
	               {code:"3",name:" 电脑"},
	               {code:"4",name:" 数码相机"},
	               {code:"5",name:" 家用电器"}
	           ],           
};
