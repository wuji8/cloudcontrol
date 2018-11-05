package com.cloud.cc.service;

import java.util.List;

import com.cloud.cc.vo.Logs;

public interface LogsService {
	
	/**
	 * 查询用户下的日志数据
	 * @param userId
	 * @return
	 */
	List<Logs> selectByUserId(Integer userId);
	
	/**
	 * 增加日志数据
	 * @param logs
	 * @return
	 */
	int addLogsData(Logs logs);
}
