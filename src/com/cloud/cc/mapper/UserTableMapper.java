package com.cloud.cc.mapper;

import com.cloud.cc.vo.UserTable;

public interface UserTableMapper {
    int deleteByPrimaryKey(Integer tableid);

    int insert(UserTable record);

    int insertSelective(UserTable record);

    UserTable selectByPrimaryKey(Integer tableid);

    int updateByPrimaryKeySelective(UserTable record);

    int updateByPrimaryKey(UserTable record);
}