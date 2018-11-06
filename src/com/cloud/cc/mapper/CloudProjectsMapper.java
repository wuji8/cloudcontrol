package com.cloud.cc.mapper;

import java.util.List;

import com.cloud.cc.vo.CloudProjects;

public interface CloudProjectsMapper {
    int deleteByPrimaryKey(Integer cloudid);

    int insert(CloudProjects record);

    int insertSelective(CloudProjects record);

    CloudProjects selectByPrimaryKey(Integer cloudid);

    int updateByPrimaryKeySelective(CloudProjects record);

    int updateByPrimaryKey(CloudProjects record);
    
    List<CloudProjects> selectByUserId(Integer userId);
}