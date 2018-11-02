package com.cloud.cc.mapper;

import com.cloud.cc.vo.Additionals;

public interface AdditionalsMapper {
    int deleteByPrimaryKey(Integer additid);

    int insert(Additionals record);

    int insertSelective(Additionals record);

    Additionals selectByPrimaryKey(Integer additid);

    int updateByPrimaryKeySelective(Additionals record);

    int updateByPrimaryKey(Additionals record);
}