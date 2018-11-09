package com.cloud.cc.service;

import java.util.List;

import com.cloud.cc.vo.UserRole;
import com.cloud.cc.vo.Users;

public interface UsersService {

	Users selectUserByCCID(String ccId);
	
	int addUser(Users user,String[] role);
	
	Users selectByUserName(String userName);
	
	int updateUser(Users user);
	
	int delUser(Integer userId);
	
	List<UserRole> selectUserRole(Integer userId,Integer roleId);
}
