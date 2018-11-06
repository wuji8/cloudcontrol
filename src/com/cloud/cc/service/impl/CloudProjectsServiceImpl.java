package com.cloud.cc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloud.cc.mapper.CloudProjectsMapper;
import com.cloud.cc.service.CloudProjectsService;
import com.cloud.cc.vo.CloudProjects;
@Service
public class CloudProjectsServiceImpl implements CloudProjectsService {

	@Autowired
	private CloudProjectsMapper cloudProjectsMapper;
	
	@Override
	public int addCloudProjects(CloudProjects cloudProjects) {
		// TODO Auto-generated method stub
		return cloudProjectsMapper.insertSelective(cloudProjects);
	}

	@Override
	public List<CloudProjects> selectByUserId(Integer userId) {
		// TODO Auto-generated method stub
		return cloudProjectsMapper.selectByUserId(userId);
	}

	@Override
	public int delCloudProjects(Integer cloudProjectsId) {
		// TODO Auto-generated method stub
		return cloudProjectsMapper.deleteByPrimaryKey(cloudProjectsId);
	}

}
