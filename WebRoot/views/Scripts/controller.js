//注入http服务
routingDemoApp.controller('InnerIndexController', ['$scope', '$http', function ($scope, $http) {
    $scope.pageClass = 'page-home';

    //初始进入应用中心显示项目列表数据
    //配置
    $scope.count = 0;
    $scope.p_pernum = 5; //每页显示个数
    //变量  
    $scope.p_current = 1;
    $scope.p_all_page = 0;
    $scope.pages = [];
    var _get = function (page, size, callback) {
        $http({
            method: 'post',
            url: '/api/project/GetProjectList',
            data: { token: token, pindex: page, pagesize: size }
        }).then(function (json) {
            var obj = json.data;
            if (obj.code == 1) {
                $scope.data = obj.data; //得到请求的项目列表数据
                $scope.count = json.data.Count;  //总计
                $scope.pageCount = json.data.pageCount; //页总数
                $scope.p_current = page;  //当前页
                $scope.p_all_page = json.data.pageCount; //页总数 
                //reloadPno();
                callback();
            } else if (obj.code == 0) {
                //tip(obj.data);
            } else if (obj.code == 2) {
                OtherPlace();
            }
        });
    };
    //初始第一页
    _get($scope.p_current, $scope.p_pernum, function () { });

    $("#recharge").on("click", function () {
        $("#tiXianModal").modal('toggle');
    });

    $scope.vipShow = function () {
        $(".pay").show();
        $(".open-mask").show();
        $(".dialogs-box").show();
        $(".FixedPopupMask").show();
    };
    
}]);

//项目列表控制器

routingDemoApp.controller('ProjectController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    //配置  
    $scope.count = 0;
    $scope.p_pernum = 12;
    //变量  
    $scope.p_current = 1;
    $scope.p_all_page = 0;
    $scope.pages = [];
    //验证类型...
    var v_type = $location.search().type
    $scope.verifytype = parseInt(v_type ? v_type : 0);
    console.log($scope.verifytype);
    //初始化第一页
    $(".FixedPopup").show();
    var _get = function (page, size, callback) {
        $http({
            method: 'post',
            url: '/api/project/GetProjectList',
            data: { token: token, type: $scope.verifytype, pindex: page, pagesize: size }
        }).then(function (json) {
            $(".FixedPopup").hide();
            //成功时执行

            if (json.data.code == 2) {
                OtherPlace();
            } else if (json.data.code == 1) {
                var num = 0;
                var obj = json.data;
                if (!obj) { return false; }
                $.each(obj.data, function (i, item) {
                    if (item.Billing == 1) {
                        item.BillingName = "包月模式";
                    } else if (item.Billing == 2) {
                        item.BillingName = "扣点模式";
                    } else {
                        item.BillingName = "扣时模式";
                    }
                    if (item.Effective) {
                        item.Effective = "正常";
                    } else {
                        item.Effective = "停用";
                    }
                    if (item.ReBindType == 0) {
                        item.ReBindType = false;
                    } else {
                        item.ReBindType = true;
                    }
                    if (item.TrialType == 0) {
                        item.TrialType = false;
                    } else {
                        item.TrialType = true;
                    }
                    num += item.Devices;
                });
                $scope.num = num;
                $scope.data = obj.data; //得到请求的数据
                $scope.count = json.data.Count;
                $scope.pageCount = json.data.pageCount;
                $scope.p_current = page;
                $scope.p_all_page = json.data.pageCount;
                reloadPno();
                callback();
            } else if (json.data.code == 0) {
                $("#table").hide();
                $(".pagination").hide();
                //$("#table-bottom").hide();
                $("#table-bottom2").show();
            }
        }, function (json) {
            //失败时执行 
            $(".FixedPopup").hide();
            tip("网络连接错误！");
        });
    }

    _get($scope.p_current, $scope.p_pernum, function () { });

    //全选

    var selectAll = true;
    $scope.selectAll = function () {
        if (selectAll) {
            $(".check").prop("checked", "checked");
            selectAll = false;
        } else {
            $(".check").removeProp("checked");
            selectAll = true;
        }
    }
    //删除项目  
    $scope.del = function (id) {
        shanchu(id)
    }
    //首页  
    $scope.p_index = function () {
        $scope.load_page(1);
    }
    //尾页  
    $scope.p_last = function () {
        $scope.load_page($scope.p_all_page);
    }
    //上一页
    $scope.p_prev = function () {
        var page = $(".pagination").find("li.active").text();//获取当前页数
        var _page = parseInt(page) - 1;
        if (_page >= 1) {
            _get(_page, $scope.p_pernum, function () { });
        }
    }
    //下一页
    $scope.p_next = function () {
        var page = $(".pagination").find("li.active").text();//获取当前页数
        var _page = parseInt(page) + 1;
        if (_page <= $scope.p_all_page) {
            _get(_page, $scope.p_pernum, function () { });
        }
    }
    //加载某一页  
    $scope.load_page = function (page) {
        _get(page, $scope.p_pernum, function () { });
    };
    //加载指定页 
    $scope.select_load_page = function () {
        var page = $("#selectPage").val();
        _get(page, $scope.p_pernum, function () { });
    }
    //初始化页码  
    var reloadPno = function () {
        $scope.pages = calculateIndexes($scope.p_current, $scope.p_all_page, 4);
    };
    //分页算法  
    var calculateIndexes = function (current, length, displayLength) {
        var indexes = [];
        var start = Math.round(current - displayLength / 2);
        var end = Math.round(current + displayLength / 2);
        if (start <= 1) {
            start = 1;
            end = start + displayLength - 1;
            if (end >= length - 1) {
                end = length - 1;
            }
        }
        if (end >= length - 1) {
            end = length;
            start = end - displayLength + 1;
            if (start <= 1) {
                start = 1;
            }
        }
        for (var i = start; i <= end; i++) {
            indexes.push(i);
        }
        return indexes;
    };
    //删除项目
    function shanchu(id) {
        javascript: $('body').dialog({
            title: "请输入登录密码",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'defalut' }],
            isInput: true,
            inputPlaceholder: "",
            inputType: "password",
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
                $(".FixedPopup").show();
                if (ret.input.value == "") {
                    userpass = parseInt(ret.input.value);
                } else {
                    userpass = ret.input.value;
                }
                $.post("/api/Project/DeleteProject", { token: token, projectid: id, userpass: userpass }, function (json) {
                    $(".FixedPopup").hide();
                    if (json.code == 2) {
                        OtherPlace()
                    } else if (json.code == 1) {
                        tip("删除成功!");
                        _get($scope.p_current, $scope.p_pernum, function () { });
                    } else {
                        _get($scope.p_current, $scope.p_pernum, function () { });
                        tip(json.data);
                    }
                });
            };
        });
    }
    //点击其他地方下拉框消失


    //新分页


    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });
}]);


//项目详情控制器

routingDemoApp.controller('ProjectDetailsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var ProjectID = $location.search().ProjectID;
    var v_type = $location.search().type;
    $("#ProjectName").attr("data-str", ProjectID);
    $(".FixedPopup").show();
    $http({
        method: 'post',
        url: '/api/Project/ProjectDetails',
        data: { token: token, projectid: ProjectID, },
        cache: false
    }).then(function (json) {
        $(".FixedPopup").hide();
        //成功时执行
        if (json.data.code == 2) {
            OtherPlace();
        } else if (json.data.code == 1) {
            $scope.data = json.data.data[0]; //得到请求的数据
            $scope.apisdata = json.data.apis;
            var platformid = json.data.data[0].PlatformID;
            if ($scope.data.TrialType == 0) {
                $("#TtyBoxUnit-input").hide();
                $("#TtyBoxUnit").hide();
                $("#TtyBoxUnit").html("");
            } else {
                $("#TtyBoxUnit-input").show();
                $("#TtyBoxUnit").show();
                if ($scope.data.TrialType == 1) { $("#TtyBoxUnit").html("时"); } else if ($scope.data.TrialType == 2) { $("#TtyBoxUnit").html("秒"); } else { $("#TtyBoxUnit").html("次"); }
            }
            if ($scope.data.TrialName != "无") {
                $("#TryMask").hide();
                $("#TryFlag").css({ "right": "11px" });
            } else {
                $("#TryMask").show();
                $("#TryFlag").css({ "right": "33px" });
            }
            if ($scope.data.Billing == 1 || $scope.data.Billing == 0) {
                $("#ChargBox-input").val("包月模式");
                $("#DianInput").hide();
                $("#DianUnit").hide();
                $("#ChargIntroduce").html("说明：该模式按时长激活，在激活时间内无限制无限次使用。");
            } else if ($scope.data.Billing == 2) {
                $("#ChargBox-input").val("扣点模式");
                $("#DianInput").show();
                $("#DianUnit").show();
                $("#ChargIntroduce").html("说明：该模式按设备验证/用户登录扣点，每次扣除点数由作者设定，在点数扣完之前可无限次使用。");
            } else {
                $("#ChargBox-input").val("扣时模式");
                $("#DianInput").hide();
                $("#DianUnit").hide();
                $("#ChargIntroduce").html("说明：根据用户启动时间来进行扣时计费（单位为分钟）。");
            }
            if ($scope.data.EnableInvite == false) {
                $("#InvitationMask").show();
                $("#InvitationFlag").css({ "right": "33px" });
            } else {
                $("#InvitationMask").hide();
                $("#InvitationFlag").css({ "right": "11px" });
            }
           
            if ($scope.data.FileUpdate == false) {
                $("#UpdateMask").show();
                $("#UpdateFlag").css({ "right": "33px" });
            } else {
                $("#UpdateMask").hide();
                $("#UpdateFlag").css({ "right": "11px" });
            }
            if ($scope.data.ReBindType == 0) {
                $("#huanbang").hide();
                $("#huanbangUnit").hide();
                $("#huanbang-input").val("不开启");
            } else {
                $("#huanbang").show();
                $("#huanbangUnit").show();
                if ($scope.data.ReBindType == 1) {
                    $("#huanbang-input").val("扣除固定值");
                    if ($scope.data.Billing == 1) {
                        $("#huanbangUnit").html("小时");
                    } else {
                        $("#huanbangUnit").html("点");
                    }
                    $("#huanbangUnit").html();
                } else if ($scope.data.ReBindType == 2) {
                    $("#huanbang-input").val("按百分比扣除");
                    $("#huanbangUnit").html("%");
                } else {
                    $("#huanbangUnit").html("次");
                    $("#huanbang-input").val("限制次数");
                }
            }
            if ($scope.data.Effective) {
                $("#jinyong").show();
                $("#qiyong").hide();
            } else {
                $("#jinyong").hide();
                $("#qiyong").show();
            }
            if ($scope.data.PlatformName == "XXTouch") {
                $("#qrcode").show();
            } else {
                $("#qrcode").hide();
            }
            if ($scope.data.PlatformName == "Xscript") {
                $("#xsqrcode").show();
            } else {
                $("#xsqrcode").hide();
            }
            //执行js
            //首先获取详情
            //getProjectDetails();

            //显示图标文件
            $("#StoreLogo").attr("src", json.data.data[0].File);

            //语言和平台执行联动
            $("#pingtai-box").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera   
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE   
                    window.event.cancelBubble = true;
                }
                $(this).find("ul").show();
            });
            $("#pingtai-box").bind({
                "click": function (event) {
                    if (event.target.tagName == "LI") {
                        $(this).find("input").val($(event.target).text()); //传具体的文字
                        $(this).find("input").attr("str", $(event.target).attr("data-value"));
                        $(this).find("input").css({
                            "color": "#000000"
                        });
                        $(this).find("ul").hide();
                        var str = $(event.target).attr("data-value");
                        GetPlatform(str);
                        $("#banben-input").val("请选择平台");
                        $("#banben-input").attr("str", "");
                        $("#banben-input").css({
                            "color": "#757575"
                        });
                    }
                }
            });

            $("#banben-box").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera   
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE   
                    window.event.cancelBubble = true;
                }
                $(this).find("ul").show();

            });
            $("#banben-box").bind({
                "click": function (event) {
                    if (event.target.tagName == "LI") {
                        BanbenStatus = 1;
                        $(this).find("input").val($(event.target).text()); //传具体的文字
                        $(this).find("input").attr("str", $(event.target).attr("data-value"));
                        $(this).find("input").css({
                            "color": "#333333"
                        });
                        $(this).find("ul").hide();
                    }
                }
            });

            var langID = 1;
            GetLang();

            $("#pingtai li").on("click", function (e) {
                var str = $(this).attr("value");
                BanbenStatus = 0;
                GetPlatform(str);
                //e.stopPropagation();
            });
            //语言和平台执行联动结束

            //激活码按钮点击跳转激活码页面
            $("#jihuoma").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera   
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE   
                    window.event.cancelBubble = true;
                }
                location.href = "#/AuthCode?ProjectID=" + ProjectID + "&ProjectName=" + $("#ProjectName").val() + "&type=" + v_type;
            });

            //换绑选择
            $("#huanbang-box").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera   
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE   
                    window.event.cancelBubble = true;
                }
                $(this).find("ul").show();
            });

            //批量授权激活码
            $("#bindCode").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera   
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE   
                    window.event.cancelBubble = true;
                }
                //location.href = "/Open/AuthCodeVol?appid=" + $scope.data.AppID;
                window.open("/Open/AuthCodeVol?appid=" + $scope.data.AppID + "&type=" + v_type, "_blank");
            });
            
            //更换激活码绑定
            $("#changeCode").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera   
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE   
                    window.event.cancelBubble = true;
                }
                //location.href = "/Open/RebindCode?appid=" + $scope.data.AppID;
                window.open("/Open/RebindCode?appid=" + $scope.data.AppID + "&type=" + v_type, "_blank");
            });
            $("#huanbang-box").bind({
                "click": function (event) {
                    if (event.target.tagName == "LI") {
                        $(this).find("input").val($(event.target).text()); //传具体的文字
                        $(this).find("input").attr("str", $(event.target).attr("data-value"));
                        $(this).find("input").css({
                            "color": "#333333"
                        });
                        $(this).find("ul").hide();
                        if ($("#huanbang-input").attr("str") == 0) {
                            $("#huanbang").hide();
                            $("#huanbangUnit").hide();
                        } else {
                            $("#huanbang").show();
                            $("#huanbangUnit").show();
                        }

                        if ($(this).find("input").attr("str") == 1) {
                            if ($scope.data.Billing == 1) {
                                $("#huanbangUnit").html("小时");
                            } else {
                                $("#huanbangUnit").html("点");
                            }
                        } else if ($(this).find("input").attr("str") == 2) {
                            $("#huanbangUnit").html("%");
                        } else {
                            $("#huanbangUnit").html("次");
                        }

                    }
                }
            });
            //换绑选择结束
            //联系方式选择
            $("#lianxi-box").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE   
                    window.event.cancelBubble = true;
                }
                $(this).find("ul").show();
            });
            $("#lianxi-box").bind({
                "click": function (event) {
                    if (event.target.tagName == "LI") {
                        LxfsStatus = 1;
                        $(this).find("input").val($(event.target).text()); //传具体的文字
                        $(this).find("input").attr("str", $(event.target).attr("data-value"));
                        $(this).find("input").css({
                            "color": "#333333"
                        });
                        $(this).find("ul").hide();
                    }
                }
            });
            //联系方式选择结束

            //试用方式选择
            $("#TtyBox").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera   
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE   
                    window.event.cancelBubble = true;
                }
                $(this).find("ul").show();
            });
            $("#TtyBox").bind({
                "click": function (event) {
                    if (event.target.tagName == "LI") {;
                        $(this).find("input").val($(event.target).text()); //传具体的文字
                        $(this).find("input").attr("data-str", $(event.target).attr("data-value"));
                        $(this).find("input").css({
                            "color": "#333333"
                        });
                        $(this).find("ul").hide();
                        if ($(event.target).attr("data-value") == 0) {
                            $("#TtyBoxUnit").hide();
                            $("#TtyBoxUnit-input").hide();
                        } else if ($(event.target).attr("data-value") == 1) {
                            $("#TtyBoxUnit").show();
                            $("#TtyBoxUnit-input").show();
                            $("#TtyBoxUnit").html("时");
                        } else if ($(event.target).attr("data-value") == 2) {
                            $("#TtyBoxUnit").show();
                            $("#TtyBoxUnit-input").show();
                            $("#TtyBoxUnit").html("秒");
                        } else {
                            $("#TtyBoxUnit").show();
                            $("#TtyBoxUnit-input").show();
                            $("#TtyBoxUnit").html("次");
                        }
                    }
                }
            });
            //试用方式选择结束

            //试用和邀请开关功能
            var TryFlag;
            if ($("#TryFlag").attr("data-str") == 0) { TryFlag = false } else { TryFlag = true }
            $("#TryFlag").click(function () {
                if (TryFlag) {
                    TryFlag = false;
                    $("#TryMask").show();
                    $(this).animate({ right: "33px" });
                } else {
                    TryFlag = true;
                    $("#TryMask").hide();
                    $(this).animate({ right: "12px" });
                }
            });
            var UpdateFlag = $scope.data.FileUpdate;
            $("#UpdateFlag").click(function () {
                if (UpdateFlag) {
                    UpdateFlag = false;
                    $("#UpdateMask").show();
                    $(this).animate({ right: "33px" });
                } else {
                    UpdateFlag = true;
                    $("#UpdateMask").hide();
                    $(this).animate({ right: "12px" });
                }
            });
            var ChangeFlag;
            if ($("#ChangeFlag").attr("data-str") == 0) { ChangeFlag = false } else { ChangeFlag = true }
            $("#ChangeFlag").click(function () {
                if (ChangeFlag) {
                    ChangeFlag = false;
                    $("#ChangeMask").show();
                    $(this).animate({ right: "33px" });
                } else {
                    ChangeFlag = true;
                    $("#ChangeMask").hide();
                    $(this).animate({ right: "12px" });
                }
            });
            var InvitationFlag = $scope.data.EnableInvite;
            $("#InvitationFlag").click(function () {
                if (InvitationFlag) {
                    InvitationFlag = false;
                    $("#InvitationMask").show();
                    $(this).animate({ right: "33px" });
                } else {
                    InvitationFlag = true;
                    $("#InvitationMask").hide();
                    $(this).animate({ right: "12px" });
                }
            });
            //邀请和开关功能结束


            //页面所有输入框的blur检测

            function CheckChinese(val) {
                var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                if (reg.test(val)) {
                    ProjectStatus = 1;
                } else {
                    ProjectStatus = 0;
                }
            }
            $("#ProjectName").on("blur", function () {
                CheckChinese($("#ProjectName").val());
            });

            $("#ProjectVesion").on("keyup", function () {
                var val = $(this).val();
                if (val.length == 1) {
                    var newval = $(this).val(val.replace(/[^1-9|.]/g, ''))
                } else {
                    var newval = $(this).val(val.replace(/[^0-9|.]/g, ''))
                }
            });

            $("#HttpCode").on("keyup", function () {
                var val = $(this).val();
                var newval = $(this).val(val.replace(/\W/g, ''))
                $(this).val(newval.val().substr(0, 16))
            });

            $("#DianInput").keyup(function () {
                var val = $(this).val();
                if (val.length == 1) {
                    var newval = $(this).val(val.replace(/[^1-9]/g, ''))
                } else {
                    var newval = $(this).val(val.replace(/[^0-9]/g, ''))
                }
            });
            $("#gessday").keyup(function () {
                var val = $(this).val();
                $(this).val(val.replace(/[^0-9]/g, ''))
            });
            $("#reachDay").keyup(function () {
                var val = $(this).val();
                $(this).val(val.replace(/[^0-9]/g, ''))
            });
            $("#reachtimes").keyup(function () {
                var val = $(this).val();
                $(this).val(val.replace(/[^0-9]/g, ''))
            });
            //页面所有输入框的blur检测结束


            //软件更新盒子
            $("#GengxinButton").click(function () {
                $("#GengxinBox").show();
            });
            //软件更新盒子结束

            //禁用启用项目
            $("#jinyong").click(function () {
                jinyong("确定要禁用此项目吗？");
            });
            $("#qiyong").click(function () {
                qiyong("确定要启用此项目吗？");
            });
            //禁用启用项目结束

            //点击生成秘钥
            $("#shengcheng").unbind("click");
            $("#shengcheng").on("click", function () {
                $.post("/api/Project/GenHttpKey", { token: token }, function (json) {
                    $("#HttpCode").html("");
                    $("#HttpCode").html(json.data);
                })
            });

            //点击保存修改
            var ProjectStatus = 1;
            var BanbenStatus = 1;
            $("#fabu").click(function () {
                $("#ProjectName").blur();
                //debugger;
                if (ProjectStatus == 0 || $("#ProjectVesion").val() == "" || BanbenStatus == 0 || $("#HttpCode").text() == "" || $("#LianxiNumber").val() == "") {
                    if (ProjectStatus == 0) {
                        tip("项目名称必须包含中文！");
                    } else if ($("#ProjectVesion").val() == "") {
                        tip("版本号不能为空！");
                    } else if (BanbenStatus == 0) {
                        tip("平台不能为空！");
                    } else if ($("#HttpCode").val() == "") {
                        tip("http密钥不能为空！");
                    } else if ($("#LianxiNumber").val() == "") {
                        tip("联系号码不能为空！");
                    }
                } else {
                    $("#Create").css({ "color": "#cccccc" });
                    $("#Create").val("正在保存..");
                    $("#Create").attr("disabled", "disabled");
                    $(".FixedPopupTransparent").show();
                    var rebind = $("#huanbang-input").attr("str");
                    var rebindLoss = $("#huanbang").val();
                    if (rebind == 2) {
                        rebindLoss = rebindLoss / 100;
                    }
                    var newobj = {
                        token: token, sessionid: $("#sessionid").val(),
                        pname: $("#ProjectName").val(),
                        projectid: $("#ProjectName").attr("data-str"),
                        version: $("#ProjectVesion").val(),
                        platformid: $("#banben-input").attr("str"),
                        remark: $("#remark").val(),
                        contactType: $("#contactType").attr("str"),
                        contact: $("#LianxiNumber").val(),
                        trialType: $("#TtyBox-input").attr("data-str"),
                        trialTime: $("#TtyBoxUnit-input").val(),
                        invite: InvitationFlag,
                        gessday: $("#gessday").val(),
                        reachDay: $("#reachDay").val(),
                        reachtimes: $("#reachtimes").val(),
                        httpkey: $("#HttpCode").text(),
                        fileupdate: UpdateFlag,
                        fileid: $("#FileID").val(),
                        rebind: $("#huanbang-input").attr("str"), //换绑方式
                        rebindLoss: rebindLoss,  //换绑损耗
                        costpoint: $("#DianInput").val()
                    };
                    $.post("/api/Project/ModifyProject", newobj, function (json) {
                        $("#Create").css({ "color": "#ffffff" });
                        $("#Create").val("保存修改");
                        $("#Create").removeAttr("disabled");
                        $(".FixedPopupTransparent").hide();
                        if (json.code == 2) {
                            OtherPlace();
                        } else if (json.code == 1) {
                            tip(json.data, 1);
                            $(".reload").on("click", function () {
                                //window.location.reload();
                                window.history.go(-1);
                            });
                        } else if (json.code == 5) {
                            tip(json.data);
                            $(".danger").on("click", function () {
                                $(".dialogs-box").show();
                                $(".FixedPopupMask").show();
                            })
                        } else {
                            tip(json.data);
                        }
                    });
                }
            });
            //点击保存修改结束

            //版本更新开始
            $('.gxbb').unbind("click");
            $('.gxbb').click(function () {
                //判断有无flash
                var fls = flashChecker();
                var s = "";
                if (platformid == 2) {
                    $("#dabaoBox").show();                                 
                }             
                if (!fls.f) {
                    if (confirm("您的浏览器未安装Flash插件，现在安装？")) {
                        window.location.href = "http://get.adobe.com/cn/flashplayer/";
                    }
                }
                //提示开启flash
                $(".FixedPopupMask").show();
                $("#GengxinBox").show();
                $(".tjbc").hide();
                $("#newBanben").val($("#ProjectVesion").val());
                
                $('#btn_upload').uploadify({  //**********
                    auto: true,
                    uploader: '/api/Project/UploadScriptFile',// 服务器处理地
                    swf: '/Plugin/uploadify/uploadify.swf',
                    buttonText: "选择文件",                  //按钮文字
                    height: 28,                             //按钮高度
                    width: 104,                              //按钮宽度
                    queueID: 'fileQueue',
                    fileSizeLimit: "25600KB",
                    fileTypeDesc: "请选择图片文件",           //文件说明   
                    //formData: { "token": token, "projectid": $("#ProjectName").attr("data-str"), "version": $("#newBanben").val(), "inpXpa": $("#xpa").is(":checked") }, //提交给服务器端的参数                  
                    onUploadStart: function (file) {
                        $("#btn_upload").uploadify("settings", "formData", { "token": token, "projectid": $("#ProjectName").attr("data-str"), "version": $("#newBanben").val(), "inpXpa": $("#xpa").is(":checked") });
                    },
                    onUploadSuccess: function (file, data, response) {   //一个文件上传成功后的响应事件处理

                        $("#submit").val("提交");
                        $("#submit").css({ "color": "#ffffff" });

                        var json = $.parseJSON(data);
                        if (json.code == 2) {
                            OtherPlace();
                        } else if (json.code == 1) {
                            $("#FileID").val(json.FileID);
                            $("#ProjectVesion").val($("#newBanben").val());
                            $("#FileUrl").html(json.FileUrl);
                            $(".FixedPopupMask").hide();
                            $("#GengxinBox").hide();
                            $(".uploadify-queue-item").hide();
                            tip('上传成功！');
                        } else {
                            tip(json.data);
                        }
                    },
                    //onSelectError: function (file, errorCode, errorMsg) {
                    //    console.log(errorCode, errorMsg);
                    //}
                    'overrideEvents': ['onDialogClose', 'onUploadError', 'onSelectError'],
                    onSelectError: function (file, errorCode, errorMsg) {
                        $("#submit").val("提交保存");
                        $("#submit").css({ "color": "#ffffff" });
                        switch (errorCode) {
                            case -100:
                                tip("上传的文件数量已经超出系统限制的" + $('#btn_upload').uploadify('settings', 'queueSizeLimit') + "个文件！");
                                break;
                            case -110:
                                tip("文件 [" + file.name + "] 大小超出系统限制的" + $('#btn_upload').uploadify('settings', 'fileSizeLimit') + "大小！");
                                break;
                            case -120:
                                tip("文件 [" + file.name + "] 大小异常！");
                                break;
                            case -130:
                                tip("文件 [" + file.name + "] 类型不正确！");
                                break;
                        }
                    }
                });
                //默认本地上传
                $("#submit").click(function () {
                    $("#submit").val("提交中..");
                    $("#submit").css({ "color": "#cccccc" });                    
                    if (document.getElementById("xpa").checked) {
                        $("#apxInp").val(1);
                    }
                    //$('#btn_upload').uploadify('upload'); //**********
                });          
                $(".close-gbox").click(function () {
                    $("#GengxinBox").hide();
                    $(".FixedPopupMask").hide();
                });
            })
            //版本更新结束


            //生成API
            $scope.isSelect = 0;
            $scope.selectMe = function ($index,event) {
                $scope.isSelect = $index;
                e = event.target;
                $(e).addClass("active-item").siblings().removeClass("active-item");
                var _index = $(e).attr("data-item");
                $(".textarea-group").find(".box-content").eq(_index).show().siblings().hide();
            }
            $("#API").click(function () {
                $("#API-box").show();
                $(".FixedPopupMask").show();
                 //$.post("/api/Project/GenAPICode", { platformid: platformid, appid: $("#AppID").val(), httpkey: $("#HttpCode").val(), version: $("#ProjectVesion").val() }, function (json) {
                //    $(".box-content").empty();
                //    if (json.code == 1) {
                //        $.each(json.data, function (i, item) {
                //            $(".box-content").append(item + "\r\n");
                //        });
                //    } else {
                //        $(".box-content").html("暂无");
                //    }
                //});
            });
            //关闭API
            $("#close").click(function () {
                $("#API-box").hide();
                $(".FixedPopupMask").hide();
            });
            //生成API结束

            //关闭二维码input
            $("#QRcode-close").click(function () {
                $("#QRcode").hide();
                $(".FixedPopupMask").hide();
            });

            //Xs二维码
            $("#xsqrcode").on("click", function () {
                $("#xsQRcode").show();
                $(".FixedPopupMask").show();
            })
            $("#xsQRcode-close").click(function () {
                $("#xsQRcode").hide();
                $(".FixedPopupMask").hide();
            });

            //生成二维码
            $(".shengcheng").click(function () {
                if ($("#FileUrl").html() == "" || $("#Script-Name").val() == "") {
                    if ($("#FileUrl").html() == "") {
                        $("#shengcheng-tip").html("找不到文件，请先到文件更新上传文件！");
                    } else {
                        $("#shengcheng-tip").html("请输入脚本名称！");
                    }
                } else {
                    $(this).css({
                        "color": "#cccccc"
                    });
                    $("#QRcode-img").html("");
                    $("#QRcode-img").append($("<img>").attr("src", "/Index/QRCode?file=" + $("#Script-Name").val() + $("#Script-Edition").html() + "&url=" + $("#FileUrl").html() + ""));
                    var wait = 10;
                    function time() {
                        if (wait == 0) {
                            $(".shengcheng").css({
                                "color": "#ffffff"
                            });
                            $(".shengcheng").val("生成");
                            wait = 10;
                            $(".shengcheng").removeAttr("disabled");
                        } else {
                            $(".shengcheng").attr("disabled", "disabled");
                            $(".shengcheng").val("重新生成(" + wait + ")");
                            wait--;
                            setTimeout(function () {
                                time()
                            },
                            1000)
                        }
                    }
                    time();
                }
            });
            $("#Script-Name").focus(function () {
                $("#shengcheng-tip").html("");
            });
            //生成xs二维码
            $(".xsshengcheng").click(function () {
                if ($("#FileUrl").html() == "") {
                    $("#xsshengcheng-tip").html("找不到文件，请先到文件更新上传文件！");
                    setTimeout(function () { $("#xsshengcheng-tip").html(""); }, 2000);
                } else {
                    $(this).css({
                        "color": "#cccccc"
                    });
                    $("#xsQRcode-img").html("");
                    $("#xsQRcode-img").append($("<img>").attr("src", "/Index/QRCodeXs?url=" + $("#FileUrl").html() + ""));
                    var wait = 10;
                    function time() {
                        if (wait == 0) {
                            $(".xsshengcheng").css({
                                "color": "#ffffff"
                            });
                            $(".xsshengcheng").val("生成");
                            wait = 10;
                            $(".xsshengcheng").removeAttr("disabled");
                        } else {
                            $(".xsshengcheng").attr("disabled", "disabled");
                            $(".xsshengcheng").val("重新生成(" + wait + ")");
                            wait--;
                            setTimeout(function () {
                                time()
                            },
                            1000)
                        }
                    }
                    time();
                }
            });
            $("#xsScript-Name").focus(function () {
                $("#xsshengcheng-tip").html("");
            });
            //执行JS结束
            //执行JS结束
        } else if (json.data.code == 0) {
            tip(json.data.data);
        }
    }, function (json) {
        //失败时执行
        $(".FixedPopup").hide();
        tip("网络连接错误！");
    });

    //生成二维码

    $("#qrcode").click(function () {
        $("#shengcheng-tip").html("");
        $("#QRcode").show();
        $(".FixedPopupMask").show();
        $("#Script-Edition").html("[" + $("#ProjectVesion").val() + "].xxt");
    });

    //语言和平台执行联动

    function GetLang() {
        $("#pingtai").empty();
        $.getJSON("/api/Project/GetLanguageList", function (json) {
            if (json.code == 1) {
                $.each(json.data, function (i, item) {
                    $("#pingtai").append("<li data-value=" + item["LangID"] + ">" + item["LangName"] + "</li>");
                });
            }
        });
    }
    function GetPlatform(langID) {
        $("#banben").empty();
        $.getJSON("/api/Project/GetPlatformList", { langID: langID }, function (json) {
            if (json.code == 1) {
                $.each(json.data, function (i, item) {
                    $("#banben").append("<li data-value=" + item["PlatformID"] + ">" + item["PlatformName"] + "</li>");
                });
            }
        });
    }
    //初始进入详情 不用语言和平台二级联动
    setTimeout(function () {
        GetPlatform($("#pingtai-box").find("input").attr("data-langid"));
    }, 500);
    //语言和平台执行联动结束
    
    //创建项目成功后跳转至项目页

    function tipProject(discription) {
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }],
            discription: discription,
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) { if (ret.index === 0) { location.href = "#/Project" }; });
    }
    //创建项目成功后跳转至项目页结束


    //有无flash插件
    function flashChecker() {
        var hasFlash = 0;　　　　 //是否安装了flash
        var flashVersion = 0;　　 //flash版本

        if (document.all) {
            var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (swf) {
                hasFlash = 1;
                VSwf = swf.GetVariable("$version");
                flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
            }
        } else {
            if (navigator.plugins && navigator.plugins.length > 0) {
                var swf = navigator.plugins["Shockwave Flash"];
                if (swf) {
                    hasFlash = 1;
                    var words = swf.description.split(" ");
                    for (var i = 0; i < words.length; ++i) {
                        if (isNaN(parseInt(words[i]))) continue;
                        flashVersion = parseInt(words[i]);
                    }
                }
            }
        }
        return { f: hasFlash, v: flashVersion };
    }
    //有无flash插件结束

    //禁用项目
    function jinyong(discription) {
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
            discription: discription,
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
                $(".FixedPopup").show();
                $.post("/api/Project/EnableProject", { token: token, projectid: ProjectID, effective: false }, function (json) {
                    $(".FixedPopup").hide();
                    if (json.code == 1) {
                        tip(json.data);
                        $("#jinyong").hide();
                        $("#qiyong").show();
                    } else {
                        tip(json.data);
                    }
                })
            };
        });
    }
    //启用项目
    function qiyong(discription) {
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
            discription: discription,
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
                $(".FixedPopup").show();
                $.post("/api/Project/EnableProject", { token: token, projectid: ProjectID, effective: true }, function (json) {
                    $(".FixedPopup").hide();
                    if (json.code == 1) {
                        tip(json.data);
                        $("#jinyong").show();
                        $("#qiyong").hide();
                    } else {
                        tip(json.data);
                    }
                })
            };
        });
    }
    //点击其他地方下拉框消失

    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });
}]);

//激活码控制器

routingDemoApp.controller('AuthCodeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.ShowAuthCode = function () {
        $(".ContentOne").show();
        $(".ContentTwo").hide();
        $("#box-inside-table-head1").show();
        $("#box-inside-table-head2").hide();
        $("#ProjectName").addClass("box-inside-head-title-active");
        $("#AuthCodeHistory").removeClass("box-inside-head-title-active");
    }
    $scope.ShowAuthCodeHistory = function () {
        $(".ContentOne").hide();
        $(".ContentTwo").show();
        $("#box-inside-table-head1").hide();
        $("#box-inside-table-head2").show();
        $("#AuthCodeHistory").addClass("box-inside-head-title-active");
        $("#ProjectName").removeClass("box-inside-head-title-active");
    }
    $(".FixedPopup").show();
    //验证类型...
    var v_type = $location.search().type
    $scope.verifytype = parseInt(v_type ? v_type : 0);

    $.post("/api/project/GetProjectList", { token: token, type: $scope.verifytype, pindex: 1, pagesize: 999 }, function (json) {
        $scope.panmedata = json.data;
        //项目选择
        $("#pname-box").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE   
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#pname-box").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    var idapp = $(event.target).attr("data-appid");
                    $(this).find("ul").hide();
                    var proid = $(this).find("input").attr("str");
                    location.href = "#/AuthCode?ProjectID=" + proid + "&ProjectName=" + $(this).find("input").val() + "&appid=" + idapp + "&type=" + $scope.verifytype;
                    _get_projectDetails(proid);
                }
            }
        });
        //项目选择结束
        //有效无效选择
        $("#EffectiveBox").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera   
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE   
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#EffectiveBox").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    $(this).find("ul").hide();
                }
            }
        });
        //有效无效选择结束
        if (json.code == 2) {
            OtherPlace()
        } else if (json.code == 1) {

            //行号
            $("#sq-text").setTextareaCount({
                width: "30px",
                bgColor: "#ccc",
                color: "#fff",
                display: "inline-block",
            });
            //行号结束
            var FirstProjectID = json.data[0].ProjectID;
            var FirstProjectName = json.data[0].ProjectName;
            var FirstApppId = json.data[0].AppID;
            //console.log(FirstApppId);
            var ProjectID = $location.search().ProjectID ? $location.search().ProjectID : FirstProjectID;
            var ProjectName = $location.search().ProjectName ? $location.search().ProjectName : FirstProjectName;
            var ProjectAppid = $location.search().appid ? $location.search().appid : FirstApppId;
            $scope.CurrentPanme = ProjectName;
            //获取激活码时长或点数列表

            _get_projectDetails(ProjectID);
            $.post("/api/AuthCode/GetAuthTimeList", { projectID: ProjectID }, function (json) {
                if (json.code == 2) {
                    OtherPlace()
                } else if (json.code == 1) {
                    $scope.SizeData = json.data;
                    //时长或点数数值选择
                    $("#selectNumBox").on("click", function () {
                        if (event.stopPropagation) {
                            // 针对 Mozilla 和 Opera   
                            event.stopPropagation();
                        }
                        else if (window.event) {
                            // 针对 IE   
                            window.event.cancelBubble = true;
                        }
                        $(this).find("ul").show();
                    });
                    $("#selectNumBox").bind({
                        "click": function (event) {
                            if (event.target.tagName == "LI") {
                                $(this).find("input").val($(event.target).text()); //传具体的文字
                                $(this).find("input").attr("str", $(event.target).attr("data-value"));
                                $(this).find("input").css({
                                    "color": "#333333"
                                });
                                $(this).find("ul").hide();
                            }
                        }
                    });
                    //时长或点数数值选择结束
                } else {
                    OtherPlace();
                }
            });
            //配置  
            $scope.count = 0;
            $scope.p_pernum = 15;
            //变量  
            $scope.p_current = 1;
            $scope.p_all_page = 0;
            $scope.pages = [];
            //初始化第一页
            $(".FixedPopup").show();
            var _get = function (page, size, callback) {
                var status = $("#EffectiveInput").attr("str");
                var code = $("#authCode").val();
                var createdate1 = $("#dpd1").val();
                var createdate2 = $("#dpd2").val();
                var usedate1 = $("#dpd3").val();
                var usedate2 = $("#dpd4").val();
                var rebind = $("#bindNum").val();
                var remark = $("#inputRemark").val();
                $(".FixedPopup").show();
                $http({
                    method: 'post',
                    url: '/api/AuthCode/GetAuthCodeList',
                    data: { token: token, type: $scope.verifytype, projectID: ProjectID, status: status, code: code, createdate1: createdate1, createdate2: createdate2, usedate1: usedate1, usedate2: usedate2, rebind: rebind, remark: remark, pindex: page, pagesize: size, appid: ProjectAppid }
                }).then(function (json) {
                    $(".FixedPopup").hide();
                    //成功时执行
                    
                    if (json.data.code == 2) {
                        OtherPlace();
                    } else if (json.data.code == 1) {
                        //日期选择
                        var str = window.location.href;
                        if (str.indexOf("AuthCode") != -1) {
                            $("#AuthService-ul").show();
                            $("#AuthCode").css({ "background": "#e4e9ec" });
                            $("#Project").css({ "background": "#fff" });
                        }
                        var checkin = $('#dpd1').fdatepicker({}).on('changeDate', function (ev) {
                            var newDate = new Date(ev.date)
                            newDate.setDate(newDate.getDate() + 1);
                            checkout.update(newDate);
                            checkin.hide();
                            $('#dpd2')[0].focus();
                        }).data('datepicker');
                        var checkout = $('#dpd2').fdatepicker({
                            onRender: function (date) {
                                return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
                            }
                        }).on('changeDate', function (ev) {
                            checkout.hide();
                        }).data('datepicker');

                        var checkin1 = $('#dpd3').fdatepicker({}).on('changeDate', function (ev) {
                            var newDate = new Date(ev.date)
                            newDate.setDate(newDate.getDate() + 1);
                            checkout1.update(newDate);
                            checkin1.hide();
                            $('#dpd4')[0].focus();
                        }).data('datepicker');
                        var checkout1 = $('#dpd4').fdatepicker({
                            onRender: function (date) {
                                return date.valueOf() <= checkin1.date.valueOf() ? 'disabled' : '';
                            }
                        }).on('changeDate', function (ev) {
                            checkout1.hide();
                        }).data('datepicker');
                        //日期选择结束
                        $scope.Count = json.data.Count;
                        $scope.Effective = json.data.Effective;
                        $scope.Extracted = json.data.Extracted;
                        $scope.NoEffective = json.data.Count - json.data.Effective;
                        var obj = json.data;
                        $scope.data = obj.data; //得到请求的数据
                        $scope.count = json.data.Count;
                        $scope.pageCount = json.data.pageCount;
                        $scope.p_current = page;
                        $scope.p_all_page = json.data.pageCount;
                        $scope.IsExtract = json.data.IsExtract;
                        reloadPno();
                        callback();
                    } else if (json.data.code == 0) {
                        $("#table").hide();
                        $("#page1").hide();
                        //$("#table-bottom").hide();
                        $("#table-bottom1").show();
                        $("#bottom-tip1").html("您还没有生成激活码");
                    }
                }, function (json) {
                    //失败时执行 
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            }

            _get($scope.p_current, $scope.p_pernum, function () { });
            //删除项目  
            $scope.del = function (id) {
                shanchu(id)
            }
            //首页  
            $scope.p_index = function () {
                $scope.load_page(1);
            }
            //尾页  
            $scope.p_last = function () {
                $scope.load_page($scope.p_all_page);
            }
            //上一页
            $scope.p_prev = function () {
                var page = $(".pagination").find("li.active").eq(0).text();//获取当前页数
                var _page = parseInt(page) - 1;
                if (_page >= 1) {
                    _get(_page, $scope.p_pernum, function () { });
                }
            }
            //下一页
            $scope.p_next = function () {
                var page = $(".pagination").find("li.active").eq(0).text();//获取当前页数
                var _page = parseInt(page) + 1;
                //console.log(page);
                if (_page <= $scope.p_all_page) {
                    _get(_page, $scope.p_pernum, function () { });
                }
            }
            //加载某一页
            $scope.load_page = function (page) {
                _get(page, $scope.p_pernum, function () { });
            };
            //加载指定页 
            $scope.select_load_page = function () {
                var page = $("#selectPage").val();
                _get(page, $scope.p_pernum, function () { });
            }
            //初始化页码  
            var reloadPno = function () {
                $scope.pages = calculateIndexes($scope.p_current, $scope.p_all_page, 4);
            };
            //分页算法  
            var calculateIndexes = function (current, length, displayLength) {

                var indexes = [];
                var start = Math.round(current - displayLength / 2);
                var end = Math.round(current + displayLength / 2);
                if (start <= 1) {
                    start = 1;
                    end = start + displayLength - 1;
                    if (end >= length - 1) {
                        end = length - 1;
                    }
                }
                if (end >= length - 1) {
                    end = length;
                    start = end - displayLength + 1;
                    if (start <= 1) {
                        start = 1;
                    }
                }
                for (var i = start; i <= end; i++) {
                    indexes.push(i);
                }
                return indexes;
            };

            //历史提取分页
            //配置  
            $scope.count_h = 0;
            $scope.p_pernum_h = 15;
            //变量  
            $scope.p_current_h = 1;
            $scope.p_all_page_h = 0;
            $scope.pages_h = [];
            //初始化第一页  
            $(".FixedPopup").show();
            var _get_h = function (page, size, callback) {
                $http({
                    method: 'post',
                    url: '/api/AuthCode/ExtractHistory',
                    data: { token: token, projectID: ProjectID, pindex: page, pagesize: size }
                }).then(function (json) {
                    $(".FixedPopup").hide();
                    //成功时执行

                    if (json.data.code == 2) {
                        OtherPlace();
                    } else if (json.data.code == 1) {

                        var obj_h = json.data.data;
                        $scope.data_h = obj_h; //得到请求的数据

                        $scope.count_h = json.data.Count;
                        $scope.pageCount_h = json.data.pageCount;
                        $scope.p_current_h = page;
                        $scope.p_all_page_h = json.data.pageCount;
                        reloadPno_h();
                        callback();
                    } else if (json.data.code == 0) {
                        $("#table").hide();
                        $("#page2").hide();
                        //$("#table-bottom").hide();
                        $("#table-bottom2").show();
                        $("#bottom-tip2").html("您还没有批量提取历史记录！");
                    }
                }, function (json) {
                    //失败时执行 
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            }

            _get_h($scope.p_current_h, $scope.p_pernum_h, function () { });

            //首页  
            $scope.p_index_h = function () {
                $scope.load_page_h(1);
            }
            //尾页  
            $scope.p_last_h = function () {
                $scope.load_page_h($scope.p_all_page_h);
            }
            //上一页
            $scope.p_prev_h = function () {
                var page = $(".pagination").find("li.active").eq(1).text();//获取当前页数
                var _page = parseInt(page) - 1;
                if (_page >= 1) {
                    _get_h(_page, $scope.p_pernum_h, function () { });
                } else {
                    $scope.load_page_h(1);
                }
            }
            //下一页
            $scope.p_next_h = function () {
                var page = $(".pagination").find("li.active").eq(1).text();//获取当前页数
                var _page = parseInt(page) + 1;
                //console.log(_page);
                if (_page <= $scope.p_all_page_h) {
                    _get_h(_page, $scope.p_pernum_h, function () { });
                } else {
                    $scope.load_page_h($scope.p_all_page_h);
                }
            }
            //加载某一页  
            $scope.load_page_h = function (page_h) {
                _get_h(page_h, $scope.p_pernum_h, function () { });
            };
            //加载指定页 
            $scope.select_load_page_h = function () {
                var page_h = $("#selectPage1").val();
                _get_h(page_h, $scope.p_pernum_h, function () { });
            }
            //初始化页码  
            var reloadPno_h = function () {
                $scope.pages_h = calculateIndexes_h($scope.p_current_h, $scope.p_all_page_h, 4);
            };
            //分页算法  
            var calculateIndexes_h = function (current, length, displayLength) {
                var indexes = [];
                var start = Math.round(current - displayLength / 2);
                var end = Math.round(current + displayLength / 2);
                if (start <= 1) {
                    start = 1;
                    end = start + displayLength - 1;
                    if (end >= length - 1) {
                        end = length - 1;
                    }
                }
                if (end >= length - 1) {
                    end = length;
                    start = end - displayLength + 1;
                    if (start <= 1) {
                        start = 1;
                    }
                }
                for (var i = start; i <= end; i++) {
                    indexes.push(i);
                }
                return indexes;
            };
            //历史分页结束

            //批量生成激活码
            $scope.shengcheng = function () {
                $(".FixedPopupMask").show();
                $("#CreateBox").show();
                $("#CreateCodeSize").val("");
                $("#CreateCodeNum").val("");
                $("#CreateProjectName").html($("#InputProjectName").val());
            }
            $scope.closeShengcheng = function () {
                $(".FixedPopupMask").hide();
                $("#CreateBox").hide();
            }
            //提取激活码
            $scope.tiqu = function () {
                $(".FixedPopupMask").show();
                $("#ExtractBox").show();
                $("#ExtractProjectName").html($("#InputProjectName").val());
            }
            $scope.closeTiqu = function () {
                $(".FixedPopupMask").hide();
                $("#ExtractBox").hide();
            }
            //提取激活码（单）

            $scope.dantiqu = function (AuthID, Code, AuthTime) {
                $(".FixedPopupMask").show();
                $("#DanExtractBox").show();
                $("#CodeName").attr("data-AuthID", AuthID);
                $("#CodeName").html(Code);
                $("#CodeAuthTime").val(AuthTime);
                $("#danci-remark").val("");
            }
            $scope.closedanTiqu = function () {
                $(".FixedPopupMask").hide();
                $("#DanExtractBox").hide();
            }
            //批量激活

            $scope.jihuo = function () {
                $(".FixedPopupMask").show();
                $("#Empower").show();
                $("#EmpowerProjectName").html($("#InputProjectName").val());
            }
            $scope.closeJihuo = function () {
                $(".FixedPopupMask").hide();
                $("#Empower").hide();
            }
            $scope.goJiHuo = function(){
                $http({
                    method: 'post',
                    url: '/api/AuthCode/ActivationVol',
                    data: { token: token, projectid: ProjectID, day: $("#jihuoDay").val(), remark: $("#remark").val(), udids: $("#sq-text").val()}
                }).then(function (json) {
                    $(".FixedPopupMask").hide();
                    //成功时执行
                    if (json.data.code == 0) {
                        tip(json.data.data);
                    } else if (json.data.code == 1) {
                        tip(json.data.data);
                    }
                    $("#Empower").hide();
                }, function (json) {
                    //失败时执行 
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            }
            //下载历史提取记录
            $scope.xiazai = function (a) {
                window.downloadFile(a);
            }
            //批量生成
            $("#CreateCodeButton").click(function () {
                if ($("#CreateCodeSize").val() == "" || $("#CreateCodeNum").val() == "" || $("#CreateCodeLen").val() == "") {
                    tip("请输入有效值！");
                } else {
                    $.post("/api/AuthCode/GenAuthCode", { token: token, projectID: ProjectID, day: $("#CreateCodeSize").val(), num: $("#CreateCodeNum").val(), len: $("#CreateCodeLen").val() }, function (json) {
                        if (json.code == 1) {
                            tipReload(json.data);
                            $(".FixedPopupMask").hide();
                            $("#CreateBox").hide();
                        } else {
                            tip(json.data);
                        }
                    });
                }
            });
            //单个提取激活码
            $("#DanExtractCodeButton").click(function () {
                $.post("/api/authcode/ExtractCode", { token: token, authid: $("#CodeName").attr("data-AuthID"), remark: $("#danci-remark").val() }, function (json) {
                    if (json.code == 1) {
                        tip(json.data);
                        $(".FixedPopupMask").hide();
                        $("#DanExtractBox").hide();
                    } else {
                        tip(json.data);
                    }
                });
            });
            //批量提取激活码
            $("#ExtractCodeButton").click(function () {
                $("#ExtractCodeButton").attr("disabled","disabled");
                //遍历每个时长 根据单位处理数据
                var sizeNum, val = $(this).parent().parent().find(".danwei-box").eq(0).val();
                if (val == 0) { //包月转换成时间
                    sizeNum = parseInt($("#SizeNum").val()) * 24;
                } else {
                    sizeNum = $("#SizeNum").val();
                }
                $.post("/api/AuthCode/ExtractCodeBatch", { token: token, projectID: ProjectID, num: $("#ExtractNum").val(), day: sizeNum ? sizeNum : "", len: $("#ExtractRemake").val(), type: 1, remark: $("#ExtractTxt").val() }, function (json) {
                    if (json.code == 1) {
                            var val = $("input[type='radio']:checked").val();
                            if (val == "0") {
                                downloadFile(json.data);
                            } else {
                                window.open(json.data);
                            }
                            $(".FixedPopupMask").hide();
                            $("#ExtractBox").hide();
                            _get_h($scope.p_current_h, $scope.p_pernum_h, function () { });
                            _get($scope.p_current_h, $scope.p_pernum_h, function () { });
                            $("#ExtractCodeButton").removeAttr("disabled");
                        } else {
                            tip(json.data);
                            $("#ExtractCodeButton").removeAttr("disabled");
                        }
                    });
            });
        } else {
            $(".FixedPopup").hide();
            $("#table-bottom1").show();
            $("#bottom-tip1").html("您还没有创建项目，请先创建项目！");
        }

        //全选反选
        var selectAll = true;
        $scope.selectAll = function () {
            if (selectAll) {
                $(".check").prop("checked", "checked");
                selectAll = false;
            } else {
                $(".check").removeProp("checked");
                selectAll = true;
            }
        }

        //删除激活码
        $scope.shanchu = function (AuthID) {
            javascript: $('body').dialog({
                title: "提示",
                titleFontSize: "16px",
                type: 'primary',
                showBoxShadow: true,
                buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
                discription: "是否删除此激活码？",
                animateIn: 'fadeInRight-hastrans',
                animateOut: 'fadeOutRight-hastrans',
                duration: 0,
            }, function (ret) {
                if (ret.index === 0) {
                    $(".FixedPopup").show();
                    $.post("/api/AuthCode/DeleteCodeVol", { token: token, authids: AuthID }, function (json) {
                        $(".FixedPopup").hide();
                        tip(json.data);
                        _get($scope.p_current, $scope.p_pernum, function () { });
                    });
                };
            });
        }

        //批量删除激活码
        $scope.shanchuall = function ($event) {
            var pageItem = $(".ContentOne").find(".check").length;  //当前页设备数
            var len = $("input[type='checkbox']:checked", ".ContentOne").length;  //选中个数
            var pageCurrent = $("#page1").find(".active").text();  //当前页码
            //console.log(len);
            var obj = "";
            for (var i = 0; i < len; i++) {
                obj += $("input[type='checkbox']:checked", ".ContentOne")[i].getAttribute("value") + ",";
            }

            javascript: $('body').dialog({
                title: "提示",
                discription: "确定批量删除激活码？",
                titleFontSize: "16px",
                type: 'primary',
                showBoxShadow: true,
                buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'defalut' }],
                inputPlaceholder: "",
                duration: 0,
            }, function (ret) {
                if (ret.index === 0) {
                    $(".FixedPopup").show();
                    //var obj = "";
                    //for (var i = 0; i < $(".selected-color").length; i++) {
                    //    obj += $(".selected-color")[i].getAttribute("value") + ",";
                    //}
                    if (obj) {
                        $(".FixedPopup").hide();
                        obj = obj.substring(0, obj.length-1);
                        //console.log(obj);
                        $.post("/api/AuthCode/DeleteCodeVol", { token: token, authids: obj }, function (json) {
                            if (json.code == 2) {
                                OtherPlace();
                            } else if (json.code == 1) {
                                $(".selected-color").removeProp("checked");
                                tip(json.data);
                                if (pageItem == len && pageCurrent == $scope.p_all_page) {
                                    _get($scope.p_current - 1, $scope.p_pernum, function () { });
                                } else {
                                    _get($scope.p_current, $scope.p_pernum, function () { });
                                }
                                
                            } else {
                                //$(".selected-color").removeProp("checked");
                                //_get($scope.p_current, $scope.p_pernum, function () { });
                                tip(json.data);
                            }
                            $(".check-head").removeAttr("checked");
                        })

                    } else {
                        $(".FixedPopup").hide();
                        setTimeout(function () { tip("请选择需要删除的激活码！"); }, 100);
                    }
                };
            });

        }
        
        $scope.sousuo = function () {
            $scope.p_current = 1;
            _get($scope.p_current, $scope.p_pernum, function () { });
        }
    });


    //获取项目详情 处理单位及收费方式
    var _get_projectDetails = function (proid) {
        var _url = "/api/Project/ProjectDetails?token=" + token + "&projectid=" + proid;
        $http({
            method: 'GET',
            url: _url
        }).then(function (json) {
            if (json.data.code == 1) {
                var data = json.data.data;
                var billing = data[0].Billing;
                $scope.shoufei = billing;
                //01包月 2扣点 其他扣时
                var _html;
                if (billing == 0 || billing == 1) {
                    _html = "<select class='danwei-box' style='position: absolute;left:214px;top:7px;border:none;color:#8c8c8c;'><option value='0'>天</option><option value='1'>时</option></select>";
                    $("#unit").html("时");
                } else if (billing == 2) {
                    _html = "<select class='danwei-box' style='position: absolute;left:214px;top:7px;border:none;color:#8c8c8c;'><option value='2'>点</option></select>";
                    $("#unit").html("点");
                } else {
                    _html = "<select class='danwei-box' style='position: absolute;left:214px;top:7px;border:none;color:#8c8c8c;'><option value='3'>分</option></select>";
                    $("#unit").html("分");
                }
                $(".select-number").children("select").remove();
                $(".select-number").append($(_html));

            } else if (json.data.code == 0) {
                return;
            }
        }, function () {
            return;
        });
    }

    //点击其他地方下拉框消失
    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });

    window.downloadFile = function (sUrl) {
        //iOS devices do not support downloading. We have to inform user about this.
        if (/(iP)/g.test(navigator.userAgent)) {
            alert('Your device does not support files downloading. Please try again in desktop browser.');
            return false;
        }
        //If in Chrome or Safari - download via virtual link click
        if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
            //Creating new link node.
            var link = document.createElement('a');
            link.href = sUrl;
            if (link.download !== undefined) {
                //Set HTML5 download attribute. This will prevent file from opening if supported.
                var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
                link.download = fileName;
            }
            //Dispatching click event.
            if (document.createEvent) {
                var e = document.createEvent('MouseEvents');
                e.initEvent('click', true, true);
                link.dispatchEvent(e);
                return true;
            }
        }
        // Force file download (whether supported by server).
        if (sUrl.indexOf('?') === -1) {
            sUrl += '?download';
        }
        window.open(sUrl, '_self');
        return true;
    }

    window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
}]);

//设备列表控制器

routingDemoApp.controller('DeviceController', ['$scope', '$http', '$location', '$compile', function ($scope, $http, $location, $compile) {
    $(".FixedPopup").show();
    $.post("/api/project/GetProjectList", { token: token, pindex: 1, pagesize: 999 }, function (json) {
        $scope.panmedata = json.data;
        //项目选择
        $("#pname-box").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#pname-box").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    var idapp = $(event.target).attr("data-appid");
                    $(this).find("ul").hide();
                    location.href = "#/Device?ProjectID=" + $(this).find("input").attr("str") + "&ProjectName=" + $(this).find("input").val() + "&appid=" + idapp;
                    var proid = $(this).find("input").attr("str");
                    _get_projectDetails(proid);
                }
            }
        });
        //项目选择结束
        //有效无效选择
        $("#EffectiveBox").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera   
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE   
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#EffectiveBox").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("data-str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    $(this).find("ul").hide();
                }
            }
        });

        //日期选择
        var checkin = $('#dpd1').fdatepicker({}).on('changeDate', function (ev) {
            var newDate = new Date(ev.date);
            newDate.setDate(newDate.getDate() + 1);
            checkout.update(newDate);
            checkin.hide();
            $('#dpd2')[0].focus();
        }).data('datepicker');
        var checkout = $('#dpd2').fdatepicker({
            onRender: function (date) {
                return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {
            checkout.hide();
        }).data('datepicker');
        //日期选择结束

        //有效无效选择结束
        if (json.code == 2) {
            OtherPlace();
        } else if (json.code == 1) {
            var FirstProjectID = json.data[0].ProjectID;
            var FirstProjectName = json.data[0].ProjectName;
            var FirstApppId = json.data[0].AppID;
            //console.log(FirstApppId);
            var ProjectID = $location.search().ProjectID ? $location.search().ProjectID : FirstProjectID;
            var ProjectName = $location.search().ProjectName ? $location.search().ProjectName : FirstProjectName;
            var ProjectAppid = $location.search().appid ? $location.search().appid : FirstApppId;
            $scope.CurrentProjectID = ProjectID;
            $scope.CurrentPanme = ProjectName;
            
            _get_projectDetails(ProjectID);
            //配置  
            $scope.count = 0;
            $scope.p_pernum = 15;
            //变量  
            $scope.p_current = 1;
            $scope.p_all_page = 0;
            $scope.pages = [];
            //初始化第一页  
            var _get = function (page, size, callback) {
                $(".FixedPopup").show();

                //搜索数据
                var deviceID = $("#device-id").val();
                var udid = $("#ud-id").val();
                var code = $("#auth-code").val();
                var remark = $("#remark").val();
                var date1 = $("#dpd1").val();
                var date2 = $("#dpd2").val();
                var status = $("#EffectiveInput").attr("data-str");

                $http({
                    method: 'post',
                    url: '/api/Device/GetDeviceList',
                    //data: { token: token, projectID: ProjectID, effective: $("#EffectiveInput").attr("data-str"), pindex: page, pagesize: size, appid: ProjectAppid },
                    data: { token: token, projectID: ProjectID, deviceID: deviceID, udid: udid, code: code, remark: remark, date1: date1, date2: date2, status: status, appid: ProjectAppid, pindex: page, pagesize: size, appid: ProjectAppid }
                }).then(function (json) {
                    $(".FixedPopup").hide();
                    //成功时执行

                    if (json.data.code == 2) {
                        OtherPlace();
                    } else if (json.data.code == 1) {
                        $(".tableContent").show();
                        $("#page1").show();
                        $("#table-bottom1").hide();

                        $scope.Count = json.data.Count;
                        var obj = json.data;
                        if (!obj) { return false;}
                        $.each(obj.data, function (i, item) {
                            if (item.Effective) {
                                item.EffectiveName = "禁用设备";
                                item.EName = "正常";
                            } else {
                                item.EffectiveName = "启用设备";
                                item.EName = "禁用";
                            }
                        });
                        $scope.data = obj.data; //得到请求的数据

                        //$scope.Count = 50;  //总数 此数据在api上没有 加入字段后替换
                        $scope.Count = json.data.count;
                        $scope.Activing = json.data.activing;
                        $scope.UnExpire = json.data.unExpire;
                        $scope.UnActived = json.data.unActived;

                        //console.log(json.data.Count);
                        $scope.pageCount = json.data.pageCount;
                        $scope.p_current = page;
                        $scope.p_all_page = json.data.pageCount;
                        reloadPno();
                        callback();
                    } else if (json.data.code == 0) {
                        $(".tableContent").hide();
                        $("#page1").hide();
                        //$("#table-bottom").hide();
                        $("#table-bottom1").show();
                        $("#bottom-tip1").html("您还没有用户设备！");
                    }
                }, function (json) {
                    //失败时执行
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            }

            _get($scope.p_current, $scope.p_pernum, function () { });
            //首页  
            $scope.p_index = function () {
                $scope.load_page(1);
            }
            //尾页  
            $scope.p_last = function () {
                $scope.load_page($scope.p_all_page);
            }
            //上一页
            $scope.p_prev = function () {
                var page = $(".pagination").find("li.active").text();//获取当前页数
                var _page = parseInt(page) - 1;
                console.log(_page);
                if (_page >= 1) {
                    _get(_page, $scope.p_pernum, function () { });
                }
            }
            //下一页
            $scope.p_next = function () {
                var page = $(".pagination").find("li.active").text();//获取当前页数
                var _page = parseInt(page) + 1;
                //console.log(_page);
                if (_page <= $scope.p_all_page) {
                    _get(_page, $scope.p_pernum, function () { });
                }
            }
            //加载某一页  
            $scope.load_page = function (page) {
                _get(page, $scope.p_pernum, function () { });
            };
            //加载指定页 
            $scope.select_load_page = function () {
                var page = $("#selectPage").val();
                _get(page, $scope.p_pernum, function () { });
            }
            //初始化页码  
            var reloadPno = function () {
                $scope.pages = calculateIndexes($scope.p_current, $scope.p_all_page, 4);
            };
            //分页算法  
            var calculateIndexes = function (current, length, displayLength) {
                var indexes = [];
                var start = Math.round(current - displayLength / 2);
                var end = Math.round(current + displayLength / 2);
                if (start <= 1) {
                    start = 1;
                    end = start + displayLength - 1;
                    if (end >= length - 1) {
                        end = length - 1;
                    }
                }
                if (end >= length - 1) {
                    end = length;
                    start = end - displayLength + 1;
                    if (start <= 1) {
                        start = 1;
                    }
                }
                for (var i = start; i <= end; i++) {
                    indexes.push(i);
                }
                return indexes;
            };


            //全选

            var selectAll = true;
            $scope.selectAll = function () {
                if (selectAll) {
                    $(".check").prop("checked", "checked");
                    selectAll = false;
                } else {
                    $(".check").removeProp("checked");
                    selectAll = true;
                }
            }

            //搜索设备
            $scope.sousuo = function () {
                $scope.p_current = 1;
                _get($scope.p_current, $scope.p_pernum, function () { });
            }


            //查看授权
            $scope.Lookshouquan = function (DeviceID) {
                $(".FixedPopupMask").show();
                $("#API-box").show();
                $("#table-first").siblings().remove();
                $.post("/api/Device/GetDeviceCode", { token: token, deviceID: DeviceID }, function (json) {
                    //$(".FixedPopup").hide();
                    if (json.code == 2) {
                        OtherPlace();
                    } else if (json.code == 1) {
                        $.each(json.data, function (i, item) {
                            if (item["Status"] != 2) {
                                if (item["CanBlock"] == 1) {
                                    $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td>" + item["Remark"] + "</td><td>正常</td><td onclick='tingyong(" + item["AuthID"] + "," + DeviceID + ")' style='cursor:pointer;color:#609DFF'>停用</td></tr>");
                                }
                                else {
                                    $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td>" + item["Remark"] + "</td><td>已过期</td><td>已过期</td></tr>");
                                }
                            }
                            else {
                                $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td class='six'>" + item["Remark"] + "</td><td >已停用</td><td>已停用</td></tr>");
                            }
                        });
                    }
                });
            }
            $scope.closeLookshouquan = function () {
                $(".FixedPopupMask").hide();
                $(".FixedPopup").hide();
                $("#API-box").hide();
            }
            //禁用和启用设备
            
            $scope.jinqi = function (DeviceID, Effective) {
                if (Effective) {
                    var title = "确定禁用该设备？";
                    var discription = "禁用后，可在选中无效后搜索，开启该设备！";
                    var value = "false";
                } else {
                    var title = "确定启用该设备？";
                    var discription = "启用后，可在选中有效后搜索，禁用该设备！";
                    var value = "true";
                }
                javascript: $('body').dialog({
                    title: title,
                    titleFontSize: "16px",
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
                    discription: discription,
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans',
                    duration: 0,
                }, function (ret) {           
                    if (ret.index === 0) {
                        $(".FixedPopup").show();
                        $.post("/api/Device/DisableDevice", { token: token, deviceID: DeviceID, effective: value }, function (json) {
                            $(".FixedPopup").hide();
                            tip(json.data);
                            _get($scope.p_current, $scope.p_pernum, function () { });
                        });
                    };
                });
            }
        
            //删除设备
            $scope.shanchu = function (DeviceID) {
                javascript: $('body').dialog({
                    title: "是否删除此设备？",
                    titleFontSize: "16px",
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
                    discription: "删除设备后不可恢复！",
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans',
                    duration: 0,
                }, function (ret) {
                    if (ret.index === 0) {
                        $(".FixedPopup").show();
                        $.post("/api/Device/DeleteDeviceVol", { token: token, deviceids: DeviceID }, function (json) {
                            $(".FixedPopup").hide();
                            tip(json.data);
                            _get($scope.p_current, $scope.p_pernum, function () { });
                        });
                    };
                });
            }
        } else {
            $(".FixedPopup").hide();
            $("#table-bottom1").show();
            $("#bottom-tip1").html("您还没有用户设备！");
        }

        //批量删除设备
        $scope.shanchuall = function ($event) {
            var pageItem = $(".tableContent").find(".check").length;  //当前页设备数
            var len = $("input[type='checkbox']:checked", ".tableContent").length;  //选中个数
            var pageCurrent = $("#page1").find(".active").text();  //当前页码
            //console.log($scope.p_all_page); //总页数
            var obj = "";
            for (var i = 0; i < len; i++) {
                obj += $("input[type='checkbox']:checked", ".tableContent")[i].getAttribute("value") + ",";
            }
            //console.log(obj);
            javascript: $('body').dialog({
                title: "提示",
                discription: "确定批量删除设备？",
                titleFontSize: "16px",
                type: 'primary',
                showBoxShadow: true,
                buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'defalut' }],
                inputPlaceholder: "",
                duration: 0,
            }, function (ret) {
                if (ret.index === 0) {
                    $(".FixedPopup").show();
                    if (obj) {
                        $(".FixedPopup").hide();
                        obj = obj.substring(0, obj.length - 1);
                        //console.log(obj);
                        $.post("/api/Device/DeleteDeviceVol", { token: token, deviceids: obj }, function (json) {
                            if (json.code == 2) {
                                OtherPlace();
                            } else if (json.code == 1) {
                                $(".selected-color").removeProp("checked");
                                tip(json.data);
                                if (pageItem == len && pageCurrent == $scope.p_all_page) {
                                    _get($scope.p_current - 1, $scope.p_pernum, function () { });
                                }else{
                                    _get($scope.p_current, $scope.p_pernum, function () { });
                                }
                            } else {
                                //$(".selected-color").removeProp("checked");
                                //_get($scope.p_current, $scope.p_pernum, function () { });
                                tip(json.data);
                            }
                            $(".check-head").removeAttr("checked");
                        })

                    } else {
                        $(".FixedPopup").hide();
                        setTimeout(function () { tip("请选择需要删除的设备！"); },100);
                    }
                };
            });
        }

        //批量加时
        $scope.jiashi = function () {
            $(".FixedPopupMask").show();
            $("#ExtractBox").show();
            $("#ExtractProjectName").html($("#InputProjectName").val());
            //追加遮罩
            $("#ExtractBox").after("<div class='FixedPopupMask tempMask'></div>");
        }
        $scope.closeTiqu = function () {
            $(".FixedPopupMask").hide();
            $("#ExtractBox").hide();
            $(".tempMask").remove();
        }

        //提交批量加时
        $("#ExtractCodeButton").click(function () {
            $("#ExtractCodeButton").attr("disabled", "disabled");
            //遍历每个时长 根据单位处理数据
            var sizeNum, val = $(this).parent().parent().find(".danwei-box").eq(0).val();
            if (val == 0) { //包月转换成时间
                sizeNum = parseInt($("#SizeNum").val()) * 24;
            } else {
                sizeNum = $("#SizeNum").val();
            }

            var len = $("input[type='checkbox']:checked", ".tableContent").length;
            var obj = "";
            for (var i = 0; i < len; i++) {
                obj += $("input[type='checkbox']:checked", ".tableContent")[i].getAttribute("data-uid") + "\n";
            }
            //console.log(obj);

            $.post("/api/AuthCode/ActivationVol", { token: token, projectID: ProjectID, udids: obj, day: sizeNum?sizeNum:"", remark: $("#ExtractTxt").val() }, function (json) {
                if (json.code == 1) {
                    //console.log(json.data);
                    $(".FixedPopupMask").hide();
                    $("#ExtractBox").hide();
                    $("#ExtractCodeButton").removeAttr("disabled");
                    tip(json.data);
                } else {
                    tip("请选择需要加时的设备！");
                    $("#ExtractCodeButton").removeAttr("disabled");
                }
            });
        });
    });

    //获取项目详情 处理单位及收费方式
    var _get_projectDetails = function (proid) {
        var _url = "/api/Project/ProjectDetails?token=" + token + "&projectid=" + proid;
        $http({
            method: 'GET',
            url: _url
        }).then(function (json) {
            if (json.data.code == 1) {
                var data = json.data.data;
                var billing = data[0].Billing;
                $scope.shoufei = billing;
                //01包月 2扣点 其他扣时
                var _html;
                if (billing == 0 || billing == 1) {
                    _html = "<select class='danwei-box' style='position: absolute;left:214px;top:7px;border:none;color:#8c8c8c;'><option value='0'>天</option><option value='1'>时</option></select>";
                    $("#unit").html("时");
                } else if (billing == 2) {
                    _html = "<select class='danwei-box' style='position: absolute;left:214px;top:7px;border:none;color:#8c8c8c;'><option value='2'>点</option></select>";
                    $("#unit").html("点");
                } else {
                    _html = "<select class='danwei-box' style='position: absolute;left:214px;top:7px;border:none;color:#8c8c8c;'><option value='3'>分</option></select>";
                    $("#unit").html("分");
                }
                $(".select-number").children("select").remove();
                $(".select-number").append($(_html));

            } else if (json.data.code == 0) {
                return;
            }
        }, function () {
            return;
        });
    }


    //点击其他地方下拉框消失

    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });

}]);

//设备详情控制器

routingDemoApp.controller('DeviceDetailController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var DeviceID = $location.search().DeviceID;
    $scope.DeviceID = $location.search().DeviceID;
    $scope.ProjectID = $location.search().ProjectID;
    $scope.ProjectName = $location.search().ProjectName;
    $(".FixedPopup").show();

    var _get = function () {
        $http({
            method: 'post',
            url: '/api/Device/DeviceDetails',
            data: { token: token, deviceID: DeviceID }
        }).then(function (json) {
            $(".FixedPopup").hide();
            //成功时执行
            if (json.data.code == 2) {
                OtherPlace();
            } else if (json.data.code == 1) {
                var obj = json.data.data;
                $.each(obj, function (i, item) {
                    if (item.Effective) {
                        item.EffectiveName = "禁用设备";
                        item.EName = "正常";
                    } else {
                        item.EffectiveName = "启用设备";
                        item.EName = "禁用";
                    }
                });
                $scope.data = obj[0]; //得到请求的数据
                $scope.Billing = obj[0].Billing;
            } else if (json.data.code == 0) {
                tip(json.data.data);
            }
        }, function (json) {
            //失败时执行 
            $(".FixedPopup").hide();
            tip("网络连接错误！");
        });
    }
    _get();

    //可编辑项
    $scope.Tbianji = function () {
        $("#Time-bianji").hide();
        $("#Time-baocun").show();
        $("#Time-input").removeAttr("readonly");
        $("#Time-input").css({"background":"#ffffff"});
    }
    $scope.Tbaocun = function () {
        $(".FixedPopup").show();
        $.post("/api/Device/ModifyDevice", { token: token, deviceID: DeviceID, expireDate: $("#Time-input").val() }, function (json) {
            $(".FixedPopup").hide();
            if (json.code == 1) {          
                $("#Time-bianji").show();
                $("#Time-baocun").hide();
                $("#Time-input").attr("readonly", "readonly");
                $("#Time-input").css({ "background": "#f4f4f4" });
                tip(json.data);
            } else {
                tip(json.data);
            }         
        });
    }
    $scope.Tquxiao = function () {
        $("#Time-bianji").show();
        $("#Time-baocun").hide();
        $("#Time-input").attr("readonly", "readonly");
        $("#Time-input").css({ "background": "#f4f4f4" });
    }
    $scope.Rbianji = function () {
        $("#Remake-bianji").hide();
        $("#Remake-baocun").show();
        $("#Remake-text").removeAttr("readonly");
        $("#Remake-text").css({ "background": "#ffffff" });
    }
    $scope.Rbaocun = function () {
        $(".FixedPopup").show();
        $.post("/api/Device/ModifyRemark", { token: token, deviceID: DeviceID, remark: $("#Remake-text").val() }, function (json) {
            $(".FixedPopup").hide();
            if (json.code == 1) {
                $("#Remake-bianji").show();
                $("#Remake-baocun").hide();
                $("#Remake-text").attr("readonly", "readonly");
                $("#Remake-text").css({ "background": "#f4f4f4" });
                tip(json.data);
            } else {
                tip(json.data);
            }
        });
    }
    $scope.Rquxiao = function () {
        $("#Remake-bianji").show();
        $("#Remake-baocun").hide();
        $("#Remake-text").attr("readonly", "readonly");
        $("#Remake-text").css({ "background": "#f4f4f4" });
    }

    //查看授权
    $scope.Lookshouquan = function () {
        $(".FixedPopupMask").show();
        $("#API-box").show();
        $(".FixedPopup").show();
        $.post("/api/Device/GetDeviceCode", { token: token, deviceID: DeviceID }, function (json) {
            $("#table-first").siblings().remove();
            $(".FixedPopup").hide();
            if (json.code == 2) {
                OtherPlace();
            } else if (json.code == 1) {
                $.each(json.data, function (i, item) {
                    if (item["Status"] != 2) {
                        if (item["CanBlock"] == 1) {
                            $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td>" + item["Remark"] + "</td><td>正常</td><td onclick='tingyong(" + item["AuthID"] + "," + DeviceID + ")' style='cursor:pointer;color:#609DFF'>停用</td></tr>");
                        }
                        else {
                            $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td>" + item["Remark"] + "</td><td>已过期</td><td>已过期</td></tr>");
                        }
                    }
                    else {
                        $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td class='six'>" + item["Remark"] + "</td><td >已停用</td><td>已停用</td></tr>");
                    }
                });
            }
        });
    }
    $scope.closeLookshouquan = function () {
        $(".FixedPopupMask").hide();
        $("#API-box").hide();
    }

    //禁用和启用设备

    $scope.jinqi = function (Effective) {
        if (Effective) {
            var title = "确定禁用该设备？";
            var discription = "禁用后，可在选中无效后搜索，开启该设备！";
            var value = "false";
        } else {
            var title = "确定启用该设备？";
            var discription = "启用后，可在选中有效后搜索，禁用该设备！";
            var value = "true";
        }
        javascript: $('body').dialog({
            title: title,
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
            discription: discription,
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
                $(".FixedPopup").show();
                $.post("/api/Device/DisableDevice", { token: token, deviceID: DeviceID, effective: value }, function (json) {
                    $(".FixedPopup").hide();
                    tip(json.data);
                    _get();
                });
            };
        });
    }
}]);

//项目日志控制器

routingDemoApp.controller('ProjectLogController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $(".FixedPopup").show();
    //验证类型...
    var v_type = $location.search().type
    $scope.verifytype = parseInt(v_type ? v_type : 0);
    $.post("/api/project/GetProjectList", { token: token, type: $scope.verifytype, pindex: 1, pagesize: 999 }, function (json) {
        $scope.panmedata = json.data;
        //项目选择
        $("#pname-box").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera   
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE   
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#pname-box").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    $(this).find("ul").hide();
                    location.href = "#/ProjectLog?ProjectID=" + $(this).find("input").attr("str") + "&ProjectName=" + $(this).find("input").val()+"&type="+$scope.verifytype;
                }
            }
        });
        //项目选择结束
        if (json.code == 2) {
            OtherPlace();
        } else if (json.code == 1) {
            var FirstProjectID = json.data[0].ProjectID;
            var FirstProjectName = json.data[0].ProjectName;
            var ProjectID = $location.search().ProjectID ? $location.search().ProjectID : FirstProjectID;
            var ProjectName = $location.search().ProjectName ? $location.search().ProjectName : FirstProjectName;
            $scope.CurrentProjectID = ProjectID;
            $scope.CurrentPanme = ProjectName;

            //配置  
            $scope.count = 0;
            $scope.p_pernum = 15;
            //变量  
            $scope.p_current = 1;
            $scope.p_all_page = 0;
            $scope.pages = [];
            //初始化第一页  
            var _get = function (page, size, callback) {
                $(".FixedPopup").show();
                $http({
                    method: 'post',
                    url: '/api/Project/GetProjectLog',
                    data: { token: token, projectID: ProjectID, pindex: page, pagesize: size }
                }).then(function (json) {
                    $(".FixedPopup").hide();
                    //成功时执行

                    if (json.data.code == 2) {
                        OtherPlace();
                    } else if (json.data.code == 1) {
                        json = json.data;
                        $scope.Count = json.data.Count;
                        var obj = json.data;
                        $scope.data = obj; //得到请求的数据

                        $scope.count = json.Count;
                        $scope.pageCount = json.pageCount;
                        $scope.p_current = page;
                        $scope.p_all_page = json.pageCount;
                        reloadPno();
                        callback();
                    } else if (json.data.code == 0) {
                        $("#table").hide();
                        $("#page1").hide();
                        //$("#table-bottom").hide();
                        $("#table-bottom2").show();
                        $("#bottom-tip2").html("您还没有项目日志！");
                    }
                }, function (json) {
                    //失败时执行 
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            }

            _get($scope.p_current, $scope.p_pernum, function () { })
            //首页  
            $scope.p_index = function () {
                $scope.load_page(1);
            }
            //尾页  
            $scope.p_last = function () {
                $scope.load_page($scope.p_all_page);
            }
            //上一页
            $scope.p_prev = function () {
                var page = $(".pagination").find("li.active").text();//获取当前页数
                var _page = parseInt(page) - 1;
                console.log(_page);
                if (_page >= 1) {
                    _get(_page, $scope.p_pernum, function () { });
                }
            }
            //下一页
            $scope.p_next = function () {
                var page = $(".pagination").find("li.active").text();//获取当前页数
                var _page = parseInt(page) + 1;
                console.log(_page);
                if (_page <= $scope.p_all_page) {
                    _get(_page, $scope.p_pernum, function () { });
                }
            }
            //加载某一页  
            $scope.load_page = function (page) {
                _get(page, $scope.p_pernum, function () { });
            };
            //加载指定页 
            $scope.select_load_page = function () {
                var page = $("#selectPage").val();
                _get(page, $scope.p_pernum, function () { });
            }
            //初始化页码  
            var reloadPno = function () {
                $scope.pages = calculateIndexes($scope.p_current, $scope.p_all_page, 4);
            };
            //分页算法  
            var calculateIndexes = function (current, length, displayLength) {
                var indexes = [];
                var start = Math.round(current - displayLength / 2);
                var end = Math.round(current + displayLength / 2);
                if (start <= 1) {
                    start = 1;
                    end = start + displayLength - 1;
                    if (end >= length - 1) {
                        end = length - 1;
                    }
                }
                if (end >= length - 1) {
                    end = length;
                    start = end - displayLength + 1;
                    if (start <= 1) {
                        start = 1;
                    }
                }
                for (var i = start; i <= end; i++) {
                    indexes.push(i);
                }
                return indexes;
            };

            //全选

            var selectAll = true;
            $scope.selectAll = function () {
                if (selectAll) {
                    $(".check").prop("checked", "checked");
                    $(".check").addClass("selected-color");
                    selectAll = false;
                } else {
                    $(".check").removeProp("checked");
                    $(".check").removeClass("selected-color");
                    selectAll = true;
                }
            }
            //选择
            $scope.Selected = function (LogID) {
                $("." + LogID).toggleClass("selected-color");
            }
            //删除日志
            $scope.shanchu = function (LogID) {
                javascript: $('body').dialog({
                    title: "是否删除此日志？",
                    titleFontSize: "16px",
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
                    discription: "删除日志后不可恢复！",
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans',
                    duration: 0,
                }, function (ret) {
                    if (ret.index === 0) {
                        $(".FixedPopup").show();
                        $.post("/api/Project/Deletelogs", { token: token, logids: LogID }, function (json) {
                            $(".FixedPopup").hide();
                            tip(json.data);
                            _get($scope.p_current, $scope.p_pernum, function () { });
                        });
                    };
                });
            }
           
           

            //批量删除日志
            $scope.shanchuall = function () {
                javascript: $('body').dialog({
                    title: "提示",
                    discription: "确定批量删除日志？",
                    titleFontSize: "16px",
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'defalut' }],
                    inputPlaceholder: "",
                    duration: 0,
                }, function (ret) {
                    if (ret.index === 0) {
                        $(".FixedPopup").show();
                        var obj = "";
                        for (var i = 0; i < $(".selected-color").length; i++) {
                            obj += $(".selected-color")[i].getAttribute("data-value") + ",";
                        }
                        if (obj) {
                            $(".FixedPopup").hide();
                            $.post("/api/Project/Deletelogs", { token: token, logids: obj }, function (json) {
                                if (json.code == 2) {
                                    OtherPlace();
                                } else if (json.code == 1) {
                                    $("#selected").removeProp("checked");
                                    tip("删除成功!");
                                    _get($scope.p_current, $scope.p_pernum, function () { });
                                } else {
                                    _get($scope.p_current, $scope.p_pernum, function () { });
                                    tip(json.data);
                                }

                            })
                        } else {
                            return;
                        }
                    };
                });
             
            }
        } else {
            $(".FixedPopup").hide();
            $("#table-bottom1").show();
            $("#bottom-tip1").html("您还没有用户设备！");
        }
    });

    //点击其他地方下拉框消失

    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });

}]);

//项目内购控制器
routingDemoApp.controller('ProjectNeigou', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.ManageHref = function (event) {
        location.href = "#/ProjectNeigouManage?type=2&charge=" + $(event.target).attr("data-billing");
    }
    $scope.CreateNewNeiGou = function () {
        $(".FixedPopupMask").show();
        $("#open-mask").show();
        $(".dialogs-appyfor-join").show();

        var _html, charge = $(".shoufei").attr("data-billing");
        if (charge == 0 || charge == 1) {
            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='1'>时</option></select>";
        } else if (charge == 2) {
            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='2'>点</option></select>";
        } else {
            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='3'>分</option></select>";
        }
        $(".prop0").append($(_html));
        $(".prop1").append($(_html));
    }
    $(".FixedPopup").show();
    $.post("/api/Marketing/ProjectList", { token: token, type: 2 }, function (json) {
        $scope.panmedata = json.data;
        //所有列表
        $.post("/api/Marketing/ProjectList", { token: token, type: 1 }, function (json) {
            $scope.data = json.data;
            var FirstAllProjectName = json.data[0].ProjectName;
            var FirstAllProjectID = json.data[0].ProjectID;
            $scope.FirstAllProjectName = FirstAllProjectName;
            $scope.FirstAllProjectID = FirstAllProjectID;
            _get_spec(FirstAllProjectID); //初始规格列表
            _get_projectDetails(FirstAllProjectID); //初始收费模式
        });
        //显示订单列表的项目选择
        $("#pname-box").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera   
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE   
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#pname-box").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    $(this).find("ul").hide();
                    location.href = "#/ProjectNeigou?ProjectID=" + $(this).find("input").attr("str") + "&ProjectName=" + $(this).find("input").val();
                }
            }
        });
        //项目选择结束
        if (json.code == 2) {
            OtherPlace()
        } else if (json.code == 1) {
            //时长或点数数值选择
            $("#selectNumBox").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE   
                    window.event.cancelBubble = true;
                }
                $(this).find("ul").show();
            });

            var FirstProjectID = json.data[0].ProjectID;
            var FirstProjectName = json.data[0].ProjectName;
            var ProjectID = $location.search().ProjectID ? $location.search().ProjectID : FirstProjectID;
            var ProjectName = $location.search().ProjectName ? $location.search().ProjectName : FirstProjectName;
            $scope.CurrentProjectID = ProjectID;
            $scope.CurrentPanme = ProjectName;
            $scope.FirstProjectID = FirstProjectID;  //规格弹框使用
            $scope.FirstProjectName = FirstProjectName;  //规格弹框使用
            //配置  
            $scope.count = 0;
            $scope.p_pernum = 15;
            //变量
            $scope.p_current = 1;
            $scope.p_all_page = 0;
            $scope.pages = [];
            //初始化第一页 //获取项目订单列表 
            $(".FixedPopup").show();
            var _get = function (page, size, callback) {
                //日期选择
                var checkin = $('#dpd1').fdatepicker({}).on('changeDate', function (ev) {
                    var newDate = new Date(ev.date)
                    newDate.setDate(newDate.getDate() + 1);
                    checkout.update(newDate);
                    checkin.hide();
                    $('#dpd2')[0].focus();
                }).data('datepicker');
                var checkout = $('#dpd2').fdatepicker({
                    onRender: function (date) {
                        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
                    }
                }).on('changeDate', function (ev) {
                    checkout.hide();
                }).data('datepicker');
                //日期选择结束
                if (!ProjectID) {  //没有项目 终止请求
                    $("#table").hide();
                    $("#page1").hide();
                    $("#table-bottom2").show();
                    $("#bottom-tip2").html("该项目还没有订单！");
                    $(".FixedPopup").hide();
                    return;
                }
                $http({
                    method: 'post',
                    url: '/api/Order/OrderList',
                    data: { token: token, projectID: ProjectID, ordercode: $("#order-input").val(), udid: $("#udid-input").val(), datatime: $("#dpd1").val(), type: 2, pindex: page, pagesize: size }
                }).then(function (json) {
                    $(".FixedPopup").hide();
                    //成功时执行

                    if (json.data.code == 2) {
                        OtherPlace();
                    } else if (json.data.code == 1) {
                        $scope.orderData = json.data.data;

                        $scope.count = json.data.count;
                        $scope.pageCount = json.data.pages;
                        $scope.p_current = page;
                        $scope.p_all_page = json.data.pages;
                        reloadPno();
                        callback();
                    } else if (json.data.code == 0) {
                        $("#table").hide();
                        $("#page1").hide();
                        $("#table-bottom2").show();
                        $("#bottom-tip2").html("该项目还没有订单！");
                    }
                }, function (json) {
                    //失败时执行
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            }
            _get($scope.p_current, $scope.p_pernum, function () { });
            //首页  
            $scope.p_index = function () {
                $scope.load_page(1);
            }
            //尾页  
            $scope.p_last = function () {
                $scope.load_page($scope.p_all_page);
            }
            //上一页
            $scope.p_prev = function () {
                var page = $(".pagination").find("li.active").text();//获取当前页数
                var _page = parseInt(page) - 1;
                console.log(_page);
                if (_page >= 1) {
                    _get(_page, $scope.p_pernum, function () { });
                }
            }
            //下一页
            $scope.p_next = function () {
                var page = $(".pagination").find("li.active").text();//获取当前页数
                var _page = parseInt(page) + 1;
                //console.log(_page);
                if (_page <= $scope.p_all_page) {
                    _get(_page, $scope.p_pernum, function () { });
                }
            }
            //加载某一页  
            $scope.load_page = function (page) {
                _get(page, $scope.p_pernum, function () { });
            };
            //加载指定页 
            $scope.select_load_page = function () {
                var page = $("#selectPage").val();
                _get(page, $scope.p_pernum, function () { });
            }
            //初始化页码
            var reloadPno = function () {
                $scope.pages = calculateIndexes($scope.p_current, $scope.p_all_page, 3);
            };
            //分页算法
            var calculateIndexes = function (current, length, displayLength) {
                var indexes = [];
                var start = Math.round(current - displayLength / 2);
                var end = Math.round(current + displayLength / 2);
                if (start <= 1) {
                    start = 1;
                    end = start + displayLength - 1;
                    if (end >= length - 1) {
                        end = length - 1;
                    }
                }
                if (end >= length - 1) {
                    end = length;
                    start = end - displayLength + 1;
                    if (start <= 1) {
                        start = 1;
                    }
                }
                for (var i = start; i <= end; i++) {
                    indexes.push(i);
                }
                return indexes;
            };

            //获取内购统计
            var _get_projectTotal = function (proid) {
                $.post("/api/Marketing/InsStatistics", { token: token, projectid: proid }, function (json) {
                    if(json.code == 1){
                        $scope.OAmount = json.OAmount;
                        $scope.OCount = json.OCount;
                        $scope.UCount = json.UCount;
                    }else{
                        tip(json.data);
                    }
                });
            };
            _get_projectTotal(ProjectID);

        } else {
            $(".FixedPopup").hide();
            $("#table-bottom1").show();
            $("#bottom-tip1").html("您还没有创建项目，请先创建项目！");
        }

        //显示项目规格列表显示
        $("#pname-box-guige").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera   
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE   
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#pname-box-guige").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    $(this).find("ul").hide();
                    
                    var proid = $("#InputProjectNameGuige").attr("str");
                    _get_spec(proid);
                    _get_projectDetails(proid);

                    clearTimeout(timer);
                    var timer = setTimeout(function () {
                        var _html, charge = $(".shoufei").attr("data-billing");
                        if (charge == 0 || charge == 1) {
                            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='1'>时</option></select>";
                        } else if (charge == 2) {
                            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='2'>点</option></select>";
                        } else {
                            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='3'>分</option></select>";
                        }
                        $(".prop0").children("select").remove();
                        $(".prop1").children("select").remove();
                        $(".prop0").append($(_html));
                        $(".prop1").append($(_html));
                    }, 1000);
                    
                }
            }
        });

        //获取规格列表
        var _get_spec = function (proid) {
            $http({
                method: 'post',
                url: '/api/Marketing/SpecList',
                data: { token: token, projectid: proid, type: 1 }
            }).then(function (json) {
                if (json.data.code == 1) {
                    $scope.guigeData = json.data.data;
                } else if (json.data.code == 0) {
                    $scope.guigeData = [];
                }
            }, function () {
                return;
            });
        }

        //单位select选择事件
        //$(".div-add").on("change", ".danwei-box", function (e) {
        //    var val = $(e.target).val();
        //    if (val == 1) {
        //        var elemt = $(e.target).parent().find("input").eq(1);
        //        var time = $(elemt).val();
        //        $(elemt).val(parseInt(time)*24);

        //    }
        //    console.log($(e.target).val());
        //});

        //保存规格列表
        $scope.saveGuige = function () {
            
            specid = function () {
                var s = "", id;
                $(".guige").each(function () {
                    id = $(this).attr("data-specid");
                    s += id + ",";
                })
                return s.substring(0, s.length - 1);
            };

            spec = function () {
                var s = "";
                $(".guige").each(function () {
                    s += $(this).val() + ",";
                })
                return s.substring(0, s.length - 1);
            };

            time = function () {
                var s = "";

                $(".shichang").each(function () {
                    
                    //遍历每个时长 根据单位处理数据
                    var val = $(this).parent().find(".danwei-box").eq(0).val();
                    //if(val == 0 ){ //包月转换成时间
                    //    s += parseInt($(this).val())*24 + ",";
                    //} else {
                        s += $(this).val() + ",";
                    //}
                    //console.log(val);
                })
                //console.log(s);
                return s.substring(0, s.length - 1);
            };

            price = function () {
                var s = "";
                $(".jiage").each(function () {
                    s += $(this).val() + ",";
                })

                return s.substring(0, s.length - 1);
            };
            //$(".FixedPopup").show();
            //if (specid() == "" || spec() == "" || time() == "" || price() == "") {
            //    tip("请完善信息。");
            //}else{
                $http({
                    method: 'post',
                    url: '/api/Marketing/SaveSpec',
                    data: { token: token, projectid: $("#InputProjectNameGuige").attr("str"), specid: specid(), spec: spec(), time: time(), price: price(), type: 1 }
                }).then(function (json) {
                
                    //成功时执行
                    $(".dialogs-appyfor-join").hide();
                    $("#open-mask").hide();
                    $(".FixedPopupMask").hide();
                    $(".FixedPopup").hide();
                    tip(json.data.data);
                    $(".danger").click(function () {
                        history.go(0);
                    });
                }, function (json) {
                    //失败时执行
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            //}
        };
        //添加规格DOM
        var index = 1;
        var total = 10;
        
        $scope.addGuige = function () {
            if (index < total) {
                index++;
                var _html ,charge = $(".shoufei").attr("data-billing");
                if (charge == 0 || charge == 1) {
                    _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='1'>时</option></select>";
                } else if (charge == 2) {
                    _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='2'>点</option></select>";
                } else {
                    _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='3'>分</option></select>";
                }
                $("#div-empty").before($("<div class='div-add new-div prop" + index + "' style=position:relative;>").html("<input type='text' name='name' value='' class='guige' data-specid='0' maxlength='20'/><input type='text' name='name' value='' class='shichang'/><input type='text'  value='' class='jiage' /><p class='del del" + index + "' >删除</p>" + _html));
                $(".del").unbind("click");
                $(".del").on("click", function () {
                    $(this).parent().remove();
                    total += 1;
                });
            } else {
                return;
            }
        };
       
        //删除规格
        $scope.deleteRow = function (e) {
            $(".del").unbind("click");
            $(".del").on("click", function () {
                $(this).parent().remove();
                //total += 1;
            });
        }

        //获取项目详情 处理单位及收费方式
        var _get_projectDetails = function (proid) {
            var _url = "/api/Project/ProjectDetails?token=" + token + "&projectid=" + proid;
            $http({
                method: 'GET',
                url: _url
            }).then(function (json) {
                if (json.data.code == 1) {
                    var data = json.data.data;
                    var billing = data[0].Billing;
                    $scope.shoufei = billing;
                    //01包月 2扣点 其他扣时
                    if (billing == 0 || billing == 1) {
                        $(".shoufei").html("包月模式");
                    } else if (billing == 2) {
                        $(".shoufei").html("扣点模式");
                    } else {
                        $(".shoufei").html("扣时模式");
                    }
                    //$scope.shouFei = data.Billing;
                } else if (json.data.code == 0) {
                    $scope.guigeData = [];
                }
            }, function () {
                return;
            });
        }

        //项目内购搜索
        $scope.souSuo = function () {
            var ordercode = $("#order-input").val();
            var udid = $("#udid-input").val();
            var datetime = $("#dpd1").val()?$("#dpd1").val():$("#dpd2").val();
            $http({
                method: 'post',
                url: '/api/Order/OrderList',
                data: { token: token, projectid: ProjectID, ordercode: ordercode, udid: udid, datetime: datetime, type: 2, pindex: 1, pagesize: 999 }
            }).then(function (json) {
                $(".FixedPopup").hide();
                //成功时执行

                if (json.data.code == 2) {
                    OtherPlace();
                } else if (json.data.code == 1) {
                    $scope.orderData = json.data.data;
                    $("#page1").hide();
                } else if (json.data.code == 0) {
                    $("#table").hide();
                    $("#page1").hide();
                    $("#table-bottom2").show();
                    $("#bottom-tip2").html("该项目还没有订单！");
                }
            }, function (json) {
                //失败时执行 
                $(".FixedPopup").hide();
                tip("网络连接错误！");
            });

            //_get_h($scope.p_current, $scope.p_pernum, function () { });
        }
    });
      

    //点击其他地方下拉框消失
    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });


}]);

//推广项目管理控制器
routingDemoApp.controller('ProjectTuiguangManage', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $(".FixedPopup").show();
    $.post("/api/Marketing/ProjectList", { token: token, type: 2 }, function (json) {
        $scope.panmedata = json.data;
      
        //显示订单列表的项目选择
        $("#pname-box").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera   
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE   
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#pname-box").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    $(this).find("ul").hide();
                    //location.href = "#/ProjectManage?ProjectID=" + $(this).find("input").attr("str") + "&ProjectName=" + $(this).find("input").val();
                }
            }
        });

        //项目选择结束
        if (json.code == 2) {
            OtherPlace();
        } else if (json.code == 1) {
            //时长或点数数值选择
            $("#selectNumBox").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera   
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE 
                    window.event.cancelBubble = true;
                }
                $(this).find("ul").show();
            });

            var FirstProjectID = json.data[0].ProjectID;
            var FirstProjectName = json.data[0].ProjectName;
            var ProjectID = $location.search().ProjectID ? $location.search().ProjectID : FirstProjectID;  //url传参更新
            var ProjectName = $location.search().ProjectName ? $location.search().ProjectName : FirstProjectName;  //url传参更新
            $scope.CurrentProjectID = ProjectID;
            $scope.CurrentPanme = ProjectName;
            $scope.FirstProjectID = FirstProjectID;  //规格弹框使用
            $scope.FirstProjectName = FirstProjectName;  //规格弹框使用
            //配置  
            $scope.count = 0;
            $scope.p_pernum = 15;
            //变量
            $scope.p_current = 1;
            $scope.p_all_page = 0;
            $scope.pages = [];

            //项目管理列表
            getManageList();
            
        } else {
            $(".FixedPopup").hide();
            $("#table-bottom1").show();
            $("#bottom-tip1").html("您还没有创建项目，请先创建项目！");
        }
    });

    //项目管理列表
    function getManageList() {
        var type = $location.search().type;

        $http({
            method: 'post',
            url: '/api/Marketing/SpreadManagerList',
            data: { token: token, type: type }
        }).then(function (json) {
            $(".FixedPopup").hide();
            var obj = json.data;
            if (obj.code == 1) {
                //console.log(obj.data);
                $scope.manageData = obj.data;
            } else if (obj.code == 0) {
                console.log(obj.data);
            } else {
                return;
            }
        })
    };
    
    //取消申请功能
    $scope.cancelSpread = function ($event) {
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
            discription: "是否取消推广申请？",
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
                var spreadid = $($event.target).parent().parent().find("#td-id").attr("data-sid");
                $http({
                    method: 'post',
                    url: '/api/Marketing/CancelSpread',
                    data: { token: token, spreadid: spreadid }
                }).then(function (json) {
                    //成功时执行
                    $(".FixedPopup").hide();
                    history.go(0);
                }, function (json) {
                    //失败时执行
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            };
        });
    }
    //立即付款
    $scope.goPay = function () {

        //初始订单金额
        $("#total-money").text($(".huiyuan-service").eq(0).find("a").attr("data-price") + "元");

        $(".FixedPopupMask").show();
        $(".paySpread").show();
        $("#payBox").show();
        $(".dialogs-box").show();
        $(".dialogs-check-pass").hide();
        $("#open-mask").show();

        $http({
            method: 'post',
            url: '/api/Marketing/SpreadStatus',
            data: { token: token }
        }).then(function (json) {
            //成功时执行
            if (json.data.code == 1) {
                $scope.applytime = json.data.applytime;
                $scope.projectname = json.data.projectname;
                $scope.spec = json.data.spec;
            }
       })
    }
    //删除推广
    $scope.deleteTuiguang = function ($event) {
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
            discription: "是否删除此推广记录？",
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
                var spreadid = $($event.target).parent().parent().find("td").first().attr("data-sid");
                $http({
                    method: 'post',
                    url: '/api/Marketing/DeleteSpread',
                    data: { token: token, spreadid: spreadid }
                }).then(function (json) {
                    //成功时执行
                    if (json.data.code == 1) {
                        tip(json.data.data);
                        //项目管理列表
                        getManageList();
                    }
                }, function (json) {
                    //失败时执行
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            };
        });
    };

    //获取规格列表
    function _get_spec(proid) {
        $http({
            method: 'post',
            url: '/api/Marketing/SpecList',
            data: { token: token, projectid: proid, type: 2 }
        }).then(function (json) {
            if (json.data.code == 1) {
                $scope.guigeData = json.data.data;
            } else if (json.data.code == 0) {
                $scope.guigeData = [];
            }
        }, function () {
            return;
        });
    }

    //编辑规格
    $scope.editGuige = function ($event) {
        $(".FixedPopupMask").show();
        $("#open-mask").show();
        $(".dialogs-appyfor-join").show();
        $(".guigePay").show();
        $scope.ClickProjectName = $($event.target).parent().parent().find("#td-name").text();
        $scope.ClickProjectID = $($event.target).parent().parent().find("#td-id").attr("data-pid");
        var curProid = $($event.target).parent().parent().find("#td-id").attr("data-pid");
        //获取规格列表
        _get_spec(curProid);
    };

    //保存规格
    $scope.saveGuige = function () {
        specid = function () {
            var s = "", id;
            $(".guige").each(function () {
                id = $(this).attr("data-specid");
                s += id + ",";
            })
            return s.substring(0, s.length - 1);
        };

        spec = function () {
            var s = "";
            $(".guige").each(function () {
                s += $(this).val() + ",";
            })
            return s.substring(0, s.length - 1);
        };

        time = function () {
            var s = "";

            $(".shichang").each(function () {

                //遍历每个时长 根据单位处理数据
                var val = $(this).parent().find(".danwei-box").eq(0).val();
                if (val == 0) { //包月转换成时间
                    s += parseInt($(this).val()) * 24 + ",";
                } else {
                    s += $(this).val() + ",";
                }
                //console.log(val);
            })
            //console.log(s);
            return s.substring(0, s.length - 1);
        };

        price = function () {
            var s = "";
            $(".jiage").each(function () {
                s += $(this).val() + ",";
            })

            return s.substring(0, s.length - 1);
        };
        $(".FixedPopup").show();
        if (specid() == "" || spec() == "" || time() == "" || price() == "") {
            tip("请完善信息。");
        } else {
            $http({
                method: 'post',
                url: '/api/Marketing/SaveSpec',
                data: { token: token, projectid: $("#InputProjectNameGuige").attr("str"), specid: specid(), spec: spec(), time: time(), price: price(), type: 1 }
            }).then(function (json) {

                //成功时执行
                $(".dialogs-appyfor-join").hide();
                $("#open-mask").hide();
                $(".FixedPopupMask").hide();
                $(".FixedPopup").hide();
                tip(json.data.data);
                $(".danger").click(function () {
                    history.go(0);
                });
            }, function (json) {
                //失败时执行
                $(".FixedPopup").hide();
                tip("网络连接错误！");
            });
        }
    };

    //日期选择
    var checkin = $('#dpd1').fdatepicker({}).on('changeDate', function (ev) {
        var newDate = new Date(ev.date);
        newDate.setDate(newDate.getDate() + 1);
        checkout.update(newDate);
        checkin.hide();
        $('#dpd2')[0].focus();
    }).data('datepicker');
    var checkout = $('#dpd2').fdatepicker({
        onRender: function (date) {
            return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
        }
    }).on('changeDate', function (ev) {
        checkout.hide();
    }).data('datepicker');
    //日期选择结束

    //点击其他地方下拉框消失
    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });

}]);

//内购项目管理控制器
routingDemoApp.controller('ProjectNeigouManage', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $(".FixedPopup").show();
    $.post("/api/Marketing/ProjectList", { token: token, type: 2 }, function (json) {
        $scope.panmedata = json.data;

        //显示订单列表的项目选择
        $("#pname-box").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera   
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE   
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#pname-box").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    $(this).find("ul").hide();
                    //location.href = "#/ProjectManage?ProjectID=" + $(this).find("input").attr("str") + "&ProjectName=" + $(this).find("input").val();
                }
            }
        });

        //项目选择结束
        if (json.code == 2) {
            OtherPlace();
        } else if (json.code == 1) {
            //时长或点数数值选择
            $("#selectNumBox").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera   
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE 
                    window.event.cancelBubble = true;
                }
                $(this).find("ul").show();
            });

            var FirstProjectID = json.data[0].ProjectID;
            var FirstProjectName = json.data[0].ProjectName;
            var ProjectID = $location.search().ProjectID ? $location.search().ProjectID : FirstProjectID;  //url传参更新
            var ProjectName = $location.search().ProjectName ? $location.search().ProjectName : FirstProjectName;  //url传参更新
            $scope.CurrentProjectID = ProjectID;
            $scope.CurrentPanme = ProjectName;
            $scope.FirstProjectID = FirstProjectID;  //规格弹框使用
            $scope.FirstProjectName = FirstProjectName;  //规格弹框使用
            //配置  
            $scope.count = 0;
            $scope.p_pernum = 15;
            //变量
            $scope.p_current = 1;
            $scope.p_all_page = 0;
            $scope.pages = [];

            //项目管理列表
            getManageList();
            
        } else {
            $(".FixedPopup").hide();
            $("#table-bottom1").show();
            $("#bottom-tip1").html("您还没有创建项目，请先创建项目！");
        }
    });

    //项目管理列表
    function getManageList() {
        var type = $location.search().type;

        $http({
            method: 'post',
            url: '/api/Marketing/InsManagerList',
            data: { token: token, type: type }
        }).then(function (json) {
            $(".FixedPopup").hide();
            var obj = json.data;
            if (obj.code == 1) {
                //console.log(obj.data);
                $scope.manageData = obj.data;
            } else if (obj.code == 0) {
                console.log(obj.data);
            } else {
                return;
            }
        })
    }

    //获取规格列表
    function _get_spec(proid) {
        $http({
            method: 'post',
            url: '/api/Marketing/SpecList',
            data: { token: token, projectid: proid, type: 1 }
        }).then(function (json) {
            if (json.data.code == 1) {
                $scope.guigeData = json.data.data;
            } else if (json.data.code == 0) {
                $scope.guigeData = [];
            }
        }, function () {
            return;
        });
    }
    
    //删除内购
    $scope.cancelNeigou = function ($event) {
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
            discription: "是否删除此内购记录？",
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
                var projectid = $($event.target).parent().parent().find("#td-id").attr("data-pid");
                $http({
                    method: 'post',
                    url: '/api/Marketing/DeleteProjectIns',
                    data: { token: token, projectid: projectid }
                }).then(function (json) {
                    //成功时执行
                    if (json.data.code == 1) {
                        tip(json.data.data);
                        //项目管理列表
                        getManageList();
                    }

                }, function (json) {
                    //失败时执行
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            };
        });
    }

    //编辑规格
    $scope.editGuige = function ($event) {
        //url传入收费模式
        var charge = $location.search().charge;
        $(".FixedPopupMask").show();
        $("#open-mask").show();
        $(".dialogs-appyfor-join").show();
        $scope.ClickProjectName = $($event.target).parent().parent().find("#td-name").text();
        $scope.ClickProjectID = $($event.target).parent().parent().find("#td-id").attr("data-pid");
        var curProid = $($event.target).parent().parent().find("#td-id").attr("data-pid");

        //单位控制
        if (charge == 0 || charge == 1) {
            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='1'>时</option></select>";
        } else if (charge == 2) {
            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='2'>点</option></select>";
        } else {
            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='3'>分</option></select>";
        }
        

        //获取规格列表
        _get_spec(curProid);

        setTimeout(function () { $(".div-add").append($(_html)); }, 200);
    };

    //保存规格
    $scope.saveGuige = function () {
        specid = function () {
            var s = "", id;
            $(".guige").each(function () {
                id = $(this).attr("data-specid");
                s += id + ",";
            })
            return s.substring(0, s.length - 1);
        };

        spec = function () {
            var s = "";
            $(".guige").each(function () {
                s += $(this).val() + ",";
            })
            return s.substring(0, s.length - 1);
        };

        time = function () {
            var s = "";

            $(".shichang").each(function () {

                //遍历每个时长 根据单位处理数据
                var val = $(this).parent().find(".danwei-box").eq(0).val();
                //if (val == 0) { //包月转换成时间
                //    s += parseInt($(this).val()) * 24 + ",";
                //} else {
                    s += $(this).val() + ",";
                //}
                //console.log(val);
            })
            //console.log(s);
            return s.substring(0, s.length - 1);
        };

        price = function () {
            var s = "";
            $(".jiage").each(function () {
                s += $(this).val() + ",";
            })

            return s.substring(0, s.length - 1);
        };
        $(".FixedPopup").show();
        if (specid() == "" || spec() == "" || time() == "" || price() == "") {
            tip("请完善信息。");
        } else {
            $http({
                method: 'post',
                url: '/api/Marketing/SaveSpec',
                data: { token: token, projectid: $("#InputProjectNameGuige").attr("str"), specid: specid(), spec: spec(), time: time(), price: price(), type: 1 }
            }).then(function (json) {

                //成功时执行
                $(".dialogs-appyfor-join").hide();
                $("#open-mask").hide();
                $(".FixedPopupMask").hide();
                $(".FixedPopup").hide();
                tip(json.data.data);
                $(".danger").click(function () {
                    history.go(0);
                });
            }, function (json) {
                //失败时执行
                $(".FixedPopup").hide();
                tip("网络连接错误！");
            });
        }
    };


    //日期选择
    var checkin = $('#dpd1').fdatepicker({}).on('changeDate', function (ev) {
        var newDate = new Date(ev.date);
        newDate.setDate(newDate.getDate() + 1);
        checkout.update(newDate);
        checkin.hide();
        $('#dpd2')[0].focus();
    }).data('datepicker');

    var checkout = $('#dpd2').fdatepicker({
        onRender: function (date) {
            return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
        }
    }).on('changeDate', function (ev) {
        checkout.hide();
    }).data('datepicker');

    //日期选择结束

    //点击其他地方下拉框消失
    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });

    //收费模式
    var charge = $location.search().charge;
    if(charge == 1){
        $(".shoufei").text("包月模式");
    } else if (charge == 2) {
        $(".shoufei").text("扣点模式");
    } else {
        $(".shoufei").text("扣时模式");
    }


}]);

//平台推广控制器
routingDemoApp.controller('MarketCenter', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var type = 3;
    //删除推广
    $scope.delSpread = function () {
        var spreadid = $("#fail-isee-btn").attr("data");
        $http({
            method: 'post',
            url: '/api/Marketing/DeleteSpread',
            data: { token: token, spreadid: spreadid }
        }).then(function (json) {
            //成功时执行
            history.go(0);
        }, function (json) {
            //失败时执行
            $(".FixedPopup").hide();
            tip("网络连接错误！");
        });
    }
    //取消推广
    $scope.cancelSpread = function () {
        var spreadid = $("#checking-isee-btn").attr("data") == undefined ? $("#cancel-btn").attr("data") : $("#checking-isee-btn").attr("data");
        $http({
            method: 'post',
            url: '/api/Marketing/CancelSpread',
            data: { token: token, spreadid: spreadid }
        }).then(function (json) {
            //成功时执行
            $(".FixedPopup").hide();
            history.go(0);
        }, function (json) {
            //失败时执行
            $(".FixedPopup").hide();
            tip("网络连接错误！");
        });
    }
    //立即付款
    $scope.goPay = function () {
        $("#payBox").show();
        $(".dialogs-check-pass").hide();
        $(".dialogs-box").show();
        $("#open-mask").hide();
        $(".payVip").hide();
        console.log(45646); //******
    }
    $scope.ManageHref = function () {
        location.href = "#/ProjectTuiguangManage?type=3&charge=" + $(event.target).attr("data-billing");;
    }
    $scope.ApplyForTuiguang = function () {
        $(".pay").show();
        //默认添加单位
        var _html, charge = $(".shoufei").attr("data-billing");
        if (charge == 0 || charge == 1) {
            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='1'>时</option></select>";
        } else if (charge == 2) {
            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='2'>点</option></select>";
        } else {
            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='3'>分</option></select>";
        }
        $(".prop0").append($(_html));

        $http({
            method: 'post',
            url: '/api/Marketing/SpreadStatus',
            data: { token: token }
        }).then(function (json) {
            //成功时执行
            if (json.data.code == 1) {
                $scope.applytime = json.data.applytime;
                $scope.projectname = json.data.projectname;
                $scope.spec = json.data.spec;
                $scope.spreadid = json.data.spreadid;
                if (json.data.data == 1) {
                    $(".dialogs-checking").show();
                    $(".FixedPopupMask").show();
                    $("#open-mask").show();                   
                } else if (json.data.data == 2) {
                    $(".dialogs-check-pass").show();
                    $(".FixedPopupMask").show();
                    $("#open-mask").show();
                } else if(json.data.data == 0){
                    $(".dialogs-check-fail").show();
                    $(".FixedPopupMask").show();
                    $("#open-mask").show();
                    $scope.message = json.data.message;
                } else {
                    $(".dialogs-appyfor-join").show();
                    $(".FixedPopupMask").show();
                    $("#open-mask").show();
                }
            } else {
                $(".dialogs-appyfor-join").show();
                $(".FixedPopupMask").show();
                $("#open-mask").show();
            }
            $(".FixedPopup").hide();
        }, function (json) {
            //失败时执行
            $(".FixedPopup").hide();
            tip("网络连接错误！");
        });
    }
    $(".FixedPopup").show();
    //获取所有规格
    $.post("/api/Marketing/ProjectList", { token: token, type: type}, function (json) {
        $scope.panmedata = json.data;
        $.post("/api/Marketing/ProjectList", { token: token, type: 1 }, function (json) {
            $scope.data = json.data;
            var FirstAllProjectName = json.data[0].ProjectName;
            var FirstAllProjectID = json.data[0].ProjectID;
            $scope.FirstAllProjectName = FirstAllProjectName;
            $scope.FirstAllProjectID = FirstAllProjectID;
            _get_spec(FirstAllProjectID); //获取规格列表
            _get_projectDetails(FirstAllProjectID); //初始收费模式
        })
        //显示订单列表的项目选择
        $("#pname-box").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#pname-box").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    $(this).find("ul").hide();
                    location.href = "#/MarketCenter?ProjectID=" + $(this).find("input").attr("str") + "&ProjectName=" + $(this).find("input").val();
                }
            }
        });
        //项目选择结束
        if (json.code == 2) {
            OtherPlace()
        } else if (json.code == 1) {
            //时长或点数数值选择
            $("#selectNumBox").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera   
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE   
                    window.event.cancelBubble = true;
                }
                $(this).find("ul").show();
            });

            var FirstProjectID = json.data[0].ProjectID;
            var FirstProjectName = json.data[0].ProjectName;
            var ProjectID = $location.search().ProjectID ? $location.search().ProjectID : FirstProjectID;
            var ProjectName = $location.search().ProjectName ? $location.search().ProjectName : FirstProjectName;
            $scope.CurrentProjectID = ProjectID;
            $scope.CurrentPanme = ProjectName;
            $scope.FirstProjectID = FirstProjectID;  //规格弹框使用
            $scope.FirstProjectName = FirstProjectName;  //规格弹框使用
            //配置  
            $scope.count = 0;
            $scope.p_pernum = 15;
            //变量
            $scope.p_current = 1;
            $scope.p_all_page = 0;
            $scope.pages = [];
            //初始化第一页 //获取项目订单列表 
            $(".FixedPopup").show();
            
            var _get = function (page, size, callback) {
                //日期选择
                var checkin = $('#dpd1').fdatepicker({}).on('changeDate', function (ev) {
                    var newDate = new Date(ev.date)
                    newDate.setDate(newDate.getDate() + 1);
                    checkout.update(newDate);
                    checkin.hide();
                    $('#dpd2')[0].focus();
                }).data('datepicker');
                var checkout = $('#dpd2').fdatepicker({
                    onRender: function (date) {
                        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
                    }
                }).on('changeDate', function (ev) {
                    checkout.hide();
                }).data('datepicker');
                //日期选择结束
                if (!ProjectID) {  //没有项目 终止请求
                    $("#table").hide();
                    $("#page1").hide();
                    $("#table-bottom2").show();
                    $("#bottom-tip2").html("该项目还没有订单！");
                    $(".FixedPopup").hide();
                    return ;
                }
                $http({
                    method: 'post',
                    url: '/api/Order/OrderList',
                    data: { token: token, projectid: "", type: type, pindex: page, pagesize: size }
                }).then(function (json) {
                    $(".FixedPopup").hide();
                    //成功时执行

                    if (json.data.code == 2) {
                        OtherPlace();
                    } else if (json.data.code == 1) {
                        $scope.orderData = json.data.data;
                    } else if (json.data.code == 0) {
                        $("#table").hide();
                        $("#page1").hide();
                        $("#table-bottom2").show();
                        $("#bottom-tip2").html("该项目还没有订单！");
                    }
                }, function (json) {
                    //失败时执行 
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            }
            _get($scope.p_current, $scope.p_pernum, function () { });
            //首页  
            $scope.p_index = function () {
                $scope.load_page(1);
            }
            //尾页  
            $scope.p_last = function () {
                $scope.load_page($scope.p_all_page);
            }
            $scope.p_last = function () {
                $scope.load_page($scope.p_all_page);
            }
            //上一页
            $scope.p_prev = function () {
                var page = $(".pagination").find("li.active").text();//获取当前页数
                var _page = parseInt(page) - 1;
                console.log(_page);
                if (_page >= 1) {
                    _get(_page, $scope.p_pernum, function () { });
                }
            }
            //下一页
            $scope.p_next = function () {
                var page = $(".pagination").find("li.active").text();//获取当前页数
                var _page = parseInt(page) + 1;
                console.log(_page);
                if (_page <= $scope.p_all_page) {
                    _get(_page, $scope.p_pernum, function () { });
                }
            }
            //加载某一页  
            $scope.load_page = function (page) {
                _get(page, $scope.p_pernum, function () { });
            };
            //加载指定页 
            $scope.select_load_page = function () {
                var page = $("#selectPage").val();
                _get(page, $scope.p_pernum, function () { });
            }
            //初始化页码
            var reloadPno = function () {
                $scope.pages = calculateIndexes($scope.p_current, $scope.p_all_page, 3);
            };
            //分页算法
            var calculateIndexes = function (current, length, displayLength) {
                var indexes = [];
                var start = Math.round(current - displayLength / 2);
                var end = Math.round(current + displayLength / 2);
                if (start <= 1) {
                    start = 1;
                    end = start + displayLength - 1;
                    if (end >= length - 1) {
                        end = length - 1;
                    }
                }
                if (end >= length - 1) {
                    end = length;
                    start = end - displayLength + 1;
                    if (start <= 1) {
                        start = 1;
                    }
                }
                for (var i = start; i <= end; i++) {
                    indexes.push(i);
                }
                return indexes;
            };
        } else {
            $(".FixedPopup").hide();
            $("#table-bottom1").show();
            $("#bottom-tip1").html("您还没有创建项目，请先创建项目！");
        }

        //显示项目规格列表显示
        $("#pname-box-guige").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera   
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE   
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#pname-box-guige").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    $(this).find("ul").hide();

                    var proid = $("#InputProjectNameTuiguang").attr("str");
                    _get_spec(proid);

                    _get_projectDetails(proid);

                    clearTimeout(timer);
                    var timer = setTimeout(function () {
                        var _html, charge = $(".shoufei").attr("data-billing");
                        if (charge == 0 || charge == 1) {
                            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='1'>时</option></select>";
                        } else if (charge == 2) {
                            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='2'>点</option></select>";
                        } else {
                            _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='3'>分</option></select>";
                        }
                        $(".prop0").children("select").remove();
                        $(".prop0").append($(_html));
                    }, 1000);

                }
            }
        });

        //获取规格列表
        var _get_spec = function (proid) {
            $http({
                method: 'post',
                url: '/api/Marketing/SpecList',
                data: { token: token, projectid: proid, type: 2 }
            }).then(function (json) {
                if (json.data.code == 1) {
                    $scope.guigeData = json.data.data;
                } else if (json.data.code == 0) {
                    $scope.guigeData = [];
                }
            }, function () {
                return;
            });
        }


        //保存规格列表
        $scope.saveGuige = function () {
            $(".FixedPopup").show();
            specid = function () {
                var s = "", id;
                $(".guige").each(function () {
                    id = $(this).attr("data-specid");
                    s += id + ",";
                })
                return s.substring(0, s.length - 1);
            };

            spec = function () {
                var s = "";
                $(".guige").each(function () {
                    s += $(this).val() + ",";
                })
                return s.substring(0, s.length - 1);
            };

            time = function () {
                var s = "";

                $(".shichang").each(function () {

                    //遍历每个时长 根据单位处理数据
                    var val = $(this).parent().find(".danwei-box").eq(0).val();
                    //if (val == 0) { //包月转换成时间
                    //    s += parseInt($(this).val()) * 24 + ",";
                    //} else {
                        s += $(this).val() + ",";
                    //}
                    console.log(val);
                })
                console.log(s);
                return s.substring(0, s.length - 1);
            };

            price = function () {
                var s = "";
                $(".jiage").each(function () {
                    s += $(this).val() + ",";
                })

                return s.substring(0, s.length - 1);
            };
            $http({
                method: 'post',
                url: '/api/Marketing/SaveSpec',
                data: { token: token, projectid: $("#InputProjectNameTuiguang").attr("str"), specid: specid(), spec: spec(), time: time(), price: price(), type: 2 }
            }).then(function (json) {
                //成功时执行
                var code = json.data.code;
                if (code == 1) {
                    $(".dialogs-appyfor-join").hide();
                    $("#open-mask").hide();
                    $(".FixedPopupMask").hide();
                    tip(json.data.data);
                    $(".danger").click(function () {
                        history.go(0);
                    });
                } else if (code == 0) {
                    tip(json.data.data);
                    $(".danger").click(function () {
                        history.go(0);
                    });
                }
                //history.go(0);
                $(".FixedPopup").hide();
            }, function (json) {
                //失败时执行
                $(".FixedPopup").hide();
                tip("网络连接错误！");
            });
        };
        //添加规格DOM
        var index = 1;
        var total = 10;
        $scope.addGuige = function () {
            if (index < total) {
                index++;
                var _html, charge = $(".shoufei").attr("data-billing");
                if (charge == 0 || charge == 1) {
                    _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='1'>时</option></select>";
                } else if (charge == 2) {
                    _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='2'>点</option></select>";
                } else {
                    _html = "<select class='danwei-box' style='position: absolute;left:130px;top:7px;border:none;color:#8c8c8c;'><option value='3'>分</option></select>";
                }
                $("#div-empty").before($("<div class='div-add new-div prop" + index + "' style=position:relative;>").html("<input type='text' name='name' value='' class='guige' data-specid='0' maxlength='20'/><input type='text' name='name' value='' class='shichang'/><input type='text'  value='' class='jiage' /><p class='del del" + index + "' >删除</p>" + _html));
                $(".del").unbind("click");
                $(".del").on("click", function () {
                    $(this).parent().remove();
                    total += 1;
                });
            } else {
                return;
            }
        };
        //删除规格
        $scope.deleteRow = function (e) {
            $(".del").unbind("click");
            $(".del").on("click", function () {
                $(this).parent().remove();
                //total += 1;
            });
        }

        //获取项目详情 处理单位及收费方式
        var _get_projectDetails = function (proid) {
            var _url = "/api/Project/ProjectDetails?token=" + token + "&projectid=" + proid;
            $http({
                method: 'GET',
                url: _url
            }).then(function (json) {
                if (json.data.code == 1) {
                    var data = json.data.data;
                    var billing = data[0].Billing;
                    $scope.shoufei = billing;
                    //01包月 2扣点 其他扣时
                    if (billing == 0 || billing == 1) {
                        $(".shoufei").html("包月模式");
                    } else if (billing == 2) {
                        $(".shoufei").html("扣点模式");
                    } else {
                        $(".shoufei").html("扣时模式");
                    }
                    //$scope.shouFei = data.Billing;
                } else if (json.data.code == 0) {
                    $scope.guigeData = [];
                }
            }, function () {
                return;
            });
        }

        //平台推广搜索
        $scope.souSuo = function () {
            var ordercode = $("#order-input").val();
            var udid = $("#udid-input").val();
            var datetime = $("#dpd1").val() ? $("#dpd1").val() : $("#dpd2").val();
            $http({
                method: 'post',
                url: '/api/Order/OrderList',
                data: { token: token, projectid: ProjectID, ordercode: ordercode, udid: udid, datetime: datetime, type: type, pindex: 1, pagesize: 999 }
            }).then(function (json) {
                $(".FixedPopup").hide();
                //成功时执行

                if (json.data.code == 2) {
                    OtherPlace();
                } else if (json.data.code == 1) {
                    $scope.orderData = json.data;
                } else if (json.data.code == 0) {
                    $("#table").hide();
                    $("#page1").hide();
                    $("#table-bottom2").show();
                    $("#bottom-tip2").html("该项目还没有订单！");
                }
            }, function (json) {
                //失败时执行 
                $(".FixedPopup").hide();
                tip("网络连接错误！");
            });

            //_get_h($scope.p_current, $scope.p_pernum, function () { });
        }
    });


    //点击其他地方下拉框消失
    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });

    //收费模式
    var charge = $location.search().charge;
    if (charge == 1) {
        $(".shoufei").text("包月模式");
    } else if (charge == 2) {
        $(".shoufei").text("扣点模式");
    } else {
        $(".shoufei").text("扣时模式");
    }

}]);

// 黑白名单控制器**
routingDemoApp.controller('WhiteAndBlackController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $(".FixedPopup").show();
    $.post("/api/project/GetProjectList", { token: token, pindex: 1, pagesize: 999 }, function (json) {
        $scope.panmedata = json.data;
        //项目选择
        $("#pname-box").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE   
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#pname-box").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    $(this).find("ul").hide();
                    location.href = "#/WhiteAndBlackList?ProjectID=" + $(this).find("input").attr("str") + "&ProjectName=" + $(this).find("input").val();          
                }
            }
        });
        //项目选择结束
        if (json.code == 2) {
            OtherPlace()
        } else if (json.code == 1) {
            
            // 第一个和当前项目信息
            var FirstProjectID = json.data[0].ProjectID;
            var FirstProjectName = json.data[0].ProjectName;
            var ProjectID = $location.search().ProjectID ? $location.search().ProjectID : FirstProjectID;
            var ProjectName = $location.search().ProjectName ? $location.search().ProjectName : FirstProjectName;
            $scope.CurrentProjectID = ProjectID;
            $scope.CurrentPanme = ProjectName;

            //配置  
            $scope.count = 0;
            $scope.p_pernum = 15;
            //变量  
            $scope.p_current = 1;
            $scope.p_all_page = 0;
            $scope.pages = [];

            //黑白开关
            var BlackFlag = false;
            $("#BlackFlag").click(function () {
                if (BlackFlag) {
                    BlackFlag = false;
                    $("#BlackMask").show();
                    $(this).animate({ right: "53px" });
                    $http({
                        method: 'post',
                        url: '/api/IPRestrict/CloseRestrict',
                        data: { token: token, projectID: ProjectID, type: 2 }
                    }).then(function (json) {
                    }, function (json) {
                        $(".FixedPopup").hide();
                        tip("网络连接错误！");
                    });
                } else {
                    BlackFlag = true;
                    $("#BlackMask").hide();
                    $(this).animate({ right: "32px" });
                    WhiteFlag = false;
                    $("#WhiteMask").show();
                    $("#WhiteFlag").animate({ right: "53px" });
                    $http({
                        method: 'post',
                        url: '/api/IPRestrict/OpenRestrict',
                        data: { token: token, projectID: ProjectID, type: 2 }
                    }).then(function (json) {
                    }, function (json) {
                        $(".FixedPopup").hide();
                        tip("网络连接错误！");
                    });
                }
            });

            var WhiteFlag = false;
            $("#WhiteFlag").click(function () {
                if (WhiteFlag) {
                    WhiteFlag = false;
                    $("#WhiteMask").show();
                    $(this).animate({ right: "53px" });
                    $http({
                        method: 'post',
                        url: '/api/IPRestrict/CloseRestrict',
                        data: { token: token, projectID: ProjectID, type: 1 }
                    }).then(function (json) {
                    }, function (json) {
                        $(".FixedPopup").hide();
                        tip("网络连接错误！");
                    });
                } else {
                    WhiteFlag = true;
                    $("#WhiteMask").hide();
                    $(this).animate({ right: "32px" });
                    BlackFlag = false;
                    $("#BlackMask").show();
                    $("#BlackFlag").animate({ right: "53px" });
                    $http({
                        method: 'post',
                        url: '/api/IPRestrict/OpenRestrict',
                        data: { token: token, projectID: ProjectID, type: 1 }
                    }).then(function (json) {
                    }, function (json) {
                        $(".FixedPopup").hide();
                        tip("网络连接错误！");
                    });
                }
            });
            //添加信息
            $scope.addBlackIP = function () {
                var value = $("#sq-text").val();
                $(".FixedPopup").show();
                postList(2,value);
                $("#IPBlacklist").hide();
            };
            //添加白名单
            $scope.addWhiteIP = function () {
                var value = $("#sq-text1").val();
                $(".FixedPopup").show();
                postList(1, value);
                $("#IPWhitelist").hide();
            };
            //提交名单
            var postList = function (type, value) {
                //*添加ip黑名单*
                $http({
                    method: 'post',
                    url: '/api/IPRestrict/AddIPRestrict',
                    data: { token: token, projectID: ProjectID, ips: value, type: type }
                }).then(function (json) {
                    $(".FixedPopup").hide();                  
                    if (json.data.code == 0) {
                        tip(json.data.data);
                    }
                    location.href = "#/WhiteAndBlackList?message="+Math.random();
                }, function (json) {
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            };
            //添加黑名单IP段
            $scope.addBlackIPDuan = function () {
                var ip1 = $("#ip1").val();
                var ip2 = $("#ip2").val();
                $(".FixedPopup").show();
                postIP(2, ip1, ip2);
                $("#BlacklistIPSegment").hide();
            };
            //添加白名单IP段
            $scope.addWhiteIPDuan = function () {
                var ip1 = $("#wip1").val();
                var ip2 = $("#wip2").val();
                $(".FixedPopup").show();
                postIP(1, ip1, ip2);
                $("#WhitelistIPSegment").hide();
            };
            //提交IP段
            var postIP = function (type, ip1, ip2) {
                //*添加黑名单ip段*
                $http({
                    method: 'post',
                    url: '/api/IPRestrict/AddIPSection',
                    data: { token: token, projectID: ProjectID, ip1: ip1, ip2: ip2, type: type }
                }).then(function (json) {
                    $(".FixedPopup").hide();
                    
                    if (json.data.code == 0) {
                        tip(json.data.data);
                    }
                    location.href = "#/WhiteAndBlackList?message=" + Math.random();
                }, function (json) {
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            }
            //添加黑名单地区
            $scope.addBlackLocal = function () {
                var area = $("#area").val();
                $(".FixedPopup").show();
                postArea(2, area);
                $("#PrefectureBlacklist").hide();
            };
            //添加白名单地区
            $scope.addWitheLocal = function () {
                var area = $("#area1").val();
                $(".FixedPopup").show();
                postArea(1, area);
                $("#PrefectureWhitelist").hide();
            };
            //提交地区
            var postArea = function (type, area) {
                //*添加黑名单地区*
                $http({
                    method: 'post',
                    url: '/api/IPRestrict/AddAreaRestrict',
                    data: { token: token, projectID: ProjectID, area: area, type: type }
                }).then(function (json) {
                    $(".FixedPopup").hide();                    
                    if (json.data.code == 0) {
                        tip(json.data.data);
                    }
                    location.href = "#/WhiteAndBlackList?message=" + Math.random();
                }, function (json) {
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            }
           
            //初始化第一页--显示 
            var _get = function (page, size, callback) {
                $(".FixedPopup").show();
                //*获取所有名单显示*
                $http({
                    method: 'post',
                    url: '/api/IPRestrict/GetRestrictList',
                    data: { token: token, projectID: ProjectID}
                }).then(function (json) {
                    $(".FixedPopup").hide();
                    if (json.data.code == 2) {
                        OtherPlace();
                    } else if (json.data.code == 1) {
                        var obj = json.data;
                        if (json.data.status == 2) {
                            $("#BlackMask").hide();
                            $("#WhiteMask").show();
                            $("#BlackFlag").css("right", "32px");
                            $("#WhiteFlag").css("right", "53px");
                            BlackFlag = true;
                        } else if (json.data.status == 1) {
                            $("#BlackMask").show();
                            $("#WhiteMask").hide();
                            $("#WhiteFlag").css("right", "32px");
                            $("#BlackFlag").css("right", "53px");
                            WhiteFlag = true;
                        } else {
                            $("#BlackMask").show();
                            $("#WhiteMask").show();
                            $("#WhiteFlag").css("right", "53px");
                            $("#BlackFlag").css("right", "53px");
                            WhiteFlag = false;
                            BlackFlag = false;
                        }
                        if (obj.table1 == "") {
                            $("#table-left-top-mid").hide();
                            $("#table-bottom1").show();
                            $("#bottom-tip1").html("您还没有IP黑名单");
                        } else {
                            $scope.data1 = obj.table1;
                            $("#table-bottom1").hide();
                        }
                        if (obj.table2 == "") {
                            $("#table-left-mid-mid").hide();
                            $("#table-bottom2").show();
                            $("#bottom-tip2").html("您还没有黑名单IP段");
                        }else{
                            $scope.data2 = obj.table2;
                            $("#table-bottom2").hide();
                        }
                        if (obj.table3 == "") {
                            $("#table-left-bottom-mid").hide();
                            $("#table-bottom3").show();
                            $("#bottom-tip3").html("您还没有地区黑名单");
                        } else {
                            $scope.data3 = obj.table3;
                            $("#table-bottom3").hide();
                        }
                        if (obj.table4 == "") {
                            $("#table-right-top-mid").hide();
                            $("#page-right-top").hide();
                            $("#table-bottom4").show();
                            $("#bottom-tip4").html("您还没有IP白名单");
                        } else {
                            $scope.data4 = obj.table4;
                            $("#table-bottom4").hide();
                        }
                        if (obj.table5 == "") {
                            $("#table-right-mid-mid").hide();
                            $("#page-right-mid").hide();
                            $("#table-bottom5").show();
                            $("#bottom-tip5").html("您还没有IP白名单");
                        } else {
                            $scope.data5 = obj.table5;
                            $("#table-bottom5").hide();
                        }
                        if (obj.table6 == "") {
                            $("#table-right-bottom-mid").hide();
                            $("#page-right-bottom").hide();
                            $("#table-bottom6").show();
                            $("#bottom-tip6").html("您还没有IP白名单");
                        } else {
                            $scope.data6 = obj.table6;
                            $("#table-bottom6").hide();
                        }
                        callback();
                        
                    } else if (json.data.code == 0) {
                        tip(json.statusText)
                    }
                }, function (json) {
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });                                                                         
            }

            _get($scope.p_current, $scope.p_pernum, function () { })           
           
            //全选
            var selectAll = true;
            $scope.selectAll = function ($event) {
                if (selectAll) {
                    $($event.target).parent().next().find(".check").prop("checked", "checked");
                    $($event.target).parent().next().find(".check").addClass("selected-color");
                    $($event.target).addClass("selected-color");
                    //$(".check").prop("checked", "checked");
                    //$(".check").addClass("selected-color");
                    selectAll = false;
                } else {
                    $($event.target).parent().next().find(".check").removeProp("checked");
                    $($event.target).parent().next().find(".check").removeClass("selected-color");
                    $($event.target).removeClass("selected-color");
                    //$(".check").removeProp("checked");
                    //$(".check").removeClass("selected-color");
                    selectAll = true;
                }
            }
            //选择
            $scope.Selected = function (LogID) {
                $("." + LogID).toggleClass("selected-color");
            }
            
            ////////////


            //单个删除名单  01/02/03为名单的不用类型  
            $scope.shanchu = function (resID,$event) {                
                var type = $($event.target).attr("data-type");

                javascript: $('body').dialog({
                    title: "是否删除？",
                    titleFontSize: "16px",
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
                    discription: "确认删除！",
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans',
                    duration: 0,
                }, function (ret) {
                    if (ret.index === 0) {
                        $(".FixedPopup").show();
                        //判断删除类型 提交不同的请求
                        if(type == "01"){
                            $.post("/api/IPRestrict/DelIPRestrict", { token: token, resids: resID }, function (json) {
                                $(".FixedPopup").hide();
                                tip(json.data);
                                _get($scope.p_current, $scope.p_pernum, function () { });
                            });
                        } else if (type == "02") {
                            $.post("/api/IPRestrict/DelIPSection", { token: token, secids: resID }, function (json) {
                                $(".FixedPopup").hide();
                                tip(json.data);
                                _get($scope.p_current, $scope.p_pernum, function () { });
                            });
                        } else if(type == "03"){
                            $.post("/api/IPRestrict/DelAreaRestrict", { token: token, arids: resID }, function (json) {
                                $(".FixedPopup").hide();
                                tip(json.data);
                                _get($scope.p_current, $scope.p_pernum, function () { });
                            });
                        }else {
                            console.log("没有该类型:"+type);
                        }
                    };
                });
            }
           

            //批量删除名单 01/02/03为名单的不用类型 
            $scope.shanchuall = function ($event) {
                var type = $($event.target).attr("data-type");

                javascript: $('body').dialog({
                    title: "提示",
                    discription: "确定批量删除日志？",
                    titleFontSize: "16px",
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'defalut' }],
                    inputPlaceholder: "",
                    duration: 0,
                }, function (ret) {
                    if (ret.index === 0) {
                        $(".FixedPopup").show();
                        var obj = "";
                        for (var i = 0; i < $(".selected-color").length; i++) {
                            obj += $(".selected-color")[i].getAttribute("value") + ",";
                        }
                        if (obj) {
                            $(".FixedPopup").hide();
                            obj = obj.substring(1, obj.length-1);
                            console.log(obj);
                            //判断删除类型 提交不同的请求
                            if (type == "01") {
                                $.post("/api/IPRestrict/DelIPRestrict", { token: token, resids: obj }, function (json) {
                                    if (json.code == 2) {
                                        OtherPlace();
                                    } else if (json.code == 1) {
                                        $(".selected-color").removeProp("checked");
                                        tip("删除成功!");
                                        _get($scope.p_current, $scope.p_pernum, function () { });
                                    } else {
                                        $(".selected-color").removeProp("checked");
                                        _get($scope.p_current, $scope.p_pernum, function () { });
                                        tip(json.data);
                                    }

                                })
                            }else if(type == "02"){
                                $.post("/api/IPRestrict/DelIPSection", { token: token, secids: obj }, function (json) {
                                    if (json.code == 2) {
                                        OtherPlace();
                                    } else if (json.code == 1) {
                                        $(".selected-color").removeProp("checked");
                                        tip("删除成功!");
                                        _get($scope.p_current, $scope.p_pernum, function () { });
                                    } else {
                                        $(".selected-color").removeProp("checked");
                                        _get($scope.p_current, $scope.p_pernum, function () { });
                                        tip(json.data);
                                    }

                                })
                            } else if (type == "03") {
                                $.post("/api/IPRestrict/DelAreaRestrict", { token: token, arids: obj }, function (json) {
                                    if (json.code == 2) {
                                        OtherPlace();
                                    } else if (json.code == 1) {
                                        $(".selected-color").removeProp("checked");
                                        tip("删除成功!");
                                        _get($scope.p_current, $scope.p_pernum, function () { });
                                    } else {
                                        $(".selected-color").removeProp("checked");
                                        _get($scope.p_current, $scope.p_pernum, function () { });
                                        tip(json.data);
                                    }

                                })
                            } else {
                                console.log("没有该类型:" + type);
                            }

                        } else {
                            return;
                        }
                    };
                });
             
            }
        } else {
            $(".FixedPopup").hide();
            $("#table-bottom1").show();
            $("#bottom-tip1").html("您还没有用户设备！");
        }
    });

    //点击其他地方下拉框消失

    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });

}]);

//个人中心控制器
routingDemoApp.controller('PersonalCenter', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    //配置  
    $scope.count = 0;
    $scope.p_pernum = 5; //每页显示个数
    //变量  
    $scope.p_current = 1;
    $scope.p_all_page = 0;
    $scope.pages = [];
    var _get = function (page, size, callback) {
        $http({
            method: 'post',
            url: '/api/project/GetProjectList',
            data: { token: token, pindex: page, pagesize: size }
        }).then(function (json) {
            var obj = json.data;
            if (obj.code == 1) {
                $scope.data = obj.data; //得到请求的项目列表数据
                $scope.count = json.data.Count;  //总计
                $scope.pageCount = json.data.pageCount; //页总数
                $scope.p_current = page;  //当前页
                $scope.p_all_page = json.data.pageCount; //页总数 
                //reloadPno();
                callback();
            } else if (obj.code == 0) {
                //tip(obj.data);
            } else if (obj.code == 2) {
                OtherPlace();
            }
        });
    };
    //初始第一页
    _get($scope.p_current, $scope.p_pernum, function () { });

    $("#recharge").on("click", function () {
        $("#tiXianModal").modal('toggle');
    });

    $scope.vipShow = function () {
        $(".open-mask").show();
        $(".dialogs-box").show();
        $(".FixedPopupMask").show();
    };
}]);

//安全设置控制器
routingDemoApp.controller('SafetySetting', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $http({
        method: 'post',
        url: '/api/Account/QuestionList',
        data: { }
    }).then(function (json) {
        $scope.questionData = json.data.data;
    });
}]);

//账户绑定控制器
routingDemoApp.controller('BindAccount', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    ////改昵称
    $scope.Xiugai = function () {
        $("#change-user").hide();
        $(".baocun").show();
        $("#username").removeAttr("disabled").css({ "border": "1px solid #ccc" }).focus();
    };

    $scope.Tbaocun = function () {
        $.post("/api/Account/ModifyNickName", { token: token, nickname: $("#username").val() }, function (json) {
            if (json.code == 1) {
                $("#username").attr("disabled", "disabled").css({ "border": "none" });
                $("#change-user").show();
                $(".baocun").hide();
                //tip(json.data);
                tipReload(json.data);
            } else {
                tip(json.data);
            }
        });
    };

    $scope.Tquxiao = function () {
        $("#change-user").show();
        $(".baocun").hide();
        $("#username").attr("disabled", "disabled").css({ "border": "none" });
    };

    //绑定支付宝
    $scope.BindZhifubao = function () {
        var code = $("#verifycode").val();
        var alipay = $("#account-apily").val();
        var accountName = $("#account-name").val();
        if (code != "" && alipay != "") {
            $.post("/api/Account/ModifyAlipay", { token: token, code: code, alipay: alipay, official: accountName }, function (json) {
                if (json.code == 1) {
                    $(".bind-table").show();
                    $(".change-table").hide();
                    tipReload(json.data);
                } else {
                    tip(json.data);
                }
            });
        }
    };

    $scope.CancelBind = function () {
        $(".bind-table").show();
        $(".change-table").hide();
    };

}]);

//推广返利控制器
routingDemoApp.controller('PromotoRebate', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    //配置  
    $scope.count = 0;
    $scope.p_pernum = 15;
    //变量  
    $scope.p_current = 1;
    $scope.p_all_page = 0;
    $scope.pages = [];
    //初始化第一页  
    var _get = function (page, size, callback) {
        $(".FixedPopup").show();
        $http({
            method: 'post',
            url: '/api/Activity/SubordinateList',
            data: { token: token, pindex: page, pagesize: size }
        }).then(function (json) {
            $(".FixedPopup").hide();
            //成功时执行

            if (json.data.code == 2) {
                OtherPlace();
            } else if (json.data.code == 1) {

                $scope.Count = json.data.count;
                var obj = json.data;
                $scope.data = obj.data; //得到请求的数据
                console.log(obj.data);

                $scope.p_current = page;
                $scope.p_all_page = json.data.pages;
                reloadPno();
                callback();
            } else if (json.data.code == 0) {
                $("#table").hide();
                $("#page1").hide();
                //$("#table-bottom").hide();
                $("#table-bottom1").show();
                $("#bottom-tip1").html("您还没有下级用户！");
            }
        }, function (json) {
            //失败时执行
            $(".FixedPopup").hide();
            tip("网络连接错误！");
        });
    }

    _get($scope.p_current, $scope.p_pernum, function () { });
    //首页  
    $scope.p_index = function () {
        $scope.load_page(1);
    }
    //尾页  
    $scope.p_last = function () {
        $scope.load_page($scope.p_all_page);
    }
    //上一页
    $scope.p_prev = function () {
        var page = $(".pagination").find("li.active").text();//获取当前页数
        var _page = parseInt(page) - 1;
        console.log(_page);
        if (_page >= 1) {
            _get(_page, $scope.p_pernum, function () { });
        }
    }
    //下一页
    $scope.p_next = function () {
        var page = $(".pagination").find("li.active").text();//获取当前页数
        var _page = parseInt(page) + 1;
        console.log(_page);
        if (_page <= $scope.p_all_page) {
            _get(_page, $scope.p_pernum, function () { });
        }
    }
    //加载某一页
    $scope.load_page = function (page) {
        _get(page, $scope.p_pernum, function () { });
    };
    //加载指定页
    $scope.select_load_page = function () {
        var page = $("#selectPage").val();
        _get(page, $scope.p_pernum, function () { });
    }
    //初始化页码
    var reloadPno = function () {
        $scope.pages = calculateIndexes($scope.p_current, $scope.p_all_page, 4);
    };
    //分页算法  
    var calculateIndexes = function (current, length, displayLength) {
        var indexes = [];
        var start = Math.round(current - displayLength / 2);
        var end = Math.round(current + displayLength / 2);
        if (start <= 1) {
            start = 1;
            end = start + displayLength - 1;
            if (end >= length - 1) {
                end = length - 1;
            }
        }
        if (end >= length - 1) {
            end = length;
            start = end - displayLength + 1;
            if (start <= 1) {
                start = 1;
            }
        }
        for (var i = start; i <= end; i++) {
            indexes.push(i);
        }
        return indexes;
    };

    //查看返利
    $scope.LookFanli = function (UserId,Bate) {
        $(".FixedPopupMask").show();
        $("#API-box").show();
        $("#table-first").siblings().remove();
        $.post("/api/Activity/SuRebateList", { token: token, userid: UserId }, function (json) {
            //$(".FixedPopup").hide();
            if (json.code == 2) {
                OtherPlace();
            } else if (json.code == 1) {
                console.log(json.data);
                $.each(json.data, function (i, item) {
                    $("#table-first").after("<tr><td>" + item["FundCode"] + "</td><td>" + item["FundTime"] + "</td><td>" + item["Channel"] + "</td><td>" + +item["Amount"] + "</td><td>" + item["Capital"] + "</td></tr>");

                    //if (item["Status"] != 2) {
                    //    if (item["CanBlock"] == 1) {
                    //        $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td>" + item["Reamrk"] + "</td><td>正常</td><td onclick='tingyong(" + item["AuthID"] + "," + DeviceID + ")' style='cursor:pointer;color:#609DFF'>停用</td></tr>");
                    //    }
                    //    else {
                    //        $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td>" + item["Reamrk"] + "</td><td>已过期</td><td>已过期</td></tr>");
                    //    }
                    //}
                    //else {
                    //    $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td class='six'>" + item["Reamrk"] + "</td><td >已停用</td><td>已停用</td></tr>");
                    //}
                });
            }
        });
    }
    //关闭返利
    $scope.closeLookFanli = function () {
        $(".FixedPopupMask").hide();
        $(".FixedPopup").hide();
        $("#API-box").hide();
    }

}])

//云控储存控制器
routingDemoApp.controller('CloudService', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    //加载项目列表
    //var _getproject = function () {
    //    $http.post("/api/project/GetProjectList", { token: token, pindex: 1, pagesize: 999 }).then(function (json) {
    //        var data = json.data;
    //        if(data.code == 1){
    //            $scope.originalproject = data.data;
    //        }else if(data.code == 2){
    //            OtherPlace();
    //        } else {
    //            tip(data.data);
    //        }
    //    }, function (err) {
    //        console.log(err);
    //    });
    //};
    //_getproject();

    //加载云控项目列表
    var _getcloudproject = function () {
        $http({
            method: 'post',
            url: el+'/getAllProject.action',
//            data: { token: token, pindex: 1, pagesize: 999 }
        }).then(function (json) {
            var json = json.data;
            //项目选择
            $("#pname-box").on("click", function () {
                if (event.stopPropagation) {
                    // 针对 Mozilla 和 Opera
                    event.stopPropagation();
                }
                else if (window.event) {
                    // 针对 IE
                    window.event.cancelBubble = true;
                }
                $(this).find("ul").show();
                $("#ces").css("display", "block");
            });
            $("#pname-box").bind({
                "click": function (event) {
                    if (event.target.tagName == "LI") {
                        $(this).find("input").val($(event.target).text()); //传具体的文字
                        $(this).find("input").attr("str", $(event.target).attr("data-value"));
                        $(this).find("input").attr("data-puid", $(event.target).attr("data-puid"));
                        $(this).find("input").css({
                            "color": "#333333"
                        });
                        $(this).find("ul").hide();
                        location.href = "#/CloudService?ProjectID=" + $(this).find("input").attr("str") + "&ProjectName=" + $(this).find("input").val() + "&ProjectPuid=" + $(this).find("input").attr("data-puid");
                        var proid = $(this).find("input").attr("str");
                    }
                }
            });
//            if (json.code == 2) {
//                $scope.NoProject = 0;
//                OtherPlace();
//            } else 
            if (json.data != null || json.data != "") {
                $scope.NoProject = 0;
                $scope.cloudprojectdata = json.data;
                var FirstProjectID = json.data[0].cloudid;
                var FirstProjectName = json.data[0].cloudname;
                var FirstPuid = json.data[0].cuid;
                var ProjectID = $location.search().ProjectID ? $location.search().ProjectID : FirstProjectID;
                var ProjectName = $location.search().ProjectName ? $location.search().ProjectName : FirstProjectName;
                var ProjectPuid = $location.search().ProjectPuid ? $location.search().ProjectPuid : FirstPuid;
                $scope.CurrentProjectID = ProjectID;
                $scope.CurrentPanme = ProjectName;
                $scope.CurrentPuid = ProjectPuid;

                //在有项目的前提下执行各类操作
                _getuitablelist(ProjectID);  //获取ui表列表
                _getusertablelist(ProjectID);  //获取数据表列表
                _getuserlist(ProjectID);  //获取用户列表
                _getapilist(ProjectID);  //获取api列表

            } else {
                $scope.NoProject = 1;
                $(".FixedPopup").hide();
                tip("您还没有云控项目！");
            }

        }, function (json) {
            //失败时执行
            $(".FixedPopup").hide();
            tip("网络连接错误！");
            window.location.href=el+"/";
        });
    };
    _getcloudproject();  //获取云控项目

    //获取UI表列表
    var _getuitablelist = function (id) {
//    	$http({
//            method: 'post',
//            url: el+'/getAllProject.action',
////            data: { token: token, pindex: 1, pagesize: 999 }
//        }).then(function(data){
//        	 var data = json.data;
//             if (data.code == 1) {
//                 $scope.uitablelist = data.data;  //UI表列表数据
//             } else if (data.code == 2) {
//                 OtherPlace();
//             } else {
//                 //tip(data.data);
//                 $scope.uitablelist = "";
//                 $("#table-bottom-ui").show();
//                 $("#bottom-tip-ui").html("您还没有UI表数据！");
//             }
//        })
    	$http({
        	method:"post",
        	url:el+"/getUiTableList.action",
        	data:{cloudId: id ? id : 0},
           	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        	transformRequest: function(obj) {
        		var str = [];
        		for(var p in obj){
        		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        		}
        		return str.join("&");
        		}
          }).then(function(json){
        	  var data = json.data;
              if (data.code == 1) {
                  $scope.uitablelist = data.data;  //UI表列表数据
              } else if (data.code == 2) {
                  alert("参数错误")
              } else {
                  //tip(data.data);
                  $scope.uitablelist = "";
                  $("#table-bottom-ui").show();
                  $("#bottom-tip-ui").html("您还没有UI表数据！");
              }
          })
//        $http.post(el+"/getUserApiByUserId.action", { token: token, cloudid: id ? id : 0, pindex: 1, pagesize: 999 }).then(function (json) {
//            var data = json.data;
//            if (data.code == 1) {
//                $scope.uitablelist = data.data;  //UI表列表数据
//            } else if (data.code == 2) {
//                OtherPlace();
//            } else {
//                //tip(data.data);
//                $scope.uitablelist = "";
//                $("#table-bottom-ui").show();
//                $("#bottom-tip-ui").html("您还没有UI表数据！");
//            }
//        }, function (err) {
//            console.log(err);
//        });
    };
    //删除ui表
    $scope.deluitable = function ($event) {
        var uitid = $($event.target).parent().parent().attr("data-id");
        var pid = $("#InputProjectName").attr("data-str");
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
            discription: "是否删除此UI表？",
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
//                $http({
//                    method: 'post',
//                    url: el+'/delUiTable.action',
//                    data: { uitId: uitid },
//                    
//                }).then(function (json) {
//                    if (json.data.code == 1) {
//                        tip("删除成功!");
//                        _getuitablelist(pid);
//                    }
//                }, function (json) {
//                    $(".FixedPopup").hide();
//                    tip("网络连接错误！");
//                });
                $http({
                	method:"post",
                	url:el+'/delUiTable.action',
                	data:{uitId: uitid},
                   	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                	transformRequest: function(obj) {
                		var str = [];
                		for(var p in obj){
                		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                		}
                		return str.join("&");
                		}
                  }).then(function(json){
                	  if (json.data.code == 1) {
                          tip("删除成功!");
                          _getuitablelist(pid);
                      }
                  })
            };
        });
    };


    //获取数据表列表
    var _getusertablelist = function (id) {
//        $http.post(el+"/showMyTables.action", {cloudid: id ? id : 0 }).then(function (json) {
//            var data = json.data;
//            if (data.code == 1) {
//                $scope.usertablelist = data.data;
//            } else if (data.code == 2) {
//                tip("缺少参数!")
//            } else {
//                //tip(data.data);
//                $scope.usertablelist = "";
//                $("#table-bottom-data").show();
//                $("#bottom-tip-data").html("您还没有数据表数据！");
//            }
//        }, function (err) {
//            console.log(err);
//        });
        $http({
        	method:"post",
        	url:el+'/showMyTables.action',
        	data:{cloudId: id ? id : 0},
           	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        	transformRequest: function(obj) {
        		var str = [];
        		for(var p in obj){
        		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        		}
        		return str.join("&");
        		}
//              data: { token: token, pindex: 1, pagesize: 999 }
          }).then(function(json){
        	  var data = json.data;
              if (data.code == 1) {
                  $scope.usertablelist = data.data;
              } else if (data.code == 2) {
                  tip("缺少参数!")
              } else {
                  //tip(data.data);
                  $scope.usertablelist = "";
                  $("#table-bottom-data").show();
                  $("#bottom-tip-data").html("您还没有数据表数据！");
              }
//              else {
//                  tip(data.data);
//              }
          })
    };
    //删除数据表
    $scope.delusertable = function ($event) {
        var ustid = $($event.target).parent().parent().attr("data-id");
        var pid = $("#InputProjectName").attr("data-str");
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
            discription: "是否删除此数据表？",
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
            	$http({
                	method:"post",
                	url:el+'/delTable.action',
                	data:{tableId:ustid },
                   	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                	transformRequest: function(obj) {
                		var str = [];
                		for(var p in obj){
                		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                		}
                		return str.join("&");
                		}
//                      data: { token: token, pindex: 1, pagesize: 999 }
                  }).then(function(json){
                	  var data = json.data;
                      if (data.code == 1) {
                    	  tip("删除成功！");
                          _getusertablelist(pid);
                          $("#createDataTable").click();
                      } else if (data.code == 2) {
                         alert("参数错误！")
                      } else if (data.code == 0) {
                          alert("失败!")
                       } 
//                      else {
//                          tip(data.data);
//                      }
                  })
//                $http({
//                    method: 'post',
//                    url: '/api/cloud/DeleteUserTable',
//                    data: { token: token, tableid: ustid }
//                }).then(function (json) {
//                    if (json.data.code == 1) {
//                        tip(json.data.data);
//                        _getusertablelist(pid);
//                        $("#createDataTable").click();
//                    }
//                }, function (json) {
//                    $(".FixedPopup").hide();
//                    tip("网络连接错误！");
//                });
            };
        });
    };

    //获取用户列表
    var _getuserlist = function (id) {
    	$http({
          method: 'post',
          url: el+'/huoquyonghu',
          data:{cloudId:id},
       	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    	transformRequest: function(obj) {
    		var str = [];
    		for(var p in obj){
    		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    		}
    		return str.join("&");
    		}
//          data: { token: token, pindex: 1, pagesize: 999 }
      }).then(function(json){
    	  var data = json.data;
          if (data.code == 1) {
              $scope.userlist = data.data;
          }else if(data.code == 2){
              alert("缺少参数！")
          } 
//          else {
//              //tip(data.data);
//              $scope.userlist = "";
//              $("#table-bottom-user").show();
//              $("#bottom-tip-user").html("您还没有用户表数据！");
//          }
      })
//        $http.post("/api/cloud/GetCloudUser", { token: token, pindex: 1, cloudid: id ? id : 0, pagesize: 999 }).then(function (json) {
//            var data = json.data;
//            if (data.code == 1) {
//                $scope.userlist = data.data;
//            }else if(data.code == 2){
//                OtherPlace();
//            } else {
//                //tip(data.data);
//                $scope.userlist = "";
//                $("#table-bottom-user").show();
//                $("#bottom-tip-user").html("您还没有用户表数据！");
//            }
//        }, function (err) {
//            console.log(err);
//        });
    };
    //停用启用用户列表
    $scope.stopuser = function ($event) {
        var userid = $($event.target).parent().parent().attr("data-id");
        var pid = $("#InputProjectName").attr("data-str");
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
            discription: "是否停用此用户？",
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
                $http({
                    method: 'post',
                    url: '/api/cloud/EnableCloudUser',
                    data: { token: token, userid: userid, status: 0 }
                }).then(function (json) {
                    if (json.data.code == 1) {
                        tip(json.data.data);
                        _getuserlist(pid);
                        $("#cloudUsers").click();
                    }
                }, function (json) {
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            };
        });
    };
    $scope.openuser = function ($event) {
        var userid = $($event.target).parent().parent().attr("data-id");
        var pid = $("#InputProjectName").attr("data-str");
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
            discription: "确定启用此用户？",
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
                $http({
                    method: 'post',
                    url: '/api/cloud/EnableCloudUser',
                    data: { token: token, userid: userid, status: 1 }
                }).then(function (json) {
                    if (json.data.code == 1) {
                        tip(json.data.data);
                        _getuserlist(pid);
                        $("#cloudUsers").click();
                    }
                }, function (json) {
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            };
        });
    };

    //获取开发API
    var _getapilist = function (pid) {
        $http.post(el+"/getUserApiByUserId.action").then(function (json) {
            var data = json.data;
   
                $scope.apiList = data.data;

//            else if (data.code == 2) {
//                OtherPlace();
//            } 
           if(json.data.length == 0) {
                $scope.apiList = "";
                //tip(data.data);
                $("#table-bottom-api").show();
                $("#bottom-tip-api").html("您还没有api数据！");
            }
        }, function (err) {
            console.log(err);
        });
    };
    //删除Api列表
    $scope.delapi = function ($event) {
        var apiid = $($event.target).parent().parent().attr("data-id");
        var pid = $("#InputProjectName").attr("data-str");
        javascript: $('body').dialog({
            title: "提示",
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
            discription: "是否删除此条API？",
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
//                $http({
//                    method: 'post',
//                    url: '/api/cloud/DeleteAPI',
//                    data: { token: token, apiid: apiid }
//                }).then(function (json) {
//                    if (json.data.code == 1) {
//                        tip(json.data.data);
//                        _getapilist(pid);
//                        $("#openAPI").click();
//                    }
//                }, function (json) {
//                    $(".FixedPopup").hide();
//                    tip("网络连接错误！");
//                });
                $http({
                	method:"post",
                	url:el+'/delUserApi.action',
                	data:{apiId: apiid},
                   	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                	transformRequest: function(obj) {
                		var str = [];
                		for(var p in obj){
                		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                		}
                		return str.join("&");
                		}
                  }).then(function(json){
                	  if (json.data.code == 1) {
                          tip("删除成功!");
                          _getapilist(pid);
                          $("#openAPI").click();
                      }
                  })
                
            };
        });
    };
    //查看api
    $scope.lookapi = function ($event) {
        var api = $($event.target).parent().attr("data-api");
        
        tip(api);

        $(".discription_dialog").html(" ").text(api);
    }

    //新增云控账户
    $scope.submitAddCloudUser = function () {
        $("#submit-user").attr("disabled", "").text("添加中...");
        if ($("#username").val()) {
            var pid = $("#InputProjectName").attr("data-str");
            $http.post(el+"/addUser.action", { token: token, projectid: pid, clouduser: $("#username").val(), remark: $("#remark").val() }).then(function (json) {
                var data = json.data;
                if (data.code == 1) {
                    tip("添加账户成功！");
                    $("#addUserModal").modal('hide');
                    _getuserlist(pid);
                    $(".table-bottom-tip").hide();
                } else if (data.code == 2) {
                    OtherPlace();
                } else {
                    tip(data.data);
                }
            }, function (err) {
                console.log(err);
            });
            $("#submit-user").removeAttr("disabled").text("确定");
        } else {
            $(".tip").text("请正确填写用户名！");
            $("#submit-user").removeAttr("disabled").text("确定");
        }
    };

    //新增云控项目
    $scope.submitNewCloudItem = function () {
        $("#submit-additem").attr("disabled", "").text("添加中...");
        $http({
        	method: 'POST',
        	url: el+"/addProject.action",
        	data: { projectName:$("#projectname").val() },
        	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        	transformRequest: function(obj) {
        		var str = [];
        		for(var p in obj){
        		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        		}
        		return str.join("&");
        		}
        }).success(function (data){
        	console.log(data)
            if (data.code == 1) {
                tip("添加成功！");
                $("#submit-additem").removeAttr("disabled").text("添加");
                $("#addItemModal").modal('hide');
                _getcloudproject();
            } else if (data.code == 2) {
                tip("缺少参数！");
                $("#submit-additem").removeAttr("disabled").text("添加");
            } else if(data.code == 0){
                tip("失败！");
                $("#submit-additem").removeAttr("disabled").text("添加");
            }
            $("#submit-additem").removeAttr("disabled").text("添加");
        })
//        $http.post(el+"/addProject.action",  {projectName:$("#projectname").val()}).then(function (json) {
//            var data = json.data;
//            if (data.code == 1) {
//                tip("添加成功！");
//                $("#addItemModal").modal('hide');
//                _getcloudproject();
//            } else if (data.code == 2) {
//                tip("缺少参数！");
//            } else if(data.code == 0){
//                tip("失败！");
//            }
//            $("#submit-additem").removeAttr("disabled").text("添加");
//        }, function (err) {
//            console.log(err);
//            $("#submit-additem").removeAttr("disabled").text("添加");
//        });
    };

    //删除云控项目
    $scope.submitDeleteCloudItem = function () {
        $("#submit-delitem").attr("disabled", "").text("删除中...");
        var projectid = $("#delitem-select option:selected").val();
        $http({
        	method: 'POST',
        	url: el+"/delProject.action",
        	data: { cloudId:parseInt(projectid) },
        	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        	transformRequest: function(obj) {
        		var str = [];
        		for(var p in obj){
        		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        		}
        		return str.join("&");
        		}
        }).success(function(data){
        	if (data.code == 1) {
                tip("删除成功！");
                $("#submit-delitem").removeAttr("disabled").text("删除");
                $("#delItemModal").modal('hide');
                _getcloudproject();
            } else if (data.code == 2) {
                tip("缺少参数！");
                $("#submit-delitem").removeAttr("disabled").text("删除");
            } else if(data.code == 0){
                tip("失败！");
                $("#submit-delitem").removeAttr("disabled").text("删除");
            }
        })
//        $http.post("/api/cloud/DeleteCloudProject", { token: token, cloudid: parseInt(projectid) }).then(function (json) {
//            var data = json.data;
//            if (data.code == 1) {
//                tip("删除成功！");
//                $("#delItemModal").modal('hide');
//                _getcloudproject();
//            } else if (data.code == 2) {
//                OtherPlace();
//            } else {
//                tip(json.data);
//            }
//            $("#submit-delitem").removeAttr("disabled").text("删除");
//        }, function (err) {
//            console.log(err);
//            $("#submit-delitem").removeAttr("disabled").text("删除");
//        });
    };


    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });

    $scope.addCloudUser = function () {
    
        $("#addUserModal").modal('show');
    };

    $scope.newItem = function () {
        $("#addItemModal").modal('show');
    };

    $scope.delItem = function () {
        $("#delItemModal").modal('show');
    };

    
    setTimeout(function () {
        $http.post('/api/cloud/UrlShort', { url: $('.long-href').attr('href') }).then(function (data) {
            var data = data.data;
            if(data.code == 1){
                $scope.shortHref = data.data;
                $('.short-href').attr("href", data.data);
                $('.short-href').text(data.data);
            }
        }, function (err) {
            console.log(err);
        })
    }, 500);

}])

//新建UI表控制器
routingDemoApp.controller('CreateUITable', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    //加载url云控项目数据
    $scope.CurrentPanme = $location.search().ProjectName;
    $scope.CurrentProjectID = $location.search().ProjectID;

    //拼接ui json
    $scope.submitUi = function () {
        var arr = [], dataJson = {};
        $(".table-dom tr:not(':last')").each(function (i, e) {
            var obj = {};
            obj.type = $(".ui-select option:selected", e).val();
            obj.title = $(".title-input", e).val();
            obj.content = $(".content-input", e).val();
            obj.default = $(".default-input", e).val();
            arr.push(obj);
        });
        dataJson.ui = arr;
        if ($("#InputTableName").val()) {
            $.post(el+"/addUiTable.action", { cloudId: $("#InputProjectName").attr("data-str"), uitName: $("#InputTableName").val(), uiJson: JSON.stringify(dataJson) }, function (res) {
                var json=JSON.parse(res);
            	if (json.code == 1) {
                    tip("添加成功！");
                    window.history.back(-1);
                    $(".danger").click(function () {
                        window.history.back(-1);
                    });
                }else if (json.code == 2) {
                    alert(json.msg)
                } else{
                    tip(json.data);
                }
            });
        } else {
            tip("请输入表名！");
        }
    };

    //禁用文本控件名
    $(".table-dom").on("change", ".ui-select", function () {
        $("option", this).each(function (i, e) {
            if($(e).prop('selected')){
                if ($(e).val() != 1) {
                    $(e).parent().parent().parent().parent().find(".content-input").removeAttr('disabled');
                    $(e).parent().parent().parent().parent().find(".content-input").val("");
                } else {
                    $(e).parent().parent().parent().parent().find(".content-input").attr('disabled', true);
                    $(e).parent().parent().parent().parent().find(".content-input").val(Math.ceil(Math.random() * 10000));
                }
            }
        })
    });
    

    //添加控件DOM
    var index = 1;
    //var total = 20;
    $scope.addUI = function () {
      //  if (index < total) {
            index++;
            var _html = "";
            _html += '<td class="right-btn-group">' +
                '<p class="nice-select-title title-b title-number">控件（' + index + '）</p>' +
                '<p class="nice-select-title title-b">类型</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 80px; background:#fff;border: none;padding: 0;">' +
                '<select class="ui-select" style="width: 100%;height: 100%;"><option value="1">文本</option><option value="2">单选框</option><option value="3">下拉框</option><option value="4">输入框</option><option value="5">折叠</option></select>' +
                '</div></div>' +
                '<p class="nice-select-title title-b">控件标题</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 140px; background:#fff;">' +
                '<input type="text" value="" maxlength="32" placeholder="" style="color: #333333" data-str="" class="title-input">' +
                '</div></div>' +
                '<p class="nice-select-title title-b">控件名</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 140px; background:#fff;">' +
                '<input type="text" value="' + Math.ceil(Math.random() * 10000) + '" maxlength="16" onkeyup="value=value.replace(/[^a-zA-Z0-9_]/g, \'\')" disabled placeholder="" style="color: #333333" data-str="" class="content-input">' +
                '</div></div>' +
                '<p class="nice-select-title title-b">内容</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 180px; background:#fff;">' +
                '<input type="text" value="" placeholder="" style="color: #333333" data-str="" class="default-input">' +
                '</div></div> <p class="nice-select-title del del' + index + '" style="color: red;font-size: 12px;padding-left: 5px;">删除</p> <p class="nice-select-title insert insert' + index + '" style="color: blue;font-size: 12px;padding-left: 5px;">插入</p></td>';

            $("#div-empty").before($("<tr class='div-add new-div prop" + index + "'>").html(_html));

            $(".del").unbind("click");
            $(".del").on("click", function () {
                $(this).parent().parent().remove();
                //total += 1;
                $(".title-number").each(function (i, e) {
                    $(e).html('控件（' + (parseInt(i) + 1) + '）');
                });
            });
        //前面追加元素
            $(".insert").unbind("click");
            $(".insert").on("click", function () {
                $(this).parent().parent().before($("<tr class='div-add new-div prop" + index + 1 + "'>").html(_html));
                $(".prop" + index + 1).find(".content-input").eq(0).val(Math.ceil(Math.random() * 10000));
                $(this).hide();
                $(this).parent().parent().prev().find(".insert").hide();
                $(this).parent().parent().prev().find(".del").hide();
                console.log($(this).parent().parent().prev());
                //total += 1;
                $(".title-number").each(function (i, e) {
                    $(e).html('控件（' + (parseInt(i) + 1) + '）');
                });
            });
            
        //} else {
          //  return;
        //}
    };
    //删除控件
    $scope.deleteRow = function (e) {
        $(".del").unbind("click");
        $(".del").on("click", function () {
            $(this).parent().remove();
            //total += 1;
        });
    }

    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });

}])

//修改UI表控制器
routingDemoApp.controller('ModifyUITable', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    //加载url云控项目数据
    $scope.CurrentPanme = $location.search().ProjectName;
    $scope.CurrentProjectID = $location.search().ProjectID;
    $scope.CurrentUiTableID = $location.search().UiTableId;

    //获取表详情
    $scope.options = [{ ovalue: 1, otext: "文本" }, { ovalue: 2, otext: "单选框" }, { ovalue: 3, otext: "下拉框" }, { ovalue: 4, otext: "输入框" }, { ovalue: 5, otext: "折叠" }];
    $http({
    	method: 'POST',
    	url: el+"/selectUiTableFiled.action",
    	data: {uitId: $scope.CurrentUiTableID },
    	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    	transformRequest: function(obj) {
    		var str = [];
    		for(var p in obj){
    		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    		}
    		return str.join("&");
    		}
    }).success(function(json){
        if (json.code == 1) {
            var data = json.data;
            var uijson = JSON.parse(json.data.uijson);
            $scope.UiData = uijson.ui;
            $scope.UitName = data.uitname;
        }else if(json.code == 2){
        	
        	alert("参数错误！")
        }
    })

    //禁用文本控件名
    $(".table-dom").on("change", ".ui-select", function () {
        $("option", this).each(function (i, e) {
            if ($(e).prop('selected')) {
                if ($(e).val() != 1) {
                    $(e).parent().parent().parent().parent().find(".content-input").removeAttr('disabled');
                    $(e).parent().parent().parent().parent().find(".content-input").val("");
                } else {
                    $(e).parent().parent().parent().parent().find(".content-input").attr('disabled', true);
                    $(e).parent().parent().parent().parent().find(".content-input").val(Math.ceil(Math.random() * 10000));
                }
            }
        })
    });

    //拼接ui json
    $scope.submitUi = function () {
        var arr = [], dataJson = {};
        $(".table-dom tr:not(':last')").each(function (i, e) {
            var obj = {};
            obj.type = $(".ui-select option:selected", e).val();
            obj.title = $(".title-input", e).val();
            obj.content = $(".content-input", e).val();
            obj.default = $(".default-input", e).val();
            arr.push(obj);
        });
        dataJson.ui = arr;
        if ($("#InputTableName").val()) {
//            $.post("/api/Cloud/UpdateUITable", { token: token, uitid: $scope.CurrentUiTableID, name: $("#InputTableName").val(), controls: JSON.stringify(dataJson) }, function (json) {
//                if (json.code == 1) {
//                    tip(json.data);
//                    $(".danger").click(function () {
//                        window.history.back(-1);
//                    });
//                } else if (json.code == 2) {
//                    OtherPlace();
//                } else {
//                    tip(json.data);
//                }
//            });
            $http({
            	method:"post",
            	url:el+'/updateUiTable.action',
            	data:{uitId: $scope.CurrentUiTableID, uitName: $("#InputTableName").val(), uiJson: JSON.stringify(dataJson)},
               	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            	transformRequest: function(obj) {
            		var str = [];
            		for(var p in obj){
            		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            		}
            		return str.join("&");
            		}
              }).then(function(json){
            	  if (json.data.code == 1) {
                      tip("成功!");
                      $(".danger").click(function () {
                          window.history.back(-1);
                      });
                  }
              })
        } else {
            tip("请输入表名！");
        }
    };

    //添加控件DOM
    $scope.addUI = function () {
        var index = $(".table-dom .title-b").eq($(".table-dom .title-b").length - 4).text().replace(/[^0-9]/ig, "");
            index++;
            var _html = "";
            _html += '<td class="right-btn-group">' +
                '<p class="nice-select-title title-b title-number">控件（' + index + '）</p>' +
                '<p class="nice-select-title title-b">类型</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 80px; background:#fff;border: none;padding: 0;">' +
                '<select class="ui-select" style="width: 100%;height: 100%;"><option value="1">文本</option><option value="2">单选框</option><option value="3">下拉框</option><option value="4">输入框</option><option value="5">折叠</option></select>' +
                '</div></div>' +
                '<p class="nice-select-title title-b">控件标题</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 140px; background:#fff;">' +
                '<input type="text" value="" maxlength="32" placeholder="" style="color: #333333" data-str="" class="title-input">' +
                '</div></div>' +
                '<p class="nice-select-title title-b">控件名</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 140px; background:#fff;">' +
                '<input type="text" value="' + Math.ceil(Math.random() * 10000) + '" maxlength="16" onkeyup="value=value.replace(/[^a-zA-Z]/g, \'\')" disabled placeholder="" style="color: #333333" data-str="" class="content-input">' +
                '</div></div>' +
                '<p class="nice-select-title title-b">内容</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 180px; background:#fff;">' +
                '<input type="text" value="" placeholder="" style="color: #333333" data-str="" class="default-input">' +
                '</div></div> <p class="nice-select-title del del' + index + '" style="color: red;font-size: 12px;padding-left: 5px;">删除</p> <p class="nice-select-title insert insert' + index + '" style="color: blue;font-size: 12px;padding-left: 5px;">插入</p></td>';

            $("#div-empty").before($("<tr class='div-add new-div prop" + index + "'>").html(_html));

            $(".del").unbind("click");
            $(".del").on("click", function () {
                $(this).parent().parent().remove();
                //total += 1;
            });
        //前面追加元素
            $(".insert").unbind("click");
            $(".insert").on("click", function () {
                $(this).parent().parent().before($("<tr class='div-add new-div prop" + index + 1 + "'>").html(_html));
                $(".prop" + index + 1).find(".content-input").eq(0).val(Math.ceil(Math.random() * 10000));
                $(this).hide();
                $(this).parent().parent().prev().find(".insert").hide();
                $(this).parent().parent().prev().find(".del").hide();
                //total += 1;
                $(".title-number").each(function (i, e) {
                    $(e).html('控件（' + (parseInt(i) + 1) + '）');
                });
            });
            $(".title-number").each(function (i, e) {
                $(e).html('控件（' + (parseInt(i) + 1) + '）');
            });
    };
    //前面追加元素
    $scope.insertElement = function (event) {
        var index = Math.ceil(Math.random() * 10000);
        console.log(index);
        var __html = '<td class="right-btn-group">' +
                '<p class="nice-select-title title-b title-number">控件（' + index + '）</p>' +
                '<p class="nice-select-title title-b">类型</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 80px; background:#fff;border: none;padding: 0;">' +
                '<select class="ui-select" style="width: 100%;height: 100%;"><option value="1">文本</option><option value="2">单选框</option><option value="3">下拉框</option><option value="4">输入框</option><option value="5">折叠</option></select>' +
                '</div></div>' +
                '<p class="nice-select-title title-b">控件标题</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 140px; background:#fff;">' +
                '<input type="text" value="" maxlength="32" placeholder="" style="color: #333333" data-str="" class="title-input">' +
                '</div></div>' +
                '<p class="nice-select-title title-b">控件名</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 140px; background:#fff;">' +
                '<input type="text" value="' + Math.ceil(Math.random() * 10000) + '" maxlength="16" onkeyup="value=value.replace(/[^a-zA-Z]/g, \'\')" disabled placeholder="" style="color: #333333" data-str="" class="content-input">' +
                '</div></div>' +
                '<p class="nice-select-title title-b">内容</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 180px; background:#fff;">' +
                '<input type="text" value="" placeholder="" style="color: #333333" data-str="" class="default-input">' +
                '</div></div> <p class="nice-select-title del del' + index + '" style="color: red;font-size: 12px;padding-left: 5px;">删除</p> <p class="nice-select-title insert insert' + index + '" ng-click="insertElement($event)" style="color: blue;font-size: 12px;padding-left: 5px;">插入</p></td>';

        $(event.target).parent().parent().before($("<tr class='div-add new-div prop" + index + "'>").html(__html));
        $(".prop" + index).find(".content-input").eq(0).val(Math.ceil(Math.random() * 10000));
        $(event.target).hide();
        $(event.target).parent().parent().prev().find(".insert").hide();
        //$(event.target).parent().parent().prev().find(".del").hide();
        //total += 1;
        $(".del").unbind("click");
        $(".del").on("click", function () {
            $(this).parent().parent().remove();
            //total += 1;
        });
        $(".title-number").each(function (i, e) {
            $(e).html('控件（' + (parseInt(i) + 1) + '）');
        });
    };
    //删除控件
    //$scope.deleteRow = function (e) {
    //    console.log(465);
    //    $(e.target).parent().parent().remove();
    //}
}])
//新建数据表控制器
routingDemoApp.controller('CreateDataTable', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    
    //加载url云控项目
    $scope.CurrentPanme = $location.search().ProjectName;
    $scope.CurrentProjectID = $location.search().ProjectID;

    //拼接ui json
    $scope.submitData = function () {
        var arr = [], dataJson = {};
        $(".table-dom tr:not(':last')").each(function (i, e) {
            var obj = {};
            obj.type = $(".field-select option:selected", e).val();
            obj.field = $(".field-input", e).val();
            arr.push(obj);
        });
        dataJson.ui = arr;
        if ($("#InputTableName").val()) {
        	$http({
            	method:"post",
            	url:el+'/addTable.action',
            	data:{cloudid:$("#InputProjectName").attr("data-str"),tname:$("#InputTableName").val(),json: JSON.stringify(dataJson) },
               	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            	transformRequest: function(obj) {
            		var str = [];
            		for(var p in obj){
            		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            		}
            		return str.join("&");
            		}
//                  data: { token: token, pindex: 1, pagesize: 999 }
              }).then(function(json){
            	  var data = json.data;
                  if (data.code == 1) {
                	  tip("成功！");
                      $(".danger").click(function () {
                          window.history.back(-1);
                          setTimeout(function () {
                              $("#createDataTable").click();
                          }, 500);
                      });
                  } else if (data.code == 2) {
                     alert("参数错误！")
                  } else if (data.code == 0) {
                      alert("失败!")
                   } 
//                  else {
//                      tip(data.data);
//                  }
              })
//            $.post("/api/Cloud/CreateDataTable", { token: token, cloudid: $("#InputProjectName").attr("data-str"), tname: $("#InputTableName").val(), json: JSON.stringify(dataJson) }, function (json) {
//                if (json.code == 1) {
//                    tip(json.data);
//                    $(".danger").click(function () {
//                        window.history.back(-1);
//                        setTimeout(function () {
//                            $("#createDataTable").click();
//                        }, 500);
//                    });
//                } else if (json.code == 2) {
//                    OtherPlace();
//                } else {
//                    tip(json.data);
//                }
//            });
        } else {
            tip("请输入表名！");
        }
    };

    //添加控件DOM
    var index = 1;
    var total = 20;
    $scope.addData = function () {
        if (index < total) {
            index++;
            var _html = "";
            _html += '<td class="right-btn-group">' +
                '<p class="nice-select-title title-b">列字段</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 180px; background:#fff;">' +
                '<input type="text" value="" placeholder="" maxlength="16" onkeyup="value=value.replace(/[^a-zA-Z0-9_]/g, \'\')" style="color: #333333" data-str="" class="field-input">' +
                '</div></div>' +
                '<p class="nice-select-title title-b">类型</p>' +
                '<div class="nice-select-box">' +
                '<div class="nice-select" name="nice-select" id="pname-box" style="width: 180px; background:#fff;border:none;padding:0;">' +
                '<select class="field-select" style="width: 100%;height: 100%;"><option value="int">整数类型</option><option value="nvarchar(max)">字符串类型</option><option value="datetime">时间类型</option><option value="decimal">小数类型</option></select>' +
                '</div></div> <p class="nice-select-title del del' + index + '" style="color: red;font-size: 12px;padding-left: 5px;">删除</p></td>';



            $("#div-empty").before($("<tr class='div-add new-div prop" + index + "'>").html(_html));

            $(".del").unbind("click");
            $(".del").on("click", function () {
                $(this).parent().parent().remove();
                total += 1;
            });
        } else {
            return;
        }
    };
    //删除控件
    $scope.deleteRow = function (e) {
        $(".del").unbind("click");
        $(".del").on("click", function () {
            $(this).parent().remove();
            //total += 1;
        });
    }

    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });

}])

//数据表详情
routingDemoApp.controller('DetailDataTable', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    //加载url云控项目数据
    $scope.CurrentPanme = $location.search().ProjectName;
    $scope.CurrentProjectID = $location.search().ProjectID;
    $scope.CurrentUserTableID = $location.search().DataTableId;
    $scope.CurrentUserTableName = $location.search().DataTableName;

    //获取表详情
//    $http.post("/api/Cloud/GetTableField", { token: token, tableid: $scope.CurrentUserTableID }).then(function (json) {
//        var json = json.data;
//        //console.log(json);
//        if (json.code == 1) {
//            $scope.fieldList = json.data;
//        }
//    }, function (err) {
//        console.log(err);
//    });
    $http({
    	method:"post",
    	url:el+'/getTableField.action',
    	data:{tableId: $scope.CurrentUserTableID},
       	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    	transformRequest: function(obj) {
    		var str = [];
    		for(var p in obj){
    		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    		}
    		return str.join("&");
    		}
//          data: { token: token, pindex: 1, pagesize: 999 }
      }).then(function(json){
    	  var json = json.data;
          //console.log(json);
          if (json.code == 1) {
              $scope.fieldList = json.data;
          }
      })
}])

//新建开发API控制器
routingDemoApp.controller('CreateDeveloperAPI', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    //加载url云控项目
    $scope.CurrentPanme = $location.search().ProjectName;
    $scope.CurrentProjectID = $location.search().ProjectID;

    //获取数据表
    $http({
    	method:"post",
    	url:el+'/showMyTables.action',
    	data:{cloudId:$scope.CurrentProjectID},
       	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    	transformRequest: function(obj) {
    		var str = [];
    		for(var p in obj){
    		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    		}
    		return str.join("&");
    		}
//          data: { token: token, pindex: 1, pagesize: 999 }
      }).then(function(json){
    	  var data = json.data;
          if (json.data.code == 1) {
              $scope.userTableList = data.data;
              console.log($scope.userTableList)
          } else if (json.data.code == 2) {
             alert("参数错误！")
          } 
//          else {
//              tip(data.data);
//          }
      })
//    $http.post("/api/cloud/GetUserTableList", { token: token, cloudid: $scope.CurrentProjectID, pindex: 1, pagesize: 999 }).then(function (json) {
//        var data = json.data;
//        if (data.code == 1) {
//            $scope.userTableList = data.data;
//        } else if (data.code == 2) {
//            OtherPlace();
//        } else {
//            tip(data.data);
//        }
//    }, function (err) {
//        console.log(err);
//    });

    //获取数据表字段
    var _getFields = function (tableid) {
        var defualtTableId = $("#datatable-select option").eq(0).val();
        $http({
        	method:"post",
        	url:el+'/getTableField.action',
        	data:{tableId:tableid ? tableid : defualtTableId },
           	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        	transformRequest: function(obj) {
        		var str = [];
        		for(var p in obj){
        		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        		}
        		return str.join("&");
        		}
//              data: { token: token, pindex: 1, pagesize: 999 }
          }).then(function(json){
        	  var data = json.data;
              if (data.code == 1) {
                if (data.data[1].DATA_TYPE != 'int') {
                $(".selfadd").hide();
                $(".selfreduce").hide();
            }
            $scope.fieldsList = data.data;
            $scope.firstcolname = "@" + data.data[0].columnName;
            $scope.secondcolname = "@" + data.data[1].columnName;
            $scope.lockTime = data.hasblock;
              } else if (data.code == 2) {
                 alert("参数错误！")
              } else if (data.code == 3) {
                  alert("表不存在!")
               } 
//              else {
//                  tip(data.data);
//              }
          })
//        $http.post("/api/cloud/GetTableField", { token: token, tableid: tableid ? tableid : defualtTableId }).then(function (json) {
//            var data = json.data;
//            if (data.code == 1) {
//                if (data.data[1].DATA_TYPE != 'int') {
//                    $(".selfadd").hide();
//                    $(".selfreduce").hide();
//                }
//                $scope.fieldsList = data.data;
//                $scope.firstcolname = "@" + data.data[0].COLUMN_NAME;
//                $scope.secondcolname = "@" + data.data[1].COLUMN_NAME;
//                $scope.lockTime = data.hasblock;
//            } else if (data.code == 2) {
//                OtherPlace();
//            } else {
//                tip(data.data);
//            }
//        }, function (err) {
//            console.log(err);
//        });
    };
    setTimeout(function () { _getFields(); }, 100);
   
    //改变数据表改变字段 **An error may occur on the second access
    $("#datatable-select").on("change", function () {
        $(".checkboxAll").prop("checked",false);
        var tableid = "";
        $("option",this).each(function (i, e) {
            if ($(e).prop("selected")) {
                tableid = $(this).val();
            }
        });
        _getFields(tableid);
    });

    //改变字段改变查询符号 **An error may occur on the second access
    $(".table-dom").on("change", ".condition-field", function () {
        $("option",this).each(function (i, e) {
            if ($(e).prop("selected")) {
                if ($(e).val() == "nvarchar") {
                    $(e).parent().next().find("option[class=hasif]").attr("disabled", "").css("color","#fff");
                    $(e).parent().next().find("option").eq(2).prop("selected",true);
                } else {
                    $(e).parent().next().find("option[class=hasif]").removeAttr("disabled").css("color","#000");
                }
                //去除自定义值新加
                $(e).parent().next().next().next().val("@" + $(e).text());
            }
        });
    });
    $(".table-dom-del").on("change", ".condition-field", function () {
        $("option", this).each(function (i, e) {
            if ($(e).prop("selected")) {
                if ($(e).val() == "nvarchar") {
                    $(e).parent().next().find("option[class=hasif]").attr("disabled", "").css("color", "#fff");
                    $(e).parent().next().find("option").eq(2).prop("selected", true);
                } else {
                    $(e).parent().next().find("option[class=hasif]").removeAttr("disabled").css("color", "#000");
                }
                //去除自定义值新加
                $(e).parent().next().next().next().val("@" + $(e).text());
            }
        });
    });
    $(".table-dom-modify-condition").on("change", ".condition-field", function () {
        $("option", this).each(function (i, e) {
            if ($(e).prop("selected")) {
                if ($(e).val() == "nvarchar") {
                    $(e).parent().next().find("option[class=hasif]").attr("disabled", "").css("color", "#fff");
                    $(e).parent().next().find("option").eq(2).prop("selected", true);
                } else {
                    $(e).parent().next().find("option[class=hasif]").removeAttr("disabled").css("color", "#000");
                }
                //去除自定义值新加
                $(e).parent().next().next().next().val("@" + $(e).text());
            }
        });
    });

    //改变值类型改变文本输入 **An error may occur on the second access
    $(".table-dom").on("change", ".condition-by", function () {  //每个by添加改变事件 查询
        $("option", this).each(function (i, e) { 
            if ($(e).prop("selected")) {
                if ($(e).val() == "1") {
                    $(this).parent().next().removeAttr("disabled").val("");
                } else {
                    var prevSelect = $(this).parent().prev().prev();
                    var fieldname = $("option:selected", prevSelect).text();
                    $(this).parent().next().attr("disabled", "").val("@"+fieldname);
                }
            }
        });
    });
    $(".table-dom-del").on("change", ".condition-by", function () {  //每个by添加改变事件 删除
        $("option", this).each(function (i, e) {
            if ($(e).prop("selected")) {
                if ($(e).val() == "1") {
                    $(this).parent().next().removeAttr("disabled").val("");
                } else {
                    var prevSelect = $(this).parent().prev().prev();
                    var fieldname = $("option:selected", prevSelect).text();
                    $(this).parent().next().attr("disabled", "").val("@" + fieldname);
                }
            }
        });
    });
    $(".table-dom-add").on("change", ".condition-by", function () {  //每个by添加改变事件 增加
        $("option", this).each(function (i, e) {
            if ($(e).prop("selected")) {
                if ($(e).val() == "1") {
                    $(this).parent().next().removeAttr("disabled").val("");
                } else {
                    $(this).parent().next().attr("disabled", "").val("@" + $(this).parent().prev().find("input[type=text]").val());
                }
            }
        });
    });
    $(".table-dom-modify-field").on("change", ".condition-by", function () {  //每个by添加改变事件 修改-修改字段
        $("option", this).each(function (i, e) {
            if ($(e).prop("selected")) {
                if ($(e).val() == "1") {
                    $(this).parent().next().removeAttr("disabled").val("");
                } else if ($(e).val() == "3") {
                    var prevSelect = $(this).parent().prev();
                    var fieldname = $("option:selected", prevSelect).text();
                    $(this).parent().next().attr("disabled", "").val('['+ fieldname +']+1');
                } else if ($(e).val() == "4") {
                    var prevSelect = $(this).parent().prev();
                    var fieldname = $("option:selected", prevSelect).text();
                    $(this).parent().next().attr("disabled", "").val('[' + fieldname + ']-1');
                } else {
                    var prevSelect = $(this).parent().prev();
                    var fieldname = $("option:selected", prevSelect).text();
                    $(this).parent().next().attr("disabled", "").val("@" + fieldname);
                }
            }
        });
    });
    $(".table-dom-modify-field").on("change", ".condition-field", function () {  //每个by添加改变事件 修改-修改字段
        $("option", this).each(function (i, e) {
            if ($(e).prop("selected")) {
                //自增 自减
                if ($(e).val() == 'int') {
                    $(".selfadd").show();
                    $(".selfreduce").show();
                } else {
                    $(e).parent().next().find("option").eq(0).prop('selected', true);
                    $(".selfadd").hide();
                    $(".selfreduce").hide();
                }
                if ($(e).val() == "1") {
                    $(this).parent().next().removeAttr("disabled").val("");
                } else {
                    var prevSelect = $(this).parent().prev();
                    var fieldname = $("option:selected", prevSelect).text();
                    //$(this).parent().next().attr("disabled", "").val("@" + fieldname);
                }
                //去除自定义值新加
                $(e).parent().next().next().val("@" + $(e).text());
            }
        });
    });
    $(".table-dom-modify-condition").on("change", ".condition-by", function () {  //每个by添加改变事件 修改-修改条件
        $("option", this).each(function (i, e) {
            if ($(e).prop("selected")) {
                if ($(e).val() == "1") {
                    $(this).parent().next().removeAttr("disabled").val("");
                } else {
                    var prevSelect = $(this).parent().prev().prev();
                    var fieldname = $("option:selected", prevSelect).text();
                    $(this).parent().next().attr("disabled", "").val("@" + fieldname);
                }
            }
        });
    });

    //拼接ui json
    $scope.submitData = function ($event) {
        var boxs = $($event.target).parent().parent().prev().find(".table-fields-box");
        if ($(boxs).eq(0).is(":visible")) {  //查询状态
            var arr = [], arr1 = [], dataJson = {};
            $(".table-dom tr:not(':last')").each(function (i, e) {
                if(i>0){
                    var obj = {};
                    obj.field = $(".condition-field option:selected", e).text();
                    obj.symbol = $(".condition-symbol option:selected", e).val();
                    obj.valtype = $(".condition-by option:selected", e).val();
                    obj.val = $(".condition-input", e).val();
                    //obj.val = "@" + $(".condition-field option:selected", e).text();
                    
                    arr.push(obj);
                }
            });
            dataJson.querys = arr;
            $("#search-field-box .checkboxOnly").each(function (i, e) {
                if($(e).prop("checked")){
                    arr1.push($(e).attr("name"));
                }
            });
            dataJson.fields = arr1;
        }
        if ($(boxs).eq(1).is(":visible")) { //删除状态
            var arr = [], arr1 = [], dataJson = {};
            $(".table-dom-del tr:not(':last')").each(function (i, e) {
                if (i > 0) {
                    var obj = {};
                    obj.field = $(".condition-field option:selected", e).text();
                    obj.symbol = $(".condition-symbol option:selected", e).val();
                    obj.valtype = $(".condition-by option:selected", e).val();
                    obj.val = $(".condition-input", e).val();
                    //obj.val = "@" + $(".condition-field option:selected", e).text();
                    arr.push(obj);
                }
            });
            dataJson.querys = arr;
            dataJson.fields = arr1;
        }
        if ($(boxs).eq(2).is(":visible")) { //增加状态
            var arr = [], arr1 = [], dataJson = {};
            $(".table-dom-add tr").each(function (i, e) {
                //if (i > 0) {
                    var obj = {};
                    obj.field = $(".add-fileds", e).val();
                    obj.valtype = $(".condition-by option:selected", e).val();
                    obj.val = $(".condition-input", e).val();
                    //obj.val =  "@" + $(".add-fileds", e).val();
                    arr.push(obj);
                //}
            });
            $("#only-field-box .checkboxOnly").each(function (i, e) { //校验唯一性
                if ($(e).prop("checked")) {
                    arr1.push($(e).attr("name"));
                }
            });
            dataJson.querys = arr;
            dataJson.fields = arr1;
        }
        if ($(boxs).eq(3).is(":visible")) { //修改状态
            var arr = [], arr1 = [], arr2 = [], dataJson = {};
            $(".table-dom-modify-field tr:not(':last')").each(function (i, e) {
                //if (i > 0) {
                    var obj = {};
                    obj.field = $(".condition-field option:selected", e).text();
                    obj.valtype = $(".condition-by option:selected", e).val();
                    obj.val = $(".condition-input", e).val();
                    arr.push(obj);
                //}
            });
            $(".table-dom-modify-condition tr:not(':last')").each(function (i, e) {
                //if (i > 0) {
                    var obj = {};
                    obj.field = $(".condition-field option:selected", e).text();
                    obj.symbol = $(".condition-symbol option:selected", e).val();
                    obj.valtype = $(".condition-by option:selected", e).val();
                    obj.val = $(".condition-input", e).val();
                    arr2.push(obj);
                //}
            });
            dataJson.updates = arr;
            dataJson.querys = arr2;
            dataJson.fields = arr1;
        }

        console.log(dataJson);
        $.post(el+"/addApi.action", { apiname: $("#apiName").val(), tableid: $("#datatable-select option:selected").val(), apiType: $("#apitype-select option:selected").val(), json: JSON.stringify(dataJson), limit: $(".number-input").val() ? $(".number-input").val() : 0, blockTime: $(".time-input:visible").val() ? $(".time-input:visible").val() : 0 }, function (res) {
            var json=JSON.parse(res);
        	if (json.code == 1) {
                tip("添加成功!");
                $(".danger").click(function () {
                    //console.log("return");
                    window.history.back(-1);
                    setTimeout(function () {
                        $("#openAPI").click();
                    }, 500);
                });
            } else if(json.code == 2){
            	tip("请完善条件！");
            }else if(json.code == 3){
            	tip("条件类型错误！");
            }
//            else if (json.code == 2) {
//                OtherPlace();
//            } else {
//                tip(json.data);
//            }
        });
    };

    //查询 添加控件DOM
    var index = 1;
    var total = 20;
    $scope.addData = function () {
        var originVal = $(".table-dom .condition-input").eq(0).val();
        if (index < total) {
            index++;

            var parentTd = $(' <td class="right-btn-group"><p class="nice-select-title title-b">查询条件：</p></td>');
            var parentBox = $('<div class="nice-select-box"></div>');
            var cloneElement = $(".search-condition-box").eq(0).clone(true);
            var deleteElement = $('<p class="nice-select-title del" style="color: red;font-size: 12px;padding-left: 5px;clear:both;margin-top: 0;">删除</p>');
            $(".condition-input", cloneElement).removeAttr("disabled").val("");
            parentBox.append(cloneElement);
            parentBox.append(deleteElement);
            parentTd.append(parentBox);
            $(cloneElement).find(".condition-input").val(originVal);

            $("#div-empty").before($("<tr class='div-add new-div prop" + index + "'>").append(parentTd));

            $(".del").unbind("click");
            $(".del").on("click", function () {
                $(this).parent().parent().remove();
                total += 1;
            });
        } else {
            return;
        }
    };
    //删除控件
    $scope.deleteRow = function (e) {
        $(".del").unbind("click");
        $(".del").on("click", function () {
            $(this).parent().remove();
            //total += 1;
        });
    }

    //删除  添加DOM *******************************
    var index1 = 1;
    var total1 = 20;
    $scope.addDataDelete = function () {
        var originVal = $(".table-dom-del .condition-input").eq(0).val();
        if (index1 < total1) {
            index1++;

            var parentTd = $(' <td class="right-btn-group"><p class="nice-select-title title-b">查询条件：</p></td>');
            var parentBox = $('<div class="nice-select-box"></div>');
            var cloneElement = $(".search-condition-box").eq(0).clone();
            var deleteElement = $('<p class="nice-select-title del" style="color: red;font-size: 12px;padding-left: 5px;clear:both;margin-top: 0;">删除</p>');
            $(".condition-input", cloneElement).removeAttr("disabled").val("");

            parentBox.append(cloneElement);
            parentBox.append(deleteElement);
            parentTd.append(parentBox);
            $(cloneElement).find(".condition-input").val(originVal);

            $("#div-empty-del").before($("<tr class='div-add new-div prop" + index1 + "'>").append(parentTd));

            $(".del").unbind("click");
            $(".del").on("click", function () {
                $(this).parent().parent().remove();
                total1 += 1;
            });
        } else {
            return;
        }
    };

    //修改 修改字段DOM
    var index2 = 1;
    var total2 = 20;
    $scope.addDataModifyField = function () {
        var originVal1 = $(".table-dom-modify-field .condition-input").eq(0).val();
        if (index2 < total2) {
            index2++;

            var parentTd = $(' <td class="right-btn-group"><p class="nice-select-title title-b">修改字段：</p></td>');
            var parentBox = $('<div class="nice-select-box"></div>');
            var cloneElement = $(".search-field-box").eq(0).clone();
            var deleteElement = $('<p class="nice-select-title del" style="color: red;font-size: 12px;padding-left: 5px;clear:both;margin-top: 0;">删除</p>');
            $(".condition-input", cloneElement).removeAttr("disabled").val("");

            parentBox.append(cloneElement);
            parentBox.append(deleteElement);
            parentTd.append(parentBox);
            $(cloneElement).find(".condition-input").val(originVal1);

            $("#div-empty-modify-field").before($("<tr class='div-add new-div prop" + index2 + "'>").append(parentTd));

            $(".del").unbind("click");
            $(".del").on("click", function () {
                $(this).parent().parent().remove();
                total2 += 1;
            });
        } else {
            return;
        }
    };


    //修改 修改字段DOM
    var index3 = 1;
    var total3 = 20;
    $scope.addDataModifyCondition = function () {
        var originVal2 = $(".table-dom-modify-condition .condition-input").eq(0).val();
        if (index3 < total3) {
            index3++;

            var parentTd = $(' <td class="right-btn-group"><p class="nice-select-title title-b">修改条件：</p></td>');
            var parentBox = $('<div class="nice-select-box"></div>');
            var cloneElement = $(".search-modify-box").eq(0).clone();
            var deleteElement = $('<p class="nice-select-title del" style="color: red;font-size: 12px;padding-left: 5px;clear:both;margin-top: 0;">删除</p>');
            $(".condition-input", cloneElement).removeAttr("disabled").val("");

            parentBox.append(cloneElement);
            parentBox.append(deleteElement);
            parentTd.append(parentBox);
            $(cloneElement).find(".condition-input").val(originVal2);

            $("#div-empty-modify-condition").before($("<tr class='div-add new-div prop" + index3 + "'>").append(parentTd));

            $(".del").unbind("click");
            $(".del").on("click", function () {
                $(this).parent().parent().remove();
                total3 += 1;
            });
        } else {
            return;
        }
    };


}])


//--------无BUG分割线----------无BUG分割线-------------无BUG分割线---------------无BUG分割线----------无BUG分割线--------------无BUG分割线-----------无BUG分割线------------//

//登录验证-用户列表 (device)
routingDemoApp.controller('DeviceControl_verify', ['$scope', '$http', '$location', '$compile', function ($scope, $http, $location, $compile) {
    $("#UserLoginVerify-ul .details").eq(0).find(".details-a").eq(2).css({ "background": "#e4e9ec" });
    $(".FixedPopup").show();
    $.post("/api/project/GetProjectList", { token: token, type: 1, pindex: 1, pagesize: 999 }, function (json) {
        $scope.panmedata = json.data;
        //项目选择
        $("#pname-box").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#pname-box").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    var idapp = $(event.target).attr("data-appid");
                    $(this).find("ul").hide();
                    location.href = "#/Device_verify?ProjectID=" + $(this).find("input").attr("str") + "&ProjectName=" + $(this).find("input").val() + "&appid=" + idapp;
                    var proid = $(this).find("input").attr("str");
                    _get_projectDetails(proid);
                }
            }
        });
        //项目选择结束
        //有效无效选择
        $("#EffectiveBox").on("click", function () {
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera   
                event.stopPropagation();
            }
            else if (window.event) {
                // 针对 IE   
                window.event.cancelBubble = true;
            }
            $(this).find("ul").show();
        });
        $("#EffectiveBox").bind({
            "click": function (event) {
                if (event.target.tagName == "LI") {
                    $(this).find("input").val($(event.target).text()); //传具体的文字
                    $(this).find("input").attr("data-str", $(event.target).attr("data-value"));
                    $(this).find("input").css({
                        "color": "#333333"
                    });
                    $(this).find("ul").hide();
                }
            }
        });

        //日期选择
        var checkin = $('#dpd1').fdatepicker({}).on('changeDate', function (ev) {
            var newDate = new Date(ev.date);
            newDate.setDate(newDate.getDate() + 1);
            checkout.update(newDate);
            checkin.hide();
            $('#dpd2')[0].focus();
        }).data('datepicker');
        var checkout = $('#dpd2').fdatepicker({
            onRender: function (date) {
                return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {
            checkout.hide();
        }).data('datepicker');
        //日期选择结束

        //有效无效选择结束
        if (json.code == 2) {
            OtherPlace();
        } else if (json.code == 1) {
            var FirstProjectID = json.data[0].ProjectID;
            var FirstProjectName = json.data[0].ProjectName;
            var FirstApppId = json.data[0].AppID;
            //console.log(FirstApppId);
            var ProjectID = $location.search().ProjectID ? $location.search().ProjectID : FirstProjectID;
            var ProjectName = $location.search().ProjectName ? $location.search().ProjectName : FirstProjectName;
            var ProjectAppid = $location.search().appid ? $location.search().appid : FirstApppId;
            $scope.CurrentProjectID = ProjectID;
            $scope.CurrentPanme = ProjectName;
            $scope.CurrentAppid = ProjectAppid;

            _get_projectDetails(ProjectID);
            //配置  
            $scope.count = 0;
            $scope.p_pernum = 15;
            //变量  
            $scope.p_current = 1;
            $scope.p_all_page = 0;
            $scope.pages = [];
            //初始化第一页  
            var _get = function (page, size, callback) {
                $(".FixedPopup").show();

                //搜索数据
                var deviceID = $("#device-id").val();
                var udid = $("#ud-id").val();
                var code = $("#auth-code").val();
                var remark = $("#remark").val();
                var date1 = $("#dpd1").val();
                var date2 = $("#dpd2").val();
                var status = $("#EffectiveInput").attr("data-str");

                $http({
                    method: 'post',
                    url: '/api/VerifyUser/GetUserList',
                    //data: { token: token, projectID: ProjectID, effective: $("#EffectiveInput").attr("data-str"), pindex: page, pagesize: size, appid: ProjectAppid },
                    data: { token: token, projectID: ProjectID, username: deviceID, code: code, remark: remark, date1: date1, date2: date2, status: status, pindex: page, pagesize: size }
                }).then(function (json) {
                    $(".FixedPopup").hide();
                    //成功时执行

                    if (json.data.code == 2) {
                        OtherPlace();
                    } else if (json.data.code == 1) {
                        $(".tableContent").show();
                        $("#page1").show();
                        $("#table-bottom1").hide();

                        $scope.Count = json.data.Count;
                        var obj = json.data;
                        if (!obj) { return false; }
                        $.each(obj.data, function (i, item) {
                            if (item.Effective) {
                                item.EffectiveName = "禁用用户";
                                item.EName = "正常";
                            } else {
                                item.EffectiveName = "启用用户";
                                item.EName = "禁用";
                            }
                        });
                        $scope.data = obj.data; //得到请求的数据

                        //$scope.Count = 50;  //总数 此数据在api上没有 加入字段后替换
                        $scope.Count = json.data.count;
                        $scope.Activing = json.data.activing;
                        $scope.UnExpire = json.data.unExpire;
                        $scope.UnActived = json.data.unActived;

                        //console.log(json.data.Count);
                        $scope.pageCount = json.data.pageCount;
                        $scope.p_current = page;
                        $scope.p_all_page = json.data.pageCount;
                        reloadPno();
                        callback();
                    } else if (json.data.code == 0) {
                        $(".tableContent").hide();
                        $("#page1").hide();
                        //$("#table-bottom").hide();
                        $("#table-bottom1").show();
                        $("#bottom-tip1").html("您还没有用户数据！");
                    }
                }, function (json) {
                    //失败时执行
                    $(".FixedPopup").hide();
                    tip("网络连接错误！");
                });
            }

            _get($scope.p_current, $scope.p_pernum, function () { });
            //首页  
            $scope.p_index = function () {
                $scope.load_page(1);
            }
            //尾页  
            $scope.p_last = function () {
                $scope.load_page($scope.p_all_page);
            }
            //上一页
            $scope.p_prev = function () {
                var page = $(".pagination").find("li.active").text();//获取当前页数
                var _page = parseInt(page) - 1;
                console.log(_page);
                if (_page >= 1) {
                    _get(_page, $scope.p_pernum, function () { });
                }
            }
            //下一页
            $scope.p_next = function () {
                var page = $(".pagination").find("li.active").text();//获取当前页数
                var _page = parseInt(page) + 1;
                //console.log(_page);
                if (_page <= $scope.p_all_page) {
                    _get(_page, $scope.p_pernum, function () { });
                }
            }
            //加载某一页  
            $scope.load_page = function (page) {
                _get(page, $scope.p_pernum, function () { });
            };
            //加载指定页 
            $scope.select_load_page = function () {
                var page = $("#selectPage").val();
                _get(page, $scope.p_pernum, function () { });
            }
            //初始化页码  
            var reloadPno = function () {
                $scope.pages = calculateIndexes($scope.p_current, $scope.p_all_page, 4);
            };
            //分页算法  
            var calculateIndexes = function (current, length, displayLength) {
                var indexes = [];
                var start = Math.round(current - displayLength / 2);
                var end = Math.round(current + displayLength / 2);
                if (start <= 1) {
                    start = 1;
                    end = start + displayLength - 1;
                    if (end >= length - 1) {
                        end = length - 1;
                    }
                }
                if (end >= length - 1) {
                    end = length;
                    start = end - displayLength + 1;
                    if (start <= 1) {
                        start = 1;
                    }
                }
                for (var i = start; i <= end; i++) {
                    indexes.push(i);
                }
                return indexes;
            };


            //全选

            var selectAll = true;
            $scope.selectAll = function () {
                if (selectAll) {
                    $(".check").prop("checked", "checked");
                    selectAll = false;
                } else {
                    $(".check").removeProp("checked");
                    selectAll = true;
                }
            }

            //搜索设备
            $scope.sousuo = function () {
                $scope.p_current = 1;
                _get($scope.p_current, $scope.p_pernum, function () { });
            }


            //查看授权
            $scope.Lookshouquan = function (vUserID) {
                $(".FixedPopupMask").show();
                $("#API-box").show();
                $("#table-first").siblings().remove();
                $.post("/api/VerifyUser/GetUserCode", { token: token, vUserID: vUserID }, function (json) {
                    //$(".FixedPopup").hide();
                    if (json.code == 2) {
                        OtherPlace();
                    } else if (json.code == 1) {
                        $.each(json.data, function (i, item) {
                            if (item["Status"] != 2) {
                                if (item["CanBlock"] == 1) {
                                    $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td>" + item["Remark"] + "</td><td>正常</td><td onclick='tingyong(" + item["AuthID"] + "," + DeviceID + ")' style='cursor:pointer;color:#609DFF'>停用</td></tr>");
                                }
                                else {
                                    $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td>" + item["Remark"] + "</td><td>已过期</td><td>已过期</td></tr>");
                                }
                            }
                            else {
                                $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td class='six'>" + item["Remark"] + "</td><td >已停用</td><td>已停用</td></tr>");
                            }
                        });
                    }
                });
            }
            $scope.closeLookshouquan = function () {
                $(".FixedPopupMask").hide();
                $(".FixedPopup").hide();
                $("#API-box").hide();
            }
            //禁用和启用设备

            $scope.jinqi = function (vUserID, Effective) {
                if (Effective) {
                    var title = "确定禁用该用户？";
                    var discription = "禁用后，可在选中无效后搜索，开启该用户！";
                    var value = "false";
                } else {
                    var title = "确定启用该用户？";
                    var discription = "启用后，可在选中有效后搜索，禁用该用户！";
                    var value = "true";
                }
                javascript: $('body').dialog({
                    title: title,
                    titleFontSize: "16px",
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
                    discription: discription,
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans',
                    duration: 0,
                }, function (ret) {
                    if (ret.index === 0) {
                        $(".FixedPopup").show();
                        $.post("/api/VerifyUser/DisableUser", { token: token, vUserID: vUserID, effective: value }, function (json) {
                            $(".FixedPopup").hide();
                            tip(json.data);
                            _get($scope.p_current, $scope.p_pernum, function () { });
                        });
                    };
                });
            }

            //删除设备
            $scope.shanchu = function (vUserID) {
                javascript: $('body').dialog({
                    title: "是否删除此用户？",
                    titleFontSize: "16px",
                    type: 'primary',
                    showBoxShadow: true,
                    buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
                    discription: "删除用户后不可恢复！",
                    animateIn: 'fadeInRight-hastrans',
                    animateOut: 'fadeOutRight-hastrans',
                    duration: 0,
                }, function (ret) {
                    if (ret.index === 0) {
                        $(".FixedPopup").show();
                        $.post("/api/VerifyUser/DeleteUserVol", { token: token, vuserids: vUserID }, function (json) {
                            $(".FixedPopup").hide();
                            tip(json.data);
                            _get($scope.p_current, $scope.p_pernum, function () { });
                        });
                    };
                });
            }
        } else {
            $(".FixedPopup").hide();
            $("#table-bottom1").show();
            $("#bottom-tip1").html("您还没有用户数据！");
        }

        //批量删除设备
        $scope.shanchuall = function ($event) {
            var pageItem = $(".tableContent").find(".check").length;  //当前页设备数
            var len = $("input[type='checkbox']:checked", ".tableContent").length;  //选中个数
            var pageCurrent = $("#page1").find(".active").text();  //当前页码
            //console.log($scope.p_all_page); //总页数
            var obj = "";
            for (var i = 0; i < len; i++) {
                obj += $("input[type='checkbox']:checked", ".tableContent")[i].getAttribute("value") + ",";
            }
            //console.log(obj);
            javascript: $('body').dialog({
                title: "提示",
                discription: "确定批量删除用户？",
                titleFontSize: "16px",
                type: 'primary',
                showBoxShadow: true,
                buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'defalut' }],
                inputPlaceholder: "",
                duration: 0,
            }, function (ret) {
                if (ret.index === 0) {
                    $(".FixedPopup").show();
                    if (obj) {
                        $(".FixedPopup").hide();
                        obj = obj.substring(0, obj.length - 1);
                        //console.log(obj);
                        $.post("/api/VerifyUser/DeleteUserVol", { token: token, vuserids: obj }, function (json) {
                            if (json.code == 2) {
                                OtherPlace();
                            } else if (json.code == 1) {
                                $(".selected-color").removeProp("checked");
                                tip(json.data);
                                if (pageItem == len && pageCurrent == $scope.p_all_page) {
                                    _get($scope.p_current - 1, $scope.p_pernum, function () { });
                                } else {
                                    _get($scope.p_current, $scope.p_pernum, function () { });
                                }
                            } else {
                                //$(".selected-color").removeProp("checked");
                                //_get($scope.p_current, $scope.p_pernum, function () { });
                                tip(json.data);
                            }
                            $(".check-head").removeAttr("checked");
                        })

                    } else {
                        $(".FixedPopup").hide();
                        setTimeout(function () { tip("请选择需要删除的用户！"); }, 100);
                    }
                };
            });
        }

        //批量加时
        $scope.jiashi = function () {
            $(".FixedPopupMask").show();
            $("#ExtractBox").show();
            $("#ExtractProjectName").html($("#InputProjectName").val());
            //追加遮罩
            $("#ExtractBox").after("<div class='FixedPopupMask tempMask'></div>");
        }
        $scope.closeTiqu = function () {
            $(".FixedPopupMask").hide();
            $("#ExtractBox").hide();
            $(".tempMask").remove();
        }

        //提交批量加时
        $("#ExtractCodeButton").click(function () {
            $("#ExtractCodeButton").attr("disabled", "disabled");
            //遍历每个时长 根据单位处理数据
            var sizeNum, val = $(this).parent().parent().find(".danwei-box").eq(0).val();
            if (val == 0) { //包月转换成时间
                sizeNum = parseInt($("#SizeNum").val()) * 24;
            } else {
                sizeNum = $("#SizeNum").val();
            }

            var len = $("input[type='checkbox']:checked", ".tableContent").length;
            var obj = "";
            for (var i = 0; i < len; i++) {
                obj += $("input[type='checkbox']:checked", ".tableContent")[i].getAttribute("data-uid") + "\n";
            }
            //console.log(obj);

            $.post("/api/AuthCode/ActivationVol", { token: token, projectID: ProjectID, udids: obj, day: sizeNum ? sizeNum : "", remark: $("#ExtractTxt").val() }, function (json) {
                if (json.code == 1) {
                    //console.log(json.data);
                    $(".FixedPopupMask").hide();
                    $("#ExtractBox").hide();
                    $("#ExtractCodeButton").removeAttr("disabled");
                    tip(json.data);
                } else {
                    tip("请选择需要加时的用户！");
                    $("#ExtractCodeButton").removeAttr("disabled");
                }
            });
        });
    });

    //获取项目详情 处理单位及收费方式
    var _get_projectDetails = function (proid) {
        var _url = "/api/Project/ProjectDetails?token=" + token + "&projectid=" + proid;
        $http({
            method: 'GET',
            url: _url
        }).then(function (json) {
            if (json.data.code == 1) {
                var data = json.data.data;
                var billing = data[0].Billing;
                $scope.shoufei = billing;
                //01包月 2扣点 其他扣时
                var _html;
                if (billing == 0 || billing == 1) {
                    _html = "<select class='danwei-box' style='position: absolute;left:214px;top:7px;border:none;color:#8c8c8c;'><option value='0'>天</option><option value='1'>时</option></select>";
                    $("#unit").html("时");
                } else if (billing == 2) {
                    _html = "<select class='danwei-box' style='position: absolute;left:214px;top:7px;border:none;color:#8c8c8c;'><option value='2'>点</option></select>";
                    $("#unit").html("点");
                } else {
                    _html = "<select class='danwei-box' style='position: absolute;left:214px;top:7px;border:none;color:#8c8c8c;'><option value='3'>分</option></select>";
                    $("#unit").html("分");
                }
                $(".select-number").children("select").remove();
                $(".select-number").append($(_html));

            } else if (json.data.code == 0) {
                return;
            }
        }, function () {
            return;
        });
    }

    //点击其他地方下拉框消失

    $("body").click(function () {
        $(".nice-select").find("ul").hide();
    });

}]);

//登录验证-用户详情 (device detail)
routingDemoApp.controller('DeviceDetailController_verify', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var VUserID = $location.search().VUserID;
    var Appid = $location.search().Appid;
    $scope.VUserID = $location.search().VUserID;
    $scope.ProjectID = $location.search().ProjectID;
    $scope.ProjectName = $location.search().ProjectName;
    
    $(".FixedPopup").show();

    var _get = function () {
        $http({
            method: 'post',
            url: '/api/VerifyUser/UserDetails',
            data: { token: token, vUserID: VUserID, appid: Appid }
        }).then(function (json) {
            $(".FixedPopup").hide();
            //成功时执行
            if (json.data.code == 2) {
                OtherPlace();
            } else if (json.data.code == 1) {
                var obj = json.data.data;
                $.each(obj, function (i, item) {
                    if (item.Effective) {
                        item.EffectiveName = "禁用用户";
                        item.EName = "正常";
                    } else {
                        item.EffectiveName = "启用用户";
                        item.EName = "禁用";
                    }
                });
                $scope.data = obj[0]; //得到请求的数据
                $scope.Billing = obj[0].Billing;
            } else if (json.data.code == 0) {
                tip(json.data.data);
            }
        }, function (json) {
            //失败时执行 
            $(".FixedPopup").hide();
            tip("网络连接错误！");
        });
    }
    _get();

    //可编辑项
    $scope.Tbianji = function () {
        $("#Time-bianji").hide();
        $("#Time-baocun").show();
        $("#Time-input").removeAttr("readonly");
        $("#Time-input").css({ "background": "#ffffff" });
    }
    $scope.Tbaocun = function () {
        $(".FixedPopup").show();
        $.post("/api/VerifyUser/ModifyUser", { token: token, VUserID: VUserID, expireDate: $("#Time-input").val() }, function (json) {
            $(".FixedPopup").hide();
            if (json.code == 1) {
                $("#Time-bianji").show();
                $("#Time-baocun").hide();
                $("#Time-input").attr("readonly", "readonly");
                $("#Time-input").css({ "background": "#f4f4f4" });
                tip(json.data);
            } else {
                tip(json.data);
            }
        });
    }
    $scope.Tquxiao = function () {
        $("#Time-bianji").show();
        $("#Time-baocun").hide();
        $("#Time-input").attr("readonly", "readonly");
        $("#Time-input").css({ "background": "#f4f4f4" });
    }
    $scope.Rbianji = function () {
        $("#Remake-bianji").hide();
        $("#Remake-baocun").show();
        $("#Remake-text").removeAttr("readonly");
        $("#Remake-text").css({ "background": "#ffffff" });
    }
    $scope.Rbaocun = function () {
        $(".FixedPopup").show();
        $.post("/api/VerifyUser/ModifyRemark", { token: token, VUserID: VUserID, remark: $("#Remake-text").val() }, function (json) {
            $(".FixedPopup").hide();
            if (json.code == 1) {
                $("#Remake-bianji").show();
                $("#Remake-baocun").hide();
                $("#Remake-text").attr("readonly", "readonly");
                $("#Remake-text").css({ "background": "#f4f4f4" });
                tip(json.data);
            } else {
                tip(json.data);
            }
        });
    }
    $scope.Rquxiao = function () {
        $("#Remake-bianji").show();
        $("#Remake-baocun").hide();
        $("#Remake-text").attr("readonly", "readonly");
        $("#Remake-text").css({ "background": "#f4f4f4" });
    }

    //查看授权
    $scope.Lookshouquan = function () {
        $(".FixedPopupMask").show();
        $("#API-box").show();
        $(".FixedPopup").show();
        $.post("/api/VerifyUser/GetUserCode", { token: token, VUserID: VUserID }, function (json) {
            $("#table-first").siblings().remove();
            $(".FixedPopup").hide();
            if (json.code == 2) {
                OtherPlace();
            } else if (json.code == 1) {
                $.each(json.data, function (i, item) {
                    if (item["Status"] != 2) {
                        if (item["CanBlock"] == 1) {
                            $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td>" + item["Remark"] + "</td><td>正常</td><td onclick='tingyong(" + item["AuthID"] + "," + DeviceID + ")' style='cursor:pointer;color:#609DFF'>停用</td></tr>");
                        }
                        else {
                            $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td>" + item["Remark"] + "</td><td>已过期</td><td>已过期</td></tr>");
                        }
                    }
                    else {
                        $("#table-first").after("<tr><td>" + item["Code"] + "</td><td>" + item["UseDate"] + "</td><td>" + item["AuthTime"] + "</td><td class='six'>" + item["Remark"] + "</td><td >已停用</td><td>已停用</td></tr>");
                    }
                });
            }
        });
    }
    $scope.closeLookshouquan = function () {
        $(".FixedPopupMask").hide();
        $("#API-box").hide();
    }

    //禁用和启用设备

    $scope.jinqi = function (Effective) {
        if (Effective) {
            var title = "确定禁用该用户？";
            var discription = "禁用后，可在选中无效后搜索，开启该用户！";
            var value = "false";
        } else {
            var title = "确定启用该用户？";
            var discription = "启用后，可在选中有效后搜索，禁用该用户！";
            var value = "true";
        }
        javascript: $('body').dialog({
            title: title,
            titleFontSize: "16px",
            type: 'primary',
            showBoxShadow: true,
            buttons: [{ name: '确定', className: 'danger' }, { name: '取消', className: 'danger' }],
            discription: discription,
            animateIn: 'fadeInRight-hastrans',
            animateOut: 'fadeOutRight-hastrans',
            duration: 0,
        }, function (ret) {
            if (ret.index === 0) {
                $(".FixedPopup").show();
                $.post("/api/VerifyUser/DisableUser", { token: token, VUserID: VUserID, effective: value }, function (json) {
                    $(".FixedPopup").hide();
                    tip(json.data);
                    _get();
                });
            };
        });
    }
}]);


var el=getRootPath();
function getRootPath(){
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
//    return(localhostPaht);

}