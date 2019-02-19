//原图/缩略图 的比例 >=1
var UserHeadUtil = {
	ratio: 1,
	view_H:300,
	view_W:300,
	initialize:function(path){
		$("#user_head_origin").attr("src", path);
		$("#user_head_upload_box").hide();
		$("#user_head_show_box").show();
		
		$("#user_head_50").attr("src", path);
		$("#user_head_75").attr("src", path);
		$("#user_head_180").attr("src", path);
		var img = new Image();
		img.src = path;
		if(img.width==0){
			var obj = this;
			img.onload = function(){ 
				obj.imgOperate(img);
			};
		}else{
			this.imgOperate(img);
		}
	},
	imgOperate:function(img){
		if(img){
			this.resize('user_head_origin', img.width, img.height, 300, 300);
			var x=0,y=0,size=0;
			if(this.view_W > this.view_H ){
				x = (this.view_W - this.view_H)/2;
				size = this.view_H;
			}else if(this.view_W < this.view_H){
				y = (this.view_H - this.view_W)/2;
				size = this.view_W;
			}else{
				size = this.view_W;
			}
			var obj = this;
			$('img#user_head_origin').imgAreaSelect({
		    	aspectRatio:"1:1",
		        handles: "corners",
		       	persistent:true,
		       	show:true,
				imageWidth: obj.view_W,
				imageHeight: obj.view_H,
				x1: x,
				y1: y,
				x2: x + size,
				y2: y + size,
				onSelectChange: function(img, selection){
					obj.preview('user_head_50', obj.view_W, obj.view_H, selection.x1, selection.y1, selection.width, selection.height, 50, 50);
					obj.preview('user_head_75', obj.view_W, obj.view_H, selection.x1, selection.y1, selection.width, selection.height, 75, 75);
					obj.preview('user_head_180', obj.view_W, obj.view_H, selection.x1, selection.y1, selection.width, selection.height, 180, 180);
					obj.setCutParams(selection.x1, selection.y1, selection.width, selection.height);
				}
			});
			this.preview('user_head_50', this.view_W, this.view_H, x, y, size, size, 50, 50);
			this.preview('user_head_75', this.view_W, this.view_H, x, y, size, size, 75, 75);
			this.preview('user_head_180', this.view_W, this.view_H, x, y, size, size, 180, 180);
			this.setCutParams(x, y, size, size);
		}
	},
	resize:function(id, width, height, limit_W, limit_H){
		if(width>0 && height>0){
			if(width/height >= limit_W/limit_H){
				if(width > limit_W){
					this.view_W = limit_W;
					this.view_H = (limit_W/width)*height;
				}
			}else{
				if(height > limit_H){
					this.view_H = limit_H;
					this.view_W = (limit_H/height)*width;
				}
			}
			
			$('#'+id).attr( {
				"width" : this.view_W,
				"height" : this.view_H
			});
			
			this.ratio = width / this.view_W;
		}
	},

	preview:function(id, width, height, x, y, cut_W, cut_H, show_W, show_H){
		var scaleX = show_W / (cut_W * this.ratio || 1);
		var scaleY = show_H / (cut_H * this.ratio || 1);
		$('#'+id).css({
			width: Math.round(scaleX * width * this.ratio) + 'px',
			height: Math.round(scaleY * height * this.ratio) + 'px',
			marginLeft: '-' + Math.round(scaleX * x * this.ratio) + 'px',
			marginTop: '-' + Math.round(scaleY * y * this.ratio) + 'px'
		}); 
	},
	setCutParams:function(x, y, width, height){
		$('#head_x').val(Math.round(x * this.ratio));
		$('#head_y').val(Math.round(y * this.ratio));
		$('#head_width').val(Math.round(width * this.ratio));
		$('#head_height').val(Math.round(height * this.ratio));
	}
};

function submitHead() {
    $("#user_head_param_form").submit();
    cancelHead();

    console.log(callbackstr);

    if (callbackstr != "") {
        eval("(" + callbackstr + ")");
    }
}

function cancelHead(){
	$('img#user_head_origin').imgAreaSelect({ remove: true });
	$("#user_head_show_box").hide();
	$("#Cut-box").hide();
	$("#div_camera").hide();
	$(".FixedPopupMask").hide();
	$("#user_head_upload_box").show();
	$("#user_head_origin").attr({
	    "src": "/Content/img/upload.png",
		"width" : "100%",
		"height" : "100%"
	});

	//var path = $("img#origin_user_head_75").attr("src");
	//var index = path.lastIndexOf("/");
	//if(index!=-1){
	//	var name = path.substring(index+1);
	//	$("#user_head_50").attr("src", "/headphone/50/" + name).css({
	//		width: 50 + 'px',
	//		height: 50 + 'px',
	//		marginLeft: 0,
	//		marginTop: 0
	//	}); 
	//	$("#user_head_75").attr("src", "/headphone/75/" + name).css({
	//		width: 75 + 'px',
	//		height: 75 + 'px',
	//		marginLeft: 0,
	//		marginTop: 0
	//	}); 
	//	$("#user_head_180").attr("src", "/headphone/180/" + name).css({
	//		width: 180 + 'px',
	//		height: 180 + 'px',
	//		marginLeft: 0,
	//		marginTop: 0
	//	}); 
	//}
}