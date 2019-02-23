package com.cloud.cc.service.impl;

import java.util.List;

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
		return userApiMapper.insertSelective(userApi);
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
	public UserApi selectUserApiByGUID(String guid,String cuId) {
		// TODO Auto-generated method stub
		return userApiMapper.selectUserApiByGUID(guid, cuId);
	}



	@Override
	public List<UserApi> selectByUserId(Integer userId) {
		// TODO Auto-generated method stub
		return userApiMapper.selectByUserId(userId);
	}
}
