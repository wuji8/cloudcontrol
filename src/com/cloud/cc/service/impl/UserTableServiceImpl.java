package com.cloud.cc.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloud.cc.mapper.UserTableDeleteMapper;
import com.cloud.cc.mapper.UserTableMapper;
import com.cloud.cc.service.UserTableService;
import com.cloud.cc.tools.StringUnits;
import com.cloud.cc.vo.UserTable;
import com.cloud.cc.vo.UserTableDelete;
import com.cloud.cc.vo.model.TableJsonModel;
import com.cloud.cc.vo.model.TableModel;
import com.cloud.cc.vo.model.TableProp;
@Service
public class UserTableServiceImpl implements UserTableService {

	@Autowired
	private UserTableMapper userTableMapper;
	
	@Autowired
	private UserTableDeleteMapper userTableDeleteMapper;
	
	@Override
	public int createTable(TableModel tableModel, UserTable userTable) {
		// TODO Auto-generated method stub
		try {
			String content="";
			Map<String,Object> param=new HashMap<String,Object>();
			for(TableJsonModel list:tableModel.getUi()) {
				content+="`"+list.getField()+"` "+list.getType()+" default null,";
			}
			if(!StringUnits.isEmpty(content)) {
				content=content.substring(0, content.length()-1);
			}
			param.put("content", content);
			param.put("tableName",userTable.getDbtable());
			userTableMapper.createTable(param);
			userTableMapper.insertSelective(userTable);
		}catch(RuntimeException ex) {
			ex.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public int delTable(Integer tableId) {
		// TODO Auto-generated method stub
		UserTable userTable=userTableMapper.selectByPrimaryKey(tableId);
		UserTableDelete userTableDelete=new UserTableDelete();
		userTableDelete.setDeletetime(new Date());
		userTableDelete.setTableid(userTable.getTableid());
		userTableDelete.setUserid(userTable.getUserid());
		userTableDeleteMapper.insertSelective(userTableDelete);
		userTable.setDeleted(1);
		userTableMapper.updateByPrimaryKeySelective(userTable);
		return 1;
	}

	@Override
	public List<TableProp> selectTableFieldList(String tableName) {
		// TODO Auto-generated method stub
		return userTableMapper.selectTablePropByTableName(tableName);
	}

	@Override
	public List<UserTable> selectUserTable(Integer userId, Integer cloudId) {
		// TODO Auto-generated method stub
		return userTableMapper.selectUserTable(cloudId, userId);
	}

	@Override
	public UserTable selectUserTableByTableId(Integer tableId) {
		// TODO Auto-generated method stub
		return userTableMapper.selectByPrimaryKey(tableId);
	}

}
