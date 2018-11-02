package com.cloud.cc.tools;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.params.ClientPNames;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.web.multipart.MultipartFile;

public class FileUtils {

	public static void main(String[] args) throws ParseException {
		/*
		 * File filePath = new File("D:/pnImgFile/"); ArrayList<String> fileList
		 * = (ArrayList<String>) sortFileByModifyTime(filePath);
		 * QiNiuUtil.uploadFile("wujiios", "D:/pnImgFile", fileList,2);
		 */
	}

	/**
	 * 获取7天内修改过的文件并按�?新到�?旧排�?
	 * 
	 * @param filePath
	 * @return
	 * @throws ParseException
	 */
	public static ArrayList<String> sortFileByModifyTime(File filePath) throws ParseException {
		HashMap<String, String> fileMap = new HashMap<String, String>();
		getFile(filePath, fileMap);
		getValueFile(fileMap);
		ArrayList<String> fileList = (ArrayList<String>) sortFile(fileMap);
		return fileList;
	}

	/**
	 * 获取�?有文�?
	 * 
	 * @param filePath
	 * @param fileMap
	 * @return
	 */
	public static Map<String, String> getFile(File filePath, HashMap<String, String> fileMap) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		if (filePath.isDirectory()) {
			File[] files = filePath.listFiles();
			if (files != null) {// 因为磁盘中有可能会遇到不能访问的文件，所以导致files为null，因此要加一个判�?
				for (File file : files) {
					if (file.isFile()) {
						long time = file.lastModified();
						fileMap.put(file.getName(), simpleDateFormat.format(time));
						getFile(file, fileMap);
					} else {
						long time = file.lastModified();
						fileMap.put(file.getName(), simpleDateFormat.format(time));
					}
				}
			}
		} else {
			long time = filePath.lastModified();
			fileMap.put(filePath.getName(), simpleDateFormat.format(time));
		}

		return fileMap;
	}

	/**
	 * 获取7天内修改过的文件
	 * 
	 * @param fileMap
	 * @return
	 * @throws ParseException
	 */
	public static Map<String, String> getValueFile(HashMap<String, String> fileMap) throws ParseException {
		Calendar valueTime = Calendar.getInstance();
		Calendar fileTime = Calendar.getInstance();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		// valueTime.roll(Calendar.DATE, -7);//DATE是在当前月份滚动
		valueTime.roll(Calendar.DAY_OF_YEAR, -7);// DAY_OF_YEAR是在�?年之中滚�?
		Date valueDate = valueTime.getTime();

		// Map迭代过程中要删除元素的话，必须要用迭代器模式迭代，不然使用map自身的remove方法
		// 会引发异�?
		Iterator<Entry<String, String>> fileSet = fileMap.entrySet().iterator();
		while (fileSet.hasNext()) {
			Entry<String, String> fileEntry = fileSet.next();
			String fileName = fileEntry.getKey();
			String fTime = fileEntry.getValue();
			fileTime.setTime(simpleDateFormat.parse(fTime));
			Date fileDate = fileTime.getTime();
			if (valueDate.getTime() < fileDate.getTime()) {
				continue;
			} else {
				fileSet.remove();
			}
		}

		return fileMap;
	}

	/**
	 * 按照修改日期从最新到�?旧排�?
	 * 
	 * @param filePath
	 * @param fileMap
	 * @return
	 * @throws ParseException
	 */
	public static List<String> sortFile(HashMap<String, String> fileMap) throws ParseException {
		ArrayList<String> fileLists = new ArrayList<String>();// 存放要最终返回的集合
		ArrayList<Map.Entry<String, String>> fileList = new ArrayList<Map.Entry<String, String>>(fileMap.entrySet());// 存放要排序的集合
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Calendar valueTime1 = Calendar.getInstance();
		Calendar valueTime2 = Calendar.getInstance();

		// 使用Collections工具类进行排�?
		Collections.sort(fileList, new Comparator<Map.Entry<String, String>>() {

			@Override
			public int compare(Entry<String, String> o1, Entry<String, String> o2) {
				int i = o1.getValue().compareTo(o2.getValue());
				return -i;
			}
		});

		int size = fileList.size();
		for (int z = 0; z < size; z++) {
			fileLists.add(fileList.get(z).getKey());
		}
		return fileLists;
	}

	/**
	 * 上传图片至oss
	 * @param multfile MultipartFile文件
	 * @param exprieTime 过期时间,格式为：yyyy-MM-dd HH:mm:ss or yyyy-MM-dd
	 * @param packageType 上传的文件夹名称
	 * @return 图片全路�?
	 */
	public static String uploadFileToOSS(MultipartFile multfile, String exprieTime, String packageType) throws Exception {
		String fileSuffex = multfile.getContentType().substring(multfile.getContentType().indexOf("/") + 1,multfile.getContentType().length());
		if (fileSuffex.equalsIgnoreCase("jpeg")) {
			fileSuffex = "jpg";
		}
		CloseableHttpClient client = HttpClients.createDefault();
		HttpPost httpPost = new HttpPost("http://oss.mall-software.net/api/Object/ImportImages");
		MultipartEntityBuilder entity = MultipartEntityBuilder.create();
		entity.addTextBody("host", "www.wj.ink");
		entity.addTextBody("fileName", "无极任务平台");
		entity.addTextBody("tmp", "0");
		entity.addTextBody("cate", packageType);
		entity.addTextBody("w", "0");
		entity.addTextBody("h", "0");
		entity.addTextBody("expireDate", exprieTime);
		entity.addBinaryBody("form", multfile.getInputStream(), ContentType.MULTIPART_FORM_DATA, "1." + fileSuffex);
		httpPost.setEntity(entity.build());
		HttpResponse response = client.execute(httpPost);
		if (response.getStatusLine().getStatusCode() == 200) {
			// 取回服务器端的响应结�?
			String result = EntityUtils.toString(response.getEntity(), "utf-8");
			Map<String, Object> map = JsonUtil.jsonToMap(result);
			if (map.get("code").toString().equalsIgnoreCase("1.0")) {
				String fileAddress = map.get("data").toString();
				client.close();
				return fileAddress;
			}
		}
		return null;
	}
}
