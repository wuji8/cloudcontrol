 package com.cloud.cc.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cloud.cc.service.DevicesService;
import com.cloud.cc.tools.StringUnits;
import com.cloud.cc.vo.Devices;
import com.cloud.cc.vo.Users;

@Controller
public class DevicesController {

	@Autowired
	private DevicesService devicesServiceImpl;
	
	/**
	 * 添加设备
	 * @param request udid-UDID remark-备注 
	 * @return
	 */
	@RequestMapping("/addDevices")
	@ResponseBody
	public Map<String,Object> addDevices(HttpServletRequest request){
		Map<String,Object> resultMap=new HashMap<String,Object>();
		String udid=request.getParameter("udid");
		String remark=request.getParameter("remark");
		if(StringUnits.isEmpty(udid) || StringUnits.isEmpty(remark)){
			resultMap.put("code", 2);	//	参数错误
			return resultMap;
			
		}
		Devices devices=new Devices();
		devices.setUdid(udid);
		devices.setRemark(remark);
		devices.setCreatetime(new Date());
		resultMap.put("code",devicesServiceImpl.addDevice(devices));
		return resultMap;
	}
	
	
	/**
	 * 删除设备
	 * @param request
	 * @return
	 */
	@RequestMapping("/delDevices")
	@ResponseBody
	public Map<String,Object> delDevices(HttpServletRequest request){
		Map<String,Object> resultMap=new HashMap<String, Object>();
		String[] deviceId=request.getParameterValues("deviceId");
		if(deviceId==null || deviceId.length<0){
			resultMap.put("code", 2);	//参数有误
			return resultMap;
		}
		Integer[] id=new Integer[deviceId.length];
		for (int i = 0; i < deviceId.length; i++) {
			if(StringUnits.isEmpty(deviceId[i]) || !StringUnits.isInteger(deviceId[i])){
				resultMap.put("code", 2);	//参数错误
				return resultMap;
			}
			id[i]=Integer.parseInt(deviceId[i]);
		}
		Users user=(Users)request.getSession().getAttribute("user");
		resultMap.put("code", devicesServiceImpl.delDevice(id, user.getUserid()));
		return resultMap;
	}
	
}
