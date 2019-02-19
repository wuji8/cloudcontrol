$(function () {
    //初始化日志列表
    randerPage();

    //搜索
    $(".btn-search").on("click", function () {
        $(".content-box").html("");
        randerPage();
    });

    //数据点击追加
    $(".btn-loadmore").on("click", function () {
        $(this).attr('disabled','disabled');
        $(this).html("<i class='glyphicon glyphicon-refresh i-rotate'></i> 加载中...");
        setTimeout(function () {
            var currID = $(".content-box tr:last td").eq(0).text();
            randerPage(currID);
            $(".btn-loadmore").removeAttr('disabled').html("点击加载更多...");
        }, 1000)
    });

    //获取项目列表
    $.post("/api/console/GetCloudProject", { token: token, pindex: 1, pagesize: 999 }, function (json) {
        if (json.code == 1) {
            var data = json.data;
            var _html = "<option value=''>默认</option>";
            for (var i = 0; i < json.data.length; i++){
                _html += "<option data-id='" + data[i].CloudID + "' value='" + data[i].CloudID + "'>" + data[i].CloudName + "</option>";
            }
            $("#select-project").html(_html);
        }else if (json.code == 2) {
            $(".tip-content").text("登录超时，请点击跳转登录页面！");
            $("#smallModalClick").modal('show');
            $(".btn-queding").click(function () { location.href = "/Home/Login"; });
        } else {
            $("#smallModal").find(".tip-content").text(json.data);
            $("#smallModal").modal('show');
        }
    })
})

//获取日志函数
function randerPage(logid) {
    var udid = $("#input-udid").val();
    var type = $("#select-type option:selected").val();
    var proid = $("#select-project option:selected").val();
    $.post("/api/console/GetLogList", { token: token, udid: (udid?udid:""), type: (type?type:""), logid: (logid?logid:""), projectid: proid, pagesize: 20 }, function (json) {
        if (json.code == 1) {
            var strList = renderList(json.data);
            $(".content-box").append(strList);
        } else if (json.code == 0) {
            $(".content-box").append("<tr><td colspan='5' class='text-center'>暂无数据</td></tr>");
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

//生成html
function renderList(data) {
    var htmlList = "";
    $(data).each(function (i, elem) {
        htmlList += '<tr>'
                  //+ '<td><input type="checkbox" name="checkbox" class="checkboxOnly" data-id="' + elem.DeviceID + '" value="" /></td>'
                  + '<td>' + elem.LogID + '</td>'
                  + '<td>' + elem.CreateTime + '</td>'
                  //+ '<td>' + elem.DeviceName + '</td>'
                  //+ '<td>' + elem.DeviceNum + '</td>'
                  + '<td>' + elem.Content + '</td>'
                  + '</tr>';
    });
    return htmlList;
}