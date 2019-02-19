$(function () {

    randerPage();

})


//获取脚本列表
function randerPage(deviceid, gid, uid) {
    $.post("/api/console/GetCloudProject", { token: token, pindex: 1, pagesize: 999 }, function (json) {
        if (json.code == 1) {
            var strList = randerList(json.data);
            $(".content-box").append(strList);
        } else if (json.code == 0) {
            $(".content-box").append("<tr><td colspan='4' class='text-center'>暂无数据</td></tr>");
            //$(".btn-loadmore").attr("disabled", "disabled");
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

//渲染列表数据
function randerList(datalist) {
    var htmlList = "";
    if (datalist) {
        $(datalist).each(function (i, elem) {
            htmlList += '<tr>'
                      //+ '<td><input type="checkbox" name="checkbox" class="checkboxOnly" data-id="' + elem.DeviceID + '" value="" /></td>'
                      + '<td>' + elem.CloudID + '</td>'
                      + '<td>' + elem.CloudID + '</td>'
                      + '<td>' + elem.CloudName + '</td>'
                      //+ '<td><button class="btn btn-xs btn-danger btn-del" onclick="unbindScript(' + elem.CloudID + ',event)">解绑</button></td>'
                      + '</tr>';
        });
        return htmlList;
    }
}

//解绑脚本
function unbindScript(pid, e) {
    $(".tip-content").text("是否解绑所选脚本？");
    $("#smallModalClick").modal('show');
    $(".btn-queding").click(function () {
        $.post("/api/console/RemoveProject", { token: token, projectid: pid }, function (json) {
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
        });
    });
}