package com.cloud.cc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cloud.cc.vo.UserRole;

public interface UserRoleMapper {
    int deleteByPrimaryKey(Integer roleId);

    int insert(UserRole record);

    int insertSelective(UserRole record);

    UserRole selectByPrimaryKey(Integer roleId);

    int updateByPrimaryKeySelective(UserRole record);

    int updateByPrimaryKey(UserRole record);
    
    List<UserRole> selectAll();
    
    List<UserRole> selectByUserIdAndRoleId(@Param("userId")Integer userId,@Param("roleId")Integer roleId);
}