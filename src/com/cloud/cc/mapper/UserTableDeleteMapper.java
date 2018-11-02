package com.cloud.cc.mapper;

import com.cloud.cc.vo.UserTableDelete;

public interface UserTableDeleteMapper {
    int deleteByPrimaryKey(Integer utbid);

    int insert(UserTableDelete record);

    int insertSelective(UserTableDelete record);

    UserTableDelete selectByPrimaryKey(Integer utbid);

    int updateByPrimaryKeySelective(UserTableDelete record);

    int updateByPrimaryKey(UserTableDelete record);
}