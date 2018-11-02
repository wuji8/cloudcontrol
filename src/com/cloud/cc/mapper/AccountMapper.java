package com.cloud.cc.mapper;

import com.cloud.cc.vo.Account;

public interface AccountMapper {
    int deleteByPrimaryKey(Integer accid);

    int insert(Account record);

    int insertSelective(Account record);

    Account selectByPrimaryKey(Integer accid);

    int updateByPrimaryKeySelective(Account record);

    int updateByPrimaryKey(Account record);
}