$(function () {
    
    if (!parseInt(access)) {
        console.log(cuid);
        $("#authModal").modal('show');
        $(".main-container").hide();
    }

    //register
    $(".btn-register").on("click", function () {
        $(this).attr('disabled','');
        var username = $("#username").val();
        var password = $("#password").val();
        var repassword = $("#repassword").val();
        var obj = {
            username: username,
            userpass: password,
            cuid: cuid,
            geetest_challenge: $("input[name=geetest_challenge]").val(),
            geetest_validate: $("input[name=geetest_validate]").val(),
            geetest_seccode: $("input[name=geetest_seccode]").val()
        };

        if (!username) {
            $(".tisi").text("请正确输入用户名！");
        } else if (!password) {
            $(".tisi").text("请正确输入密码！");
        } else if (password != repassword) {
            $(".tisi").text("两次密码输入不同！");
        } else {
            $(".btn-register").attr("disabled", "disabled").find("span").text("注册中");
            $.post("/api/Account/RegUser_Geetest", obj, function (json) {
                $(".btn-register").removeAttr("disabled").find("span").text("注册");
                if (json.code == 1) {
                    window.sessionStorage["username"] = username;
                    $("#smallModal").modal('show');
                    setTimeout(function () { window.location.href = '/Home/Login/' + cuid }, 100);
                } else {
                    $(".tisi").text(json.data);

                }
            });
        }
        $(".btn-register").removeAttr('disabled');
    });

})

   