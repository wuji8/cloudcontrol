package com.cloud.cc.mapper;

import com.cloud.cc.vo.SystemFundRecords;

public interface SystemFundRecordsMapper {
    int deleteByPrimaryKey(Integer fundid);

    int insert(SystemFundRecords record);

    int insertSelective(SystemFundRecords record);

    SystemFundRecords selectByPrimaryKey(Integer fundid);

    int updateByPrimaryKeySelective(SystemFundRecords record);

    int updateByPrimaryKey(SystemFundRecords record);
}