package com.cloud.cc.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloud.cc.mapper.RelationMapper;
import com.cloud.cc.mapper.RoleRelationMapper;
import com.cloud.cc.mapper.UserRoleMapper;
import com.cloud.cc.mapper.UsersMapper;
import com.cloud.cc.service.UsersService;
import com.cloud.cc.vo.Relation;
import com.cloud.cc.vo.RoleRelation;
import com.cloud.cc.vo.UserRole;
import com.cloud.cc.vo.Users;
@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	private UsersMapper usersMapper;
	
	@Autowired
	private RoleRelationMapper roleRelationMapper;
	
	@Autowired
	private RelationMapper relationMapper;
	
	@Autowired
	private UserRoleMapper userRoleMapper;
	
	@Override
	public Users selectUserByCCID(String ccId) {
		// TODO Auto-generated method stub
		return usersMapper.selectUsersByCCID(ccId);
	}

	@Override
	public int addUser(Users user,String[] role) {
		// TODO Auto-generated method stub
		try {
			String idStr="";
			for (int i = 0; i < role.length; i++) {
				idStr+=role+",";
			}
			idStr=idStr.substring(0, idStr.length()-1);
			usersMapper.insertSelective(user);
			List<Relation> lists=relationMapper.selectById(idStr);
			for(Relation list:lists) {
				RoleRelation roleRelation=new RoleRelation();
				roleRelation.setCreatetime(new Date());
				roleRelation.setRelationId(list.getRelationId());
				roleRelation.setRoleId(user.getRoleId());
				roleRelation.setUserId(user.getUserid());
				roleRelationMapper.insertSelective(roleRelation);
			}
			return 1;
		}catch(Exception exception) {
			exception.printStackTrace();
			throw new RuntimeException("出现异常！！"+exception.getMessage());
		}
	}

	@Override
	public Users selectByUserName(String userName) {
		// TODO Auto-generated method stub
		return usersMapper.selectByUserName(userName);
	}

	@Override
	public int updateUser(Users user) {
		// TODO Auto-generated method stub
		return usersMapper.updateByPrimaryKeySelective(user);
	}

	@Override
	public int delUser(Integer userId) {
		// TODO Auto-generated method stub
		return usersMapper.deleteByPrimaryKey(userId);
	}

	@Override
	public List<UserRole> selectUserRole(Integer userId, Integer roleId) {
		// TODO Auto-generated method stub
		return userRoleMapper.selectByUserIdAndRoleId(userId, roleId);
	}

	@Override
	public Users isLogin(String userName,String userPwd) {
		// TODO Auto-generated method stub
		Users users=usersMapper.selectByUserName(userName);
		if(users!=null && users.getUserpass().equals(userPwd)) {
			return users;
		}
		return null;
	}

	@Override
	public int updateUserRole(Integer userId, String[] role) {
		// TODO Auto-generated method stub
		//查出用户
		Users user=usersMapper.selectByPrimaryKey(userId);
		//删除用户原先的权限
		roleRelationMapper.delByUserId(userId);
		if(user==null) {
			return 0;
		}
		for (int i = 0; i < role.length; i++) {
			RoleRelation roleRelation=new RoleRelation();
			roleRelation.setCreatetime(new Date());
			roleRelation.setRelationId(Integer.parseInt(role[i]));  
			roleRelation.setRoleId(user.getRoleId());
			roleRelation.setUserId(user.getUserid());
			roleRelationMapper.insertSelective(roleRelation);
		}
		return 1;
	}

}
