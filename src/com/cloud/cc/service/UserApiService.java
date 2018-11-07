package com.cloud.cc.service;

import java.util.List;

import com.cloud.cc.vo.UserApi;

public interface UserApiService {

	int addApiInterface(UserApi userApi);
	
	int delApiInterface(Integer apiId);
	
	List<UserApi> selectByTableId(Integer tableId);
}
