package com.cloud.cc.mapper;

import com.cloud.cc.vo.UserProps;

public interface UserPropsMapper {
    int deleteByPrimaryKey(Integer upropid);

    int insert(UserProps record);

    int insertSelective(UserProps record);

    UserProps selectByPrimaryKey(Integer upropid);

    int updateByPrimaryKeySelective(UserProps record);

    int updateByPrimaryKey(UserProps record);
}