// JavaScript Document

/* 非操作提示层 */
var pintour_getId  = function(oid){
	return document.getElementById(oid)
}
function showreward(html) {	
	var str = '<div class="popupLayer"><div class="g_left"></div><div class="popupBox"><div class="popupLayerbox">'+html+'</div></div><div class="g_right"></div></div>';	
	msgwin(str,3000);
}
function msgwin(s, t) {	
	var msgWinObj = pintour_getId('msgwin');
	if(!msgWinObj) {
		var msgWinObj = document.createElement("div");
		msgWinObj.id = 'msgwin';
		msgWinObj.style.display = 'none';
		msgWinObj.style.position = 'absolute';
		msgWinObj.style.zIndex = '100000';
		document.body.appendChild(msgWinObj);
	}
	msgWinObj.innerHTML = s;
	msgWinObj.style.display = '';
	msgWinObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)';
	msgWinObj.style.opacity = 0;
	var sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
	pbegin = sTop + (document.documentElement.clientHeight / 2);
	pend = sTop + (document.documentElement.clientHeight / 5);
	setTimeout(function () {showmsgwin(pbegin, pend, 0, t)}, 10);
	msgWinObj.style.left = ((document.documentElement.clientWidth - msgWinObj.clientWidth) / 2) + 'px';
	msgWinObj.style.top = pbegin + 'px';
}
function showmsgwin(b, e, a, t) {
	step = (b - e) / 10;
	var msgWinObj = pintour_getId('msgwin');
	newp = (parseInt(msgWinObj.style.top) - step);
	if(newp > e) {
		msgWinObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + a + ')';
		msgWinObj.style.opacity = a / 100;
		msgWinObj.style.top = newp + 'px';
		setTimeout(function () {showmsgwin(b, e, a += 10, t)}, 10);
	} else {
		msgWinObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
		msgWinObj.style.opacity = 1;
		setTimeout('displayOpacity(\'msgwin\', 100)', t);
	}
}
function displayOpacity(id, n){
	if(!pintour_getId(id)){
		return;
	}
	if(n >= 0) {
		n -= 10;
		pintour_getId(id).style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + n + ')';
		pintour_getId(id).style.opacity = n / 100;
		setTimeout('displayOpacity(\'' + id + '\',' + n + ')', 50);
	} else {
		pintour_getId(id).style.display = 'none';
		pintour_getId(id).style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
		pintour_getId(id).style.opacity = 1;
	}
}