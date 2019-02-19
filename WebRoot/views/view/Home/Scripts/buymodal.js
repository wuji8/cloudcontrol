$(function () {
    $(".btn-buy").on('click', function () {
        $("#modal-form").modal('hide');
        var payType = $(".widget-main input[type=radio]:checked").val(); // 0 zhifubao  1 weixin

        var sid;
        $("#myTab li").each(function (i, v) {
            if ($(v).hasClass("active")) {
                sid = $(v).attr("data-sid");
            }
        });
        
        //生成订单
        $.post("/api/order/BuyVIP", { token: token, sid: sid, num: 1 }, function (json) {
            if (json.code == 1) {
                enterPay(json.data);
                $("#smallModalClick").find(".tip-content").text("请在新开页面中完成支付，如已完成支付，请点击确定查看结果！");
                $("#smallModalClick").modal('show');
                $(".btn-queding").on("click", function () {
                    location.href = "/WebPay/Result/"+json.data;
                })
            } else if (json.code == 2) {
                $(".tip-content").text("登录超时，请点击跳转登录页面！");
                $("#smallModalClick").modal('show');
                $(".btn-queding").click(function () { location.href = "/Home/Login"; });
            } else {
                $("#smallModal").find(".tip-content").text(json.data);
                $("#smallModal").modal('show');
            }
        });

        var enterPay = function (ord) {
            console.log(ord);
            if (payType == 0) {
                var uri = "/WebPay/AliPay/" + ord;
                var form = document.createElement("form");
                form.action = uri;
                form.target = '_blank';
                form.method = 'POST';
                document.body.appendChild(form);
                form.submit();
            } else if (payType == 1) {
                var tempwindow = window.open();
                tempwindow.location = '/WebPay/QRpageMobile?order='+ord+"&price="+$(".price span b").text();
            }  
        }
    });
})