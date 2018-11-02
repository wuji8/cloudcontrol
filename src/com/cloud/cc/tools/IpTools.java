package com.cloud.cc.tools;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

public class IpTools {

	/**
	 * 根据id获取城市、省份�?�国�?
	 * @param ip ip地址
	 * @return str0:国家,str1:省份,str2:城市
	 * @throws IPv4FormatException 
	 * @throws IOException 
	 */
	public static String[] findCity(String ip) throws IPv4FormatException, IOException{
		String path=IpTools.class.getClassLoader().getResource("../../IP4datx.datx").getPath();
		File file=new File(path);
		City city = new City(file.getAbsolutePath());
		String [] array = city.find(ip);
		System.out.println("ip�?" + ip + ";省份�?" + array[1] + ";城市�?" + array[2]);
	    return array;
	}
	
	
	public static void main(String[] args) {
		String [] s = null;
		try {
			s = findCity("101.16.53.13");
		} catch (IPv4FormatException | IOException e) {
			e.printStackTrace();
		}
		System.out.println(s[1]);
		
	}
	
	/**
	 * 获取IP地址
	 * @param request
	 * @return
	 */
	public static  String getIpAddr(HttpServletRequest request) { 
        String ip  =  request.getHeader( " x-forwarded-for " ); 
         if  (ip  ==   null   ||  ip.length()  ==   0   ||   " unknown " .equalsIgnoreCase(ip)) { 
            ip  =  request.getHeader( " Proxy-Client-IP " ); 
        } 
         if  (ip  ==   null   ||  ip.length()  ==   0   ||   " unknown " .equalsIgnoreCase(ip)) { 
            ip  =  request.getHeader( " WL-Proxy-Client-IP " ); 
        } 
         if  (ip  ==   null   ||  ip.length()  ==   0   ||   " unknown " .equalsIgnoreCase(ip)) { 
            ip  =  request.getRemoteAddr(); 
        } 
         return  ip; 
    }
}
