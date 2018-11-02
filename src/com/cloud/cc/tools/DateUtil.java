package com.cloud.cc.tools;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * 时间操作�?
 * @author javasan
 */
public class DateUtil {
	
	/**
	 * 时间差�??
	 */
	public static Integer timed=100;
	
	/**
	 * 计算两个时间段的秒数
	 */
	public static Long getSecond(Date nowTime ,Date futureTime){
		return (futureTime.getTime()-nowTime.getTime())/1000;
	}
	
	/**
	 * 秒数为条件，获取当前的时间加上秒�?
	 */
	public static Date getSecondDate(Integer second){
		return new Date(System.currentTimeMillis()+(second*1000));
	}
	
	/**
	   * 把日期转换成String
	   * @return返回字符串格�? yyyy-MM-dd HH:mm:ss
	   */
	public static String getStringDate(Date date) {
	   SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	   String dateString = formatter.format(date);
	   return dateString;
	}
	
	/**
	 * 获取指定时间的指定多少秒前或者后的时�?
	 * 把日期往后增加SECOND �?.整数�?后推,负数�?前移�?
	 */
	public static Date getNewSecond(Date date ,Integer second) {
		Calendar c = new GregorianCalendar();
		c.setTime(date);//设置参数时间
		c.add(Calendar.SECOND,second);//把日期往后增加SECOND �?.整数�?后推,负数�?前移�?
		return c.getTime();
	}
	
	
	/**
	 * 取得今天的开始时�?
	 * @return
	 */
	public static Date getStartTime() {  
        Calendar todayStart = Calendar.getInstance();
        todayStart.set(Calendar.HOUR_OF_DAY, 0);
        todayStart.set(Calendar.MINUTE, 0);  
        todayStart.set(Calendar.SECOND, 0);  
        todayStart.set(Calendar.MILLISECOND, 0);  
        return todayStart.getTime();  
    }
	
	
	public static void main(String[] args) {
		System.out.println(getNewSecond(new Date(),900));
	}
	
	/**
	 * 获取当前小时
	 * @return
	 */
	public static Date getCurrentHours(){
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:00:00");
		Date date=null;
		try {
			date = sdf.parse(sdf.format(System.currentTimeMillis()));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return date;
	}
	
  
	/**
	 * 取得今天的结束时�?
	 * @return
	 */
	public static Date getEndTime() {  
        Calendar todayEnd = Calendar.getInstance();
        todayEnd.set(Calendar.HOUR_OF_DAY, 23);
        todayEnd.set(Calendar.MINUTE, 59);  
        todayEnd.set(Calendar.SECOND, 59);  
        todayEnd.set(Calendar.MILLISECOND, 999);
        return todayEnd.getTime();  
    }
	
	/**
	 * 获取指定时间的开始时�?
	 */
	public static Date getStartTime(Date time) {  
        Calendar todayStart = Calendar.getInstance();
        todayStart.setTime(time);//把时间赋�?
        todayStart.set(Calendar.HOUR_OF_DAY, 0);
        todayStart.set(Calendar.MINUTE, 0);  
        todayStart.set(Calendar.SECOND, 0);  
        todayStart.set(Calendar.MILLISECOND, 0);  
        return todayStart.getTime();  
    }
	
	/**
	 * 获取指定时间的结束时�?
	 */
	public static Date getEndTime(Date time) {  
        Calendar todayEnd = Calendar.getInstance();
        todayEnd.setTime(time);//把时间赋�?
        todayEnd.set(Calendar.HOUR_OF_DAY, 23);
        todayEnd.set(Calendar.MINUTE, 59);  
        todayEnd.set(Calendar.SECOND, 59);  
        todayEnd.set(Calendar.MILLISECOND, 999);
        return todayEnd.getTime();  
    }
	
}
