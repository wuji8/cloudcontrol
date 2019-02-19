$(function () {

    randerPage();

    $(".btn-save").on("click", function () {
        $(this).text("添加中").attr("disabled", "disabled");

        var distinct = $("#checkboxLike:checked").val();

        var obj = {
            token: token,
            distinct: distinct ? distinct : 0,
            apoint: $("#bindAccount").val().trim(),
            account: $("#accountInfo").val().trim()
        };

        $.post("/api/console/ImportAccount", obj, function (json) {
            $('.btn-save').text("添加").removeAttr("disabled");
            if (json.code == 1) {
                $("#myModal").modal('hide');
                $("#smallModal").find(".tip-content").text(json.data);
                $("#smallModal").modal('show');
                //$(".content-list").html("");
                //randerPage();
            } else if (json.code == 2) {
                $(".tip-content").text("登录超时，请点击跳转登录页面！");
                $("#smallModalClick").modal('show');
                $(".btn-queding").click(function () { location.href = "/Home/Login"; });
            } else {
                $(".tisi").text(json.data);
            }
        });
    });

    //数据点击追加
    //$(".btn-loadmore").on("click", function () {
    //    $(this).attr('disabled',"disabled");
    //    $(this).html("<i class='glyphicon glyphicon-refresh i-rotate'></i> 加载中...");
    //    setTimeout(function () {
    //        var currID = $(".content-box tr:last").attr("data-id");
    //        var accout = $("#s-account").val()?$("#s-account").val():"";
    //        var pass = $("#s-pass").val()?$("#s-pass").val():"";
    //        var code = $("#s-code").val()?$("#s-code").val():"";
    //        randerPage(accout, pass, code, currID);
    //        $(".btn-loadmore").removeAttr('disabled').html("点击加载更多...");
    //    }, 1000)
    //});

    //搜索
    $(".btn-sousuo").on("click", function () {
        var accout = $("#s-account").val();
        var pass = $("#s-pass").val();
        var code = $("#s-code").val();
        $(".content-box").html("");
        randerPage(accout, pass, code, "");
    });

})


//获取验证码列表
function randerPage() {
    $.post("/api/console/GetQrTaskList", { token: token}, function (json) {
        if (json.code == 1) {
            console.log(json);
            var strList = randerList(json.data);
            $(".content-box").append(strList);
        } else if (json.code == 0) {
            $(".content-box").append("<tr><td colspan='8' class='text-center'>暂无数据</td></tr>");
            $(".btn-loadmore").attr("disabled", "disabled");
        } else if (json.code == 2) {
            $(".tip-content").text("登录超时，请点击跳转登录页面！");
            $("#smallModalClick").modal('show');
            $(".btn-queding").click(function () { location.href = "/Home/Login"; });
        } else {
            $("#smallModal").find(".tip-content").text(json.data);
            $("#smallModal").modal('show');
        }
    })
}

////渲染列表数据
function randerList(datalist) {
    var htmlList = "";
    if (datalist) {
        $(datalist).each(function (i, elem) {
            var status = "", result = "";
            if (elem.Status == 0) {
                 status = "未处理";
            } else if (elem.Status == 1) {
                 status = "已处理";
            } else if (elem.Status == 2) {
                 status = "已完成";
            }

            htmlList += '<tr data-id="' + elem.TaskID + '">'
                      //+ '<td><input type="checkbox" name="checkbox" class="checkboxOnly" data-id="' + elem.DeviceID + '" value="" /></td>'
                      + '<td>' + elem.TaskID + '</td>'
                      + '<td>' + elem.Account + '</td>'
                      + '<td>' + elem.Pass + '</td>'
                      + '<td>' + elem.UDID + '</td>'
                      + '<td>' + elem.Status + '</td>'
                      + '<td>' + elem.CreateTime + '</td>'
                      + '<td>'
                      //+ '<button class="btn btn-xs btn-primary btn-deal" onclick="DealWidth(' + elem.CodeID + ',event)">处理</button>'
                      + '<button class="btn btn-xs btn-danger btn-del" onclick="DeleteCode(' + elem.TaskID + ',event)">删除</button></td>'
                      + '</tr>';
        });
        return htmlList;
    }
}

//处理验证码
function DealWidth(cid, e) {
    //$(".tip-content").text("是否解绑所选脚本？");
    $("#myVerifyModal").modal('show');
    $(".btn-code").click(function () {
        $(".btn-code").attr('disabled','');
        //var _code = $("#verifyCode").val();
        var result = $("#verifyResult option:selected").val();
        //if(_code){
            $.post("/api/console/SubmitResult", { token: token, codeid: cid, result: result }, function (json) {
                $("#myVerifyModal").modal('hide');
                if (json.code == 1) {
                    $("#smallModal").find(".tip-content").text(json.data);
                    $("#smallModal").modal('show');
                    $(".content-box").html("");
                    randerPage();
                } else if (json.code == 2) {
                    $(".tip-content").text("登录超时，请点击跳转登录页面！");
                    $("#smallModalClick").modal('show');
                    $(".btn-queding").click(function () { location.href = "/Home/Login"; });
                } else {
                    $("#smallModal").find(".tip-content").text(json.data);
                    $("#smallModal").modal('show');
                }
                $(".btn-code").removeAttr('disabled');
            });
        //}
    });
}

//删除
function DeleteCode(tid, e) {
    $(".tip-content").text("是否删除该任务？");
    $("#smallModalClick").modal('show');
    $(".btn-queding").click(function () {
        $("#DeleteGroupModal").modal('hide');
        $(".btn-queding").attr('disabled','');
        $.post("/api/console/DeleteQrTask", { token: token, taskid: tid }, function (json) {
            $("#smallModalClick").modal('hide');
            if (json.code == 1) {
                $("#smallModal").find(".tip-content").text(json.data);
                $("#smallModal").modal('show');
                $(".content-box").html("");
                randerPage();
            } else if (json.code == 2) {
                $(".tip-content").text("登录超时，请点击跳转登录页面！");
                $("#smallModalClick").modal('show');
                $(".btn-queding").click(function () { location.href = "/Home/Login"; });
            } else {
                $("#smallModal").find(".tip-content").text(json.data);
                $("#smallModal").modal('show');
            }
            $(".btn-queding").removeAttr('disabled');
        });
    });
}