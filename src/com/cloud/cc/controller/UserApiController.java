package com.cloud.cc.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.cloud.cc.service.UserApiService;
import com.cloud.cc.service.UsersService;

@Controller
public class UserApiController {

	@Autowired
	private UserApiService userApiService;
	
	@Autowired
	private UsersService userService;
	
	public Map<String,Object> userOperApi(HttpServletRequest request){
		Map<String,Object> reusltMap=new HashMap<String, Object>();
		//拿去guid参数获取该条api数据
		String guid=request.getParameter("guid");	//api的唯一标识
		String cuid=request.getParameter("cuid");	//项目的唯一标识
		String ccid=request.getParameter("ccid");	//用户的唯一标识
		//获取cuid判断该条api是否属于该项目
		//获取ccid判断这条api是否是这个用户可供使用
		//判断参数是否都有传
		return reusltMap;
	}
}