package com.cloud.cc.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloud.cc.mapper.DevicesMapper;
import com.cloud.cc.mapper.LogsMapper;
import com.cloud.cc.service.DevicesService;
import com.cloud.cc.vo.Devices;
import com.cloud.cc.vo.Logs;
@Service
public class DevicesServiceImpl implements DevicesService{

	@Autowired
	private DevicesMapper devicesMapper;
	
	@Autowired
	private LogsMapper logsMapper;
	
	@Override
	public int addDevice(Devices devices) {
		// TODO Auto-generated method stub
		int result=devicesMapper.insertSelective(devices);
		if(result>0) {
			Logs logs=new Logs();
			logs.setContent("添加了设备【"+devices.getRemark()+"】");
			logs.setCreatetime(new Date());
			logs.setUserid(devices.getUserid());
			
			logsMapper.insertSelective(logs);
		}
		return result;
	}

	@Override
	public int delDevice(Integer[] devicesId,Integer userId) {
		// TODO Auto-generated method stub
		int result=0;
		String content="";
		for (int i = 0; i < devicesId.length; i++) {
			result+=devicesMapper.deleteByPrimaryKey(devicesId[i]);
			Devices devices=devicesMapper.selectByPrimaryKey(devicesId[i]);
			content+=devices.getRemark()+",";
		}
		Logs logs=new Logs();
		logs.setContent("删除了设备【"+content+"】");
		logs.setCreatetime(new Date());
		logs.setUserid(userId);
		logsMapper.insertSelective(logs);
		return result;
	}
}
