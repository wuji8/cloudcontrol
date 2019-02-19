$(function(){
    $("#Register").click(function () {
        $("#Email").blur();
		if($("#LoginName").val()==""){
		    $(".tisi").html("请填写账号");
		}else if($("#PassWord").val()==""){
		    $(".tisi").html("请填写密码");
		}else if(!(/^[^\s]{6,16}$/.test($("#PassWord").val()))){
		    $(".tisi").html("登录密码长度为6-16个字符");
		}else if($("#Again").val()==""){
		    $(".tisi").html("请再次填写密码");
		}else if($("#PassWord").val()!=$("#Again").val()){
		    $(".tisi").html("两次输入的密码不相同，请重新输入");
		}else if($("#Email").val()==""){
		    $(".tisi").html("请输入您的邮箱");
		}else if($("#SureCode").val()==""){
		    $(".tisi").html("请输入您的验证码");
		} else if (EmailStatus == 0) {
		    $(".tisi").html("您输入的邮箱格式不正确，请重新输入");
		} else {
		    $("#Register").val("提交中..").css({ "color": "#cccccc" }).attr("disabled", "disabled");
		    $.post("/api/Account/Register", { username: $.trim($("#LoginName").val()), userpass: $.trim($("#PassWord").val()), email: $.trim($("#Email").val()), emailcode: $.trim($("#SureCode").val()), spreadcode: $.trim($("#SpreadCode").val()) }, function (json) {
		        if (json.code == 1) {
		            location.href = "/Account/RegisterSuccess";
		        } else {
		            $(".tisi").html(json.data);
		            $("#Register").val("注　册").css({ "color": "#ffffff" }).removeAttr("disabled");
		        }
		    })
		}
	})

	var EmailStatus = 0;
	$("#Email").blur(function(){
		if((/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test($("#Email").val()))){		
		    EmailStatus = 1;
		} else {
		    EmailStatus = 0;
			$(".tisi").html("您输入的邮箱格式不正确，请重新输入");
		}
	});
	

    //事先校验用户名
	$("#LoginName").blur(function () {
	    $.post("/api/Account/CheckUserName", { username: $("#LoginName").val() }, function (json) {
	        if(json.code == 1){
	            $(".tisi").html(json.data);
	        }
	    });
	});

	var flag=true;
	$("#Code").click(function () {
	    $("#Email").blur();
	    //事先校验邮箱
	    $.post("/api/Account/CheckEmailExist", { email: $("#Email").val() }, function (json) {
	        if (json.code == 1) {
	            $(".tisi").html(json.data);
	        } else {
	            if (EmailStatus == 1) {
	                if (flag) {
	                    flag = false;
	                    $(this).css({
	                        "background": "#999999"
	                    });
	                    var wait = 60;
	                    function time() {
	                        if (wait == 0) {
	                            $("#Code").css({
	                                "background": "#1D92EC"
	                            });
	                            $("#Code").val("获取验证码");
	                            wait = 60;
	                            flag = true;
	                        } else {
	                            $("#Code").val("重新发送(" + wait + ")");
	                            wait--;
	                            setTimeout(function () {
	                                time()
	                            },
                                1000)
	                        }
	                    }
	                    time();
	                    $.post("/api/Account/SendEmailCode", { email: $.trim($("#Email").val()) }, function (json) {
	                        if (json.code != 1) {
	                            $(".tisi").html(json.data);
	                        }
	                    });
	                } else {
	                    return;
	                }
	            } else {
	                return;
	            }
	        }
	    });
	        
	});

	$("input").focus(function () {
	    $(".tisi").html("");
	});
})
