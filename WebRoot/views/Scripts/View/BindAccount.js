$(function () {
    $(".modify").on("click", function () {
        $(".bind-table").hide();
        $(".change-table").show();
    });

    //验证码
    var flag = true;
    $("#code-btn").click(function () {
        if (flag) {
            flag = false;
            $(this).css({
                "background": "#999999"
            });
            var wait = 60;
            function time() {
                if (wait == 0) {
                    $("#code-btn").css({
                        "background": "#1D92EC"
                    });
                    $("#code-btn").text("获取验证码");
                    wait = 60;
                    flag = true;
                } else {
                    $("#code-btn").text("重新发送(" + wait + ")");
                    wait--;
                    setTimeout(function () {
                        time()
                    },
                    1000)
                }
            }
            time();
            $.post("/api/Account/SendEmailByToken", { token: token }, function (json) {
                if (json.code != 1) {
                    $("#submit-btn").css("disabled", "disabled");
                } else {
                    return;
                }
            });
        } else {
            return;
        }
    });
})