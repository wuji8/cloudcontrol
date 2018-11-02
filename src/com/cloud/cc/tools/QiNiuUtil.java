package com.cloud.cc.tools;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.fileupload.disk.DiskFileItem;
import org.json.JSONException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.google.gson.Gson;
import com.qiniu.api.auth.AuthException;
import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;

public class QiNiuUtil {
	
	private static final String accessKey="xotSCxlZRODyWLtr_2ND7Kor6T3RowGvcrIvECeF";
	
	private static final String secretKey="7b2ZJS3wmDk2ykllmuqeH0YpHpYIuYPTqWyj9vUq";
	
	/**
	 * 获取目录下的�?有文件名�?
	 * @param path
	 * @return
	 */
	public static ArrayList<String> getFileName(String path){ 
		File file=new File(path);
		File[] fileList=file.listFiles();
		ArrayList<String> resultList=new ArrayList<String>();
		for (int i = 0; i < fileList.length; i++) {
			if(fileList[i].isFile()){
				resultList.add(fileList[i].getName());
			}
		}
		return resultList;
	}
	

	/**
	 * 本地上传文件(该该目录的所有文件上传到�?)
	 * @param bucket bucketName
	 * @param path 目录路径
	 * @param fileName 文件名称集合
	 * @param type 选择机房 0-华东 1-华北 2-华南 3-北美
	 * @return
	 */
	public static int uploadFile(String bucket,String path,List<String> fileName,int type){
		int result=0;
		for(String file:fileName){
			Configuration cfg=getConfiguration(type);
			UploadManager uploadManager=new UploadManager(cfg);
			Auth auth=Auth.create(accessKey, secretKey);
			String upToken=auth.uploadToken(bucket);
			try {
				Response response=uploadManager.put(path+File.separator+file,file, upToken);
				//解析上传成功的结�?
				DefaultPutRet putRet=new Gson().fromJson(response.bodyString(),DefaultPutRet.class);
				System.out.println("key值："+putRet.key);
				result++;
			} catch (QiniuException e) {
				// TODO Auto-generated catch block
				Response r=e.response;
				System.err.println(r.toString());
				try{
					System.out.println(r.bodyString());
				}catch(QiniuException e2){
					
				}
			}
		}
		return result;
	}
	
	/**
	 * 传进来的type来实例化Configuration对象
	 * @param type 选择机房 0-华东 1-华北 2-华南 3-北美
	 * @return
	 */
	private static Configuration getConfiguration(int type){
		switch(type){
		case 0:
			return new Configuration(Zone.zone0());
		case 1:
			return new Configuration(Zone.zone1());
		case 2:
			return new Configuration(Zone.zone2());
		case 3:
			return new Configuration(Zone.zoneNa0());
		}
		return new Configuration(Zone.zone0());
	}
	
	//获取凭证
    private static String getUpToken(String bucket){
       Auth auth=Auth.create(accessKey, secretKey);
       String upToken=auth.uploadToken(bucket);
        return upToken;
    }
    
   

	
    /**
     * 使用File上传单一文件
     * @param file File对象
     * @param bucket 资源名称
     * @return
     * @throws AuthException 
     * @throws JSONException 
     */
	public static String uploadFile(File file,String bucket,String key) throws JSONException, AuthException{
		String uptoken=getUpToken(bucket);
		Configuration cfg = new Configuration(Zone.zone0());
		UploadManager uploadManager = new UploadManager(cfg);
		try {
			Response response=uploadManager.put(file.getAbsolutePath(),key,uptoken);
			DefaultPutRet putRet=new Gson().fromJson(response.bodyString(),DefaultPutRet.class);
			return putRet.key;
		} catch (QiniuException ex) {
			System.out.println(ex);
			 Response r = ex.response;
			    System.err.println(r.toString());
			    try {
			        System.err.println(r.bodyString());
			    } catch (QiniuException ex2) {
			        //ignore
			    }
		}
		return null;
	}
	
	/**
	 * 上传文件 使用 multpartFile
	 * @param multpartFile
	 * @param bucket
	 * @return
	 * @throws JSONException
	 * @throws AuthException
	 */
	public static String uploadFile(MultipartFile multpartFile,String bucket) throws JSONException, AuthException{
		File file=transFile(multpartFile);
		return uploadFile(file, bucket,Salt.getOrderNum()+".jpg");
	}

	/**
	 * multpartFile转File
	 * @param multpartFile
	 * @return
	 */
	public static File transFile(MultipartFile multpartFile){
		CommonsMultipartFile cf=(CommonsMultipartFile)multpartFile;
		DiskFileItem fi=(DiskFileItem)cf.getFileItem();
		File f=fi.getStoreLocation();
		return f;
	}
	
	/**
	 * 删除文件
	 * @param fileKey key
	 * @param bucketName 资源空间名称
	 */
	public static void delFile(String fileKey,String bucketName){
		Auth auth=Auth.create(accessKey, secretKey);
		Configuration cfg=new Configuration(Zone.zone0());
		BucketManager bucketManager=new BucketManager(auth, cfg);
		try {
			bucketManager.delete(bucketName, fileKey);
		} catch (QiniuException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.err.println(e.code());
			System.err.println(e.response.toString());
		}
	}
	
	public static void main(String[] args) {
		
	}
}
