package com.cloud.cc.service;

import java.util.List;
import java.util.Map;

import com.cloud.cc.vo.UserApi;

public interface UserApiService {

	int addApiInterface(UserApi userApi);
	
	int delApiInterface(Integer apiId);
	
	List<UserApi> selectByTableId(Integer tableId);
	
	Map<String,Object> userOperApi(Map<String,Object> param,UserApi userApi);
	
	UserApi selectUserApiByGUID(String guid,String cuId);
}
