package com.cloud.cc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloud.cc.mapper.UserRoleMapper;
import com.cloud.cc.service.UserRoleService;
import com.cloud.cc.vo.UserRole;
@Service
public class UserRoleServiceImpl implements UserRoleService {

	@Autowired
	private UserRoleMapper userRoleMapper;
	
	@Override
	public List<UserRole> selectAll() {
		// TODO Auto-generated method stub
		return userRoleMapper.selectAll();
	}
}
