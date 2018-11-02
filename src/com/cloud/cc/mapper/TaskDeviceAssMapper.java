package com.cloud.cc.mapper;

import com.cloud.cc.vo.TaskDeviceAss;

public interface TaskDeviceAssMapper {
    int deleteByPrimaryKey(Integer tdaid);

    int insert(TaskDeviceAss record);

    int insertSelective(TaskDeviceAss record);

    TaskDeviceAss selectByPrimaryKey(Integer tdaid);

    int updateByPrimaryKeySelective(TaskDeviceAss record);

    int updateByPrimaryKey(TaskDeviceAss record);
}