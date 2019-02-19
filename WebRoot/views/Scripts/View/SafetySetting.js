$(function () {

    //改密码
    $("#change-pswd").on("click", function () {
        $("#passwordModal").modal("show");
    });
    $("#submit-pswd").on("click", function () {
        if ($("#new-pswd").val() == $("#again-pswd").val()) {
            $.post("/api/Account/ModifyUserPass", { token: token, oldpass: $("#old-pswd").val(), userpass: $("#new-pswd").val() }, function (json) {
                if (json.code == 1) {
                    $('#passwordModal').modal('hide');
                    tip(json.data);
                } else {
                    tip(json.data);
                }
            })
        } else {
            $(".tip").show().text("重复密码输入不正确！");
        }
    });

    //改邮箱
    $("#change-email").on("click", function () {
        $("#styleModal").modal("show");
    });
    $(".select-box div").on("click", function () {
        $(this).addClass("select-hover").siblings().removeClass("select-hover");
    })
    
    var encryptToken = "";
    $("#verify-style").on("click", function () {
        if($(".email-box").attr("class").indexOf("select-hover")!=-1){  //选择邮箱
            //邮箱校验邮箱
            $('#styleModal').modal('hide');
            $(".tip").hide();
            $('#verifyEmailModal').modal('show');
            $("#verify-email").unbind("click");
            $("#verify-email").on("click", function () {
                $.post("/api/Account/CheckEmail", { token: token, code: $("#verifyCode").val() }, function (json) {
                    if (json.code == 1) {
                        console.log("邮箱校验成功！接下来弹出新框绑定邮箱。");
                        encryptToken = json.data;
                        $('#verifyEmailModal').modal('hide');
                        $('#newEmailModal').modal('show');
                    } else if(json.code == 0) {
                        $(".tip").show().text(json.data);
                    }
                })
            });
        } else if ($(".question-box").attr("class").indexOf("select-hover") != -1) { //选择密保
            //邮箱校验密保
            var qid = "";
            $('#styleModal').modal('hide');
            $(".tip").hide();
            $('#verifyQuestionModal').modal('show');
            $.post("/api/Account/GetSafetyQuestion", { token: token, }, function (json) {
                if (json.code == 1) {
                    qid = json.data.QuestionID;
                    $("#question-txt").attr("str", qid).text(json.data.SafetyQuestion);
                }
            });
            $("#verify-question").unbind("click");
            $("#verify-question").on("click", function () {
                var answer = $("#anwser-txt").val();
                $.post("/api/Account/VerifySafetyQuestion", { token: token, qid: qid, answer: answer }, function (json) {
                    if (json.code == 1) {
                        console.log("密保校验成功！接下来弹出新框绑定邮箱。");
                        encryptToken = json.data;
                        $('#verifyQuestionModal').modal('hide');
                        $('#newEmailModal').modal('show');
                    } else if (json.code == 0) {
                        $(".tip").show().text(json.data);
                    }
                })
            });
        }
    });
        

    //提交邮箱
    $("#submit-email").on("click", function () {
        $.post("/api/Account/ReplaceEmail", { token: token, encryptToken: encryptToken, email: $("#email").val(), code: $("#verify-code").val() }, function (json) {
            if (json.code == 1) {
                $('#newEmailModal').modal('hide');
                tip(json.data);
            } else {
                tip(json.data);
            }
        })
    });


    //改密保
    var encryptToken1 = "";
    $("#change-question").on("click", function () {
        $("#wayModal").modal("show");
    });
    $("#setting-question").on("click", function () {  //没有密保设置直接进行
        $("#questionModal").modal("show");
    });

    $("#verify-way").on("click", function () {
        if ($(".email-box1").attr("class").indexOf("select-hover") != -1) {  //选择邮箱
            //密保校验邮箱
            $('#wayModal').modal('hide');
            $(".tip").hide();
            $('#verifyEmailModal').modal('show');
            $("#verify-email").unbind("click");
            $("#verify-email").on("click", function () {
                $.post("/api/Account/CheckEmail", { token: token, code: $("#verifyCode").val() }, function (json) {
                    if (json.code == 1) {
                        console.log("邮箱校验成功！接下来弹出新框密保。");
                        encryptToken1 = json.data;
                        $('#verifyEmailModal').modal('hide');
                        $('#questionModal').modal('show');
                    } else if (json.code == 0) {
                        $(".tip").show().text(json.data);
                    }
                })
            });
        } else if ($(".question-box1").attr("class").indexOf("select-hover") != -1) { //选择密保
            //密保校验密保
            var qid = "";
            $('#wayModal').modal('hide');
            $(".tip").hide();
            $('#verifyQuestionModal').modal('show');
            $.post("/api/Account/GetSafetyQuestion", { token: token, }, function (json) {
                if (json.code == 1) {
                    qid = json.data.QuestionID;
                    $("#question-txt").attr("str", qid).text(json.data.SafetyQuestion);
                }
            });
            $("#verify-question").unbind("click");
            $("#verify-question").on("click", function () {
                var answer = $("#anwser-txt").val();
                $.post("/api/Account/VerifySafetyQuestion", { token: token, qid: qid, answer: answer }, function (json) {
                    if (json.code == 1) {
                        console.log("密保校验成功！接下来弹出新框密保。");
                        encryptToken1 = json.data;
                        $('#verifyQuestionModal').modal('hide');
                        $('#questionModal').modal('show');
                    } else if (json.code == 0) {
                        $(".tip").show().text(json.data);
                    }
                })
            });
        }
    });


    //提交密保
    $("#submit-question").on("click", function () {
        var question1 = $('#question1 option:selected').val();
        var question2 = $('#question2 option:selected').val();
        var question3 = $('#question3 option:selected').val();
        var answer1 = $("#answer1").val();
        var answer2 = $("#answer2").val();
        var answer3 = $("#answer3").val();
        $.post("/api/Account/ModifySafety", { token: token, encryptToken: encryptToken1, qid1: question1, answer1: answer1, qid2: question2, answer2: answer2, qid3: question3, answer3: answer3 }, function (json) {
            if (json.code == 1) {
                $('#questionModal').modal('hide');
                tip(json.data);
            } else {
                tip(json.data);
            }
        });
    })


    //验证码
    var flag = true;
    $("#Code").click(function () {
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
            $.post("/api/Account/SendEmailByToken", { token: token }, function (json) {
                if (json.code == 1) {
                    $("#verifyemail-btn").css("background", "#1d93ec");
                }
            });
        } else {
            return;
        }
    });
    var flag1 = true;
    $("#Code1").click(function () {
        var email = $("#email").val();
        if (flag1 && email) {
            $(".email-tips").hide();
            flag1 = false;
            $(this).css({
                "background": "#999999"
            });
            var wait = 60;
            function time() {
                if (wait == 0) {
                    $("#Code1").css({
                        "background": "#1D92EC"
                    });
                    $("#Code1").val("获取验证码");
                    wait = 60;
                    flag1 = true;
                } else {
                    $("#Code1").val("重新发送(" + wait + ")");
                    wait--;
                    setTimeout(function () {
                        time()
                    },
                    1000)
                }
            }
            time();
            $.post("/api/Account/SendEmailCode", { email: email }, function (json) {
                if (json.code == 1) {
                    $("#verifyemail-btn").css("background", "#1d93ec");
                }
            });
        } else {
            $(".email-tips").show();
            return;
        }
    });




    $("input").placeholder();

    $('#change-photo').on('click', function () {
        $(".FixedPopupMask").show();
        $("#Cut-box").show();
        $("#div_camera").show();
    })

})