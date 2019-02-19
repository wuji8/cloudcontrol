$(function(){
    $(document).on('click', '.toolbar a[data-target]', function (e) {
        e.preventDefault();
        var target = $(this).data('target');
        $('.widget-box.visible').removeClass('visible');//hide others
        $(target).addClass('visible');//show target
    });
    //login
    if (!parseInt(access)) {
        console.log(access);
        $("#authModal").modal('show');
        $(".main-container").hide();
    }

    $(".btn-login").on("click", function () {
        $(this).attr('disabled','');
        var username = $("#username").val().trim();
        var password = $("#password").val().trim();
        var obj = {
            geetest_challenge: $("input[name=geetest_challenge]").val(),
            geetest_validate: $("input[name=geetest_validate]").val(),
            geetest_seccode: $("input[name=geetest_seccode]").val(),
            username: username,
            cuid: cuid,
            userpass: password
        };

        if (!username) {
            $(".tisi").text("请正确输入用户名！");
        } else if (!password) {
            $(".tisi").text("请正确输入密码！");
        } else {
            $(".btn-login").attr("disabled", "disabled").find("span").text("登录中");
            $.post("/api/Account/Login_Geetest", obj, function (json) {
                $(".btn-login").removeAttr("disabled").find("span").text("登录");
                if (json.code == 1) {
                    $("#smallModal").modal('show');
                    setTimeout(function () { window.location.href = '/Home/Index' }, 100);
                } else {
                    $(".tisi").text(json.data);
                }
                $(".btn-login").removeAttr('disabled');
            });
        }
        $(".btn-login").removeAttr('disabled');
    });
})
    