package com.cloud.cc.tools;

import java.util.HashMap;
import java.util.Map;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class ChannelUtils {

	
	/**
	 * 获取RabbitMQ的Channel通道
	 * @param connectionDescription	连接描述
	 * @return
	 */
	public static Channel getChannelInstance(String connectionDescription) {
		try {
			ConnectionFactory factory=getConnectionFactory();
			Connection connection=factory.newConnection(connectionDescription);
			return connection.createChannel();
		}catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException("获取Channel连接失败");
		}
	}
	
	
	/**
	 * 初始化RabbitMQ的连接工厂对象
	 * @return
	 */
	private static ConnectionFactory getConnectionFactory() {
		ConnectionFactory connectionFactory=new ConnectionFactory();
		//配置连接工厂相关信息
		connectionFactory.setHost("localhost");
		connectionFactory.setPort(5672);
		connectionFactory.setVirtualHost("/");
		connectionFactory.setUsername("admin");
		connectionFactory.setPassword("admin");
		//网络异常自动连接恢复
		connectionFactory.setAutomaticRecoveryEnabled(true);
		//每10秒尝试重新连接一次
		connectionFactory.setNetworkRecoveryInterval(10000);
		//设置connectionFactory属性信息
		Map<String,Object> connectionFactoryMap=new HashMap<String,Object>();
		connectionFactoryMap.put("principal", "JohntoOuYang");
		connectionFactoryMap.put("description","RabbitMq测试V1");
		connectionFactoryMap.put("emailAddress", "m18620942894@163.com");
		connectionFactory.setClientProperties(connectionFactoryMap);
		return connectionFactory;
		
	}
}
