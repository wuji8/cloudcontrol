$(function () {

    randerPage();

    //添加一页二维码
    $(".btn-save").on("click", function () {
        $(this).text("添加中").attr("disabled", "disabled");

        var udids = '';
        $(".qr-udid").each(function (i, e) {
            udids += $(e).val() + ',';
        });

        var obj = {
            token: token,
            title: $('.qr-title').val(),
            remark: $('.qr-descript').val(),
            width: $('.qr-wh').val(),
            padding: $('.qr-gap').val(),
            udids: udids
        };

        $.post("/api/console/AddQrWall", obj, function (json) {
            $('.btn-save').text("添加").removeAttr("disabled");
            if (json.code == 1) {
                $("#myModal").modal('hide');
                $("#smallModal").find(".tip-content").text(json.data);
                $("#smallModal").modal('show');
                $(".content-box").html('');
                randerPage();
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


    ////搜索
    //$(".btn-sousuo").on("click", function () {
    //    var accout = $("#s-account").val();
    //    var pass = $("#s-pass").val();
    //    var code = $("#s-code").val();
    //    $(".content-box").html("");
    //    randerPage(accout, pass, code, "");
    //});

    //添加DOM
    $("#btn-addUI").on('click', function () {
        addUI();
    })

    var index = 1;
    //var total = 20;
    var addUI = function () {
        //  if (index < total) {
        index++;
        var _html = "";
        _html += '<div class="custom-item new-custom new-custom+'+index+'" style="padding-top:10px;">'+
                    '<form class="form-inline">'+
                            '<span class="title-num">' + index + '. </span>' +
                            '<label>设备编号（UDID）</label>'+
                            '<input type="text" class="input-lage qr-udid" placeholder="UDID">'+
                            '<button type="button" class="btn btn-danger btn-xs del" style="margin-left:10px;">'+
                                '<i class="ace-icon fa fa-trash-o bigger-110"></i>'+
                            '</butto>'+
                     '</form>'+
                '</div>';

        $("#custom-empty").before(_html);

        $(".title-num").each(function (i, e) {
            $(e).html((parseInt(i) + 1) + '. ');
        });

        $(".del").unbind("click");
        $(".del").on("click", function () {
            $(this).parent().parent().remove();
            //total += 1;
            $(".title-num").each(function (i, e) {
                $(e).html((parseInt(i) + 1) + '. ');
            });
        });
    };


    /**
    *
    * 修改
    *
    **/

    //添加DOM
    $("#btn-m-addUI").on('click', function () {
        addMUI();
    })

    var indexM = 1;
    //var total = 20;
    var addMUI = function () {
        //  if (index < total) {
        indexM++;
        var _html = "";
        _html += '<div class="custom-item new-custom new-custom+' + indexM + '" style="padding-top:10px;">' +
                    '<form class="form-inline">' +
                            '<span class="title-m-num">' + indexM + '. </span>' +
                            '<label>设备编号（UDID）</label>' +
                            '<input type="text" class="input-lage qr-m-udid" placeholder="UDID">' +
                            '<button type="button" class="btn btn-danger btn-xs del-m" style="margin-left:10px;">' +
                                '<i class="ace-icon fa fa-trash-o bigger-110"></i>' +
                            '</butto>' +
                     '</form>' +
                '</div>';

        $("#custom-m-empty").before(_html);

        $(".title-m-num").each(function (i, e) {
            $(e).html((parseInt(i) + 1) + '. ');
        });

        $(".del-m").unbind("click");
        $(".del-m").on("click", function () {
            $(this).parent().parent().remove();
            //total += 1;
            $(".title-m-num").each(function (i, e) {
                $(e).html((parseInt(i) + 1) + '. ');
            });
        });
    };

    $(".orgin-div").on("click", ".del-m", function () {
        $(this).parent().parent().remove();
        //total += 1;
        $(".title-m-num").each(function (i, e) {
            $(e).html((parseInt(i) + 1) + '. ');
        });
    });

})


//获取验证码列表
function randerPage() {
    $.post("/api/console/GetQrWallList", { token: token, wallid: 0 }, function (json) {
        if (json.code == 1) {
            var strList = randerList(json.data);
            //console.log(json.data);
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
            htmlList += '<tr data-id="' + elem.WallID + '">'
                      //+ '<td><input type="checkbox" name="checkbox" class="checkboxOnly" data-id="' + elem.DeviceID + '" value="" /></td>'
                      + '<td>' + elem.WallID + '</td>'
                      + '<td><a href="/Home/QrIndex?pageID=' + elem.WallID + '" target="_blank">' + elem.Title + '</a></td>'
                      + '<td>' + elem.Remark + '</td>'
                      + '<td>' + elem.Width + '</td>'
                      + '<td>' + elem.Padding + '</td>'
                      //+ '<td>' + elem.Code + '</td>'
                      //+ '<td>' + elem.CreateTime + '</td>'
                      + '<td>'
                      + '<button class="btn btn-xs btn-primary btn-deal" onclick="ModifyPage(' + elem.WallID + ',event)">修改</button>'
                      + '<button class="btn btn-xs btn-danger btn-del" onclick="DeletePage(' + elem.WallID + ',event)">删除</button></td>'
                      + '</tr>';
        });
        return htmlList;
    }
}

// 修改二维码页面
function ModifyPage(wallid, e) {
    $("#myModifyModal").modal('show');
    $('.origin-div').html('');
    //* 一个页面的数据
    $.post('/api/console/GetQrWall', { token: token, wallid: wallid }, function (json) {
        if (json.code == 1) {
            $('.qr-m-title').val(json.wall[0].Title);
            $('.qr-m-descript').val(json.wall[0].Remark);
            $('.qr-m-wh').val(json.wall[0].Width);
            $('.qr-m-gap').val(json.wall[0].Padding);
            var _html = "";
            $(json.data).each(function (index, item) {
                _html += '<div class="custom-item new-custom new-custom+' + item.SortNo + '" style="padding-top:10px;">' +
                            '<form class="form-inline">' +
                                    '<span class="title-m-num">' + item.SortNo + '. </span>' +
                                    '<label>设备编号（UDID）</label>' +
                                    '<input type="text" class="input-lage qr-m-udid" value="' + item.UDID + '" placeholder="UDID">' +
                                    '<button type="button" class="btn btn-danger btn-xs del-m" style="margin-left:10px;">' +
                                        '<i class="ace-icon fa fa-trash-o bigger-110"></i>' +
                                    '</butto>' +
                             '</form>' +
                        '</div>';
            })
            
            $('.orgin-div').html(_html).find('.del-m').eq(0).hide();
        } else if (json.code == 2) {
            $(".tip-content").text("登录超时，请点击跳转登录页面！");
            $("#smallModalClick").modal('show');
            $(".btn-queding").click(function () { location.href = "/Home/Login"; });
        } else {
            $("#smallModal").find(".tip-content").text(json.data);
            $("#smallModal").modal('show');
        }
    });

    $(".btn-modify").unbind("click");
    $(".btn-modify").click(function () {
        $(".btn-modify").attr('disabled', '');

        var udids = '';
        $(".qr-m-udid").each(function (i, e) {
            udids += $(e).val() + ',';
        });

        var obj = {
            token: token,
            wallid: wallid,
            title: $('.qr-m-title').val(),
            remark: $('.qr-m-descript').val(),
            width: $('.qr-m-wh').val(),
            padding: $('.qr-m-gap').val(),
            udids: udids
        };

        $.post("/api/console/AlterQrWall", obj, function (json) {
            $("#myModifyModal").modal('hide');
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
            $(".btn-modify").removeAttr('disabled');
        });
    });
}

//删除
function DeletePage(wallid, e) {
    $(".tip-content").text("是否删除该页二维码？");
    $("#smallModalClick").modal('show');
    $(".btn-queding").click(function () {
        $("#DeleteGroupModal").modal('hide');
        $(".btn-queding").attr('disabled','');
        $.post("/api/console/DeleteQrWall", { token: token, wallid: wallid }, function (json) {
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