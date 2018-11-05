package com.cloud.cc.service;

import com.cloud.cc.vo.Group;

public interface GroupService {
	
	/**
	 * 增加分组数据
	 * @param group
	 * @return
	 */
	int addGroupData(Group group);
	
	/**
	 * 删除分组数据
	 * @param groupId
	 * @param flag	是否删除分组下的设备
	 * @param userId
	 * @return
	 */
	int delGroup(Integer groupId,boolean flag,Integer userId);
}
