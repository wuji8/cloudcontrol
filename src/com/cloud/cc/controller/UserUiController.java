package com.cloud.cc.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cloud.cc.service.UiTableService;
import com.cloud.cc.tools.StringUnits;
import com.cloud.cc.vo.UiTable;
import com.cloud.cc.vo.Users;

@Controller
public class UserUiController {

	@Autowired
	private UiTableService uiTableService;
	
	
	@RequestMapping("/getUiTableList")
	@ResponseBody
	public Map<String,Object> getUiTableList(HttpServletRequest request){
		Map<String,Object> resultMap=new HashMap<String,Object>();
		Users user=(Users)request.getSession().getAttribute("user");
		String cloudId=request.getParameter("cloudId");
		if(StringUnits.isEmpty(cloudId) || !StringUnits.isInteger(cloudId)){
			resultMap.put("code", 2);	//参数错误
			return resultMap;
		}
		resultMap.put("code", 1);
		resultMap.put("data",uiTableService.selectByUserId(user.getUserid(), Integer.parseInt(cloudId)));
		return resultMap;
	}
	
	
	@RequestMapping("/addUiTable")
	@ResponseBody
	public Map<String,Object> addUiTable(HttpServletRequest request){
		Map<String,Object> resultMap=new HashMap<String, Object>();
		String uitName=request.getParameter("uitName");
		String uiJson=request.getParameter("uiJson");
		String cloudId=request.getParameter("cloudId");
		Users user=(Users)request.getSession().getAttribute("user");
		if(StringUnits.isEmpty(uitName)){
			resultMap.put("code", 2);	//参数错误
			resultMap.put("msg", "表名称必须要填");
			return resultMap;
		}
		if(StringUnits.isEmpty(uiJson)){
			resultMap.put("code", 2);	//参数错误
			resultMap.put("msg", "表内容必须要填");
			return resultMap;
		}
		if(StringUnits.isEmpty(cloudId) || !StringUnits.isInteger(cloudId)){
			resultMap.put("code", 2);
			resultMap.put("msg","请选择一个正确的项目");
			return resultMap;
		}
		UiTable uiTable=new UiTable();
		uiTable.setCloudid(Integer.parseInt(cloudId));
		uiTable.setCreatetime(new Date());
		uiTable.setUijson(uiJson);
		uiTable.setUitname(uitName);
		uiTable.setUserid(user.getUserid());
		resultMap.put("code",uiTableService.addUiData(uiTable));
		return resultMap;
	}
	
}
