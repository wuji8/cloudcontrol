package com.cloud.cc.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.ResultMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cloud.cc.service.LogsService;
import com.cloud.cc.service.UsersService;
import com.cloud.cc.tools.PageHelper;
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
			//resultMap.put("data", userService.selectUserRole(user.getUserid(),user.getRoleId()));
		}else {
			resultMap.put("code", 0);
		}
		return resultMap;
	}
	
	
	@RequestMapping("/addUser")
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
		if(user.getCloudid()==null || user.getCloudid()==0){
			resultMap.put("code",6);
			return resultMap;
		}
		if(StringUnits.isEmpty(user.getNickname()) || StringUnits.isEmpty(user.getUsername()) || StringUnits.isEmpty(user.getUserpass())){
			resultMap.put("code",6);	//检查参数是否正确
			return resultMap;
		}
		if(user.getNickname().length()>10 || user.getUsername().length()>16 || user.getUserpass().length()>16){
			resultMap.put("code",5);	//检查参数值长度是否正确
			return resultMap;
		}
		//判断用户名是否已存在
		if(userService.selectByUserName(user.getUsername())!=null){
			resultMap.put("code", 7);	//用户名已存在
			return resultMap;
		}
		user.setCcid(StringUnits.getUUID().toUpperCase());
		int result=userService.addUser(user, roleId);
		resultMap.put("code", result);
		return resultMap;
	}
	
	
	@RequestMapping("/operUserState")
	@ResponseBody
	public Map<String,Object> operUserState(HttpServletRequest request){
		Map<String,Object> resultMap=new HashMap<String, Object>();
		String userId=request.getParameter("userId");
		if(StringUnits.isEmpty(userId) || !StringUnits.isInteger(userId)){
			resultMap.put("code", 2);	//参数错误
			return resultMap;
		}
		Users users=userService.selectById(Integer.parseInt(userId));
		if(users==null){
			resultMap.put("code", 3);	//找不到该用户
			return resultMap;
		} 
		if(users.getStatus()==1){
			users.setStatus(0);
		}else{
			users.setStatus(1);
		}
		resultMap.put("code", userService.updateUser(users));
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
		if(user.getUserid()==null){
			result.put("code",6);	//检查参数是否正确
			return result;
		}
		if(user.getCloudid()==null || user.getCloudid()==0){
			result.put("code",6);
			return result;
		}
		if(StringUnits.isEmpty(user.getNickname()) || StringUnits.isEmpty(user.getUsername()) || StringUnits.isEmpty(user.getUserpass())){
			result.put("code",6);	//检查参数是否正确
			return result;
		}
		if(user.getNickname().length()>10 || user.getUsername().length()>16 || user.getUserpass().length()>16){
			result.put("code",5);	//检查参数值长度是否正确
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
		if(StringUnits.isEmpty(userId)){
			result.put("code",2);
			return result;
		}
		result.put("code",userService.delUser(Integer.parseInt(userId)));
		return result;
	}
	
	@RequestMapping("/modifyUserRole")
	@ResponseBody
	public Map<String,Object> modifyUserRole(HttpServletRequest request,Integer userId,String[] roleId){
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
		resultMap.put("code", userService.updateUserRole(userId, roleId));
		return resultMap;
	}
	
	@RequestMapping("/logsPage")
	@ResponseBody
	public Map<String,Object> queryLogsPage(HttpServletRequest request){
		Map<String,Object> resultMap=new HashMap<String, Object>();
		Users user=(Users) request.getSession().getAttribute("user");
		String pageNo=request.getParameter("pageNo");
		String pageSize=request.getParameter("pageSize");
		String type=request.getParameter("type");
		if(StringUnits.isEmpty(pageNo) || StringUnits.isEmpty(pageSize)) {
			pageNo="0";
			pageSize="20";
		}
		if(!StringUnits.isInteger(pageSize) || !StringUnits.isInteger(pageNo)) {
			resultMap.put("code", 2);	//页数或页码必须要为数字
			return resultMap;
		}
		PageHelper<Logs> pageHelper=new PageHelper<Logs>();
		pageHelper.setPageNo(Integer.parseInt(pageNo));
		pageHelper.setPageSize(Integer.parseInt(pageSize));
		pageHelper.getParams().put("type", type);
		pageHelper.getParams().put("userId", user.getUserid());
		logsService.queryPage(pageHelper);
		resultMap.put("code", 1);
		resultMap.put("data",pageHelper);
		return resultMap;
	}
	
	
	@RequestMapping("/getUserByCouldID")
	@ResponseBody
	public Map<String,Object> getUserByCouldID(HttpServletRequest request){
		Map<String,Object> resultMap=new HashMap<String, Object>();
		String couldId=request.getParameter("couldId");
		if(StringUnits.isEmpty(couldId) || !StringUnits.isInteger(couldId)){
			resultMap.put("code", 2);
			return resultMap;
		}
		String pageNo=request.getParameter("pageNo");
		String pageSize=request.getParameter("pageSize");
		if(StringUnits.isEmpty(pageNo) || !StringUnits.isInteger(pageNo)){
			pageNo="1";
		}
		if(StringUnits.isEmpty(pageSize) || !StringUnits.isInteger(pageSize)){
			pageSize="20";
		}
		PageHelper<Users> pageHelper=new PageHelper<Users>();
		pageHelper.setPageNo(Integer.parseInt(pageNo));
		pageHelper.setPageSize(Integer.parseInt(pageSize));
		pageHelper.getParams().put("cloudId", Integer.parseInt(couldId));
		userService.getUserByCouldID(pageHelper);
		resultMap.put("data",pageHelper);
		return resultMap;
	}
}
