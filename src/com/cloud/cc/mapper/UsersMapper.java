package com.cloud.cc.mapper;

import java.util.List;
import java.util.Map;

import com.cloud.cc.vo.Users;

public interface UsersMapper {
    int deleteByPrimaryKey(Integer userid);

    int insert(Users record);

    int insertSelective(Users record);

    Users selectByPrimaryKey(Integer userid);

    int updateByPrimaryKeySelective(Users record);

    int updateByPrimaryKey(Users record);
    
    Users selectUsersByCCID(String ccId);
    
    Users selectByUserName(String userName);
    
    List<Users> queryPage(Map<String,Object> param);
    
    int queryCount(Map<String,Object> param);
}