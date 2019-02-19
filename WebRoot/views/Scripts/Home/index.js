$(function () {

    //$("#DataService").hide();
    //$("#API_Database").hide();

    //配置左边按钮
    $("#SignOut").click(function () {
        location.href = "/Index/Exit";
    });
	var fadeDelay=300;
	$("#IndexTop-img").click(function(){
		$(".IndexLeftRight").hide();
		$(".IndexLeft-p").css({"background":"transparent"});
		fadeDelay=300;
		$("#IndexTop-title").html("");
	});
	$("#AuthService").click(function(){
		$(".IndexLeftRight").hide();
		$(".IndexLeft-p").css({"background":"transparent"});
		$("#AuthService-ul").fadeIn(fadeDelay);
		$("#AuthService").css({"background":"#000000"});
		fadeDelay=0;
		$(".details-a").css({"background":"#ffffff"});
		$(".details-a-first").css({"background":"#e4e9ec"});
		$("#IndexTop-title").html($(this).find("span").html());
		$(".details").css({ "overflow": "hidden" });
	});
	$("#DataService").click(function () {
		$(".IndexLeftRight").hide();
		$(".IndexLeft-p").css({"background":"transparent"});
		//$("#DataService-ul").fadeIn(fadeDelay);
		$("#DataService").css({"background":"#000000"});
		fadeDelay=0;
		$(".details-a").css({"background":"#ffffff"});
		$(".details-a-first").css({"background":"#e4e9ec"});
		$("#IndexTop-title").html($(this).find("span").html());
		$(".details").css({ "overflow": "hidden" });
	});
	$("#API_Database").click(function () {
		$(".IndexLeftRight").hide();
		$(".IndexLeft-p").css({"background":"transparent"});
		$("#API_Database-ul").hide();
		$("#API_Database").css({"background":"#000000"});
		fadeDelay=0;
		$(".details-a").css({"background":"#ffffff"});
		$(".details-a-first").css({"background":"#e4e9ec"});
		$("#IndexTop-title").html($(this).find("span").html());
		$(".details").css({ "overflow": "hidden" });
	});
	$("#MarketCenter-Left").click(function () {
	    $(".IndexLeftRight").hide();
	    $("#MarketCenter-ul").fadeIn(fadeDelay);
	    $("#MarketCenter-ul").css({ "display": "block" });
	    $(".IndexLeft-p").css({ "background": "transparent" });
	    $(this).css({ "background": "#000" });
	    $(".details").css({ "overflow": "visible" });
	    $(".details-a").css({ "background": "#ffffff" });
	    $(".details-a-first").css({ "background": "#e4e9ec" });
	    $("#MarketCenter").css({ "background": "#e4e9ec" });
	});
	$("#PersonalCenter-Top").click(function () {
	    $(".IndexLeftRight").hide();
	    $("#PersonalCenter-ul").fadeIn(fadeDelay);
	    fadeDelay = 0;
	    $(".IndexLeft-p").css({ "background": "transparent" });
	    $(".details").css({ "overflow": "visible" });
	    $(".details-a").css({ "background": "#ffffff" });
	    $(".details-a-first").css({ "background": "#e4e9ec" });
	    $("#PersonalCenter").css({ "background": "#e4e9ec" });
	});
	$("#userCenter").click(function () {
	    $(".IndexLeftRight").hide();
	    $("#PersonalCenter-ul").fadeIn(fadeDelay);
	    fadeDelay = 0;
	    $(".IndexLeft-p").css({ "background": "transparent" });
	    $(this).css({ "background": "#000" });
	    $(".details").css({ "overflow": "visible" });
	    $(".details-a").css({ "background": "#ffffff" });
	    $(".details-a-first").css({ "background": "#e4e9ec" });
	    $("#PersonalCenter").css({ "background": "#e4e9ec" });
	    setTimeout(function () {
	        $("#PersonalCenter").click();
	    },600);
	});
	$("#SafetySetting-Top").click(function () {
	    $(".IndexLeftRight").hide();
	    $("#PersonalCenter-ul").fadeIn(fadeDelay);
	    fadeDelay = 0;
	    $(".IndexLeft-p").css({ "background": "transparent" });
	    $(".details").css({ "overflow": "visible" });
	    $(".details-a").css({ "background": "#ffffff" });
	    $(".details-a-first").css({ "background": "#e4e9ec" });
	    $("#SafetySetting").css({ "background": "#e4e9ec" });
	});
	$("#PromotoRebate").click(function () {
	    $(".IndexLeftRight").hide();
	    fadeDelay = 0;
	    $(".IndexLeft-p").css({ "background": "transparent" });
	    $(this).css({ "background": "#000" });
	    $(".details").css({ "overflow": "visible" });
	    $(".details-a").css({ "background": "#ffffff" });
	    $(".details-a-first").css({ "background": "#e4e9ec" });
	});
	$("#yunkong").click(function () {
	    $(".IndexLeftRight").hide();
	    fadeDelay = 0;
	    $(".IndexLeft-p").css({ "background": "transparent" });
	    $(this).css({ "background": "#000" });
	    $(".details").css({ "overflow": "visible" });
	    $(".details-a").css({ "background": "#ffffff" });
	    $(".details-a-first").css({ "background": "#e4e9ec" });
	});
	$("#datacenter").click(function () {
	    $(".IndexLeftRight").hide();
	    fadeDelay = 0;
	    $(".IndexLeft-p").css({ "background": "transparent" });
	    $(this).css({ "background": "#000" });
	    $(".details").css({ "overflow": "visible" });
	    $(".details-a").css({ "background": "#ffffff" });
	    $(".details-a-first").css({ "background": "#e4e9ec" });
	});
	$("#loglists").click(function () {
	    $(".IndexLeftRight").hide();
	    fadeDelay = 0;
	    $(".IndexLeft-p").css({ "background": "transparent" });
	    $(this).css({ "background": "#000" });
	    $(".details").css({ "overflow": "visible" });
	    $(".details-a").css({ "background": "#ffffff" });
	    $(".details-a-first").css({ "background": "#e4e9ec" });
	});
	$("#UserLoginVerify").click(function () {
	    $(".IndexLeftRight").hide();
	    $(".IndexLeft-p").css({ "background": "transparent" });
	    $("#UserLoginVerify-ul").fadeIn(fadeDelay);
	    $("#UserLoginVerify").css({ "background": "#000000" });
	    fadeDelay = 0;
	    $(".details-a").css({ "background": "#ffffff" });
	    $(".details-a-first").css({ "background": "#e4e9ec" });
	    $("#IndexTop-title").html($(this).find("span").html());
	    $(".details").css({ "overflow": "hidden" });
	    setTimeout(function () {
	        $("#UserLoginVerify-ul .title-first .details-a-first").click();
	    }, 100);
	});

	
	$(".click-title").click(function(){	
		if($(this).next(".details").height()==0){
			var x=$(this).next(".details").children().length*30+"px";
		    $(this).next(".details").animate({height:x},250);
		    $(this).find(".sanjiao").removeClass("rotate1"); 
            $(this).find(".sanjiao").addClass("rotate");
		} else {
		    $(this).next(".details").css("overflow","hidden")
		    $(this).next(".details").animate({ height: 0 }, 250);
		    $(this).find(".sanjiao").removeClass("rotate");
            $(this).find(".sanjiao").addClass("rotate1");
		}	
	});
	$(".details-a").click(function () {
	    $(".details-a").css({ "background": "#ffffff" });
	    $(this).css({ "background": "#e4e9ec" });
	});
	$("#IndexTop-account").hover(function () {
	    $("#Account-hover").show();
	    //$(".tuiguang-details img").css({"z-index":1});
	}, function () {
	    $("#Account-hover").hide();
	});

    //验证服务域名刷新后不变的导航条
    //配置刷新后处于哪个导航
	var str = window.location.href;
	var _href = str;
	//console.log(_href);
	if(str.indexOf("#")<=0){
	    return;
	}
	if (str.indexOf("?") > 0) {
	    str = str.match(/#\/(\S*)\?/)[1];
	    var v_type = _href.match(/#\/(\S*)/)[0];
	    console.log(v_type);
	    $(".details-a").css({ "background": "#ffffff" });
	    $(".IndexLeftRight").hide();
	    $(".IndexLeft-p").css({ "background": "transparent" });
        $("#AuthService-ul").fadeIn(0);
        $("#AuthService").css({ "background": "#000000" });
        $("#IndexTop-title").html($(this).find("span").html());
        if (str == "ProjectDetails" || str == "CreateProject") {
            $("#Project").css({ "background": "#e4e9ec" });
            if (v_type.indexOf("type=1") > 0) {
                $("#UserLoginVerify-ul").show();
                $("#UserLoginVerify").css({ "background": "#000000" });
                $("#AuthService").css({ "background": "transparent" });
                $("#ProjectVerify").parent().prev().click();
            } else {
                $("#Project").parent().prev().click();
            }
        } else if (str == "Project") {  //验证新加
            $("#UserLoginVerify-ul").show();
            $("#UserLoginVerify").css({ "background": "#000000" });
            $("#ProjectVerfiy").css({ "background": "#e4e9ec" });
            $("#AuthService").css({ "background": "transparent" });
            $("#ProjectVerfiy").parent().prev().click();
            $(".details").css({ "overflow": "hidden" });
        } else if (str == "DeviceDetail") {
            $("#Device").css({ "background": "#e4e9ec" });
            $("#Device").parent().prev().click();
        } else if (str == "AuthCode") {
            $("#AuthService-ul").show();
            $("#AuthCode").css({ "background": "#e4e9ec" });
            if (v_type.indexOf("type=1")>0) {
                $("#UserLoginVerify-ul").show();
                $("#UserLoginVerify").css({ "background": "#000000" });
                $("#AuthService").css({ "background": "transparent" });
                $("#AuthCodeVerify").parent().prev().click();
                setTimeout(function () {
                    $("#UserLoginVerify-ul .details").eq(0).find(".details-a").eq(1).css({ "background": "#e4e9ec" });
                }, 300);
            } else {
                $("#AuthCode").parent().prev().click();
            }
            $(".details").css({ "overflow": "hidden" });
        } else if (str == "ProjectLog") {
            $("#AuthService-ul").show();
            $("#ProjectLog").css({ "background": "#e4e9ec" });
            if (v_type.indexOf("type=1") > 0) {
                $("#UserLoginVerify-ul").show();
                $("#UserLoginVerify").css({ "background": "#000000" });
                $("#AuthService").css({ "background": "transparent" });
                $("#ProjectLogVerify").parent().prev().click();
                setTimeout(function () {
                    $("#UserLoginVerify-ul .details").eq(0).find(".details-a").eq(3).css({ "background": "#e4e9ec" });
                }, 300);
            } else {
                $("#AuthCode").parent().prev().click();
            }
            $(".details").css({ "overflow": "hidden" });
        } else if (str == "CloudService") {
            $("#DataService").click();
        } else if (str == "CreateUITable") {
            $("#DataService").click();
            window.location.href = _href;
        } else if (str == "CreateDataTable") {
            $("#DataService").click();
            window.location.href = _href;
        } else if (str == "CreateDeveloperApi") {
            $("#DataService").click();
            window.location.href = _href;
        } else if (str == "Device_verify") {
            $("#UserLoginVerify-ul").show();
            $("#UserLoginVerify").css({ "background": "#000000" });
            $("#AuthService").css({ "background": "transparent" });
            $("#DeviceVerify").parent().prev().click();
            setTimeout(function () {
                $("#UserLoginVerify-ul .details").eq(0).find(".details-a").eq(2).css({ "background": "#e4e9ec" });
            }, 300);
        } else {
            $("#" + str).css({ "background": "#e4e9ec" });
            $("#" + str).parent().prev().click();
        }
	} else {
	    str = str.match(/#\/(\S*)/)[1];
	    if (str != "") {
	        $(".details-a").css({ "background": "#ffffff" });
	        $(".IndexLeftRight").hide();
	        $(".IndexLeft-p").css({ "background": "transparent" });
	        //$("#PersonalCenter-ul").fadeIn(fadeDelay);
	        $("#AuthService").css({ "background": "#000000" });
	        $("#IndexTop-title").html($(this).find("span").html());
	        if (str == "ProjectDetails" || str == "CreateProject") {
	            $("#Project").css({ "background": "#e4e9ec" });
	            if (v_type.indexOf("type=1") > 0) {
	                $("#UserLoginVerify-ul").show();
	                $("#UserLoginVerify").css({ "background": "#000000" });
	                $("#AuthService").css({ "background": "transparent" });
	                $("#ProjectVerify").parent().prev().click();
	            } else {
	                $("#Project").parent().prev().click();
	            }
	        } else if (str == "ServiceOverview") {
	            $("#AuthService-ul").show();
	            $(".details").css({"overflow":"hidden"});
	        } else if (str == "Project") {
	            $("#AuthService-ul").show();
	            $("#Project").css({ "background": "#e4e9ec" });
	            $("#Project").parent().prev().click();
	            $(".details").css({ "overflow": "hidden" });
	        } else if (str == "AuthCode") {
	            $("#AuthService-ul").show();
	            $("#AuthCode").css({ "background": "#e4e9ec" });
	            $("#AuthCode").parent().prev().click();
	            $(".details").css({ "overflow": "hidden" });
	        } else if (str == "Device") {
	            $("#AuthService-ul").show();
	            $("#Device").css({ "background": "#e4e9ec" });
	            $("#Device").parent().prev().click();
	            $(".details").css({ "overflow": "hidden" });
	        } else if (str == "ProjectLog") {
	            $("#AuthService-ul").show();
	            $("#ProjectLog").css({ "background": "#e4e9ec" });
	            $("#ProjectLog").parent().prev().click();
	            $(".details").css({ "overflow": "hidden" });
	        } else if (str == "WhiteAndBlackList") {
	            $("#AuthService-ul").show();
	            $("#WhiteAndBlackList").css({ "background": "#e4e9ec" });
	            $("#WhiteAndBlackList").parent().prev().click();
	            $(".details").css({ "overflow": "hidden" });
	        }else if (str == "DeviceDetail") {
	            $("#Device").css({ "background": "#e4e9ec" });
	            $("#Device").parent().prev().click();
	        } else if (str == "PersonalCenter") {
	            $("#AuthService-ul").hide();
	            $("#PersonalCenter-ul").show();
	            $(".IndexLeft-p").css({ "background": "transparent" });
	            $("#PersonalCenter").css({ "background": "#e4e9ec" });

	            $(".IndexLeftRight .details").css({ "height": "auto" });
	            $("#PersonalCenter").parent().prev().click();
	        } else if (str == "BindAccount") {
	            $("#AuthService-ul").hide();
	            $("#PersonalCenter-ul").show();
	            $(".IndexLeft-p").css({ "background": "transparent" });
	            $("#BindAccount").css({ "background": "#e4e9ec" });

	            $(".IndexLeftRight .details").css({ "height": "auto" });
	            $("#BindAccount").parent().prev().click();
	        } else if (str == "SafetySetting") {
	            $("#AuthService-ul").hide();
	            $("#PersonalCenter-ul").show();
	            $(".IndexLeft-p").css({ "background": "transparent" });
	            $("#SafetySetting").css({ "background": "#e4e9ec" });

	            $(".IndexLeftRight .details").css({"height": "auto"});
	            $("#SafetySetting").parent().prev().click();
	        } else if (str == "MarketCenter") {
	            $("#MarketCenter-ul").show();
	            $(".IndexLeft-p").css({ "background": "transparent" });
	            $("#MarketCenter-Left").css({ "background": "#000000" });
	            $("#MarketCenter").css({ "background": "#e4e9ec" });
	            $("#MarketCenter").parent().prev().click();
	        } else if (str == "ProjectNeigou") {
	            $("#MarketCenter-ul").show();
	            $(".IndexLeft-p").css({ "background": "transparent" });
	            $("#MarketCenter-Left").css({ "background": "#000000" });
	            $("#ProjectNeigou").css({ "background": "#e4e9ec" });
	            $("#ProjectNeigou").parent().prev().click();
	        } else if (str == "ProjectManage") {
	            $("#MarketCenter-ul").show();
	            $(".IndexLeft-p").css({ "background": "transparent" });
	            $("#MarketCenter-Left").css({ "background": "#000000" });
	            $("#ProjectManage").css({ "background": "#e4e9ec" });
	            $("#ProjectManage").parent().prev().click();
	        } else if (str == "PromotoRebate") {
	            $(".IndexLeft-p").css({ "background": "transparent" });
	            $("#PromotoRebate").css({ "background": "#000000" });
	        } else if (str == "CloudService") {
	            $(".IndexLeft-p").css({ "background": "transparent" });
	            $("#DataService").css({ "background": "#000000" });
	        }
	        //else if (str == "Project_verify") {
	        //    $("#UserLoginVerify-ul").show();
	        //    $("#UserLoginVerify").css({ "background": "#000000" });
	        //    $("#ProjectVerfiy").css({ "background": "#e4e9ec" });
	        //    $("#AuthService").css({"background": "transparent"});
	        //    $("#ProjectVerfiy").parent().prev().click();
	        //    $(".details").css({ "overflow": "hidden" });
	        //} else if (str == "AuthCode_verify") {
	        //    $("#UserLoginVerify-ul").show();
	        //    $("#UserLoginVerify").css({ "background": "#000000" });
	        //    $("#AuthCodeVerify").css({ "background": "#e4e9ec" });
	        //    $("#AuthService").css({ "background": "transparent" });
	        //    $("#AuthCodeVerify").parent().prev().click();
	        //    $(".details").css({ "overflow": "hidden" });
	        //}
	        else if (str == "Device_verify") {
	            $("#UserLoginVerify-ul").show();
	            $("#UserLoginVerify").css({ "background": "#000000" });
	            $("#AuthService").css({ "background": "transparent" });
	            $("#DeviceVerify").parent().prev().click();
	            $(".details").css({ "overflow": "hidden" });
	            $("#DeviceVerify").css({ "background": "#e4e9ec" });
	            setTimeout(function () {
	                $("#UserLoginVerify-ul .details").eq(0).find(".details-a").eq(2).css({ "background": "#e4e9ec" });
	            }, 300);
	            //setTimeout(function () { $("#DeviceVerify").click(); }, 100);
	        } else {
	            $("#" + str).css({ "background": "#e4e9ec" });
	            $("#" + str).parent().prev().click();
	        }
	    } else {
	        return;
	    }
	}

	$("#DeviceVerify").click(function () { //解决用户列表无效
	    $(this).css({ "background": "#e4e9ec" });
	    setTimeout(function () { $("#DeviceVerify").css({ "background": "#e4e9ec" }); }, 100);
	});

	//$(".FixedPopupMask").show();
	//$("#open-mask").show();
    
});

//常用的弹框封装
function OtherPlace() {
    javascript: $('body').dialog({
        title: "提示",
        titleFontSize: "16px",
        type: 'primary',
        showBoxShadow: true,
        buttons: [{ name: '确定', className: 'danger' }],
        discription: '账号已在其他设备登录!',
        animateIn: 'fadeInRight-hastrans',
        animateOut: 'fadeOutRight-hastrans',
        duration: 0,
    }, function (ret) { if (ret.index === 0) { location.href = "/Index/Exit" }; });
}
function tip(discription, fn) {
    if (fn) {
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger reload' }],
            discription: discription,
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0
        });
    } else {
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
}
function tipReload(discription) {
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
    }, function (ret) { if (ret.index === 0) { location.reload(); }});
}
