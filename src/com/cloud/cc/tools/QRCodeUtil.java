package com.cloud.cc.tools;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.InputStream;

import javax.imageio.ImageIO;

import jp.sourceforge.qrcode.QRCodeDecoder;
import jp.sourceforge.qrcode.data.QRCodeImage;
import sun.misc.BASE64Decoder;

/**
 * 二維碼工具类
 * @author javasan
 */
public class QRCodeUtil {
	public static String decode(InputStream inputStream) {  
        /* 读取二维码图像数�? */  
        try {
			BufferedImage image = ImageIO.read(inputStream);  
			System.out.println(image);
			image.flush();
			/* 解二维码 */  
			QRCodeDecoder decoder = new QRCodeDecoder();
			String decodedData = new String(decoder.decode(new J2SEImageGucas(image)),"UTF-8");  
			return decodedData;
		} catch (Exception e) {
			System.out.println("解析失败，可能是参数有问题，错误异常�?"+e);
			return "解析失败";		
		}
    }
	
	 //base64字符串转化成图片  
    public static String GetDecode(String imgStr)  
    {   //对字节数组字符串进行Base64解码并生成图�?  
        if (imgStr == null) //图像数据为空  
            return "解析失败";
        BASE64Decoder decoder = new BASE64Decoder();
        String string = null;
        if(imgStr.indexOf("base64")>=0){
        	string = imgStr.substring(23, imgStr.length());
        }else{
        	string = imgStr;
        }
        try   
        {
            //Base64解码  
            byte[] b = decoder.decodeBuffer(string);  
            for(int i=0;i<b.length;++i)  
            {  
                if(b[i]<0)  
                {//调整异常数据  
                    b[i]+=256;  
                }  
            }  
            InputStream in = new ByteArrayInputStream(b);
            String decode = decode(in);
            in.close();
            return decode;
        }   
        catch (Exception e)   
        {
        	System.out.println("解析失败，可能是参数有问题，错误异常�?"+e);
            return "解析失败";  
        }  
    }
}

class J2SEImageGucas implements QRCodeImage {
    BufferedImage image;  
  
    public J2SEImageGucas(BufferedImage image) {  
        this.image = image;  
    }  
  
    public int getWidth() {  
        return image.getWidth();  
    }  
  
    public int getHeight() {  
        return image.getHeight();  
    }  
  
    public int getPixel(int x, int y) {
        return image.getRGB(x, y);  
    }  
}
