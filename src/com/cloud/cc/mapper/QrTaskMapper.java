package com.cloud.cc.mapper;

import com.cloud.cc.vo.QrTask;

public interface QrTaskMapper {
    int deleteByPrimaryKey(Integer taskid);

    int insert(QrTask record);

    int insertSelective(QrTask record);

    QrTask selectByPrimaryKey(Integer taskid);

    int updateByPrimaryKeySelective(QrTask record);

    int updateByPrimaryKey(QrTask record);
}