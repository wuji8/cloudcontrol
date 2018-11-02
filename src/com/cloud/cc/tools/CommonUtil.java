package com.cloud.cc.tools;

import java.math.BigDecimal;
import java.text.DecimalFormat;

public class CommonUtil {
	/**
	 * 模拟除法运算，scale:保留几位小数�?
	 */
	public static double div(double v1,double v2,int scale){   
		if(scale<0){   
			throw new IllegalArgumentException(   
					"The scale must be a positive integer or zero");   
		}   
		BigDecimal b1 = new BigDecimal(Double.toString(v1));   
		BigDecimal b2 = new BigDecimal(Double.toString(v2));   
		return b1.divide(b2,scale,BigDecimal.ROUND_HALF_UP).doubleValue();   
	}
	
		/**]
		 * double类型保存两位小数
		 * @param num
		 * @return
		 */
	 public static double getTwoDecimal(double num) {
	          DecimalFormat dFormat=new DecimalFormat("#.00");
	          String yearString=dFormat.format(num);
	          Double temp= Double.valueOf(yearString);
	          return temp;
	 }
	
	
	/**
	 * 返回的是�?个数�? 下标0返回的是得出平台抽取的费�? 下标1位最终显示给用户的价�?
	 * @param maxPrice	�?高价�?
	 * @param taskPrice	任务价格
	 * @param ratio	用户比例
	 * @return
	 */
	public static double[] getTaskPrice(double maxPrice,double taskPrice,double ratio){
		double[] result=new double[2];
		if(taskPrice>maxPrice){
			double price=taskPrice;
			taskPrice=taskPrice-taskPrice*ratio;
			if(taskPrice>maxPrice){
				result[1]=maxPrice;
			}else if(taskPrice<maxPrice){
				result[1]=taskPrice;
			}else{
				result[1]=maxPrice;
			}
			result[0]=CommonUtil.getTwoDecimal(price-result[1]); //得出平台抽取的费�?
		}else{
			result[0]=CommonUtil.getTwoDecimal(taskPrice*ratio);
			result[1]=CommonUtil.getTwoDecimal(taskPrice-result[0]);
		}
		return result;
	}
	
	public static void main(String[] args) {
		double[] result=getTaskPrice(80,88, 0.1);
		System.out.println("平台抽取的费用："+result[0]);
		System.out.println("�?终给用户的价格："+result[1]);
	}
}
