package com.cloud.cc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloud.cc.mapper.UiTableMapper;
import com.cloud.cc.service.UiTableService;
import com.cloud.cc.vo.UiTable;
@Service
public class UiTableServiceImpl implements UiTableService {

	@Autowired
	private UiTableMapper uiTableMapper;
	
	@Override
	public int addUiData(UiTable uiTable) {
		// TODO Auto-generated method stub
		return uiTableMapper.insertSelective(uiTable);
	}

	@Override
	public int delUiData(Integer uiId) {
		// TODO Auto-generated method stub
		return uiTableMapper.deleteByPrimaryKey(uiId);
	}

	@Override
	public List<UiTable> selectByUserId(Integer userId,Integer cloudId) {
		// TODO Auto-generated method stub
		return uiTableMapper.selectByUserId(userId,cloudId);
	}

	@Override
	public int updateUiData(UiTable uiTable) {
		// TODO Auto-generated method stub
		return uiTableMapper.updateByPrimaryKeySelective(uiTable);
	}

	@Override
	public UiTable selectById(Integer uitId) {
		// TODO Auto-generated method stub
		return uiTableMapper.selectByPrimaryKey(uitId);
	}

}
