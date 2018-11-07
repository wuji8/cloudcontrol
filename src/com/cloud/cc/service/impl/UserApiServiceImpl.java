package com.cloud.cc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloud.cc.mapper.UserApiMapper;
import com.cloud.cc.service.UserApiService;
import com.cloud.cc.vo.UserApi;
@Service
public class UserApiServiceImpl implements UserApiService {

	@Autowired
	private UserApiMapper userApiMapper;
	
	
	
	@Override
	public int addApiInterface(UserApi userApi) {
		// TODO Auto-generated method stub
		
		return 0;
	}



	@Override
	public int delApiInterface(Integer apiId) {
		// TODO Auto-generated method stub
		return userApiMapper.deleteByPrimaryKey(apiId);
	}
}
