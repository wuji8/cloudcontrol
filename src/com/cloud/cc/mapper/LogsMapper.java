package com.cloud.cc.mapper;

import java.util.List;

import com.cloud.cc.vo.Logs;

public interface LogsMapper {
    int deleteByPrimaryKey(Integer logid);

    int insert(Logs record);

    int insertSelective(Logs record);

    Logs selectByPrimaryKey(Integer logid);

    int updateByPrimaryKeySelective(Logs record);

    int updateByPrimaryKey(Logs record);
    
    List<Logs> selectByUserId(Integer userId);
}