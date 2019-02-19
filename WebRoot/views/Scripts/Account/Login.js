$(function () {
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) { // enter 键

            $("#Login").click();
        }
    }

//    var codehash;
//    getImage();
//    function getImage() {
//        $.post("/api/Account/ValidateCode", function (json) {
//            $(".yanzhengtu").attr("src", json.fileurl);
//            codehash = json.codehash;
//        })
//    }
   
    $("#Login").click(function () {
        if ($("#username").val() == "") {
            $("#tishi").html("请输入账号");
        } else if ($("#password").val() == "") {
            $("#tishi").html("请输入密码");
        } 
//        else if ($("#code").val() == "") {
//            $("#tishi").html("请输入验证码！");
//        } 
        else {
            var data = {
            		userName: $("#username").val(),
            		userPwd: $("#password").val(),
//                ValiCode: $("#code").val(),
//                codehash: codehash,
//                source: 1
            };

            $("#Login").val("登录中..").css({ "color": "#cccccc" }).attr("disabled", "disabled");
            $.ajax({
                type: "POST",
                url: el+"/toLogin.action",
                data: data,
                contentType: 'application/x-www-form-urlencoded',
                success: function (res) {
                	var json=JSON.parse(res)
                    if (json.code == 1) {

                        //检测

                        location.href = el+"/views/view/Home/index.html";
                    } else if(json.code == 0) {
                        //var i = Math.random();
                        //var url = "/Index/ValiCode?t=" + i;
                        //$(".yanzhengtu").attr("src", url);
//                        getImage();
//                        $("#tishi").html(json.data);
                    	alert("登录失败！")
                        $("#Login").val("登　录").css({ "color": "#ffffff" }).removeAttr("disabled");
                    }else if(json.code == 2){
                    	alert("请输入账号密码！");
                    	$("#Login").val("登　录").css({ "color": "#ffffff" }).removeAttr("disabled");
                    }else if(json.code == 3){
                    	alert("账号被封！");
                    	$("#Login").val("登　录").css({ "color": "#ffffff" }).removeAttr("disabled");
                    }
                }
            });

            //$.post("/api/account/Login", data, function (json) {
            //    if (json.code == 1) {
            //        location.href = "/#/";
            //    } else {
            //        var i = Math.random();
            //        var url = "/Index/ValiCode?t=" + i;
            //        $(".yanzhengtu").attr("src", url);
            //        $("#tishi").html(json.data);
            //        $("#Login").val("登　录").css({ "color": "#ffffff" }).removeAttr("disabled");
            //    }
            //})
        }
    })
    // 切换图片
//    $(".yanzhengtu").on("click", function () {
//        getImage();
//    });

    $("input").focus(function () {
        $("#tishi").html("");
    });

    function tip(discription) {
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }],
            discription: discription,
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        });
    }
});

var el=getRootPath();
function getRootPath(){
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}