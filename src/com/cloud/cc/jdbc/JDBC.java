package com.cloud.cc.jdbc;

import java.sql.DriverManager;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
import com.mysql.jdbc.ResultSet;

/**
 * jbdc
 * 
 * @author javaywx
 */
public class JDBC {

	public static final String url = "jdbc:mysql://192.168.10.251:3306/journal"; // 鏁版嵁搴撳湴鍧�
//	public static final String url = "jdbc:mysql://45.126.123.63:3306/journal";  //鏁版嵁搴撳湴鍧�
	public static final String name = "com.mysql.jdbc.Driver"; // 杩炴帴绫诲瀷mysql oracle sqlservice......
	public static final String user = "root"; // 鏁版嵁搴撶敤鎴峰悕
	public static final String password = "lijinran"; // 鏁版嵁搴撶敤鎴峰瘑鐮�

	public Connection conn = null;
	public PreparedStatement pst = null;

	// 鍒涘缓鎵цsql鐨凞BHelper
	public JDBC(String sql) {
		try {
			Class.forName(name);// 鎸囧畾杩炴帴绫诲瀷
			conn = (Connection) DriverManager.getConnection(url, user, password);// 鑾峰彇杩炴帴
			pst = (PreparedStatement) conn.prepareStatement(sql);// 鍑嗗鎵ц璇彞
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 鍏抽棴杩炴帴
	public void close() {
		try {
			this.conn.close();
			this.pst.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 鏌ヨ
	 * 
	 * @param sql 鏌ヨ鍒扮殑鏁版嵁
	 */
//  	public static List<LogRecord> Select(String sql){
//  		JDBC db = new JDBC(sql);
//  		List<LogRecord> logR = new ArrayList<LogRecord>();
//  		try {
//  			ResultSet ret = (ResultSet) db.pst.executeQuery();
//  			while(ret.next()){
//  				logR.add(new LogRecord(ret.getInt(1),ret.getString(2),ret.getString(3),ret.getString(4),ret.getDate(5),ret.getString(6),ret.getString(7),ret.getDouble(8),ret.getInt(9),ret.getInt(10),ret.getInt(11),ret.getInt(12)));
//  			}
//  		} catch (Exception e) {
//  		    e.printStackTrace();
//  		}finally{
//  			db.close();
//  		}
//  		return logR;
//  	}

	/**
	 * 获取多条记录数据
	 * @param sql
	 * @return	返回值为List
	 */
	 public static List<Map<String,Object>> getListData(String sql){
		 List<Map<String,Object>> resultList=new ArrayList<Map<String,Object>>();
		 JDBC db=new JDBC(sql);
		 try {
			ResultSet ret=(ResultSet) db.pst.executeQuery();
			resultList=convertList(ret);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 return resultList;
	 }
	
	/**
	 * 鎻掑叆淇敼鍒犻櫎鏁版嵁
	 * 
	 * @param sql 鎻掑叆sql
	 */
	public static boolean upDate(String sql) {
		JDBC db = new JDBC(sql);
		try {
			db.pst.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			db.close();
		}
	}

	
	/**
	 * 把ResultSet转换为List
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	private static List<Map<String,Object>> convertList(ResultSet rs) throws SQLException {
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		ResultSetMetaData md = rs.getMetaData();// 获取键名
		int columnCount = md.getColumnCount();// 获取行的数量
		while (rs.next()) {
			Map<String,Object> rowData = new HashMap<String,Object>();// 声明Map
			for (int i = 1; i <= columnCount; i++) {
				rowData.put(md.getColumnName(i), rs.getObject(i));// 获取键名及值
			}
			list.add(rowData);
		}
		return list;
	}

}
