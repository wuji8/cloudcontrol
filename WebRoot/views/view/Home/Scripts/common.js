/**
自定义通用Js
*/

//input获取焦点隐藏tisi
$("input[type=checkbox]").on("change", function () {
    $(".tisi").text("");
});
$("input[type=number]").focus(function () {
    $(".tisi").text("");
});
$("input[type=radio]").on("change", function () {
    $(".tisi").text("");
});
$("input[type=text]").focus(function () {
    $(".tisi").text("");
});
$("input[type=password]").focus(function () {
    $(".tisi").text("");
});
$("textarea").focus(function () {
    $(".tisi").text("");
});


//全选反选
$("#checkboxAll").on("change", function () {
    if ($(this).prop("checked")) {
        $(".checkboxOnly").prop("checked", true);
        $(".checkgroup").prop("checked", true);
    } else {
        $(".checkboxOnly").prop("checked", false);
        $(".checkgroup").prop("checked", false);
    }
});

//针对数据中心页面 全选反选事件
$(".table-devices").on("change", "#checkboxAll", function () {
    if ($(this).prop("checked")) {
        $(".checkboxOnly").prop("checked", true);
        $(".checkgroup").prop("checked", true);
    } else {
        $(".checkboxOnly").prop("checked", false);
        $(".checkgroup").prop("checked", false);
    }
});