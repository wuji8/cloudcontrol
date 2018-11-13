package com.cloud.cc.tools;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

/**
 * 对字符串操作的类
 * @author 欧阳彦祖
 *
 */
public class StringUnits {
	
	/**
	 * 判断该字符串是否存在
	 * 存在为false
	 * 不存在为true
	 * @param str
	 * @return
	 */
	public static boolean isEmpty(String str){
		if(str==null || str.trim().equals("")){
			return true;
		}
		return false;
	}
	
	/**
	 * 判断是否为数�?
	 * @param str
	 * @return
	 */
	public static boolean isInteger(String str){
		Pattern pattern=Pattern.compile("[0-9]*");
		Matcher isNum=pattern.matcher(str);
		if(!isNum.matches()){
			return false;
		}
		return true;
	}
	
	/**
	 * 随机生成数字 长度自己指定
	 * @param length 长度
	 * @return
	 */
	public static String randomCode(int length){
		String str="0123456789";
		StringBuilder sb=new StringBuilder(4);
		for(int i=0;i<length;i++)
		{
		char ch=str.charAt(new Random().nextInt(str.length()));
		sb.append(ch);
		}
		return sb.toString();
	}
	
	/**
	 * 拿到商家的Code�?
	 * @param bauName
	 * @param salt
	 * @return
	 */
	public static String getRandomString(String bauName,String salt) {
		Long currentTime=System.currentTimeMillis();
		String str=MD5Utils.getMD5String(bauName+currentTime, salt);
		return str.substring(str.length()-6);
	}
	
	
	/**
     * 判断是否含有特殊字符
     *
     * @param str
     * @return true为包含，false为不包含
     */
    public static boolean isSpecialChar(String str) {
        String regEx = "[^a-zA-Z0-9]";
        Pattern p = Pattern.compile(regEx);
        Matcher m = p.matcher(str);
        return m.find();
    }
    
    
	/**
	 * 获取传进来的参数
	 * @param request
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String getParam(HttpServletRequest request){
		Map params=request.getParameterMap();
		Iterator it = params.keySet().iterator();
		StringBuffer sb=new StringBuffer("请求方式�?"+request.getMethod()+";");
		while(it.hasNext()){
		    String paramName = (String) it.next();
		    String paramValue = request.getParameter(paramName);
		    sb.append("参数�?"+paramName);
		    sb.append(",值："+paramValue+";");
		}
		return sb.toString();
	}
	
	/**
	 * 替换字符�?
	 * @param str 原字符串
	 * @param startIndex �?始小�?
	 * @param endIndex 结束下标
	 * @param replaceWord �?要替换的字符�?
	 * @param wordQuantity �?要替换的字符串数�?
	 * @return
	 */
	public static String getReplaceWord(String str,int startIndex,int endIndex,String replaceWord,int wordQuantity){
		String result="";
		for(int i=startIndex;i<wordQuantity;i++){
			result+=replaceWord;
		}
		result+=str.substring(endIndex+1, str.length());
		return result;
	}
	
	/**
	 * 生成UUID
	 * @return
	 */
	public static String getUUID(){
		return UUID.randomUUID().toString().replace("-","").toLowerCase();
	}
	
	
	/**
	 * �?验地区是否正�?
	 * @param region
	 * @return
	 */
	public static String returnRegion(String region){
		for(String re:RegionDemo.region){
			if(region.startsWith(re)){
				return re;
			}
		}
		return "国外";
	}
	
	public static void main(String[] args) {
		String str="c84f1ecc66718e19,";
		System.out.println(str.length());
	}
	
	/**
	 * 获取request中的名称和值
	 * @param request
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Map<String,Object> getParamValue(HttpServletRequest request) {
		Map<String,Object> resultMap=new HashMap<String, Object>();
		Map params=request.getParameterMap();
		Iterator it = params.keySet().iterator();
		while(it.hasNext()){
		    String paramName = (String) it.next();
		    String paramValue = request.getParameter(paramName);
		    resultMap.put(paramName, paramValue);
		}
		return resultMap;
	}
	
	
	public static String genRandomNum(){  
	      int  maxNum = 36;  
	      int i;  
	      int count = 0;  
	      char[] str = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',  
	        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',  
	        'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };      
	      StringBuffer pwd = new StringBuffer("");  
	      Random r = new Random();  
	      while(count < 8){  
	       i = Math.abs(r.nextInt(maxNum));     
	       if (i >= 0 && i < str.length) {  
	        pwd.append(str[i]);  
	        count ++;  
	       }  
	      }  
	      return pwd.toString();  
	    } 
	
	
}
