package com.cloud.cc.service;

import com.cloud.cc.vo.Users;

public interface UsersService {

	Users selectUserByCCID(String ccId);
}
