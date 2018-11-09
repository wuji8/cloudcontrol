package com.cloud.cc.mapper;

import java.util.List;

import com.cloud.cc.vo.RoleRelation;

public interface RoleRelationMapper {
    int deleteByPrimaryKey(Integer rlId);

    int insert(RoleRelation record);

    int insertSelective(RoleRelation record);

    RoleRelation selectByPrimaryKey(Integer rlId);

    int updateByPrimaryKeySelective(RoleRelation record);

    int updateByPrimaryKey(RoleRelation record);

}