package com.cloud.cc.mapper;

import com.cloud.cc.vo.QrWall;

public interface QrWallMapper {
    int deleteByPrimaryKey(Integer wallid);

    int insert(QrWall record);

    int insertSelective(QrWall record);

    QrWall selectByPrimaryKey(Integer wallid);

    int updateByPrimaryKeySelective(QrWall record);

    int updateByPrimaryKey(QrWall record);
}