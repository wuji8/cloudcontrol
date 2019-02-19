$(document).ready(function(){
    //简单的弹框封装

    //初始订单金额
    $("#total-money").text($(".huiyuan-service").eq(0).find("a").attr("data-price")+"元");

    //关闭
    $(".close-x").on("click", function () {
	    $(".FixedPopupMask").hide();
	    $("#open-mask").hide();
	    $(".dialogs-box").hide();
	    $(".pay").hide();
	})
	
    //选择 初始化支付数据 默认选中第一项
	var currentPrice = $(".huiyuan-item").eq(0).find("a").attr("data-price");
	var currentSid = $(".huiyuan-item").eq(0).find("a").attr("data-sid");
	var sid = currentSid, payNumber = currentPrice, t, webpay = true; 

	$(".huiyuan-service").on("click",function(event){
		var huiyuanItem;
		if(event.target.tagName == "A"){
			huiyuanItem = $(event.target);
		}else if(event.target.tagName == "LI"){
			huiyuanItem = $(event.target).children();
		}else{
			huiyuanItem = $(event.target).parent();
		}
		payNumber = $(huiyuanItem).attr("data-price");
		var huiyuanPrice = $(huiyuanItem).attr("data-price")+"元";
		sid = huiyuanItem.attr("data-sid");
		$("#total-money").text(huiyuanPrice);
		var className = $(this).attr("class");
		if(className.indexOf("active")==-1){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
		}
	})
	
	$(".huiyuan-pay").on("click",function(event){
		var className = $(this).attr("class");
		if(className.indexOf("active")==-1){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
		}
	})
	
	//开通 进行支付
	!function(){
	    $(".paySpread").on("click", "#zhifubao", function () {
	        $("#open-btn").css("background", "#539bfa");
	        webpay = true;
	    });
	    $(".paySpread").on("click","#weixin", function () {
	        $("#open-btn").css("background", "#539bfa");
	        webpay = false;
	    });
	    $(".paySpread").on("click", "#yue", function () {
	        webpay = "balance";
	    });
        
	    //解绑上次注册的事件 
	    $("#open-btn").unbind("click");
	    $("#open-btn").on("click", function () {
            //余额不足终止
	        var yuNum = $("#yue-number").text();
	        var spreadNum = $(".spread-total-money").text();
	        var spreadTotal = spreadNum.substring(0, spreadNum.length - 1);
	        if ((webpay == "balance") && (Number(yuNum) < Number(spreadTotal))) {
	            $("#open-btn").css("background", "#b6b7b9");
	            tip("您的余额已经不足！");
	            return false;
	        }

            $("#payNumber").text(payNumber);
            if (webpay == true) {
                console.log("支付宝");
                //支付宝
                $.post("/api/Order/BuyVIP", { token: token, sid: sid, num: 1, spreapid: $("#spreadid").val() }).then(function (json) {
                    if (json.code == 1) {
                        window.open("/WebPay/AliPay/" + json.data);
                        $(".FixedPopupMask").hide();
                        $(".pay").hide();
                        //弹框确认支付状态
                        $('body').dialog({
                            title: "订单付款中..",
                            titleFontSize: "16px",
                            type: 'primary',
                            showBoxShadow: true,
                            buttons: [{ name: '已完成支付', className: 'pay-ok' }],
                            discription: '请在新开页面中完成支付，如已完成支付，请点击已完成支付！',
                            discriptionFontSize: "14px",
                            animateIn: 'fadeInRight-hastrans',
                            animateOut: 'fadeOutRight-hastrans',
                            duration: 0,
                        });
                        $(".pay-ok").on("click", function () {
                            location.href = "/WebPay/Result/" + json.data;
                        });
                    }else if (json.code == 2) {
                        //登录超时
                        OtherPlace();
                    }
                    else if (json.code == 0) {
                        //提示错误
                        tip(json.data);
                    }
                }, function (err) {
                    tip(err);
                });
            } else if(webpay == false) {
                console.log("微信");
                    $(".pay").hide();
                    $(".weixinpay").show();
                    //微信
                    var orderNum;
                    $.post("/api/Order/BuyVIP", { token: token, sid: sid, num: 1, spreapid: $("#spreadid").val() }).then(function (json) {
                        if (json.code == 1) {
                            $("#weixinPay").attr("src", "/WebPay/WxPay/" + json.data);
                            orderNum = json.data;
                        }else if (json.code == 2) {
                            //登录超时
                            OtherPlace();
                        } else if (json.code == 0) {
                            tip(json.data);
                        }
                        
                    }, function (err) {
                        tip(err);
                    });
               
                    t = setInterval(function () {
                        $.post("/WebPay/CheckResult/" + orderNum, {}, function (json) {
                            if (json.code == 1) {
                                $(".FixedPopupMask").hide();
                                $(".pay").hide();
                                $(".weixinpay").hide();
                                //跳转到成功页面
                                location.href = "/WebPay/Result/" + orderNum;
                            }else if (json.code == 2) {
                                //登录超时
                                OtherPlace();
                            }
                           
                        });
                    }, 2000);

                    $(".qitazhifu").click(function () {
                        $(".FixedPopupMask").show();
                        $(".weixinpay").hide();
                        $(".pay").show();
                        clearInterval(t);
                    });
            } else {
                //余额付费

                javascript: $('body').dialog({
                    title: "请输入登录密码",
                    titleFontSize: "16px",
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'defalut' }],
                    isInput: true,
                    inputPlaceholder: "",
                    inputType: "password",
                    duration: 0,
                }, function (ret) {
                    if (ret.index === 0) {
                        $(".FixedPopup").show();
                        if (ret.input.value == "") {
                            userpass = parseInt(ret.input.value);
                        } else {
                            userpass = ret.input.value;
                        }

                        $.get("/WebPay/CheckPayPass", { userpass: userpass }).then(function (json) {
                            if (json.code == 1) {
                                var newToken = json.data;
                                $.post("/api/Order/BuyVip", { token: token, sid: sid, num: 1, spreapid: $("#spreadid").val(), userpass: userpass }).then(function (json) {
                                    if (json.code == 1) {
                                        window.open("/WebPay/BalancePay/" + json.data + "?token=" + newToken);
                                    }
                                })
                            }
                        });
                    };
                });


                //$.post("/api/Order/BuyVIP", { token: token, sid: sid, num: 1, spreapid: $("#spreadid").val() }).then(function (json) {
                //    if (json.code == 1) {
                //        window.open("/WebPay/BalancePay/" + json.data);
                //    }
                //})
            }
        });
	}();
        
})