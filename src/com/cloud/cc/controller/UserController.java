package com.cloud.cc.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cloud.cc.service.LogsService;
import com.cloud.cc.service.UsersService;
import com.cloud.cc.tools.StringUnits;
import com.cloud.cc.vo.Logs;
import com.cloud.cc.vo.Users;

@Controller
public class UserController {

	@Autowired
	private UsersService userService;
	
	@Autowired
	private LogsService logsService;
	
	@RequestMapping("/toLogin")
	@ResponseBody
	public Map<String,Object> isLogin(HttpServletRequest request){
		Map<String,Object> resultMap=new HashMap<String,Object>();
		String userName=request.getParameter("userName");
		String userPwd=request.getParameter("userPwd");
		if(StringUnits.isEmpty(userPwd) || StringUnits.isEmpty(userName)) {
			resultMap.put("code", 2);	//账号和密码不能为空
			return resultMap;
		}
		Users user=userService.isLogin(userName, userPwd);
		if(user!=null) {	//登录成功
			if(user.getStatus()!=1) {	//被封禁
				resultMap.put("code", 3);
				return resultMap;
			}
			Logs logs=new Logs();
			logs.setContent("登录了云控系统");
			logs.setCreatetime(new Date());
			logs.setUserid(user.getUserid());
			logs.setType(1);
			logsService.addLogsData(logs);
			request.getSession().setAttribute("user", user);
			resultMap.put("code", 1);
			resultMap.put("data", userService.selectUserRole(user.getUserid(),user.getRoleId()));
		}else {
			resultMap.put("code", 0);
		}
		return resultMap;
	}
	
	
	@RequestMapping("addUser")
	@ResponseBody
	public Map<String,Object> addUser(HttpServletRequest request,Users user,String[] roleId){
		Map<String,Object> resultMap=new HashMap<String, Object>();
		//判断当前用户是否是超级管理员，只有超级管理员才能对用户进行操作
		Users users=(Users) request.getSession().getAttribute("user");
		if(users==null) {
			resultMap.put("code", 3);	//未登录
			return resultMap;
		}
		if(users.getRoleId()!=1) {
			resultMap.put("code", 4);	//没有权限操作
			return resultMap;
		}
		int result=userService.addUser(users, roleId);
		resultMap.put("code", result);
		return resultMap;
	}
	
	
	@RequestMapping("/modifyUserInfo")
	@ResponseBody
	public Map<String,Object> updateUserInfo(HttpServletRequest request,Users user){
		Map<String,Object> result=new HashMap<String, Object>();
		Users users=(Users) request.getSession().getAttribute("user");
		if(users==null) {
			result.put("code", 3);	//未登录
			return result;
		}
		if(users.getRoleId()!=1) {
			result.put("code", 4);	//没有权限操作
			return result;
		}
		result.put("code", userService.updateUser(user));
		return result;
	}
	
	
	@RequestMapping("/delUser")
	@ResponseBody
	public Map<String,Object> delUser(HttpServletRequest request){
		Map<String,Object> result=new HashMap<String, Object>();
		Users users=(Users) request.getSession().getAttribute("user");
		if(users==null) {
			result.put("code", 3);	//未登录
			return result;
		}
		if(users.getRoleId()!=1) {
			result.put("code", 4);	//没有权限操作
			return result;
		}
		String userId=request.getParameter("userId");
		result.put("code",userService.delUser(Integer.parseInt(userId)));
		return result;
	}
	
	@RequestMapping("/modifyUserRole")
	@ResponseBody
	public Map<String,Object> modifyUserRole(HttpServletRequest request){
		Map<String,Object> resultMap=new HashMap<String, Object>();
		Users users=(Users) request.getSession().getAttribute("user");
		if(users==null) {
			resultMap.put("code", 3);	//未登录
			return resultMap;
		}
		if(users.getRoleId()!=1) {
			resultMap.put("code", 4);	//没有权限操作
			return resultMap;
		}
		return resultMap;
	}
}
