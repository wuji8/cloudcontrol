package com.cloud.cc.mapper;

import java.util.List;

import com.cloud.cc.vo.Relation;
import com.cloud.cc.vo.RoleRelation;

public interface RelationMapper {
    int deleteByPrimaryKey(Integer relationId);

    int insert(Relation record);

    int insertSelective(Relation record);

    Relation selectByPrimaryKey(Integer relationId);

    int updateByPrimaryKeySelective(Relation record);

    int updateByPrimaryKey(Relation record);
    
    List<Relation> selectById(String idStr);
}