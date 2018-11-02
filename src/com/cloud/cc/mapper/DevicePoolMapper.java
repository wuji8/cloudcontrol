package com.cloud.cc.mapper;

import com.cloud.cc.vo.DevicePool;

public interface DevicePoolMapper {
    int deleteByPrimaryKey(Integer dpid);

    int insert(DevicePool record);

    int insertSelective(DevicePool record);

    DevicePool selectByPrimaryKey(Integer dpid);

    int updateByPrimaryKeySelective(DevicePool record);

    int updateByPrimaryKey(DevicePool record);
}