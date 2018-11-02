package com.cloud.cc.mapper;

import com.cloud.cc.vo.Task;
import com.cloud.cc.vo.TaskWithBLOBs;

public interface TaskMapper {
    int deleteByPrimaryKey(Integer taskid);

    int insert(TaskWithBLOBs record);

    int insertSelective(TaskWithBLOBs record);

    TaskWithBLOBs selectByPrimaryKey(Integer taskid);

    int updateByPrimaryKeySelective(TaskWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(TaskWithBLOBs record);

    int updateByPrimaryKey(Task record);
}