$(function () {
    var fasongFlag = false;
    $("#tixian-num").focus(function () {
        $("#tixian-tip").hide();
    });
    $("#tixian-num").blur(function () {
        var maxcash = parseFloat($("#yuE").html());
        var num = parseFloat($(this).val()) ? parseFloat($(this).val()) : 0;
        num = num.toFixed(2);
        $(this).val(num);
        var reg = /^([\d]+|([\d]+[.]?|[\d]+[.]?[\d]+))$/;
        if (reg.test($(this).val())) {
            if ($(this).val() > maxcash) {
                $("#tixian-tip").show();
                $("#tixian-tip").find("em").text("您的余额只有" + maxcash + "元");
                fasongFlag = false;
            } else if ($(this).val() == 0) {
                $("#tixian-tip").show();
                $("#tixian-tip").find("em").text("请输入0.01元以上的金额");
                fasongFlag = false;
            } else {
                fasongFlag = true;
            }
        } else {
            $("#tixian-tip").show();
            $("#tixian-tip").find("em").text("请输入0.01元以上的金额");
            fasongFlag = false;
        }
    });

    $("#submit-tixian").on("click", function () {
        $.post("/api/Withdraw/ApplyDraw", { token: token, money: $("#tixian-num").val(), account: $("#zhifubao-num").text(), }, function (json) {
            if(json.code == 1){
                console.log(json); //提现申请之后
                tip(json.data);
            }else{
                tip(json.data);
            }
            
        });
    })


})