package com.cloud.cc.mapper;

import com.cloud.cc.vo.UserAddits;

public interface UserAdditsMapper {
    int deleteByPrimaryKey(Integer uaid);

    int insert(UserAddits record);

    int insertSelective(UserAddits record);

    UserAddits selectByPrimaryKey(Integer uaid);

    int updateByPrimaryKeySelective(UserAddits record);

    int updateByPrimaryKey(UserAddits record);
}