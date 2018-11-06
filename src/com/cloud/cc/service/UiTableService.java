package com.cloud.cc.service;

import java.util.List;

import com.cloud.cc.vo.UiTable;

public interface UiTableService {

	int addUiData(UiTable uiTable);
	
	int delUiData(Integer uiId);
	
	List<UiTable> selectByUserId(Integer userId);
	
	int updateUiData(UiTable uiTable);
}
