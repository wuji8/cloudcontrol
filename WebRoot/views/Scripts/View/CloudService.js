$(function(){

    //tab切换  之前.search-btn
    $(".tab-btn").on("click", function () {
        $(this).addClass('tab-active').parent().siblings().find(".tab-btn").removeClass("tab-active");
        var index = $(this).attr("data-tab");
        $(".tableBox" + index).show().siblings().hide();
    });

    $("input").focus(function () {
        $(".tip").html("");
    });

})
