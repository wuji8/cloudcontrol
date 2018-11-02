package com.cloud.cc.tools;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

/**
 *
 * @author Administrator
 *
 */
public class Aes {

    // 加密
	public static String encrypt(String content) {  
		try {             
			KeyGenerator kgen = KeyGenerator.getInstance("AES");  
			kgen.init(128, new SecureRandom("sksj.dd454ddd@o0ju".getBytes()));  
			SecretKey secretKey = kgen.generateKey();  
			byte[] enCodeFormat = secretKey.getEncoded();  
			SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");  
			Cipher cipher = Cipher.getInstance("AES");// 创建密码�?  
			byte[] byteContent = content.getBytes("utf-8");
			cipher.init(Cipher.ENCRYPT_MODE, key);// 初始�?
			byte[] result = cipher.doFinal(byteContent);
			return parseByte2HexStr(result); // 加密  
		} catch (Exception e) {  
		        e.printStackTrace();  
		}
		return null;  
	}

    // 解密
	public static byte[] decrypt(String con) {
        try {
        	byte[] content = parseHexStr2Byte(con);
            KeyGenerator kgen = KeyGenerator.getInstance("AES");  
            kgen.init(128, new SecureRandom("sksj.dd454ddd@o0ju".getBytes()));  
            SecretKey secretKey = kgen.generateKey();  
            byte[] enCodeFormat = secretKey.getEncoded();  
            SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");              
            Cipher cipher = Cipher.getInstance("AES");// 创建密码�?  
            cipher.init(Cipher.DECRYPT_MODE, key);// 初始�?  
            byte[] result = cipher.doFinal(content);  
            return result; // 加密  
        } catch (Exception e) {  
            e.printStackTrace();  
        } 
        return null;  
	}
    
	public static String parseByte2HexStr(byte buf[]) {  
        StringBuffer sb = new StringBuffer();  
        for (int i = 0; i < buf.length; i++) {  
                String hex = Integer.toHexString(buf[i] & 0xFF);  
                if (hex.length() == 1) {  
                        hex = '0' + hex;  
                }  
                sb.append(hex.toUpperCase());  
        }  
        return sb.toString();  
	} 
	
	/**�?16进制转换为二进制 
	 * @param hexStr 
	 * @return 
	 */  
	public static byte[] parseHexStr2Byte(String hexStr) {  
	        if (hexStr.length() < 1)  
	                return null;  
	        byte[] result = new byte[hexStr.length()/2];  
	        for (int i = 0;i< hexStr.length()/2; i++) {  
	                int high = Integer.parseInt(hexStr.substring(i*2, i*2+1), 16);  
	                int low = Integer.parseInt(hexStr.substring(i*2+1, i*2+2), 16);  
	                result[i] = (byte) (high * 16 + low);  
	        }  
	        return result;  
	}
	
	public static void main(String[] args) {
		String encrypt = encrypt("aab");
		System.out.println("加密�?"+encrypt);
		String decrypt = new String(decrypt(encrypt));
		System.out.println("解密�?"+decrypt);
	}
}