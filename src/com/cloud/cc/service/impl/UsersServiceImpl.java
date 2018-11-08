package com.cloud.cc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloud.cc.mapper.UsersMapper;
import com.cloud.cc.service.UsersService;
import com.cloud.cc.vo.Users;
@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	private UsersMapper usersMapper;
	
	@Override
	public Users selectUserByCCID(String ccId) {
		// TODO Auto-generated method stub
		return usersMapper.selectUsersByCCID(ccId);
	}

}
