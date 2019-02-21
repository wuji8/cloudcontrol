package com.cloud.cc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cloud.cc.vo.UserApi;

public interface UserApiMapper {
    int deleteByPrimaryKey(Integer apiid);

    int insert(UserApi record);

    int insertSelective(UserApi record);

    UserApi selectByPrimaryKey(Integer apiid);

    int updateByPrimaryKeySelective(UserApi record);

    int updateByPrimaryKey(UserApi record);
    
    List<UserApi> selectByTableId(Integer tableId);
    
    UserApi selectUserApiByGUID(@Param("guid")String guid,@Param("cuId")String cuId);
    
    List<UserApi> selectByUserId(Integer userId);
}