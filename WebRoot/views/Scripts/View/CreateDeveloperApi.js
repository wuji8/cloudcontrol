$(function(){
    $("#apitype-select").on("change", function () {
        var idx = "";
        $("option", this).each(function (i,e) {
            if($(e).prop("selected")){
                idx = $(this).val();
            }
        });
        $(".table-fields-box" + idx).show().siblings().hide();
    });

    $(".checkboxAll").on("change", function () {
        if ($(this).prop("checked")) {
            $(this).next().nextAll().find('.checkboxOnly').prop("checked", true);
            //$(".checkboxOnly").prop("checked", true);
            $(".checkgroup").prop("checked", true);
        } else {
            $(".checkboxOnly").prop("checked", false);
            $(".checkgroup").prop("checked", false);
        }
    });

})
