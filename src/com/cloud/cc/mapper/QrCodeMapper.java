package com.cloud.cc.mapper;

import com.cloud.cc.vo.QrCode;

public interface QrCodeMapper {
    int deleteByPrimaryKey(Integer qrid);

    int insert(QrCode record);

    int insertSelective(QrCode record);

    QrCode selectByPrimaryKey(Integer qrid);

    int updateByPrimaryKeySelective(QrCode record);

    int updateByPrimaryKey(QrCode record);
}