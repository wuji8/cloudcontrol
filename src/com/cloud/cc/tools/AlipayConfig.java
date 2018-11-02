package com.cloud.cc.tools;

import java.io.FileWriter;
import java.io.IOException;

/**
 * 充值
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-06-21
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	//public static String app_id = "2017061707512096";
	public static String app_id = "2018021102181197";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    //public static String merchant_private_key = "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCxDTM2xOWfClu0NrnsXNTJveiuiy9d4GrQJNtL5zIDHO1AaLcAa8Q4ntYlR2OyGYV+yJIhh4i5+M6GcSerNzYNpX5EyH+k3gkBydwTJ6qDvbsWzruR8HCOoNYmSsPQyQxz28mfSXVEHGMEslKz/KCeLlsrnElvVH6OwftnjAbmZnZQ0aSOkh7nlfifNRS8JjG1IVmQrwZIC3zJpVVYbUSHED+6Ys08X+JQ+w2wN8EzGJYTCgOHvleFQu51kJhBdQlZ2DTPWq7qv1Pe6nwPAornElSqgzmxs44vCZVN7b3xgVHDP+UM5pedl2KSlGTjyX0f/VSoTasImHEUvP1Nh64pAgMBAAECggEBAKFHp/ZlJ9JXSjAAhh6kdYWMhA+zZCN80W/nkwgyg2FIkWpRuRoeEPGO5v2waUWMcAmMxWjboJXf6qmXHA6gTZHixgH8LiJNzCCf8+RTBsXZKDrfeQe44Z9bLZhWFMf0zG4hsSlzbensfdqCYknof5t4GL7CMDbE3kBGvi+V45cuCrFo3CeO9x6PpG71X7WmY25dfcoFpK6qL1y+GFfFcOlrG2grOHwxXOG66lLpXk7v4mfP7ybqMFNnmb3ODOT7fN5jXnaXsFzYOwa8Ep03CC8kaWvc+auiK4VJjjom9Nx88aLiupb2lTTnVOpT179U8DHhwJOAA25fLkSj1pNrjvECgYEA7a7+n8v0F3lXXuwvz3AKF70DrADihftRjmBVyxbunq06ARknP+w11fs0h5CfkzPb3p21EEoAkW2I4R7Nmtk4BaCdh1l/n2Z0BQd2sDj6bLDLEDh720k3GFL38E1CfmTv89guLYWggDKa8ajcua1XmF0hFmg6n93YBIABpwHc8/UCgYEAvrIPrljq3sspbOXq9bix0qdPUB/XWOTxwTOPim+/eT7yohWZJs1tSVjMrV6cTdBiOmhiZeYvDbhKFBuzlFaMRyN3w2lm9Vbln3jujoW+4xcUTvr1DCHt3WrOD4WxFrPIuPGzknrYjbJZAI9Rw6ITQ5uekql5rVyGtgnLWSVnJOUCgYEAxMGUbtv7WGNOfHmwqlvpPvVtULn6y0bcoKwG2XRGXHyyA6662yPC/TxSo9aJAuZvIL4U4UMhbUHridBiC8m9oorvXNgt2dqKOI+RJRhF1iwULX1UqpbVUQF91iNe5BrSuF1A/NYdo4JA2cQb1Gk2lh6iAVaPEUAoTrFYrNPSAPECgYEAhqjox95EZPWkGCE3zTMSZ0X8jQEfKcfqK9tEJqcI2A6qeei0kKEJ5nyNdHPV/mEDrGkf6wMkARU9QnvZUQvY3TdfkB9zNBab6gQUuZIanPQkRC2VM28WMIAGaRGoXvav7GHJw8t59n2Vuf5656Ig5mITFVAV+2TWP+Akt5vg/T0CgYA4D5vsURmTFnU09DHAtNkLKhn3CMLeOGA5e1hSlOispMZQ3s/bZRhqeqJ+jkjK4cTVfUe1k0iejpRiI907BsIZPRs8J7ZKfGmz6h6kATXtNaa7aNuq0abh1GvX450Xqg9B8zvjr2YOLtsILteSlZJPZVWxn6RJ+Vmvc3pP9EjSlQ==";
	public static String merchant_private_key = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCLoSWEcoGEm8vfOTuQgNdZgo9KoI6AKGE9eL5iubrDtWUkNkFqXQsE0maNY1uY6VgKLUVn8ZcAJ9jFzr5dJWvQiMDDH6zD7CZyZLwBGU4kt36/p3zPDKLBexwdv7kRk5EMxQwf7HMj9IylTCXoawL635axM9u/pUAxD4lX8oKffwxA2wCWrQvKc6NoEJWYgP8sHLul9zb6M8YfET9ND8qc1/SzCRpq0Gh14jX0013T4ncpY6x293UUDGgN/9xonTx+J2AEPgz+13Ca7yK8rg7cI+jmxrFrKkAcoJGcBrPOdGVSXVPiU6dSx6+umz02+dnpgKoviVV3y88ViQg7XKLRAgMBAAECggEAZaCAggolorMSjAJIDED6fLe+O37ouPaq7+b2Cz1LZi6c0uJ6ckQORRAufDIY9Q7BeYbBwYnhcceOy0pS29Dky/787ggb4u36fcA75kDY03iK1Eu/V6PGwjQsnqpwtQ5GwJia3pFmrIDN7XGjFartnFMohwlLpA1Oz2aTfGOSFytvhRfjEVgxXrPayLDrFCS3cK+SoW9xmPcCRMjxxn9zApQiIWP5NGB5W7/JTncio2WwJKN8Fk5wxByNMa7mkl+F6EUG+NwDgqBsXSOZuz1NPkAbDzKOcNoIHlRRN7FchtjUb9GhvlGJXSo6JclBwdbpYhtqVIBwPZglmqm8qVmHEQKBgQD5lr62vn9uZ9movWKC90ZdNLRggoL8Cw2/0jis92RywGZthw96r67ObUZ7SNvl7jrvq2Dg6pWa7U4nLZ86kVTRI2bE9TqG8OfBCjuw0CrEMOAY6485uOWOaXcOYLiGoSZveeWO69CiykaX3X6BUEkp2iI0iyxz2TU0GA7LE1BDMwKBgQCPN1Ox+glR9Et8adQHT4vYs3fhdIwQeCEiVn02sV82GnI7jhd+J2eDFWsUAeYS4P6En+N92Qz0AYhtaNiMXdn3sE5cFZaYdZpsGx+ltbCmYW5PoX7LmDRJqpgjGaFnocIq8+RodbBsVehVfi+8NN8KTdBMo7mz7PxNIka98eVB6wKBgDPLNIh3v7oJkwGRS4AiEFgHN+dPLh9fq9rCpUA/lni5tIfGH1A2ZPAxfQ7Yb8mnRlO2HMSP6bvcwvseXIyq3A8Kaak1uo+GLpHAreJjUHymJ9sEBxTTac/D0xEIwUIu7urzQNAH36Polf2t2TK8lnI48iA1QWRJDuFgnLFHsMBBAoGAURPzb/iruhfhfEe1X4YrF71SivKeMNyxdW0dag80Zb7HGOwyZJsOQOmpOyRwChQSQyb5dU+hw6nygG4w2hZvxYesdPlLzngVukoIupmHrknOV4qH6975CxNnGcfy1mZ/NC3rCzBFdq+T3oKXp6cO9hhjal/uS+xIUaqr/fCp540CgYEA7FWFeZ8xQh27A6rFhbaX784WRN5dha5mdKywcAR+5G/qzSITcwno1u6ITdm+cq+U0itfieNiz/B5MEMO+GMgPAhYzxOrrHAZ56yiIkBNHFoKsbjKgANwh2Hig/9iFHGmICK6d49NFPc1jFPGKnpwhqaTJFOJS6Ww1M3ZEVlQGdQ=";
	
	// 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    //public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAihRb3LdNicNeN5zPTCmdvetzTgf3WXLnHUZ76dgun1dwgOlfFNnwuzJudZk8S5fCDZipLmRGKSIVpChlBn1rfc62p0/QGGkWq1P9r52OKsM2PWnWeOrqtSFRN2xwGDOI61DcF6H536PoUV1IoZFNWKiQ+DM8QpKg+1675DYsvsMplDSiq+lvFwJkaT6XzYi7gy2S4ty3gGS+nen0uu7NhSlMAp+s/+6X2hQyW4+1gaSPzUtcbCX/JJM6SKqkV/rOrvdnV/dgo0bLGG5W1Ivg+Pbo3qwlKybi71qFXulbmIfCX1C2DYx4ACBTCEKIOIZ8Slw1BtQ8oqt9E01ryf3GlwIDAQAB";
	public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkzhRbyyzjZLnJCS0g6xcu0c9WBUjVDoFmxtaQkJUqyNpLKex9p+4wZL9jTQl95pZ+9nUyAQDzEMTxePtK2ZrlaV3XN6+RsKkOz7DzGZkrKh+JWli/svC5UpPDmn1bbnfmo1qvIO2za1At8x2+lEEc9LN9At0VZ7Q5M6wp4yTtuZlkPG+EwYa76p6Lgg+/tgHF5JaoHuMuAXh47CKO6rdmR0Lndj46u3IMADPWqc8SS+GwTXFQYkgWjFN+BrZ/cPWSNOD6owjh59KVpdJCLGQ/ULfNMpSMdA7+/eOW0c3DSkr1VGzhfZ+nn1Lj/+w1PpoBZByDQE7p7q/J1TnO90j1wIDAQAB";

    //充值用到的异步和同步调回
	// 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "https://www.wj.ink/bau/asynchronous.action";
	public static String return_url = "https://www.wj.ink/jsp/h5/demand/userCenter.jsp";
	
	public static String notify_urlTwo = "https://www.wj.ink/au/asynchronousTwo.action";
	public static String return_urlTwo = "https://www.wj.ink/jsp/h5/assist/index.jsp";
	
	
	//购买产品用到的异步和同步调回
	// 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	//public static String notify_url2 = "http://119.23.131.167:8080/Aipay/pay/test1.action";
	//public static String return_url2 = "http://119.23.131.167:8080/Aipay/pay/test2.action";

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "UTF-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipay.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\";

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

