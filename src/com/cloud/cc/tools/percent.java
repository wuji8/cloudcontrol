package com.cloud.cc.tools;

import java.text.NumberFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.time.DateFormatUtils;

/**
 * å¸¸ç”¨å·¥å…·
 * @author 
 */
public class percent{
	
	/**
	 * è®¡ç®—ç™¾åˆ†æ¯?
	 * @param p1
	 * @param p2
	 */
	public static String percents( double  p1,  double  p2){
	   if(p1==0||p2==0){
		   return "0.00%";
	   }
	   String str;
	   double  p3  =  p1  /  p2;
	   NumberFormat nf  =  NumberFormat.getPercentInstance();
	   nf.setMinimumFractionDigits( 2 );
	   str  =  nf.format(p3);
	   return str;
	} 
	
	/**
	 * ä»Šå¤©å¼?å§‹æ—¶é—?
	 * @return ä»Šå¤©çš?0ç‚?0åˆ?
	 */
	public static String date1(){
		return DateFormatUtils.format(new Date(),"yyyy-MM-dd 00:00:00");
	}
	
	/**
	 * ä»Šå¤©ç»“æŸæ—¶é—´
	 * @return ä»Šå¤©çš?23:59:5
	 */
	public static String date2(){
		return DateFormatUtils.format(new Date(),"yyyy-MM-dd 23:59:59");
	}
	
	/**
	 * æ˜¨å¤©å¼?å§‹æ—¶é—?
	 * @return  æ˜¨å¤©çš?0ç‚?0åˆ?
	 */
	public static String date3(){
		Date date = new Date();
		Calendar ca = Calendar.getInstance();
		ca.setTime(date);
		ca.add(Calendar.DAY_OF_MONTH,-1);
		return  DateFormatUtils.format(ca.getTime(),"yyyy-MM-dd 00:00:00");
	}
	
	/**
	 * æ˜¨å¤©ç»“æŸæ—¶é—´
	 * @return  æ˜¨å¤©çš?23ç‚?59åˆ?
	 */
	public static String date4(){
		Date date = new Date();
		Calendar ca = Calendar.getInstance();
		ca.setTime(date);
		ca.add(Calendar.DAY_OF_MONTH,-1);
		return  DateFormatUtils.format(ca.getTime(),"yyyy-MM-dd 23:59:59");
	}
	
	/**
	 * ä¸?å‘¨å¼€å§‹æ—¶é—?
	 * @return  ä¸?å‘¨çš„0ç‚?0åˆ?
	 */
	public static String date5(){
		Calendar caa = Calendar.getInstance();
		caa.setTime(new Date());
		caa.add(Calendar.DAY_OF_MONTH,-6);
		return DateFormatUtils.format(caa.getTime(),"yyyy-MM-dd 00:00:00");
	}
	
	/**
	 * ä¸?å‘¨ç»“æŸæ—¶é—?
	 * @return  ä¸?å‘¨çš„23ç‚?59åˆ?
	 */
	public static String date6(){
		Calendar ca1 = Calendar.getInstance();
		ca1.setTime(new Date());
		ca1.add(Calendar.DAY_OF_MONTH,-1);
		return  DateFormatUtils.format(ca1.getTime(),"yyyy-MM-dd 23:59:59");
	}
	
	
}
