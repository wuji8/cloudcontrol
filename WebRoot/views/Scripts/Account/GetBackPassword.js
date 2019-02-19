$(function () {
    $(".email-box").on("click", function () {
        $(".getBackBox").hide();
        $(".emailGet").show();
        $(".BackLogin").attr("href", "/Account/GetBackPassword").find("span").text("返回上一步");
    });
    $(".question-box").on("click", function () {
        $(".getBackBox").hide();
        $(".questionGet").show();
        $(".BackLogin").attr("href", "/Account/GetBackPassword").find("span").text("返回上一步");
    });


    $(".yanzhengtu").on("click", function () {
        var i = Math.random();
        var url = "/Index/ValiCode?t=" + i;
        $(".yanzhengtu").attr("src", url);
    });

    $("input").focus(function () {
        $(".tisi").html("");
    });

    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) { // enter 键

            $("#verifyname-btn").click();
            $("#verifyemail-btn").click();
            $("#submit-btn").click();
        }
    }

    var flag = true;
    $("#Code").click(function () {
        var email = $("#email").text();
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
                $.post("/api/Account/SendEmailCode", { email: email }, function (json) {
                    if (json.code != 1) {
                        $(".tisi").html(json.data);
                    } else {
                        $("#verifyemail-btn").css("background", "#1d93ec");
                    }
                });
            } else {
                return;
            }
    });

    //验证账户
    $("#verifyname-btn").on("click", function () {
        if ($("#UserName").val() == "") {
            $(".tisi").html("请输入账号")
        } else if ($("#UserCode").val() == "") {
            $(".tisi").html("请输入验证码！")
        } else {
            $.post("/api/Account/VerifyUserName", { username: $("#UserName").val(), ValiCode: $("#UserCode").val() }, function (json) {
                if (json.code == 1) {
                    $(".verifyLoading").show();
                    $(".tisi").html("");
                    setTimeout(function () {
                        $(".verifyLoading").find("p").css("color", "#1d91ec").text("验证通过正在为您跳转...");
                        getStyle(json);
                    }, 1200);
                } else if (json.code == 0) {
                    $(".tisi").html(json.data);
                }
            });
        }
    })

    function getStyle(data) {
        setTimeout(function () {
            $(".VerifyUserName").hide();
            $(".getBackBox").show();
            $(".verifyLoading").hide();
            
        }, 900);
        $("#email").text(data.Email); //写入邮箱

        //通过数据判断验证方式
        if (data.HasSafety == false) {
            $(".question-box").hide();
        } else {
            //获取密保问题写入
            $.post("/api/Account/GetQuestionByUserName", { username: $("#UserName").val() }, function (json) {
                var arr = [];
                if (json.code == 1) {
                    var data = json.data;
                    $.each(json.data, function (k, v) {
                        console.log(data[k]);
                        arr.push(data[k]);
                    });
                } else {
                    tip(json.data);
                }
                $("#question1").attr("str", arr[0]);
                $("#question2").attr("str", arr[2]);
                $("#question1").text(arr[1]);
                $("#question1").text(arr[3]);
            })
        }

    }

    //验证密保
    $("#verifyquestion-btn").on("click", function () {
        if ($("#answer1").val() != "" && $("#answer2").val() != "") {
            $.post("/api/Account/VerifySafetyQuestion2", { username: $("#UserName").val(), qid1: $("#question1").attr("str"), answer1: $("#answer1").val(), qid2: $("#question2").attr("str"), answer2: $("#answer2").val() }, function (json) {
                if (json.code == 1) {
                    token = json.token;
                    encryptToken = json.encryptToken;
                    $(".questionGet").hide();
                    $(".confirmPassword").show();
                    $(".tisi").html("");
                } else if (json.code == 0) {
                    $(".tisi").html(json.data);
                }
            });
        } else {
            $(".tisi").html("请输入答案！");
        }
    });

    //验证邮箱
    var token, encryptToken;
    $("#verifyemail-btn").on("click", function () {
        if ($("#UserCode").val() == "") {
            $(".tisi").html("请输入验证码！");
        } else {
            $.post("/api/Account/GetPassByEmail", { email: $("#email").text(), code: $("#SureCode").val() }, function (json) {
                if (json.code == 1) {
                    token = json.token;
                    encryptToken = json.encryptToken;
                    $(".emailGet").hide();
                    $(".confirmPassword").show();
                    $(".tisi").html("");
                } else if (json.code == 0) {
                    $(".tisi").html(json.data);
                }
            });
        }
    })

    //保存密码
    $("#submit-btn").on("click", function () {
        var password = $("#PassWord").val();
        var again = $("#Again").val();
        if (password == "") {
            $(".tisi").html("请输入密码");
        } else if (again == "") {
            $(".tisi").html("请再次输入密码！");
        } else if (password === again) {
            $.post("/api/Account/ResetPass", { encryptToken: encryptToken, userpass: password }, function (json) {
                if (json.code == 1) {
                    location.href = "/Account/GetBackSuccess";
                } else if (json.code == 0) {
                    $(".tisi").html(json.data);
                }
            });
        }
    })

})