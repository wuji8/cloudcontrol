package com.cloud.cc.tools;

import java.io.IOException;
import java.util.HashMap;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.BuiltinExchangeType;
import com.rabbitmq.client.Channel;
/**
 * RabbitMQ消息生成者(生产者)
 * @author san
 *
 */
public class RabbitMQProducer {

	public final static String QUEUE_NAME="rabbitMQ.test";
	
	public static void main(String[] args) throws IOException, TimeoutException {
		Channel channel=ChannelUtils.getChannelInstance("RabbitMq消息生产者");
		//声明交换机(交换机名称，交换机类型，是否持久化，是否自动删除，是否是内部交换机，交换机属性)
		channel.exchangeDeclare("rabbitMq.test", BuiltinExchangeType.DIRECT,true,false,false,new HashMap<String,Object>());
		//设置消息属性 发布消息
		AMQP.BasicProperties basicProperties=new AMQP.BasicProperties().builder().deliveryMode(2).contentType("utf-8").build();
		channel.basicPublish("rabbitMq.test","add", false, basicProperties,"消息测试".getBytes());
	}
}
