$(document).ready(function() {
	var a, b, c, d, e, f, g, h, i, j, k, l, m, n;
	$("#main-drawer a[href='./screen.html']").addClass("mdui-list-item-active");
	a = null, b = 1, c = document.getElementById("all_canvas");
	c.style.cursor = "crosshair";
	document.oncontextmenu = new Function("event.returnValue=false;");
	document.onselectstart = new Function("event.returnValue=false;");
	d = null;
	e = function() {
		var c, a = document.getElementById("all_canvas");
		img_scale = b.toFixed(2);
		c = new Image;
		c.src = "http://localhost:35000/" + imgHref;
		c.onload = function() {
			var g, f = $(window).height() - 100;
			b = f / c.height;
			g = c.width * b;
			$("#all_canvas").attr("height", f);
			$("#all_canvas").attr("width", g);
			a.getContext("2d").drawImage(c, 0, 0, c.width, c.height, 0, 0, g, f);
			d = setTimeout(e, 1000)
		};
		c.onerror = function() {
			d = setTimeout(e, 1000)
		}
	};
	e();
	$("#all_canvas").on("selectstart", function() {
		return !1
	})
	$(document).on("touchmove", function(a) {
		a.preventDefault()
	});
	f = !1; 
	g = "ontouchstart" in window;
	h = g ? {
		down: "touchstart",
		move: "touchmove",
		up: "touchend",
		over: "touchstart",
		out: "touchcancel"
	} : {
		down: "mousedown",
		move: "mousemove",
		up: "mouseup",
		over: "mouseover",
		out: "mouseout"
	};
	i = {
		start: function(c, d) {
			a.send(JSON.stringify({
				mode: "down",
				x: c / b,
				y: d / b
			}))
		},
		move: function(c, d) {
			a.send(JSON.stringify({
				mode: "move",
				x: c / b,
				y: d / b
			}))
		},
		end: function() {
			a.send(JSON.stringify({
				mode: "up"
			}))
		},
		homebutton: function() {
			a.send(JSON.stringify({
				mode: "home"
			}))
		}
	};

	var posJson = {}, posDown = [], posUp = [], isClick, type;

	$("#all_canvas").on(h.down, function(a) {  // 按下
		var b, c;
		a.preventDefault();
		b = (a.pageX || a.originalEvent.targetTouches[0].pageX) - this.offsetLeft;
		c = (a.pageY || a.originalEvent.targetTouches[0].pageY) - this.offsetTop;
		g ? (f = !0, i.start(b, c)) : 3 == a.which ? i.homebutton() : (f = !0, i.start(b, c));
	    // 图片按下位置
		isClick = true;
		var _rate = rate / parseInt($(this).css("width"));
		var m_x = (a.pageX || a.originalEvent.targetTouches[0].pageX) - (this.offsetParent.offsetLeft + this.offsetLeft);
		var m_y = (a.pageY || a.originalEvent.targetTouches[0].pageY) - (this.offsetParent.offsetTop + this.offsetTop);

		posDown[0] = Math.floor(m_x * _rate);
		posDown[1] = Math.floor(m_y * _rate);
	});
	$("#all_canvas").on(h.move, function(a) {  // 移动
		var b, c;
		a.preventDefault();
		b = (a.pageX || a.originalEvent.targetTouches[0].pageX) - this.offsetLeft;
		c = (a.pageY || a.originalEvent.targetTouches[0].pageY) - this.offsetTop, f && i.move(b, c);
        
		isClick = false; 
	});
	$("#all_canvas").on(h.up, function(a) {  // 松开
	    a.preventDefault(), f && (f = !1, i.end())

	    // 图片移动位置
	    var _rate = rate / parseInt($(this).css("width"));
	    var m_x = (a.pageX || a.originalEvent.targetTouches[0].pageX) - (this.offsetParent.offsetLeft + this.offsetLeft);
	    var m_y = (a.pageY || a.originalEvent.targetTouches[0].pageY) - (this.offsetParent.offsetTop + this.offsetTop);

	    posUp[0] = Math.floor(m_x * _rate);
	    posUp[1] = Math.floor(m_y * _rate);

        if (isClick || posDown.toString() === posUp.toString()) {
            type = 1;
            posJson = {};
            posJson.position = posDown;
	    } else {
            type = 2;
            posJson = {};
            posJson.posStart = posDown;
            posJson.posEnd = posUp;
	    }
	    

	    $.post('/api/console/RemoteOrders', { token: token, udid: '68344DD865868292CC786A8CE28FBBD2', type: type, orders: JSON.stringify(posJson) }, function (json) {
	        if(json.code != 1){
	            alert(json.data);
	        }
	    });

	});
	$("#all_canvas").on(h.out, function(a) { // 离开
		a.preventDefault(), f && (f = !1, i.end())
	});
	$(window).on('unload', function() {
		a.onclose()
	});
	$("#home").on("click", function() {
		a.send(JSON.stringify({
			mode: "home"
		}))
	});
	$("#power").on("click", function() {
		a.send(JSON.stringify({
			mode: "power"
		}))
	});
	j = null, k = null;
	l = function() {
		j && clearTimeout(j);
		j = setTimeout(function() {
			clearInterval(k), a.onclose(), clearTimeout(d), mdui.dialog({
				title: "远控连接已断开",
				content: "请等待服务恢复后重新建立连接",
				buttons: [{
					text: "重新连接",
					onClick: function() {
						n()
					}
				}]
			})
		}, 3e4)
	};
	m = function() {
		$.post("/write_file", JSON.stringify({
			filename: "/bin/screen.lua",
			data: Base64.encode("if not touch then sys.alert('删除设备上的 `/var/mobile/Media/1ferver/caches/1ferver.key` 重新运行任意脚本更新证书。', 0, '证书需要更新') os.exit() end local ev = require'ev' local loop = ev.Loop.default local websocket = require'websocket' local server = websocket.server.ev.listen{ protocols = { ['RC'] = function(ws) sys.toast('已经建立远程控制连接') local index = 5 ev.Timer.new(function() if index <= 0 then sys.toast('已断开远程控制链接') os.exit() end index = index - 1 ws:send(json.encode({mode = 'heart'}) ) end, 1, 1 ):start(loop) ws:on_message(function(ws,message,opcode) if opcode == websocket.TEXT then local jobj = json.decode(message) if jobj then if jobj.mode == 'down' then touch.down(28,jobj.x,jobj.y) elseif jobj.mode == 'move' then touch.move(28,jobj.x,jobj.y) elseif jobj.mode == 'up' then touch.up(28) elseif jobj.mode == 'clipboard' then sys.toast(jobj.data) _old = jobj.data pasteboard.write(jobj.data) elseif jobj.mode == 'input_down' then key.down(jobj.key) elseif jobj.mode == 'input_up' then key.up(jobj.key) elseif jobj.mode == 'home' then key.press(0x0C, 64) elseif jobj.mode == 'power' then key.press(0x0C, 48) elseif jobj.mode == 'quit' then sys.toast('已断开远程控制链接') os.exit() elseif jobj.mode == 'heart' then index = 5 else end end end end) end }, port = 46968 } loop:loop()")
		}), function() {
			$.post("/command_spawn", "/usr/bin/1ferver/ReportCrash dofile /var/mobile/Media/1ferver/bin/screen.lua &", function() {
				setTimeout(function() {
					a = new WebSocket("ws://" + document.domain + ":46968", "RC");
					try {
						a.onopen = function() {
							mdui.snackbar({
								message: "远控连接已建立"
							}), k = setInterval(function() {
								a.send(JSON.stringify({
									mode: "heart"
								}))
							}, 1e4)
						}, a.onmessage = function() {
							l(), a.send(JSON.stringify({
								mode: "heart"
							}))
						}, a.onclose = function() {
							mdui.snackbar({
								message: "远控连接已断开"
							})
						}
					} catch(b) {
						console.log(b)
					}
				}, 1e3)
			}, "json").error(function() {
				mdui.snackbar({
					message: "与设备通讯无法达成"
				})
			})
		}, "json").error(function() {
			mdui.snackbar({
				message: "与设备通讯无法达成"
			})
		})
	};
	n = function() {
		if("local" == document.domain || "127.0.0.1" == document.domain) return mdui.snackbar({
			message: "无法本机操作本机"
		}), void 0;
		a = new WebSocket("ws://" + document.domain + ":46968", "RC");
		try {
			a.onopen = function() {
				mdui.snackbar({
					message: "远控连接已建立"
				}), k = setInterval(function() {
					a.send(JSON.stringify({
						mode: "heart"
					}))
				}, 1e4)
			}, a.onmessage = function(b) {
				var c = JSON.parse(b.data);
				"heart" == c["mode"] && (l(), a.send(JSON.stringify({
					mode: "heart"
				})))
			}, a.onclose = function() {
				m()
			}
		} catch(b) {
			console.log(b)
		}
	};
	n();
});