package com.cloud.cc.tools;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import com.alipay.api.internal.util.StringUtils;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.ObjectMetadata;
import com.aliyun.oss.model.PutObjectResult;

public class OssUtil {
		// endpoint
		private static final String endpoint = "oss-cn-beijing.aliyuncs.com";
		// accessKey
		private static final String accessKeyId = "LTAIz0IbJ2CloErb";
		private static final String accessKeySecret = "tiTKLfUCTMwOA7JmuAjOETPgWwcza0";
		// 空间
		private static final String bucketName = "wujifile";
	 
		private static OSSClient ossClient;
	 
		static {
			ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
		}
	 
		/**
		 * 初始�?
		 */
		public void init() {
			ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
		}
	 
		/**
		 * �?�?
		 */
		public void destory() {
			ossClient.shutdown();
		}
	 
		/**
		 * 上传图片
		 *
		 * @param url
		 * @throws ImgException
		 */
		public static void uploadImg2Oss(String url,String filedir) throws Exception {
			File fileOnServer = new File(url);
			FileInputStream fin;
			try {
				fin = new FileInputStream(fileOnServer);
				String[] split = url.split("/");
				uploadFile2OSS(fin, split[split.length - 1],filedir);
			} catch (FileNotFoundException e) {
				throw new RuntimeException("图片上传失败");
			}
		}
		
		/**
		 * 上传图片
		 * @param file
		 * @param filedir	放入存储空间的哪个目�?
		 * @return
		 * @throws Exception
		 */
		public static String uploadImg2Oss(MultipartFile file,String filedir) throws Exception {
			if (file.getSize() > 10 * 1024 * 1024) {
				throw new RuntimeException("上传图片大小不能超过10M�?");
			}
			String name =Salt.getOrderNum()+".jpg";
			try {
				InputStream inputStream = file.getInputStream();
				uploadFile2OSS(inputStream, name,filedir);
				String result=getImgUrl(getUrl(name),filedir);
				String[] split=result.split("%3");
				return split[0];
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException("图片上传失败");
			}
		}
	 
		/**
		 * 获得图片路径
		 *
		 * @param fileUrl
		 * @param filedir文件目录
		 * @return
		 */
		public static String getImgUrl(String fileUrl,String filedir) {
			System.out.println(fileUrl);
			if (!StringUtils.isEmpty(fileUrl)) {
				String[] split = fileUrl.split("/");
				return getUrl(filedir + split[split.length - 1]);
			}
			return null;
		}
	 
		/**
		 * 上传到OSS服务�? 如果同名文件会覆盖服务器上的
		 *
		 * @param instream
		 *            文件�?
		 * @param fileName 文件名称
		 *  
		 * @param filedir 文件目录(OSS的文件目�?)
		 *            文件名称 包括后缀�?
		 * @return 出错返回"" ,唯一MD5数字签名
		 */
		public static String uploadFile2OSS(InputStream instream, String fileName,String filedir) {
			String ret = "";
			try {
				// 创建上传Object的Metadata
				ObjectMetadata objectMetadata = new ObjectMetadata();
				objectMetadata.setContentLength(instream.available());
				objectMetadata.setCacheControl("no-cache");
				objectMetadata.setHeader("Pragma", "no-cache");
				objectMetadata.setContentType(getcontentType(fileName.substring(fileName.lastIndexOf("."))));
				objectMetadata.setContentDisposition("inline;filename=" + fileName);
				// 上传文件
				PutObjectResult putResult = ossClient.putObject(bucketName, filedir + fileName, instream, objectMetadata);
				ret = putResult.getETag();
			} catch (IOException e) {
			} finally {
				try {
					if (instream != null) {
						instream.close();
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			return ret;
		}
	 
		/**
		 * Description: 判断OSS服务文件上传时文件的contentType
		 *
		 * @param FilenameExtension
		 *            文件后缀
		 * @return String
		 */
		public static String getcontentType(String filenameExtension) {
			if (filenameExtension.equalsIgnoreCase("bmp")) {
				return "image/bmp";
			}
			if (filenameExtension.equalsIgnoreCase("gif")) {
				return "image/gif";
			}
			if (filenameExtension.equalsIgnoreCase("jpeg") || filenameExtension.equalsIgnoreCase("jpg")
					|| filenameExtension.equalsIgnoreCase("png")) {
				return "image/jpeg";
			}
			if (filenameExtension.equalsIgnoreCase("html")) {
				return "text/html";
			}
			if (filenameExtension.equalsIgnoreCase("txt")) {
				return "text/plain";
			}
			if (filenameExtension.equalsIgnoreCase("vsd")) {
				return "application/vnd.visio";
			}
			if (filenameExtension.equalsIgnoreCase("pptx") || filenameExtension.equalsIgnoreCase("ppt")) {
				return "application/vnd.ms-powerpoint";
			}
			if (filenameExtension.equalsIgnoreCase("docx") || filenameExtension.equalsIgnoreCase("doc")) {
				return "application/msword";
			}
			if (filenameExtension.equalsIgnoreCase("xml")) {
				return "text/xml";
			}
			return "image/jpeg";
		}
	 
		/**
		 * 获得url链接
		 *
		 * @param key
		 * @return
		 */
		public static String getUrl(String key) {
			// 设置URL过期时间�?10�? 3600l* 1000*24*365*10
	 
			Date expiration = new Date(System.currentTimeMillis() + 3600L * 1000 * 24 * 365 * 10);
			// 生成URL
			URL url = ossClient.generatePresignedUrl(bucketName, key, expiration);
			if (url != null) {
				return url.toString();
			}
			return null;
		}
}
