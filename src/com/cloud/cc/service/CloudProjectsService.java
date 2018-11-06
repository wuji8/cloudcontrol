package com.cloud.cc.service;

import java.util.List;

import com.cloud.cc.vo.CloudProjects;

public interface CloudProjectsService {

	int addCloudProjects(CloudProjects cloudProjects);
	
	List<CloudProjects> selectByUserId(Integer userId);
	
	int delCloudProjects(Integer cloudProjectsId);
}
