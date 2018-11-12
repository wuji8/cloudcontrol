package com.cloud.cc.tools;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * 取salt
 * @author 白眉鹰王
 *
 */
public class Salt {

	/**
	 * 获取盐�??
	 * @return
	 */
	public static String getSalt(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	/**
	 * 获取订单�?
	 * @return
	 */
	public static String getOrderNum(){
		DateFormat dateFormat=new SimpleDateFormat("yyyyMMddHHmmssSSS");
		int a = (int)(Math.random()*(9999-1000+1))+1000;
		String format = dateFormat.format(new Date());
		return format+a;
	}
	
	public static void main(String[] args) {
		System.out.println(getOrderNum().length());
	}
}
