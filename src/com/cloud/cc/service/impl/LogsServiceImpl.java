package com.cloud.cc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloud.cc.mapper.LogsMapper;
import com.cloud.cc.service.LogsService;
import com.cloud.cc.vo.Logs;
@Service
public class LogsServiceImpl implements LogsService {

	@Autowired
	private LogsMapper logsMapper;
	
	@Override
	public List<Logs> selectByUserId(Integer userId) {
		// TODO Auto-generated method stub
		return logsMapper.selectByUserId(userId);
	}

	@Override
	public int addLogsData(Logs logs) {
		// TODO Auto-generated method stub
		return logsMapper.insertSelective(logs);
	}

}
