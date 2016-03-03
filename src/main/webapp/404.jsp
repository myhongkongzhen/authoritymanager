<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~ Copyright (c) 2016. Lorem ipsum dolor sit amet, consectetur adipiscing elit.                                     ~
  ~ Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.                      ~
  ~ Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.                                                 ~
  ~ Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.                   ~
  ~ Vestibulum commodo. Ut rhoncus gravida arcu.                                                                     ~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--%>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>404</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link href="<%=basePath%>/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="<%=basePath%>/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
    <link href="<%=basePath%>/css/font-awesome.css" rel="stylesheet">
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600" rel="stylesheet">
    <link href="<%=basePath%>/css/base-admin.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
            <a class="brand" href="<%=basePath%>/">
                <img src="<%=basePath%>/img/logo.png"/>
            </a>
            <!--
			<div class="nav-collapse">
				<ul class="nav pull-right">
					<li class="">
						<a href="<%=basePath%>/" class="">
							<i class="icon-chevron-left"></i>
							Back to Dashboard
						</a>
					</li>
				</ul>
			</div>
            -->
        </div>
    </div>
</div>
<div class="container">
    <div class="row">
        <div class="span12">
            <div class="error-container">
                <h1>Oops!</h1>
                <h2>404 Not Found</h2>
                <div class="error-details">
                    你懂的.
                </div>
                <div class="error-actions">
                    <a href="<%=basePath%>/welcome" class="btn btn-large btn-primary">
                        <i class="icon-chevron-left"></i>
                        &nbsp;
                        回到首页
                    </a>
                    <!--
					<a href="<%=basePath%>/" class="btn btn-large">
						<i class="icon-envelope"></i>
						&nbsp;
						Contact Support
					</a>
                    -->
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
