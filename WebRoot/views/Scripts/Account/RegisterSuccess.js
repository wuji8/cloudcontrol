$(function () {
    var wait = 5;
    function time() {
        if (wait == 0) {
            location.href = "/Account/Login";
        } else {
            $("#time").html(wait);
            wait--;
            setTimeout(function () {
                time()
            },
            1000)
        }
    }
    time();
    //点击立即跳转
    $("#tiaozhuan").on("click", function () {
        location.href = "/Account/Login";
    });
});