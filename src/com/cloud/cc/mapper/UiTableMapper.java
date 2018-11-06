package com.cloud.cc.mapper;

import java.util.List;

import com.cloud.cc.vo.UiTable;

public interface UiTableMapper {
    int deleteByPrimaryKey(Integer uitid);

    int insert(UiTable record);

    int insertSelective(UiTable record);

    UiTable selectByPrimaryKey(Integer uitid);

    int updateByPrimaryKeySelective(UiTable record);

    int updateByPrimaryKey(UiTable record);
    
    List<UiTable> selectByUserId(Integer userId);
}