+$(function () {
    $("#checkboxAll").prop("checked", false);
    //搜索
    $(".btn-sousuo").on("click", function () {
        var groupid = $(".page-header .groupList option:selected").val();
        var udid = $(".input-sousuo").val().trim();
        $(".content-box").html("");
        randerPage("",groupid,udid);
    });

    /*添加设备*/
    $(".btn-device").on("click", function () {
        $("#deviceModal").modal('show');
    });
    $(".btn-adddevice").on("click", function () {
        $(this).attr('disabled','disabled');
        var udid = $("#deviceudid").val().trim();
        var remark = $("#deviceremark").val().trim();
        if(udid && remark){
            $(this).attr("disabled", "").text("添加中");
            $.post("/api/Console/AddDevice", { token: token, udid: udid, remark: remark }, function (json) {
                $("#deviceModal").modal('hide');
                $(".btn-adddevice").removeAttr("disabled").text("确定");
                if (json.code == 1) {
                    $("#smallModal").find(".tip-content").text(json.data);
                    $("#smallModal").modal('show');
                    reloadData();
                } else if (json.code == 2) {
                    $(".tip-content").text("登录超时，请点击跳转登录页面！");
                    $("#smallModalClick").modal('show');
                    $(".btn-queding").click(function () { location.href = "/Home/Login"; });
                } else {
                    $("#smallModal").find(".tip-content").text(json.data);
                    $("#smallModal").modal('show');
                }
                $(".btn-adddevice").removeAttr('disabled');
            });
        } else {
            $(".btn-adddevice").removeAttr('disabled');
            $("tisi").text("请正确填写设备信息！");
        }
    });

   
    //启动任务弹出
    var checkDeviceArr = [];
    var _device = "";
    $(".btn-starttask").on("click", function () {
        $(this).attr('disabled', 'disabled');
        //启动任务前选择设备处理
        _device = "", checkDeviceArr = [];
        $(".checkboxOnly").each(function (i, e) {
            if ($(e).prop("checked")) {
                checkDeviceArr.push($(this).attr("data-id"));
                _device += $(this).attr("data-id") + ",";
            }
        });
        if (checkDeviceArr.length) {
            $(".form-list").html("");  //折叠新家
            $("#startTaskModal").modal('show');
            //获取关联脚本列表
            $.post("/api/Console/GetCloudProject", { token: token, pindex: 1, pagesize: 999 }, function (json) {
                if (json.code == 1) {
                    var _html = "", data = json.data;
                    for (var i = 0; i < data.length; i++) {
                        _html += "<option value='" + data[i].CloudID + "' data-pcaid='" + data[i].CloudID + "'>" + data[i].CloudName + "</option>";
                    }
                    $("#select-script").html(_html);
                    //获取ui表列表
                    getUiList(data[0].CloudID);

                } else if (json.code == 2) {
                    $(".tip-content").text("登录超时，请点击跳转登录页面！");
                    $("#smallModalClick").modal('show');
                    $(".btn-queding").click(function () { location.href = "/Home/Login"; });
                } else {
                    $("#smallModal").find(".tip-content").text(json.data);
                    $("#smallModal").modal('show');
                }
                $(".btn-starttask").removeAttr('disabled');
            });
        } else {
            $("#smallModal").find(".tip-content").text("请先选择设备！");
            $("#smallModal").modal('show');
            $(".btn-starttask").removeAttr('disabled');
        }
    });

    //确定启动任务  control-label
    $(".btn-confirmstart").on("click", function () {
        $(this).attr('disabled','disabled');
        var arr = [], dataJson = {};
        //$(".ui-text").each(function (i, e) {
        //    var key = $(".control-label", e).text();
        //    dataJson[key] = $("input[type=text]", e).val();
        //});
        $(".ui-input").each(function (i, e) {
            var key = $(".control-label", e).attr("data-name");
            dataJson[key] = $("input[type=text]", e).val().trim();
        });
        $(".ui-select").each(function (i, e) {
            var key = $(".control-label", e).attr("data-name");
            dataJson[key] = $(".ui-select-child option:selected", e).val();
        });
        $(".ui-radio").each(function (i, e) {
            var key = $(".control-label", e).attr("data-name");
            dataJson[key] = $("input[type=radio]:checked", e).val();
        });
        //console.log(dataJson);
        
        $.post("/api/Console/SatrtTask", { token: token, uitid: $("#select-uitable option:selected").val(), deviceids: _device, cloudid: $("#select-script option:selected").attr("data-pcaid"), controls: JSON.stringify(dataJson) }, function (json) {
            if (json.code == 1) {
                $("#startTaskModal").modal('hide');
                $("#smallModal").find(".tip-content").text(json.data);
                $("#smallModal").modal('show');
                //$(".danger").click(function () {
                //    window.history.back(-1);
                //});
            } else if (json.code == 2) {
                $(".tip-content").text("登录超时，请点击跳转登录页面！");
                $("#smallModalClick").modal('show');
                $(".btn-queding").click(function () { location.href = "/Home/Login"; });
            } else {
                $("#smallModal").find(".tip-content").text(json.data);
                $("#smallModal").modal('show');
            }
            $(".btn-confirmstart").removeAttr('disabled');
        });
    });

    //停止设备
    var _checkDeviceArr = [];
    var __device = "";
    $(".btn-stop").on("click", function () {
        __device = "";
        _checkDeviceArr = [];
        $(".checkboxOnly").each(function (i, e) {
            if ($(e).prop("checked")) {
                _checkDeviceArr.push($(this).attr("data-id"));
                __device += $(this).attr("data-id") + ",";
            }
        });

        if (_checkDeviceArr.length) {
            $(".tip-content").text("是否停止所选设备？");
            $("#smallModalClick").modal('show');
            $(".btn-queding").click(function () {
                $(".btn-queding").attr('disabled','disabled');
                $.post("/api/console/StopDevice", { token: token, deviceids: __device }, function (json) {
                    $("#smallModalClick").modal('hide');
                    if (json.code == 1) {
                        $("#smallModal").find(".tip-content").text(json.data);
                        $("#smallModal").modal('show');
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
        } else {
            $("#smallModal").find(".tip-content").text("请先选择设备！");
            $("#smallModal").modal('show');
        }
    });

    //刷新
    $(".btn-refresh").on("click", function () {
        window.location.reload();
    });

    //获取设备列表
    randerPage();

    //数据点击追加
    $(".btn-loadmore").on("click", function () {
        $(this).attr('disabled',"disabled");
        $(this).html("<i class='glyphicon glyphicon-refresh i-rotate'></i> 加载中...");
        setTimeout(function () {
            var currID = $(".content-box tr:last td").eq(1).text();

            randerPage(currID);

            $(".btn-loadmore").removeAttr('disabled').html("点击加载更多...");
        }, 1000)
    });

    //删除分组
    getGroupList();
    $(".btn-delgroup").on("click", function () {
        $(".tip-content").text("是否删除所选分组？");
        $("#smallModalClick").modal('show');
        $(".btn-queding").click(function () {
            $(".btn-queding").attr('disabled','disabled');
            $("#DeleteGroupModal").modal('hide');
            $.post("/api/console/DelleteGroup", { token: token, groupids: $("#DeleteGroupModal .groupList option:selected").val(), clear: $("input[name=form-field-radio]:checked").val() }, function (json) {
                $("#smallModalClick").modal('hide');
                if (json.code == 1) {
                    $("#smallModal").find(".tip-content").text(json.data);
                    $("#smallModal").modal('show');
                    reloadData();  //重载数据
                    getGroupList();
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
    });


    //渲染UI
    //$("#select-script").on("change", function () {
    //    $("#select-script").each(function (i, e) {
    //        if ($(this).prop("selected")) {
    //            var pcsid = $(this).attr("data-pcsid");
    //            console.log($(this).val());
    //            console.log($(this).attr("data-pcsid"));
    //            $.post("/api/Console/GetUITable", { token: token, pcsid: pcsid }, function (json) {
    //                console.log(json);
    //            });
    //        }
    //    });
    //});

    //添加组
    var _deviceids = "";
    $(".btn-addGop").on("click", function () {
        $("#groupModal").modal('show');
        _deviceids = "";
        $(".checkboxOnly").each(function (i, e) {
            if ($(e).prop("checked")) {
                _deviceids += $(this).attr("data-id") + ",";
            }
        });
    });
    $(".btn-addgroup").on("click", function () {
        $(this).attr('disabled','disabled');
        $.post("/api/console/AddGroup", { token: token, groupname: $("#groupname").val().trim(), deviceids: _deviceids, remark: "" }, function (json) {
            if(json.code == 1){
                $("#groupModal").modal('hide');
                $("#smallModal").find(".tip-content").text(json.data);
                $("#smallModal").modal('show');
                //window.location.reload();
                reloadData();  //重载数据
                getGroupList();
            } else if (json.code == 2) {
                $(".tip-content").text("登录超时，请点击跳转登录页面！");
                $("#smallModalClick").modal('show');
                $(".btn-queding").click(function () { location.href = "/Home/Login"; });
            } else {
                $("#smallModal").find(".tip-content").text(json.data);
                $("#smallModal").modal('show');
            }
            $(".btn-addgroup").removeAttr('disabled');
        });
    });

    //授权或拒绝设备 (批量)
    $(".auth-box").on("click", ".btn-auth", function () {
        var dpid = $(this).parent().attr("data-id");
        $("#authDeviceModal").modal("hide");
        $.post("/api/console/HandleDevice", { token: token, dpids: dpid, type: 1 }, function (json) {
            if(json.code == 2){
                $(".tip-content").text("登录超时，请点击跳转登录页面！");
                $("#smallModalClick").modal('show');
                $(".btn-queding").click(function () { location.href = "/Home/Login"; });
            } else {
                $(".tip-content").text(json.data);
                $("#smallModalClick").modal('show');
                $(".btn-queding").click(function () { location.reload(); });
            }
        })
    })
    $(".auth-box").on("click", ".btn-reject", function () {
        var dpid = $(this).parent().attr("data-id");
        $("#authDeviceModal").modal("hide");
        $.post("/api/console/HandleDevice", { token: token, dpids: dpid, type: 0 }, function (json) {
            if (json.code == 2) {
                $(".tip-content").text("登录超时，请点击跳转登录页面！");
                $("#smallModalClick").modal('show');
                $(".btn-queding").click(function () { location.href = "/Home/Login"; });
            } else {
                $(".tip-content").text(json.data);
                $("#smallModalClick").modal('show');
                $(".btn-queding").click(function () { location.reload(); });
            }
        })
    })
    $(".btn-authAllDevice").on("click", function () {
        $(this).attr('disabled','disabled');
        var delDeviceArr = [];
        var delDevice = "";
        $(".checkboxTableOnly").each(function (i, e) {
            if ($(e).prop("checked")) {
                delDeviceArr.push($(this).attr("data-id"));
                delDevice += $(this).attr("data-id") + ",";
            }
        });
        if (delDeviceArr.length) {
            $("#authDeviceModal").modal("hide");
            $.post("/api/console/HandleDevice", { token: token, dpids: delDevice, type: 1 }, function (json) {
                if (json.code == 2) {
                    $(".tip-content").text("登录超时，请点击跳转登录页面！");
                    $("#smallModalClick").modal('show');
                    $(".btn-queding").click(function () { location.href = "/Home/Login"; });
                } else {
                    $(".tip-content").text(json.data);
                    $("#smallModalClick").modal('show');
                    $(".btn-queding").click(function () { location.reload(); });
                }
                $(".btn-authAllDevice").removeAttr('disabled');
            })
        }
    })
    $(".btn-disAuthDevice").on("click", function () {
        $(this).attr('disabled','disabled');
        var delDeviceArr = [];
        var delDevice = "";
        $(".checkboxTableOnly").each(function (i, e) {
            if ($(e).prop("checked")) {
                delDeviceArr.push($(this).attr("data-id"));
                delDevice += $(this).attr("data-id") + ",";
            }
        });
        if(delDeviceArr.length){
            $("#authDeviceModal").modal("hide");
            $.post("/api/console/HandleDevice", { token: token, dpids: delDevice, type: 0 }, function (json) {
                if (json.code == 2) {
                    $(".tip-content").text("登录超时，请点击跳转登录页面！");
                    $("#smallModalClick").modal('show');
                    $(".btn-queding").click(function () { location.href = "/Home/Login"; });
                } else {
                    $(".tip-content").text(json.data);
                    $("#smallModalClick").modal('show');
                    $(".btn-queding").click(function () { location.reload(); });
                }
                $(".btn-disAuthDevice").removeAttr('disabled');
            })
        }
    })

    //组内全选反选
    $(".content-box").on("change", ".checkgroup", function () {
        if ($(this).prop("checked")) {
            $(this).parent().parent().parent().find(".checkboxOnly").prop("checked", true);
        } else {
            $(this).parent().parent().parent().find(".checkboxOnly").prop("checked", false);
        }
    });

})

//获取分组
function getGroupList() {
    var _ghtml = "";
    $(".page-header .groupList option").eq(0).siblings().remove();
    $(".form-group .groupList").html(" ");
    $.post("/api/console/GetGroupList", { token: token }, function (json) {
        if (json.code == 1) {
            $(json.data).each(function (i, e) {
                _ghtml += "<option value='" + e.GroupID + "'>" + e.GroupName + "</option>";
            });
            $(".groupList").append(_ghtml);

        }
        //else {
        //    $("#smallModal").find(".tip-content").text(json.data);
        //    $("#smallModal").modal('show');
        //}
    });
}

//删除设备
function deleteDevices() {
    //批量单个删除设备
    var delDeviceArr = [];
    var delDevice = "";
    $(".checkboxOnly").each(function (i, e) {
        if ($(e).prop("checked")) {
            delDeviceArr.push($(this).attr("data-id"));
            delDevice += $(this).attr("data-id") + ",";
        }
    });
    if (delDeviceArr.length) {
        $(".tip-content").text("是否删除所选设备？");
        $("#smallModalClick").modal('show');
        $(".btn-queding").click(function () {
            $('.btn-queding').attr('disabled','disabled');
            $.post("/api/console/DelleteDevice", { token: token, deviceids: delDevice }, function (json) {
                $("#smallModalClick").modal('hide');
                if (json.code == 1) {
                    $("#smallModal").find(".tip-content").text(json.data);
                    $("#smallModal").modal('show');
                    reloadData();  //重载数据
                } else if (json.code == 2) {
                    $(".tip-content").text("登录超时，请点击跳转登录页面！");
                    $("#smallModalClick").modal('show');
                    $(".btn-queding").click(function () { location.href = "/Home/Login"; });
                } else {
                    $("#smallModal").find(".tip-content").text(json.data);
                    $("#smallModal").modal('show');
                }
                $('.btn-queding').removeAttr('disabled');
            });
        });
    } else {
        $("#smallModal").find(".tip-content").text("请先选择设备！");
        $("#smallModal").modal('show');
    }
}

//移动到分组
function moveToGroup() {
    var moveArr = [], move_deviceids = "",  _ghtml = "";
    $(".checkboxOnly").each(function (i, e) {
        if ($(e).prop("checked")) {
            moveArr.push($(this).attr("data-id"));
            move_deviceids += $(this).attr("data-id") + ",";
        }
    });
    if (moveArr.length) {
        //$.post("/api/console/GetGroupList", { token: token }, function (json) {
        //    if (json.code == 1) {
        //        $("#MoveGroupModal").modal('show');
        //        $(json.data).each(function (i, e) {
        //            _ghtml += "<option value='" + e.GroupID + "'>" + e.GroupName + "</option>";
        //        });
        //        $(".groupList").html(_ghtml);
        //    } else {
        //        $("#smallModal").find(".tip-content").text(json.data);
        //        $("#smallModal").modal('show');
        //    }
        //});
        $("#MoveGroupModal").modal('show');
        $(".btn-movegroup").on("click", function () {
            $(this).attr('disabled','disabled');
            $.post("/api/console/MoveGroup", { token: token, groupid: $("#MoveGroupModal .groupList option:selected").val(), deviceids: move_deviceids }, function (json) {
                if (json.code == 1) {
                    $("#MoveGroupModal").modal('hide');
                    $("#smallModal").find(".tip-content").text(json.data);
                    $("#smallModal").modal('show');
                    reloadData();  //重载数据
                } else if (json.code == 2) {
                    $(".tip-content").text("登录超时，请点击跳转登录页面！");
                    $("#smallModalClick").modal('show');
                    $(".btn-queding").click(function () { location.href = "/Home/Login"; });
                } else {
                    $("#smallModal").find(".tip-content").text(json.data);
                    $("#smallModal").modal('show');
                }
                $(".btn-movegroup").removeAttr('disabled');
            });

        });
    } else {
        $("#smallModal").find(".tip-content").text("请先选择设备！");
        $("#smallModal").modal('show');
    }
}


function getUiList(pid) {
    $.post("/api/Console/GetUITableList", { token: token, cloudid: pid }, function (json) {
        if (json.code == 1) {
            var _html = "", data = json.data;
            for (var i = 0; i < data.length; i++) {
                _html += "<option value='" + data[i].UitID + "'>" + data[i].UitName + "</option>";
            }
            $("#select-uitable").html(_html);

            var uitid = $("#select-uitable option:selected").val();
            $("#startTaskModal").on("change", "#select-uitable", function () {
                $("#select-uitable option").each(function (i, e) {
                    if ($(e).prop("selected")) {
                        uitid = $(e).val();
                        initUiElement(uitid, pid);
                    }
                });
            });

            initUiElement(uitid, pid);

        } else if (json.code == 2) {
            $(".tip-content").text("登录超时，请点击跳转登录页面！");
            $("#smallModalClick").modal('show');
            $(".btn-queding").click(function () { location.href = "/Home/Login"; });
        } else {
            $("#smallModal").find(".tip-content").text(json.data);
            $("#smallModal").modal('show');
        }
    });
}

//初始UI表
function initUiElement(uitid, cloudid) {
    //初始ui表
    $(".well-text").text($("#select-script option").eq(0).text() + "脚本启动UI设置");
    //var currentPacid = $("#select-script option").eq(0).attr("data-pcaid");
    $.post("/api/Console/GetUITable", { token: token, uitid: uitid, cloudid: cloudid }, function (json) {
        if (json.code == 1) {
            var data = json.data;
            productElement(data);
            //获取当前选择
            if (json.uisave) {
                currentCheckItem(json.uisave);
            }
        } else if (json.code == 0) {
            $(".form-list").html("<p class='text-center'>您还没有UI数据表！</p>");
        }
    });
}

//生成UI元素
function productElement(data) {
    var data = JSON.parse(data).ui;
    var _html = "", _childRadioHtml = "", _childSelectHtml = "";
    var __html = ""; //折叠的html
    if (!data.length) {
        $(".form-list").html("<p class='text-center'>您还没有UI数据表！</p>");
    } else {
        for (var i = 0; i < data.length; i++){
            if (data[i].type == 1) { //文本
                if (data[i].title) {
                    _html += '<div class="form-group ui-text ui-text' + i + '">'
                       + '<label for="recipient-name" class="control-label col-xs-2" data-name="' + data[i].content + '" style="">' + data[i].title + '</label><div class="col-xs-10">'
                       + '<p style="padding: 10px 10px 10px; background-color: #eee;">' + data[i].default + '</p></div></div>';
                }else{
                    _html += '<div class="form-group ui-text ui-text' + i + '">'
                       + '<label for="recipient-name" class="control-label col-xs-2" data-name="' + data[i].content + '" style="display: none;">' + data[i].title + '</label><div class="col-xs-12">'
                       + '<p style="padding: 10px 10px 10px; background-color: #eee;">' + data[i].default + '</p></div></div>';                    
                }
            }
            if (data[i].type == 4) { //输入
                _html += '<div class="form-group ui-input ui-input' + i + '">'
                        + '<label for="recipient-name" class="control-label col-xs-2" data-name="' + data[i].content + '" style="">' + data[i].title + '</label><div class="col-xs-10">'
                        + '<input type="text" class="form-control" id="" value="' + data[i].default + '" placeholder=""></div></div>';
            }
            if (data[i].type == 2) { //单选
                _childRadioHtml = "";
                var radioVals = data[i].default;
                var radioArr = radioVals.split("|");
                for (var j = 0; j < radioArr.length; j++) {
                    _childRadioHtml += '<label class="radio-inline"><input type="radio" name="inlineRadioOptions' + i + '" class="ui-radio-child ui-radio-child' + i + '" value="' + radioArr[j] + '"> ' + radioArr[j] + '</label>';
                }

                _html += '<div class="form-group ui-radio ui-radio' + i + '">'
                + '<label for="recipient-name" class="control-label col-xs-2" data-name="' + data[i].content + '" style="">' + data[i].title + '</label><div class="col-xs-10">' + _childRadioHtml + '</div></div>';
            }
            if (data[i].type == 3) { //下拉
                _childSelectHtml = "";
                var selectVals = data[i].default;
                var selectArr = selectVals.split("|");
                for (var j = 0; j < selectArr.length; j++) {
                    _childSelectHtml += '<option value="' + selectArr[j] + '">' + selectArr[j] + '</option>'
                }

                _html += '<div class="form-group ui-select ui-select' + i + '">'
                        + '<label for="recipient-name" class="control-label col-xs-2" data-name="' + data[i].content + '" style="">' + data[i].title + '</label><div class="col-xs-10">'
                        + '<select class="form-control ui-select-child ui-select-child' + i + '">' + _childSelectHtml + '</select></div></div>';
            }

            //折叠
            if(data[i].type == 5){
                __html = '<div>' +
                                '<div class="widget-box">' +
                                    '<div class="widget-header">' +
                                        '<h4 class="widget-title">' + data[i].title + '</h4>' +
                                        '<div class="widget-toolbar">' +
                                            '<a href="#" data-action="collapse">' +
                                                '<i class="ace-icon fa fa-chevron-up"></i>' +
                                            '</a>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="widget-body">' +
                                        '<div class="widget-main">' +
                                            _html +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
                _html = "";
                $(".form-list").append(__html); //先追加嵌套内容
            }

        }

        $(".form-list").append(_html); //再追加非嵌套内容

        //console.log(_html);
        //console.log(__html);
        //$(".form-list").html(_html);

        $(".ui-radio>div").each(function (i, e) {
            $("label:first-child input", e).prop("checked", true);
        })
    }
}

//当前选择的ui元素项 control-label
function currentCheckItem(data) {
    var data = JSON.parse(data);

    $("#startTaskModal .form-list div.form-group").each(function (index, item) {
        //console.log($(item));
        var key = $(item).find("label.control-label").attr("data-name");
        var val = data[key];
        if ($(item).has("input[type=text]").length) { //input/text、】
            if (!$(item).has("input[type=text]").find("input[type=text]").attr("readonly")) {
                $(item).has("input[type=text]").find("input[type=text]").val(val);
            }
        }
        if ($(item).has("select").length) {  //select
            var curSelect = $(item).has("select");
            $("option", curSelect).each(function (idx,opt) {
                if($(opt).text() == val){
                    $(opt).prop('selected',true);
                }
            });
        }
        if ($(item).has("input[type=radio]").length) { //radio
            var curRadio = $(item).has("input[type=radio]");
            $("input[type=radio]", curRadio).each(function (idx, rad) {
                if ($(rad).val() == val) {
                    $(rad).prop('checked', true);
                }
            });
        }
    })
}

//获取设备列表
function randerPage(deviceid, gid, uid) {
    $.post("/api/console/GetDeviceList", { token: token, deviceid: (deviceid?deviceid:0), groupid: (gid?gid:0),udid: (uid?uid:""), pagesize: 9999 }, function (json) {
        if (json.code == 1) {
            var strGroup = randerGroup(json.group);
            $(".content-box").append(strGroup);
            var strList = randerList(json.data);
            $(".content-box").append(strList);
        } else if (json.code == 0) {
            $(".content-box").append("<tr><td colspan='9' class='text-center'>暂无数据</td></tr>");
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
//渲染组数据
function randerGroup(datagroup) {
    if (datagroup) {
        var htmlGroup = "";
        $(datagroup).each(function (i, elemt) {
            htmlGroup += '<tr>'
                       + '<td colspan="9" style="padding:8px 0;">'
                       + '<div class="panel panel-default" style="border-left: none;border-right: none;">'
                       + '<div class="panel-heading">'
                       + '<h4 class="panel-title">'
                       + '<input type="checkbox" style="margin-right: 12px;" name="checkgroup" class="checkgroup" data-id="' + elemt.GroupID + '" value=" " />'
                       + '<a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse' + elemt.GroupID + '" aria-expanded="false">'
                       + '<i class="glyphicon glyphicon-plus" data-icon-hide="glyphicon glyphicon-minus" data-icon-show="glyphicon glyphicon-plus"></i>&nbsp;' + elemt.GroupName
                       + '</a></h4></div>'
                       + '<div class="panel-collapse collapse" id="collapse' + elemt.GroupID + '" aria-expanded="false" style="height: 0px;">'
                       + '<div class="panel-body">'
                       + '<div class="table-responsive">'
                       + '<table class="table table-bordered">'
                       + '<tbody class="content-group' + elemt.GroupID + '">'
                       + '</tbody></table></div></div></div></div></td></tr>';
        });
        return htmlGroup;
    }
}
//渲染列表数据
function randerList(datalist) {
    var htmlList = "", htmlHasGroup = "", Status = "";
    if (datalist) {
        $(datalist).each(function (i, elem) {
            if (elem.GroupID > 0) {
                htmlHasGroup = '<tr>'
                      + '<td><input type="checkbox" name="checkbox" class="checkboxOnly" data-id="' + elem.DeviceID + '" value="" /></td>'
                       + '<td>' + elem.DeviceID + '</td>'
                      + '<td>' + elem.UDID + '</td>'
                      + '<td>' + elem.Remark + '</td>'
                      + '<td>' + elem.IP + '</td>'
                      + '<td>' + elem.Status + '</td>'
                      + '<td>' + elem.Online + '</td>'
                      + '<td>' + elem.ProjectName + '</td>'
                      + '<td>' + elem.GroupName + '</td>'
                      + '</tr>';
                $(".content-group" + elem.GroupID).append(htmlHasGroup);
            } else {
                htmlList += '<tr>'
                      + '<td><input type="checkbox" name="checkbox" class="checkboxOnly" data-id="' + elem.DeviceID + '" value="" /></td>'
                       + '<td>' + elem.DeviceID + '</td>'
                      + '<td>' + elem.UDID + '</td>'
                      + '<td>' + elem.Remark + '</td>'
                      + '<td>' + elem.IP + '</td>'
                      + '<td>' + elem.Status + '</td>'
                      + '<td>' + elem.Online + '</td>'
                      + '<td>' + elem.ProjectName + '</td>'
                      + '<td>' + elem.GroupName + '</td>'
                      + '</tr>';
            }

        });
        return htmlList;
    }
}

//操作后重载数据
function reloadData() {
    $(".content-box").html("");
    randerPage();
}

//渲染授权数据
function willAuthDevices() {
    $("#authDeviceModal").modal("show");
    $.post("/api/console/GetDevicePending", { token: token, dpid: 0, pagesize: 999 }, function (json) {
        if (json.code == 1) {
            var datalist = json.data;
            var htmlList = "";
            if (datalist) {
                $(datalist).each(function (i, elem) {
                    htmlList += '<tr>'
                              + '<td><input type="checkbox" name="checkbox" class="ace checkboxTableOnly" data-id="' + elem.DpID + '" value="" /> <span class="lbl"></span></td>'
                              + '<td>' + elem.DpID + '</td>'
                              + '<td>' + elem.UDID + '</td>'
                              + '<td>' + elem.CreateTime + '</td>'
                              + '<td style="width:90px;"><div class="btn-group my-btn-g" data-id="'+elem.DpID+'">'
                                  + '<button class="btn btn-minier btn-success btn-auth">授权</button><button class="btn btn-minier btn-danger btn-reject">拒绝</button></div></td>'
                              + '</tr>';
                });
                $(".auth-box").html(htmlList);
            }
        } else if (json.code == 2) {
            $("#authDeviceModal").modal("hide");
            $(".tip-content").text("登录超时，请点击跳转登录页面！");
            $("#smallModalClick").modal('show');
            $(".btn-queding").click(function () { location.href = "/Home/Login"; });
        } else if (json.code == 0) {
            $(".auth-box").html("<tr><td colspan='5'align='center'>暂无数据！</td></tr>");
        } else {
            $("#authDeviceModal").modal("hide");
            $("#smallModal").find(".tip-content").text(json.data);
            $("#smallModal").modal('show');
        }
    })
}