package com.cloud.cc.mapper;

import com.cloud.cc.vo.Devices;

public interface DevicesMapper {
    int deleteByPrimaryKey(Integer deviceid);

    int insert(Devices record);

    int insertSelective(Devices record);

    Devices selectByPrimaryKey(Integer deviceid);

    int updateByPrimaryKeySelective(Devices record);

    int updateByPrimaryKey(Devices record);
}