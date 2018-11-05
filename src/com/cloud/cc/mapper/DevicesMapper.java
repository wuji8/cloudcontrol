package com.cloud.cc.mapper;

import java.util.List;

import com.cloud.cc.vo.Devices;

public interface DevicesMapper {
    int deleteByPrimaryKey(Integer deviceid);

    int insert(Devices record);

    int insertSelective(Devices record);

    Devices selectByPrimaryKey(Integer deviceid);

    int updateByPrimaryKeySelective(Devices record);

    int updateByPrimaryKey(Devices record);
    
    int delByGroupId(Integer groupId);
    
    List<Devices> selectByGroupId(Integer groupId);
}