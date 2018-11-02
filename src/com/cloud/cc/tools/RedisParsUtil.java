package com.cloud.cc.tools;

import java.io.File;
import java.net.URL;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
/**
 * redis工具�?
 * @author 陈永�?
 *
 */
public class RedisParsUtil {
	private static String ip;
	/**
	 * 获取配置文件IP
	 * @return
	 */
	@SuppressWarnings("unused")
	private static String getIp(){
		if(ip == null){
			synchronized ("ip") {
				if(ip == null){
					SAXReader reader = new SAXReader();
					try {
						URL resource = Thread.currentThread().getContextClassLoader().getResource("");
						String path = resource.getPath();
						String configLocation="/redis-cfg.xml";
						String configPath = path+configLocation;
						//读取redis配置文件
						Document doc = reader.read(new File(configPath));
						//获取根节�?
						Element root = doc.getRootElement();
						//取得server节点
						Element server = root.element("server");
						//取得ip节点
						Element ipElem = server.element("ip");
						//获取ip�?
						ip = ipElem.getText().trim();
					} catch (Exception e) {
						throw new RuntimeException(e);
					}
				}
			}
		}
		return ip;
	}
	    //Redis服务器IP
	    private static String ADDR = "127.0.0.1";
	    //private static String ADDR = getIp();
	    
	    //Redis的端口号
	    private static int PORT = 6379;
	    
	    //访问密码
	    //private static String AUTH = "admin";
	    
	    //可用连接实例的最大数目，默认值为8�?
	    //如果赋�?�为-1，则表示不限制；如果pool已经分配了maxActive个jedis实例，则此时pool的状态为exhausted(耗尽)�?
	    private static int MAX_ACTIVE = 20480;
	    
	    //控制�?个pool�?多有多少个状态为idle(空闲�?)的jedis实例，默认�?�也�?8�?
	    private static int MAX_IDLE = 5000;
	    
	    //等待可用连接的最大时间，单位毫秒，默认�?�为-1，表示永不超时�?�如果超过等待时间，则直接抛出JedisConnectionException�?
	    private static int MAX_WAIT = 10000;
	    
	    private static int TIMEOUT = 10000;
	    
	    //在borrow�?个jedis实例时，是否提前进行validate操作；如果为true，则得到的jedis实例均是可用的；
	    private static boolean TEST_ON_BORROW = true;
	    
	    private static JedisPool jedisPool = null;
	    
	    /**
	     * 初始化Redis连接�?
	     */
	    static {
	        try {
	            JedisPoolConfig config = new JedisPoolConfig();
	            config.setMaxActive(MAX_ACTIVE);
	            config.setMaxIdle(MAX_IDLE);
	            config.setMaxWait(MAX_WAIT);
	            config.setTestOnBorrow(TEST_ON_BORROW);
	            jedisPool = new JedisPool(config, ADDR, PORT, TIMEOUT);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
	    
	    /**
	     * 获取Jedis实例
	     * @return
	     */
	    public static Jedis getJedis() {
	        try {
	            if (jedisPool != null) {
	                Jedis resource = jedisPool.getResource();
	                return resource;
	            } else {
	                return null;
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	    }
	    
	    /**
	     * 释放jedis资源
	     * @param jedis
	     */
	    public static void returnResource(final Jedis jedis) {
	        if (jedis != null) {
	            jedisPool.returnResource(jedis);
	        }
	    }

	private RedisParsUtil(){}
}
