package com.cloud.cc.tools;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.OutputStreamWriter;

public class Text {
	public static void sbrz(String str){
		//写入txt
		FileWriter fw = null;
    	try {
    	//如果文件存在，则追加内容；如果文件不存在，则创建文件
    	    File f=new File("D:\\bug日志.txt");
    	    fw = new FileWriter(f, true);
    	}catch (Exception e) {
    	    e.printStackTrace();
    	}
    	try {
    	    FileOutputStream writerStream = new FileOutputStream("D:\\bug日志.txt",true); 
    	    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(writerStream, "UTF-8")); 
    	    writer.write(str+"\r\n");
    	    writer.close();
	    	fw.flush();
	    	fw.close();
    	} catch (Exception e) {
    	    e.printStackTrace();
    	} 
	}

}
