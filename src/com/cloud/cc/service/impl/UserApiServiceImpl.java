package com.cloud.cc.service.impl;

import java.util.List;
import java.util.Map;

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



	@Override
	public List<UserApi> selectByTableId(Integer tableId) {
		// TODO Auto-generated method stub
		return userApiMapper.selectByTableId(tableId);
	}



	@Override
	public Map<String, Object> userOperApi(Map<String, Object> param,UserApi userApi) {
		// TODO Auto-generated method stub
		
		return null;
	}



	@Override
	public UserApi selectUserApiByGUID(String guid,String cuId) {
		// TODO Auto-generated method stub
		return userApiMapper.selectUserApiByGUID(guid, cuId);
	}
}
