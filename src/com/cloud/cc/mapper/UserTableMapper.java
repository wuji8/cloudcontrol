package com.cloud.cc.mapper;

import java.util.List;
import java.util.Map;

import com.cloud.cc.vo.UserTable;
import com.cloud.cc.vo.model.TableProp;

public interface UserTableMapper {
    int deleteByPrimaryKey(Integer tableid);

    int insert(UserTable record);

    int insertSelective(UserTable record);

    UserTable selectByPrimaryKey(Integer tableid);

    int updateByPrimaryKeySelective(UserTable record);

    int updateByPrimaryKey(UserTable record);
    
    int createTable(Map<String,Object> param);
    
    List<TableProp> selectTablePropByTableName(String tableName);
}