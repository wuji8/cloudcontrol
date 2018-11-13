package com.cloud.cc.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cloud.cc.service.CloudProjectsService;
import com.cloud.cc.tools.StringUnits;
import com.cloud.cc.vo.CloudProjects;
import com.cloud.cc.vo.Users;

@Controller
public class CloudProjectController {

	@Autowired
	private CloudProjectsService cloudProjectService;
	
	
	@RequestMapping("/addProject")
	@ResponseBody
	public Map<String,Object> addProject(HttpServletRequest request){
		Map<String,Object> resultMap=new HashMap<String,Object>();
		String projectName=request.getParameter("projectName");
		Users user=(Users) request.getSession().getAttribute("user");
		if(StringUnits.isEmpty(projectName)) {
			resultMap.put("code", 2);	//缺少参数
			return resultMap;
		}
		CloudProjects cloudProject=new CloudProjects();
		cloudProject.setCloudname(projectName);
		cloudProject.setCreatetime(new Date());
		cloudProject.setCuid(StringUnits.getUUID().toUpperCase());
		cloudProject.setUserid(user.getUserid());
		resultMap.put("code", cloudProjectService.addCloudProjects(cloudProject));
		return resultMap;
	}
	
	
	@RequestMapping("/delProject")
	@ResponseBody
	public Map<String,Object> delProject(HttpServletRequest request){
		Map<String,Object> resultMap=new HashMap<String, Object>();
		String cloudId=request.getParameter("cloudId");
		if(StringUnits.isEmpty(cloudId) || !StringUnits.isInteger(cloudId)) {
			resultMap.put("code",2);
			return resultMap;
		}
		resultMap.put("code",cloudProjectService.delCloudProjects(Integer.parseInt(cloudId)));
		return resultMap;
	}
	
	
}
