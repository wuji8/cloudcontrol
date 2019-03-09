package com.cloud.cc.service;

import java.util.List;

import com.cloud.cc.tools.PageHelper;
import com.cloud.cc.vo.UserRole;
import com.cloud.cc.vo.Users;

public interface UsersService {

	Users selectUserByCCID(String ccId);
	
	int addUser(Users user);
	
	Users selectByUserName(String userName);
	
	int updateUser(Users user);
	
	int delUser(Integer userId);
	
	//List<UserRole> selectUserRole(Integer userId);
	
	Users isLogin(String userName,String userPwd);
	
	//int updateUserRole(Integer userId);
	
	void getUserByCouldID(PageHelper<Users> pageHelper);
	
	Users selectById(Integer userId);
}
