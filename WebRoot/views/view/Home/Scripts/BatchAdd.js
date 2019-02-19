$(function () {
   
    //添加数据弹框
    var cloudid = getQueryString("cloudid");
    var tableid = getQueryString("tableid");
    //$(".thead-box").html(""); //先清空
    //$(".content-box").html("");
    $.post("/api/console/GetTableField", { token: token, tableid: tableid }, function (json) {
        if (json.code == 1) {
            randerField(json.data);
        } else if (json.code == 0) {
            randerField(json.data);
        } else if (json.code == 2) {
            $(".tip-content").text("登录超时，请点击跳转登录页面！");
            $("#smallModalClick").modal('show');
            $(".btn-queding").click(function () { location.href = "/Home/Login"; });
        } else {
            $("#smallModal").find(".tip-content").text(json.data);
            $("#smallModal").modal('show');
        }
    })


    //确认添加字段数据
    $(".btn-confirmadd").on('click', function () {
        var arr = [], dataJson = {};
        $(".field-form .form-group").each(function (i, e) {
            var key = $(".control-label", e).text();
            dataJson[key] = $("input.form-control", e).val().trim();
        });
        console.log(dataJson);
        var tableid = $("#select-table option:selected").val();
        $.post("/api/console/AddData", { token: token, tableid: tableid, fields: JSON.stringify(dataJson) }, function (json) {
            $("#myAddModalLabel").modal('hide');
            if (json.code == 1) {
                $(".btn-search").click();
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
        })
    });

    //确认批量添加
    $(".btn-batch-add").on('click', function () {
        $(this).attr("disabled","");
        var keyArr = [], dataJson = {};
        $(".table .thead-box tr th").each(function (i, e) {
            var key = $(e).text();
            keyArr.push(key);
        });
        $(".table .content-box .textarea-box td").each(function (i, e) {
            var val = $(e).find(".data-textarea").val().trim();
            var key = keyArr[i];
            console.log(key);
            dataJson[key] = val;
        });
        //console.log(dataJson);
        var tableid = getQueryString("tableid");
        $.post("/api/console/AddDataVol", { token: token, tableid: tableid, fields: JSON.stringify(dataJson) }, function (json) {
            $(".btn-batch-add").removeAttr("disabled");
            if (json.code == 1) {
                $(".btn-search").click();
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
        })
    });

    //覆盖操作
    $(".textarea-box").on("change", ".cover", function () {
        var data = [];
        var val = $(this).parent().find("textarea").val();
        $(this).parent().find(".data-textarea").val("");
        if ($(this).prop('checked')) {
            $(".data-textarea").each(function (i, e) {
                data.push($(e).val().trim().split(/\r*\n/).length);
            })
            data.sort(function (x, y) {
                if (x < y) {
                    return 1;
                }
                if (x > y) {
                    return -1;
                }
                return 0;
            });

            var line = data[0];

            var _val = "";
            for (var i = 0; i < line; i++){
                _val += val + '\n';
            }
            $(this).parent().find("textarea").val(_val);
        }
    });

})



//渲染列表数据
function randerField(datalist) {
    var thhtml = "", contenthtml = "";
    if (datalist) {
        $(datalist).each(function (i, e) {
            if(i>0){
                thhtml += '<th data-type="' + e.DATA_TYPE + '">' + e.COLUMN_NAME + '</th>';
                contenthtml += '<td><div>'+
                                    '<label for="form-field-11">填入数据</label>' +
                                    '&nbsp;&nbsp;&nbsp;<input type="checkbox" class="cover" id="cover' + i + '" />&nbsp;<label for="cover' + i + '">覆盖</label>' +
                                    '<textarea id="form-field-11" class="autosize-transition form-control data-textarea" style="overflow: auto; resize: horizontal; height: 400px;"></textarea>'+
                                '</div></td>';
            }
        })
    }
    $(".thead-box").html("<tr>" + thhtml + "</tr>");
    $(".textarea-box").html(contenthtml);
}


//操作后重载数据
//function reloadData() {
//    $(".content-box").html("");
//    randerPage();
//}


function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}