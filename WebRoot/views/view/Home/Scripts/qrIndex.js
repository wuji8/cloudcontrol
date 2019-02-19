$(function () {
    
    var colnum, rownum;
    var wallid = getQueryString('pageID');

    initGetQrList();

    function initGetQrList() {
        //初始获取
        $.post('/api/console/GetQrWall', { token: token, wallid: wallid }, function (json) {
            if (json.code == 1) {
                $('.qr-form').eq(0).hide();
                colnum = json.wall[0].Columns;
                rownum = json.wall[0].Rows;
                var wh = json.wall[0].Width;
                var gap = json.wall[0].Padding;
                $('#wh').val(wh);
                $('#gap').val(gap);
                $('#wallid').val(json.wall[0].WallID);
                var parentWith = parseInt(colnum) * (parseInt(wh) + parseInt(gap) * 2);
                $('.qr-box').css('width', parentWith);

                var _html = initQrcode.getGridHtml(rownum, colnum, wh, gap, json.data);
                $('.qr-box').html(_html);

            } else if (json.code == 0) {
                //生成格子
                $('.btn-grid').unbind("click");
                $('.btn-grid').on('click', function () {
                    colnum = $('#colnum').val();
                    rownum = $('#rownum').val();
                    $.post('/api/console/AddQrWall', { token: token, columns: colnum, rows: rownum }, function (json) {
                        if (json.code == 1) {
                            alert(json.data);
                            window.location.reload();
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

    setInterval(function () {
        initGetQrList();
    }, 5000)


    //修改宽度
    $('.btn-gap').on('click', function () {
        var wh = $('#wh').val();
        var gap = $('#gap').val();
        var parentWith = parseInt(colnum) * (parseInt(wh) + parseInt(gap) * 2);
        //$('.qr-box').css('width',parentWith);

        $.post('/api/console/AlterQrWidth', { token: token, wallid: $('#wallid').val(), width: wh, padding: gap }, function (json) {
            $('.qr-box').html('');
            window.location.reload();
        });

        if($('.qr-item').length){
            //$('.qr-item-img img').css({ 'width': wh, 'height': wh });
            //$('.qr-content').css('margin', gap);
            //$('.udid').css('width', wh);
        } else {
            alert('请先输入行列数生成格子！');
        }
    });

    //修改UDID
    $('.qr-box').on('focus', '.udid', function () {
        var _this = this;
        $("#initid").val($(_this).val());
        
        $(_this).on('blur', function () {
            var udid = $(this).val();
            var cellid = $(this).parent().parent().attr('data-cid');
            if (udid != $("#initid").val()) {
                $.post('/api/console/AlterCellUDID', { token: token, cellid: cellid, udid: udid }, function (json) {
                    if (json.code != 1) {
                        alert(json.data);
                    }
                    //console.log(json);
                });
            }
        });
    });
})



/**
 * 传入行数 列数 返回父级div的html字符串
 * 传入图片宽高 间隔大小 返回html字符串
 * 用图片的宽高撑开div的宽高
 * @type {{}}
 */

var initQrcode = {
    getGridHtml: function (row, col, wh, gap, obj) {
        var row = row ? row : 6;
        var col = col ? col : 2;
        var wh = wh ? wh : 174;
        var gap = gap ? gap : 10;

        var _html = '';
        for (var i = 0; i < obj.length; i++) {
            //默认设置二维码div的w 200,h 260, margin 12px
            _html += '<div class="qr-item" data-cid="' + obj[i].CellID + '" data-udid="' + obj[i].UDID + '">' +
                        '<div class="qr-content" style="margin: ' + gap + 'px">' +
                            '<p class="qr-item-num">' + obj[i].SortNo + '</p>' +
                            '<p class="qr-item-img"><img src="' + obj[i].CodeImg + '" onerror=\'this.src="/Images/qcbg.jpg"\' alt="" style="display:inline-block;width:' + wh + 'px;height:' + wh + 'px;"></p>' +
                            '<input type="text" class="form-control udid" value="' + obj[i].UDID + '" style="width:' + wh + 'px;" placeholder="UDID">' +
                        '</div>' +
                    '</div>';
        }
        return _html;
    }
    //,
    //getQrimgItemHtml: function (wh, gap) {
    //    var wh = wh ? wh : 174;
    //    var gap = gap ? gap : 12;
    //    _html = '<div class="qr-content" style="margin: ' + gap + 'px">' +
    //        '<p class="qr-item-num">001</p>' +
    //        '<p class="qr-item-img"><img src="/Images/card.jpg" alt="" style="display:inline-block;width:' + wh + 'px;height:' + wh + 'px;"></p>' +
    //        '<input type="text" class="form-control udid" placeholder="UDID">' +
    //        '</div>';
    //    return _html;
    //}
};

////设置cookie
//function setCookie(cname, cvalue, exdays) {
//    var d = new Date();
//    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//    var expires = "expires=" + d.toGMTString();
//    document.cookie = cname + "=" + cvalue + "; " + expires;
//}

////获取cookie
//function getCookie(cname) {
//    var name = cname + "=";
//    var ca = document.cookie.split(';');
//    for (var i = 0; i < ca.length; i++) {
//        var c = ca[i].trim();
//        if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
//    }
//    return "";
//}


function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
