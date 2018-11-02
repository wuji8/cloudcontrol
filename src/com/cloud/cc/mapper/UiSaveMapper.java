package com.cloud.cc.mapper;

import com.cloud.cc.vo.UiSave;

public interface UiSaveMapper {
    int deleteByPrimaryKey(Integer uisid);

    int insert(UiSave record);

    int insertSelective(UiSave record);

    UiSave selectByPrimaryKey(Integer uisid);

    int updateByPrimaryKeySelective(UiSave record);

    int updateByPrimaryKey(UiSave record);
}