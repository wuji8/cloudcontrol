layui.config({
    base: "/Scripts/AdminJs/"
}).use(['form', 'element', 'layer', 'jquery', 'laydate', 'laypage', 'table'], function () {
    var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		//element = layui.element,
		$ = layui.jquery
        , laypage = layui.laypage; 


    var username = $("#username").val(); 
    var sellername = $("#sellername").val();


    //开始
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(decodeURI(r[2]));
        }
        return null;
    }


    // 搜索
    $("#bt_search").on('click', function () {
        firstRander();
    });


    //加载页面数据
    var newData = '';
    var pageTotal = '';
    var nums = 10; //每页出现的数据量

    var username = window.location.search.split("=")[1];

    //首次数据
    function firstRander() {
        $.post("/api/Admin/GetUserOrder", { token: token, pindex: 1, pagesize: nums, userid: username }, function (json) {
            if (json.code == 1) {
                newData = json.data;
                pageTotal = json.pageCount;
            } else if (json.code == 2) {
                top.location.href = "/Home/Login";
            } else if (json.code == 0) {
                $(".new_content").html('<tr><td colspan="5">暂无数据</td></tr>');
            } else {
                layer.msg(json.data, {
                    time: 1000
                });
            }
            newsList();
        })
    }
    firstRander();


    function newsList(that) {  //函数全局使用curr页码
        //渲染数据
        function renderDate(data, curr) {
            var dataHtml = '';

            if (!that) { //第一页 that没有
                currData = newData;
            } else {
                currData = data;
            }
            var currData = data;
            if (currData.length != 0) {
                for (var i = 0; i < currData.length; i++) {
                    dataHtml += '<tr>'
                    + '<td>' + currData[i].CloudName + '</td>'
                    + '<td>' + currData[i].OrderCode + '</td>'
                    + '<td>' + currData[i].PayTime + '</td>'
                    + '<td>' + currData[i].Amount + '</td>'
                    + '</tr>';
                }
            } else {
                dataHtml = '<tr><td colspan="4">暂无数据</td></tr>';
            }
            return dataHtml;
        }
        //分页 
        if (that) {
            newData = that;
        }
        laypage.render({
            elem: 'pageEle' //分页容器的id
	        , count: Math.ceil(pageTotal / nums) //总页数
	        , skin: '#1E9FFF' //自定义选中色值
	        , skip: true //开启跳页
            , curr: Math.ceil(pageTotal / nums)

            //cont: 'pageEle'
            //, pages: Math.ceil(pageTotal / nums)
            //, skin: '#088dcf'
            //, skip: true
		    , jump: function (obj, first) {
		        if (!first) { //翻页数据
		            $.post("/api/Admin/GetUserList", { token: token, pindex: 1, pagesize: nums, userid: username }, function (json) {
		                if (json.code == 1) {
		                    $(".new_content").html(renderDate(json.data, obj.curr));
		                    form.render();
		                } else if (json.code == 2) {
		                    top.location.href = "/Home/Login";
		                } else {
		                    layer.msg(json.data, {
		                        time: 1000
		                    });
		                }
		            })
		        } else {
		            $(".new_content").html(renderDate(newData, obj.curr));
		            form.render();
		        }
		    }
        });
    }

    //查看明细
   

    ////////////////////////////////////////////////////////////////////
    //                          _ooOoo_                               //
    //                         o8888888o                              //
    //                         88" . "88                              //
    //                         (| ^_^ |)                              //
    //                         O\  =  /O                              //
    //                      ____/`---'\____                           //
    //                    .'  \\|     |//  `.                         //
    //                   /  \\|||  :  |||//  \                        //
    //                  /  _||||| -:- |||||-  \                       //
    //                  |   | \\\  -  /// |   |                       //
    //                  | \_|  ''\---/''  |   |                       //
    //                  \  .-\__  `-`  ___/-. /                       //
    //                ___`. .'  /--.--\  `. . ___                     //
    //              ."" '<  `.___\_<|>_/___.'  >'"".                  //
    //            | | :  `- \`.;`\ _ /`;.`/ - ` : | |                 //
    //            \  \ `-.   \_ __\ /__ _/   .-` /  /                 //
    //      ========`-.____`-.___\_____/___.-`____.-'========         //
    //                           `=---='                              //
    //      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        //
    //**************佛祖保佑*******永无BUG*****永不修改*****************//
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv//
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

})



function LookDetail(uname) {
    console.log(uname);
}