package com.cloud.cc.service;

import java.util.List;

import com.cloud.cc.tools.PageHelper;
import com.cloud.cc.vo.Logs;

public interface LogsService {
	
	/**
	 * ��ѯ�û��µ���־����
	 * @param userId
	 * @return
	 */
	List<Logs> selectByUserId(Integer userId);
	
	/**
	 * ������־����
	 * @param logs
	 * @return
	 */
	int addLogsData(Logs logs);
	
	
	void queryPage(PageHelper<Logs> pageHelper);
}
