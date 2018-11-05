package com.cloud.cc.service;

import java.util.List;

import com.cloud.cc.vo.Logs;

public interface LogsService {

	List<Logs> selectByUserId(Integer userId);
	
	int addLogsData(Logs logs);
}
