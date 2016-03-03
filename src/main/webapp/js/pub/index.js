kkvooReady(function() {	
	kkvoo.core.initHeight();
});

function InitGoodsChart (o,total_count){
//	console.info(total_count);
//	console.info(JSONString(o));
	kkvooReady(function() {	
		
		 $('#container').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        title: {
		            text: '商品统计('+total_count+')个'
		        },
		        tooltip: {
		    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: '占总百分比',
		            data: o
		        }]
		    });

	});
}


function InitWelcomeInterface (o){
	/*
	 * 
kkvooReady(function() {
//	kkvoo.core.initHeight();
//var downApp=o.downApp;
var newOrders=o.newOrders;
var newUsers=o.newUsers;
var payOrders=o.payOrders;
var payMonies=o.payMonies;

//var demanderCompany=o.demanderCompany;
//var supplierCompany=o.supplierCompany;
//var supplierSingle=o.supplierSingle;

$("#newOrders").html(kkvoo.core.getHtmlSparkline_bar(newOrders,'订单量'));
$("#payOrders").html(kkvoo.core.getHtmlSparkline_bar(payOrders,'订单支付量'));
$("#payMonies").html(kkvoo.core.getHtmlSparkline_bar(payMonies,'成交金额(元)'));
$("#newUsers").html(kkvoo.core.getHtmlSparkline_bar(newUsers,'用户量'));

//$("#demanderCompany").html(kkvoo.core.getHtmlSparkline_bar(demanderCompany,'客户(公司)'));
//$("#supplierCompany").html(kkvoo.core.getHtmlSparkline_bar(supplierCompany,'提供方(公司)'));
//$("#supplierSingle").html(kkvoo.core.getHtmlSparkline_bar(supplierSingle,'提供方(个人)'));

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
//$.gritter.add({
//	title:	'系统消息',
//	text:	'您有0条消息',
//	image: 	'img/demo/envelope.png',
//	sticky: false
//});	

// === Popovers === //
var placement = 'bottom';
var trigger = 'hover';
var html = true;

//App下载量
//$('#downApp').popover({
//   placement: placement,
//   content: '<span class="content-big">36094</span> <span class="content-small">总下载量</span><br />'+
//            '<span class="content-big">10987</span> <span class="content-small">总IOS下载量</span><br />'+
//            '<span class="content-big">20387</span> <span class="content-small">总安卓下载量</span><br />'+
//            '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
//            '<span class="content-big">220</span> <span class="content-small">今日下载</span><br />'+
//            '<span class="content-big">200</span> <span class="content-small">昨日下载</span><br />'+
//            '<span class="content-big">2677</span> <span class="content-small">本月下载</span><br />'+
//            '<span class="content-big">3277</span> <span class="content-small">上月下载</span>',
//   trigger: trigger,
//   html: html   
//});

//新建订单量
$('#newOrders').popover({
       placement: placement,
       content: '<span class="content-big">'+formatNull(newOrders.mapData.total)+'</span> <span class="content-small">总计新建</span><br />'+
    	        '<span class="content-big">'+formatNull(newOrders.mapData.today)+'</span> <span class="content-small">今日新建</span><br />'+
    	        '<span class="content-big">'+formatNull(newOrders.mapData.yesterday)+'</span> <span class="content-small">昨日新建</span><br />'+
                '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
    	        '<span class="content-big">'+formatNull(newOrders.mapData.currentMonth)+'</span> <span class="content-small">本月新建</span><br />'+
    	        '<span class="content-big">'+formatNull(newOrders.mapData.lastMonth)+'</span> <span class="content-small">上月新建</span>',
       trigger: trigger,
       html: html   
    });

//newUsers
$('#newUsers').popover({
 placement: placement,
 content: '<span class="content-big">'+formatNull(newUsers.mapData.total)+'</span> <span class="content-small">总计注册量</span><br />'+
          '<span class="content-big">'+formatNull(newUsers.mapData.today)+'</span> <span class="content-small">今天新注册</span><br />'+
          '<span class="content-big">'+formatNull(newUsers.mapData.yesterday)+'</span> <span class="content-small">昨日新注册</span><br />'+
          '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
          '<span class="content-big">'+formatNull(newUsers.mapData.currentMonth)+'</span> <span class="content-small">本月新注册</span><br />'+
	        '<span class="content-big">'+formatNull(newUsers.mapData.lastMonth)+'</span> <span class="content-small">上月新注册</span>',
 trigger: trigger,
 html: html   
});

//订单支付量
$('#payOrders').popover({
	 placement: placement,
	 content: '<span class="content-big">'+formatNull(payOrders.mapData.total)+'</span> <span class="content-small">总计订单支付量</span><br />'+
	          '<span class="content-big">'+formatNull(payOrders.mapData.today)+'</span> <span class="content-small">今天新支付</span><br />'+
	          '<span class="content-big">'+formatNull(payOrders.mapData.yesterday)+'</span> <span class="content-small">昨日新支付</span><br />'+
	          '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
	          '<span class="content-big">'+formatNull(payOrders.mapData.currentMonth)+'</span> <span class="content-small">本月新支付</span><br />'+
		        '<span class="content-big">'+formatNull(payOrders.mapData.lastMonth)+'</span> <span class="content-small">上月新支付</span>',
	 trigger: trigger,
	 html: html   
	});

//订单交易额
$('#payMonies').popover({
	 placement: placement,
	 content: '<span class="content-big">'+formatNull(payMonies.mapData.total)+'元</span> <span class="content-small">总计订单支付</span><br />'+
	          '<span class="content-big">'+formatNull(payMonies.mapData.today)+'元</span> <span class="content-small">今天新支付</span><br />'+
	          '<span class="content-big">'+formatNull(payMonies.mapData.yesterday)+'元</span> <span class="content-small">昨日新支付</span><br />'+
	          '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
	          '<span class="content-big">'+formatNull(payMonies.mapData.currentMonth)+'元</span> <span class="content-small">本月新支付</span><br />'+
		        '<span class="content-big">'+formatNull(payMonies.mapData.lastMonth)+'元</span> <span class="content-small">上月新支付</span>',
	 trigger: trigger,
	 html: html   
	});


//客户公司
//$('#demanderCompany').popover({
//   placement: placement,
//   content: '<span class="content-big">'+demanderCompany.mapData.total+'</span> <span class="content-small">总计公司客户</span><br />'+
//            '<span class="content-big">'+demanderCompany.mapData.today+'</span> <span class="content-small">今天新注册</span><br />'+
//            '<span class="content-big">'+demanderCompany.mapData.yesterday+'</span> <span class="content-small">昨日新注册</span><br />'+
//            '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
//            '<span class="content-big">'+demanderCompany.mapData.currentMonth+'</span> <span class="content-small">本月新注册</span><br />'+
//	        '<span class="content-big">'+demanderCompany.mapData.lastMonth+'</span> <span class="content-small">上月新建</span>',
//   trigger: trigger,
//   html: html   
//});
//提供方公司
//$('#supplierCompany').popover({
//   placement: placement,
//   content: '<span class="content-big">'+supplierCompany.mapData.total+'</span> <span class="content-small">总计公司提供方</span><br />'+
//            '<span class="content-big">'+supplierCompany.mapData.today+'</span> <span class="content-small">今天新注册</span><br />'+
//            '<span class="content-big">'+supplierCompany.mapData.yesterday+'</span> <span class="content-small">昨日新注册</span><br />'+
//            '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
//            '<span class="content-big">'+supplierCompany.mapData.currentMonth+'</span> <span class="content-small">本月新注册</span><br />'+
//	        '<span class="content-big">'+supplierCompany.mapData.lastMonth+'</span> <span class="content-small">上月新建</span>',
//   trigger: trigger,
//   html: html   
//});
//提供方个人
//$('#supplierSingle').popover({
//   placement: placement,
//   content: '<span class="content-big">'+supplierSingle.mapData.total+'</span> <span class="content-small">总计个人提供方</span><br />'+
//            '<span class="content-big">'+supplierSingle.mapData.today+'</span> <span class="content-small">今天新注册</span><br />'+
//            '<span class="content-big">'+supplierSingle.mapData.yesterday+'</span> <span class="content-small">昨日新注册</span><br />'+
//            '<HR style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:25)" width="90%" color=#987cb9 SIZE=1>'+
//            '<span class="content-big">'+supplierSingle.mapData.currentMonth+'</span> <span class="content-small">本月新注册</span><br />'+
//	        '<span class="content-big">'+supplierSingle.mapData.lastMonth+'</span> <span class="content-small">上月新建</span>',
//   trigger: trigger,
//   html: html   
//});


//$('#bootbox-confirm').click(function(e){
//	e.preventDefault();
//	bootbox.confirm("Are you sure?", function(result) {
//		var msg = '';
//		if(result == true) {
//			msg = 'Yea! You confirmed this.';
//		} else {
//			msg = 'Not confirmed. Don\'t worry.';
//		}
//		bootbox.dialog({
//			message: msg,
//			title: 'Result',
//			buttons: {
//				main: {
//					label: 'Ok',
//					className: 'btn-default'
//				}
//			}
//		});
//	}); 
//});
//$('#bootbox-prompt').click(function(e){
//	e.preventDefault();
//	bootbox.prompt("What is your name?", function(result) {
//		if (result !== null && result !== '') {
//			bootbox.dialog({
//				message: 'Hi '+result+'!',
//				title: 'Welcome',
//				buttons: {
//					main: {
//						label: 'Close',
//						className: 'btn-danger'
//					}
//				}
//			});
//		}
//	});
//});
//$('#bootbox-alert').click(function(e){
//	e.preventDefault();
//	bootbox.alert('Hello World!');
//});
});

*
*/
}

function formatNull(o){
	if(!o){
		return 0;
	}
	else{
		return o;
	}
}

