package com.cloud.cc.service;

import com.cloud.cc.vo.Devices;

public interface DevicesService {

	/**
	 *添加设备
	 * @param devices
	 * @return
	 */
	int addDevice(Devices devices);
	
	/**
	 * 删除多条/单条设备数据
	 * @param devicesId
	 * @param userId
	 * @return
	 */
	int delDevice(Integer[] devicesId,Integer userId);
}
