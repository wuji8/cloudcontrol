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

    //checkbox的显示隐藏
    $(".fields-form").on("change", ".checkbox .checkboxTableOnly", function () {
        var index = parseInt($(this).attr("data-index")) - 1;
        if ($(this).prop("checked")) {
            //隐藏
            $(".table thead tr th").eq(index).removeClass("hidden");
            $(".table tbody tr td").eq(index).removeClass("hidden");
        } else {
            //显示
            $(".table thead tr th").eq(index).addClass("hidden");
            $(".table tbody tr td").eq(index).addClass("hidden");
        }
    });

    //确认批量修改
    $(".btn-batch-modify").on('click', function () {
        $(this).attr("disabled","");
        var keyArr = [], typeArr = [], dataJson = {}, dataArray = [];
        $(".table .thead-box tr th:visible").each(function (i, e) {
            var key = $(e).text();
            keyArr.push(key);
            var type = $(e).attr("data-type");
            typeArr.push(type);
        });
        $(".table .content-box .textarea-box td:visible").each(function (i, e) {
            var val = $(e).find("textarea").val().trim();
            var key = keyArr[i];
            var type = typeArr[i];
            dataJson.key = key;
            dataJson.val = val;
            dataJson.type = type;
            dataArray.push('{"key":"'+key+'","val":"'+val+'","type":"'+type+'"}');
        });
        var Obj = {};
        Obj.fields = dataArray;
        //console.log(JSON.stringify(dataArray));
        //console.log(Obj);
        var tableid = getQueryString("tableid");
        $.post("/api/console/AlterDataVol", { token: token, tableid: tableid, type: $("input[name=typeval]:checked").val(), fieldjson: JSON.stringify(Obj) }, function (json) {
            $(".btn-batch-modify").removeAttr("disabled");
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

})



//渲染列表数据
function randerField(datalist) {
    var thhtml = "", toolhtml = "", contenthtml = "", checkboxhtml = "";
    if (datalist) {
        $(datalist).each(function (i, e) {
            if (i > 0) {
                checkboxhtml += '<div class="checkbox">'+
                        '<label>'+
                            '<input name="form-field-checkbox" checked val="' + e.COLUMN_NAME + '" data-type="' + e.DATA_TYPE + '" data-index="' + i + '" type="checkbox" class="ace checkboxTableOnly">' +
                            '<span class="lbl" style="margin-left:10px;"> ' + e.COLUMN_NAME + '</span>' +
                        '</label>'+
                    '</div>';

                thhtml += '<th data-type="' + e.DATA_TYPE + '">' + e.COLUMN_NAME + '</th>';
                //toolhtml += '<td>'+
                //                '<div class="row">'+
                //                    '<div class="form-group">'+
                //                        '<label class="col-sm-3 control-label" for="">操作</label>'+
                //                        '<div class="col-sm-9">'+
                //                            '<select class="form-control" id="">'+
                //                                '<option value="">添加</option>'+
                //                                '<option value="">覆盖</option>'+
                //                            '</select>'+
                //                        '</div>'+
                //                    '</div>'+
                //                '</div>'+
                //                '<div class="row">'+
                //                    '<div class="form-group">'+
                //                        '<label class="col-sm-3 control-label" for="">数据源</label>'+
                //                        '<div class="col-sm-9">'+
                //                            '<input type="text" class="col-xs-12" id="" value="">'+
                //                       '</div>'+
                //                    '</div>'+
                //                '</div>'+
                //                '<div class="row">'+
                //                    '<div class="form-group">'+
                //                        '<div class="col-sm-12">'+
                //                            '<span class="help-inline col-xs-6">'+
                //                                '<label class="middle">'+
                //                                    '<input class="ace" name="typeval" type="radio" id="">'+
                //                                    '<span class="lbl"> 单一参数</span>'+
                //                               '</label>'+
                //                            '</span>'+
                //                            '<span class="help-inline col-xs-6">'+
                //                                '<label class="middle">'+
                //                                    '<input class="ace" name="typeval" type="radio" id="">'+
                //                                    '<span class="lbl"> 填入数据</span>'+
                //                                '</label>'+
                //                            '</span>'+
                //                        '</div>'+
                //                    '</div>'+
                //                '</div>'+
                //           '</td>';
                contenthtml += '<td><div>'+
                                    '<label for="form-field-11">填入数据</label>'+
                                    '<textarea id="form-field-11" class="autosize-transition form-control" style="overflow: auto; resize: horizontal; height: 400px;"></textarea>'+
                                '</div></td>';
            }
        })
    }
    $(".thead-box").html("<tr>" + thhtml + "</tr>");
    //$(".tool-box").html(toolhtml);
    $(".fields-form").append(checkboxhtml);
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