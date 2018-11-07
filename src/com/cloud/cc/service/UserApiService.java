package com.cloud.cc.service;

import com.cloud.cc.vo.UserApi;

public interface UserApiService {

	int addApiInterface(UserApi userApi);
	
	int delApiInterface(Integer apiId);
}
