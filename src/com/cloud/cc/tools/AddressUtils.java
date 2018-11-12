package com.cloud.cc.tools;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;

public class AddressUtils {

	
	
	/**
	 * 获取IP地址
	 * 
	 * @param request
	 * @return
	 */
	public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader(" x-forwarded-for ");
		if (ip == null || ip.length() == 0 || " unknown ".equalsIgnoreCase(ip)) {
			ip = request.getHeader(" Proxy-Client-IP ");
		}
		if (ip == null || ip.length() == 0 || " unknown ".equalsIgnoreCase(ip)) {
			ip = request.getHeader(" WL-Proxy-Client-IP ");
		}
		if (ip == null || ip.length() == 0 || " unknown ".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
	
	/**
     * 从Request对象中获得客户端IP，处理了HTTP代理服务器和Nginx的反向代理截取了ip
     * @param request
     * @return ip
     */
   public static String getLocalIp(HttpServletRequest request) {
       String remoteAddr = request.getRemoteAddr();
       String forwarded = request.getHeader("X-Forwarded-For");
       String realIp = request.getHeader("X-Real-IP");

       String ip = null;
       if (realIp == null) {
           if (forwarded == null) {
               ip = remoteAddr;
           } else {
               ip = remoteAddr + "/" + forwarded.split(",")[0];
           }
       } else {
           if (realIp.equals(forwarded)) {
               ip = realIp;
           } else {
               if(forwarded != null){
                   forwarded = forwarded.split(",")[0];
               }
               ip = realIp + "/" + forwarded;
           }
       }
       return ip;
   }

	/**
	 * * 百度接口 通过用户ip获取用户�?在地
	 *  返回是一个数�?
	 *  下标0为市�?
	 *  下标1为省�?
	 * @param userIp
	 * @return
	 */
	public static String[] getAddressByBD2(String strIP) {
		String[] str = new String[2];
		try {
			URL url = new URL("http://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974&ip=" + strIP);
			URLConnection conn = url.openConnection();
			BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
			String line = null;
			StringBuffer result = new StringBuffer();
			while ((line = reader.readLine()) != null) {
				result.append(line);
			}
			reader.close();
			JSONObject jsStr = new JSONObject(result.toString());
			JSONObject jsStr2 = ((JSONObject) jsStr.get("content"));
			System.out.println(jsStr);
			System.out.println(jsStr2);
			str[0] = ((JSONObject) jsStr2.get("address_detail")).get("city").toString();//�?
			System.out.println(str[0]);
			str[1] = ((JSONObject) jsStr2.get("address_detail")).get("province").toString(); // 省份	
			return str;
		} catch (Exception e) {
			str[0]="不限";
			str[1]="不限";
			return str;
		}
	}

	/**
	 * 获取操作系统,浏览器及浏览器版本信�?
	 * 
	 * @param request
	 * @return
	 */
	public static String getOsAndBrowserInfo(HttpServletRequest request) {
		String browserDetails = request.getHeader("User-Agent");
		String userAgent = browserDetails;
		String user = userAgent.toLowerCase();

		String os = "";
		String browser = "";

		// =================OS Info=======================
		if (userAgent.toLowerCase().indexOf("windows") >= 0) {
			os = "电脑端Windows" + System.getProperty("os.version");
		} else if (userAgent.toLowerCase().indexOf("mac") >= 0) {
			os = "电脑端Mac" + System.getProperty("os.version");
		} else if (userAgent.toLowerCase().indexOf("x11") >= 0) {
			os = "电脑端Unix" + System.getProperty("os.version");
		} else if (userAgent.toLowerCase().indexOf("android") >= 0) {
			os = "手机端Android" + System.getProperty("os.version");
		} else if (userAgent.toLowerCase().indexOf("iphone") >= 0) {
			os = "手机端IPhone" + System.getProperty("os.version");
		} else {
			os = "UnKnown, More-Info: " + userAgent;
		}
		// ===============Browser===========================
		if (user.contains("edge")) {
			browser = (userAgent.substring(userAgent.indexOf("Edge")).split(" ")[0]).replace("/", "-");
		} else if (user.contains("msie")) {
			String substring = userAgent.substring(userAgent.indexOf("MSIE")).split(";")[0];
			browser = substring.split(" ")[0].replace("MSIE", "IE") + "-" + substring.split(" ")[1];
		} else if (user.contains("safari") && user.contains("version")) {
			browser = (userAgent.substring(userAgent.indexOf("Safari")).split(" ")[0]).split("/")[0] + "-"
					+ (userAgent.substring(userAgent.indexOf("Version")).split(" ")[0]).split("/")[1];
		} else if (user.contains("opr") || user.contains("opera")) {
			if (user.contains("opera")) {
				browser = (userAgent.substring(userAgent.indexOf("Opera")).split(" ")[0]).split("/")[0] + "-"
						+ (userAgent.substring(userAgent.indexOf("Version")).split(" ")[0]).split("/")[1];
			} else if (user.contains("opr")) {
				browser = ((userAgent.substring(userAgent.indexOf("OPR")).split(" ")[0]).replace("/", "-"))
						.replace("OPR", "Opera");
			}

		} else if (user.contains("chrome")) {
			browser = (userAgent.substring(userAgent.indexOf("Chrome")).split(" ")[0]).replace("/", "-");
		} else if ((user.indexOf("mozilla/7.0") > -1) || (user.indexOf("netscape6") != -1)
				|| (user.indexOf("mozilla/4.7") != -1) || (user.indexOf("mozilla/4.78") != -1)
				|| (user.indexOf("mozilla/4.08") != -1) || (user.indexOf("mozilla/3") != -1)) {
			browser = "Netscape-?";

		} else if (user.contains("firefox")) {
			browser = (userAgent.substring(userAgent.indexOf("Firefox")).split(" ")[0]).replace("/", "-");
		} else if (user.contains("rv")) {
			String IEVersion = (userAgent.substring(userAgent.indexOf("rv")).split(" ")[0]).replace("rv:", "-");
			browser = "IE" + IEVersion.substring(0, IEVersion.length() - 1);
		} else {
			browser = "UnKnown, More-Info: " + userAgent;
		}

		return os + "," + browser + "登录";
	}

	/**
	 * 获取地址
	 * 
	 * @param params
	 * @param encoding
	 * @return
	 * @throws Exception
	 */
	public static String getAddress(HttpServletRequest request, String encoding) {
		try {
			String params = getIpAddr(request);
			String path = "http://ip.taobao.com/service/getIpInfo.php?ip=" + params;

			String returnStr = getRs(path, params, encoding);

			JSONObject json = null;

			if (returnStr != null) {

				json = new JSONObject(returnStr);

				if ("0".equals(json.get("code").toString())) {

					StringBuffer buffer = new StringBuffer();

					// buffer.append(decodeUnicode(json.optJSONObject("data").getString("country")));//国家

					// buffer.append(decodeUnicode(json.optJSONObject("data").getString("area")));//地区

					buffer.append(decodeUnicode(json.optJSONObject("data").getString("region")));// 省份

					buffer.append(decodeUnicode(json.optJSONObject("data").getString("city")));// 市区

					// buffer.append(decodeUnicode(json.optJSONObject("data").getString("county")));//
					// 地区

					buffer.append(decodeUnicode(json.optJSONObject("data").getString("isp")));// ISP公司

					System.out.println(buffer.toString());

					return buffer.toString() + "," + getOsAndBrowserInfo(request);

				} else {

					return "获取地址失败�??";

				}

			}
		} catch (Exception e) {
			System.out.println("读取城市超市");
		}

		return null;

	}

	/**
	 * 获取客户端在哪个省份
	 * 
	 * @param Ip
	 * @return
	 */
	public static String getAddress(String Ip) {
		try {
			String path = "http://ip.taobao.com/service/getIpInfo.php?ip=" + Ip;

			String returnStr = getRs(path, Ip, "utf-8");

			JSONObject json = null;

			if (returnStr != null) {

				json = new JSONObject(returnStr);

				if ("0".equals(json.get("code").toString())) {

					StringBuffer buffer = new StringBuffer();

					// buffer.append(decodeUnicode(json.optJSONObject("data").getString("country")));//国家

					// buffer.append(decodeUnicode(json.optJSONObject("data").getString("area")));//地区

					buffer.append(decodeUnicode(json.optJSONObject("data").getString("region")));// 省份

					// buffer.append(decodeUnicode(json.optJSONObject("data").getString("city")));//
					// 市区

					// buffer.append(decodeUnicode(json.optJSONObject("data").getString("county")));//
					// 地区

					// buffer.append(decodeUnicode(json.optJSONObject("data").getString("isp")));//
					// ISP公司

					System.out.println(buffer.toString());

					return buffer.toString();

				} else {

					return "广东";

				}

			}
		} catch (Exception e) {
			System.out.println("读取城市超时");
		}

		return null;
	}

	/**
	 * 从url获取结果
	 * 
	 * @param path
	 * @param params
	 * @param encoding
	 * @return
	 */
	public static String getRs(String path, String params, String encoding) {

		URL url = null;

		HttpURLConnection connection = null;

		try {

			url = new URL(path);

			connection = (HttpURLConnection) url.openConnection();// 新建连接实例

			connection.setConnectTimeout(6000);// 设置连接超时时间，单位毫�??

			connection.setReadTimeout(6000);// 设置读取数据超时时间，单位毫�??

			connection.setDoInput(true);// 是否打开输出�?? true|false

			connection.setDoOutput(true);// 是否打开输入流true|false

			connection.setRequestMethod("POST");// 提交方法POST|GET

			connection.setUseCaches(false);// 是否缓存true|false

			connection.connect();// 打开连接端口

			DataOutputStream out = new DataOutputStream(connection.getOutputStream());

			out.writeBytes(params);

			out.flush();

			out.close();

			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), encoding));

			StringBuffer buffer = new StringBuffer();

			String line = "";

			while ((line = reader.readLine()) != null) {

				buffer.append(line);

			}

			reader.close();

			return buffer.toString();

		} catch (Exception e) {

			System.out.println("读取地区超时");

		} finally {

			connection.disconnect();// 关闭连接

		}

		return null;
	}

	/**
	 * 字符转码
	 * 
	 * @param theString
	 * @return
	 */
	public static String decodeUnicode(String theString) {

		char aChar;

		int len = theString.length();

		StringBuffer buffer = new StringBuffer(len);

		for (int i = 0; i < len;) {

			aChar = theString.charAt(i++);

			if (aChar == '\\') {

				aChar = theString.charAt(i++);

				if (aChar == 'u') {

					int val = 0;

					for (int j = 0; j < 4; j++) {

						aChar = theString.charAt(i++);

						switch (aChar) {

						case '0':

						case '1':

						case '2':

						case '3':

						case '4':

						case '5':

						case '6':

						case '7':

						case '8':

						case '9':

							val = (val << 4) + aChar - '0';

							break;

						case 'a':

						case 'b':

						case 'c':

						case 'd':

						case 'e':

						case 'f':

							val = (val << 4) + 10 + aChar - 'a';

							break;

						case 'A':

						case 'B':

						case 'C':

						case 'D':

						case 'E':

						case 'F':

							val = (val << 4) + 10 + aChar - 'A';

							break;

						default:

							throw new IllegalArgumentException(

									"Malformed      encoding.");
						}

					}

					buffer.append((char) val);

				} else {

					if (aChar == 't') {

						aChar = '\t';
					}

					if (aChar == 'r') {

						aChar = '\r';
					}

					if (aChar == 'n') {

						aChar = '\n';
					}

					if (aChar == 'f') {

						aChar = '\f';

					}

					buffer.append(aChar);
				}

			} else {

				buffer.append(aChar);
			}
		}
		return buffer.toString();
	}
}
