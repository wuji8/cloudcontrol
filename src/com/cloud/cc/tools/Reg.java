package com.cloud.cc.tools;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 正则工具�?
 * @author javasan
 */
public class Reg {
	
	/**
	 * 判断是否是数�?0-6
	 */
	public static boolean regNum0And6(String str){
		if(str==null){
			return false;
		}
		String regEx = "^[0-6]$";
		Pattern pattern = Pattern.compile(regEx);
		Matcher matcher = pattern.matcher(str);
		return matcher.find();
	}
	
	/**
	 * 验证是否是正整数，小数点后面是否只有两位�?
	 */
	public static boolean regDouble(String str){
		if(str==null){
			return false;
		}
		//String regEx = "^(([1-9]+)|([0-9]+\\.[0-9]{1,2}))$";
		String regEx = "^[+]?([0-9]+(.[0-9]{1,2})?)$";
		Pattern pattern = Pattern.compile(regEx);
		Matcher matcher = pattern.matcher(str);
		return matcher.find();
	}

	/**
	 * 验证发布任务的标题正�?
	 */
	public static boolean regPnTitle(String str){
		String regEx = ".*(微信|辅助|封号).*";
		Pattern pattern = Pattern.compile(regEx);
		Matcher matcher = pattern.matcher(str);
		return matcher.find();
	}
	
}
