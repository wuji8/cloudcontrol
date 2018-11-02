package com.cloud.cc.tools;

import java.security.MessageDigest;

/**
 * 对字符串使用 MD5 盐�?�加�?
 * @Description 
 * @author 小三
 * @version 1.0.0  2017�?3�?15�? 下午4:07:15
 */
public class MD5Utils {
	/**
	 * 把字符串用MD5 salt
	 * @Description 
	 * @param str
	 * @param salt 兩位16进制数，
	 * @return
	 */
	public static String getMD5String(String str,String salt){
		StringBuilder result=new StringBuilder();
		try {
			MessageDigest digest= MessageDigest.getInstance("MD5");
			StringBuffer code=new StringBuffer(str);
			
			if (salt!=null&&!"".equals(salt)){
				code.append(salt);
			}
			
			byte []  buff=digest.digest(code.toString().getBytes());
			for(int i=0;i<buff.length;i++){			   
			   int num=buff[i]& 0xff;			//位移运算0x** ,**�?2�?16进制代替
			   String hexString=Integer.toHexString(num);
			   
			   if (hexString.length()==1){
					result.append("0").append(hexString);
				}else{
					result.append(hexString);
				}			
			}
			return result.toString();
		}  catch (Exception e) {
			e.printStackTrace();
		}		
		return null;		
	}
	
	public static void main(String[] args) {
		String salt = Salt.getSalt();
		String pwd="123456";
		System.out.println("�?:"+salt);
		String md5String = MD5Utils.getMD5String(pwd, salt);
		System.out.println("md5:"+md5String);
	}
}
