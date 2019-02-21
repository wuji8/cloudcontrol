package com.cloud.cc.tools;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;


public class ResPrint {

	/**
	 * 书写json格式内容到页面
	 * @param msg
	 * @param code
	 * @param response
	 */
	public static void print(String msg,Integer code,HttpServletResponse response){
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter pw=null;
		try {
			pw = response.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Map<String,Object> resultMap=new HashMap<String,Object>();
		resultMap.put("code", code);
		resultMap.put("msg", msg);
		pw.print(JsonUtil.mapToJson(resultMap));
		pw.flush();
		pw.close();
	}
	
	public static void print(Map<String,Object> resultMap,ServletResponse response){
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter pw=null;
		try {
			pw=response.getWriter();
			pw.print(JsonUtil.mapToJson(resultMap));
			pw.flush();
			pw.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
