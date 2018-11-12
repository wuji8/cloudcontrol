package com.cloud.cc.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.cloud.cc.jdbc.JDBC;
import com.cloud.cc.service.UserApiService;
import com.cloud.cc.service.UsersService;
import com.cloud.cc.tools.DateUtil;
import com.cloud.cc.tools.StringUnits;
import com.cloud.cc.vo.UserApi;
import com.cloud.cc.vo.Users;
import com.cloud.cc.vo.model.JsonModel;
import com.cloud.cc.vo.model.Querys;
import com.cloud.cc.vo.model.Update;

@Controller
public class UserApiController {

	@Autowired
	private UserApiService userApiService;

	@Autowired
	private UsersService userService;

	@RequestMapping("/userApi")
	@ResponseBody
	public Map<String, Object> userOperApi(HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		// 拿去guid参数获取该条api数据
		String guid = request.getParameter("guid"); // api的唯一标识
		String cuid = request.getParameter("cuid"); // 项目的唯一标识
		String ccid = request.getParameter("ccid"); // 用户的唯一标识
		if (StringUnits.isEmpty(guid) || StringUnits.isEmpty(cuid) || StringUnits.isEmpty(ccid)) {
			resultMap.put("code", 0); // 参数错误
			resultMap.put("msg", "参数错误，请检查是否为空");
			return resultMap;
		}
		UserApi userApi = userApiService.selectUserApiByGUID(guid, cuid);
		if (userApi == null) {
			resultMap.put("code", 2);
			resultMap.put("msg", "找不到该数据，请检查是否已删除");
			return resultMap;
		}
		Users user = userService.selectUserByCCID(ccid);
		if (user == null || !user.getUserid().equals(userApi.getUserid())) {
			resultMap.put("code", 3);
			resultMap.put("msg", "与该数据用户不匹配，请检查");
			return resultMap;
		}
		// 判断参数是否都有传
		JsonModel jsonModel = JSON.parseObject(userApi.getApijson(), new TypeReference<JsonModel>() {
		}); // 把json字符串转为对象
		if (jsonModel == null) {
			resultMap.put("code", 4);
			resultMap.put("msg", "请求错误，请重试");
			return resultMap;
		}

		// 获得此请求的所有参数Map
		Map<String, Object> requestParam = StringUnits.getParamValue(request);
		// 获取该api本要请求的参数数组，循环遍历，判断参数Map是否有包含，如果没有则提示用户缺少参数
		for (Querys query : jsonModel.getQuerys()) {
			if (requestParam.containsKey(query.getField())) {
				if (requestParam.get(query.getField()) == null) {
					resultMap.put("code", 0); // 参数错误
					resultMap.put("msg", "参数错误，请检查是否为空");
					return resultMap;
				}
			} else {
				resultMap.put("code", 0); // 参数错误
				resultMap.put("msg", "参数错误，请检查是否为空");
				return resultMap;
			}
		}
		// 判断api类型，操作什么类型就执行什么操作
		String sql = getSql(userApi.getType(), jsonModel, requestParam, userApi.getUserTable().getTablename(),
				userApi.getLimitTop());
		JDBC jdbc = new JDBC(sql);
		if (userApi.getType() == 1) { // 查询，调用查询方法
			resultMap.put("code", 1);
			List<Map<String, Object>> resultList = jdbc.getListData(sql);
			resultMap.put("data", resultList);
			String str = "";
			for (Querys query : jsonModel.getQuerys()) {
				str += "`" + query.getField() + "` " + query.getSymbol() + " '" + requestParam.get(query.getField())
						+ "' and";
			}
			str = str.substring(0, str.length() - 3);
			// 进行修改该数据的锁定时长
			String sqlStr = "update " + userApi.getUserTable().getTablename() + " set blockTime="
					+ DateUtil.getNewSecond(new Date(), userApi.getBlocktime()) + " where " + str;
			jdbc.upDate(sqlStr);
			resultMap.put("msg", "操作成功");
		} else if (userApi.getType() == 4) { // 判断是否修改，修改则给该数据为行级锁
			jdbc.getListData("select * from " + userApi.getUserTable().getTablename() + " where id="
					+ requestParam.get("ID") + " for update");
			jdbc.upDate(sql);
			resultMap.put("code", 1);
			resultMap.put("msg", "操作成功");
		} else {
			jdbc.upDate(sql);
			resultMap.put("code", 1);
			resultMap.put("msg", "操作成功");
		}
		return resultMap;
	}

	/**
	 * 生成sql语句
	 * 
	 * @param operType  操作类型
	 * @param field     字段数据
	 * @param valueMap  参数值Map
	 * @param tableName 操作的表名称
	 * @return
	 */
	public static String getSql(Integer operType, JsonModel jsonModel, Map<String, Object> valueMap, String tableName,
			Integer limit) {
		String sql = "";
		switch (operType) {
		case 1:
			// 查询
			sql += "select ";
			for (int i = 0; i < jsonModel.getFields().length; i++) {
				sql += jsonModel.getFields()[i] + ","; // 填充要查询的字段
			}
			sql = sql.substring(0, sql.length() - 1); // 截取掉最后的,
			sql += " from `" + tableName + "` where ";
			for (Querys query : jsonModel.getQuerys()) {
				sql += "`" + query.getField() + "` " + query.getSymbol() + " '" + valueMap.get(query.getField())
						+ "' and";
			}
			sql += " lockingTime<=" + new Date();
			sql += " limit " + limit;
			break;
		case 2:
			// 删除
			sql += "delete from `" + tableName + "' where";
			for (Querys query : jsonModel.getQuerys()) {
				sql += " `" + query.getField() + "' " + query.getSymbol() + " " + valueMap.get(query.getField())
						+ "' and";
			}
			sql = sql.substring(0, sql.length() - 3);
			break;
		case 3:
			// 增加
			sql += "insert into " + tableName + " (";
			for (Querys query : jsonModel.getQuerys()) {
				sql += query.getField() + ",";
			}
			sql = sql.substring(0, sql.length() - 1); // 删除最后的,
			sql += ") values (";
			for (Querys query : jsonModel.getQuerys()) {
				sql += "'" + valueMap.get(query.getField()) + "',";
			}
			sql = sql.substring(0, sql.length() - 1); // 删除最后的,
			sql += ");";
			break;
		case 4:
			// 修改
			sql += "update '" + tableName + "' set ";
			// 填充字段
			for (Update update : jsonModel.getUpdates()) {
				sql += "`" + update.getField() + "`= '" + valueMap.get(update.getField()) + "',";
			}
			sql = sql.substring(0, sql.length() - 1); // 删除最后的,
			sql += " where ";
			for (Querys query : jsonModel.getQuerys()) {
				sql += "`" + query.getField() + "` " + query.getSymbol() + " '" + valueMap.get(query.getField())
						+ "' and ";
			}
			sql = sql.substring(0, sql.length() - 3); // 删除最后的and
			break;
		}
		return sql;
	}

	@RequestMapping("/addApi")
	@ResponseBody
	public Map<String, Object> addApiInterface(HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Users users = (Users) request.getSession().getAttribute("user");
		if (users == null) {
			resultMap.put("code", 4); // 未登录
			return resultMap;
		}
		String apiName = request.getParameter("apiname");
		String tableId = request.getParameter("tableid");
		String apiType = request.getParameter("apiType");
		String json = request.getParameter("json");
		String limit = request.getParameter("limit");
		String blockTime = request.getParameter("blockTime");
		if (StringUnits.isEmpty(apiName) || StringUnits.isEmpty(tableId) || StringUnits.isEmpty(apiType)
				|| StringUnits.isEmpty(json) || StringUnits.isEmpty(blockTime) || StringUnits.isEmpty(limit)) {
			resultMap.put("code", 2); // 缺少参数
			return resultMap;
		}
		if (StringUnits.isInteger(blockTime) || StringUnits.isInteger(limit) || StringUnits.isInteger(tableId)
				|| StringUnits.isInteger(apiType)) {
			resultMap.put("code", 3); // 参数类型错误
			return resultMap;
		}
		UserApi userApi = new UserApi();
		userApi.setApijson(json);
		userApi.setApiname(apiName);
		userApi.setBlocktime(Integer.parseInt(blockTime));
		userApi.setLimitTop(Integer.parseInt(limit));
		userApi.setTableid(Integer.parseInt(tableId));
		userApi.setType(Integer.parseInt(apiType));
		userApi.setCreatetime(new Date());
		userApi.setUserid(users.getUserid());
		JsonModel jsonModel=JSON.parseObject(json, new TypeReference<JsonModel>() {});
		// 生成访问链接
		StringBuffer url = request.getRequestURL();
		String tempContextUrl = url.delete(url.length() - request.getRequestURI().length(), url.length()).append("/")
				.toString();
		String urlStr = "";
		if (jsonModel.getQuerys() != null && jsonModel.getQuerys().size() > 0) {
			for (Querys query : jsonModel.getQuerys()) {
				urlStr += query.getField() + "=@" + query.getField() + "&";
			}
		}
		if (jsonModel.getUpdates() != null && jsonModel.getUpdates().size() > 0) {
			for (Update update : jsonModel.getUpdates()) {
				urlStr += update.getField() + "=@" + update.getField() + "&";
			}
		}
		if(urlStr.length()>0) {
			tempContextUrl+="?"+urlStr;
		}
		userApi.setSqlquery(tempContextUrl);
		userApi.setGuid(StringUnits.getUUID());
		int result = userApiService.addApiInterface(userApi);
		resultMap.put("code", result);
		return resultMap;
	}
}