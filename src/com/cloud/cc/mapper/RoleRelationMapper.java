package com.cloud.cc.mapper;

import com.cloud.cc.vo.RoleRelation;

public interface RoleRelationMapper {
    int deleteByPrimaryKey(Integer rlId);

    int insert(RoleRelation record);

    int insertSelective(RoleRelation record);

    RoleRelation selectByPrimaryKey(Integer rlId);

    int updateByPrimaryKeySelective(RoleRelation record);

    int updateByPrimaryKey(RoleRelation record);

    int delByUserId(Integer userId);
}