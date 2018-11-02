package com.cloud.cc.tools;


import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

public class SeachPhoneDetailUtil {
	
	private static String uri="https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php";
	
	/**
	 * 查询号码的归属地（省份）
	 */
	public static String seachProvy(String phone){
		HttpClient client = new HttpClient();//构�?�浏览器对象
		PostMethod method = new PostMethod(uri);
		client.getParams().setContentCharset("GBK");
		method.setRequestHeader("ContentType","application/x-www-form-urlencoded;charset=GBK");
		NameValuePair[] data = {
				 new NameValuePair("query", phone),
				 new NameValuePair("resource_id", "6004"),
				 new NameValuePair("format", "json"),
		};
		method.setRequestBody(data);
		try {
			client.executeMethod(method);//发�?�参�?
			String SubmitResult =method.getResponseBodyAsString();//拿到响应的参�?
			JSONObject jsonObject = JSON.parseObject(SubmitResult);//转换成json
			String a = jsonObject.getString("data");//获取到data的�??
			String b= a.substring(0,a.length()-1);  
		    String c=b.substring(1, b.length());
		    JSONObject reagobj = JSON.parseObject(c);
		    String result = reagobj.getString("prov");//获取省份的参�?
			return result;
		} catch (HttpException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "error";
	}
	
	
}
