package com.cloud.cc.mapper;

import com.cloud.cc.vo.QrCell;

public interface QrCellMapper {
    int deleteByPrimaryKey(Integer cellid);

    int insert(QrCell record);

    int insertSelective(QrCell record);

    QrCell selectByPrimaryKey(Integer cellid);

    int updateByPrimaryKeySelective(QrCell record);

    int updateByPrimaryKey(QrCell record);
}