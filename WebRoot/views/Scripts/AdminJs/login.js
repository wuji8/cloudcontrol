layui.config({
    base: "/Scripts/AdminJs/"
}).use(['form','layer'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		$ = layui.jquery;
	//video背景
	//$(window).resize(function(){
	//	if($(".video-player").width() > $(window).width()){
	//		$(".video-player").css({"height":$(window).height(),"width":"auto","left":-($(".video-player").width()-$(window).width())/2});
	//	}else{
	//		$(".video-player").css({"width":$(window).width(),"height":"auto","left":-($(".video-player").width()-$(window).width())/2});
	//	}
    //}).resize();

	form.on("submit(login)", function (data) {
	    //console.log(data);
	    //return false;
	})

    //验证码图片
	var codehash;
	getImage();
	function getImage() {
	    $.post("/api/Account/ValidateCode", function (json) {
	        $(".yanzhengtu img").attr("src", json.fileurl);
	        codehash = json.codehash;
	        $("#hash").val(codehash);
	    })
	}
	$(".yanzhengtu").on("click", function () {
	    getImage();
	});

	$("#loginForm").ajaxForm(function (json) {
	    if (json.code != 1) {
	        getImage();
	        layer.msg(json.data);
	    } else {
	        window.location.href = "/Admin/Index";
	    }
	});

})
