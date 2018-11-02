package com.cloud.cc.mapper;

import com.cloud.cc.vo.SoftCode;

public interface SoftCodeMapper {
    int deleteByPrimaryKey(Integer codeid);

    int insert(SoftCode record);

    int insertSelective(SoftCode record);

    SoftCode selectByPrimaryKey(Integer codeid);

    int updateByPrimaryKeySelective(SoftCode record);

    int updateByPrimaryKey(SoftCode record);
}