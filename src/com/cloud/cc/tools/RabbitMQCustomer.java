package com.cloud.cc.tools;

import java.io.IOException;
import java.util.HashMap;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.BuiltinExchangeType;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.Envelope;
/**
 * RabbitMQ消息接收者(消费者)
 * @author san
 *
 */
public class RabbitMQCustomer {

	
	public static void main(String[] args) throws IOException, TimeoutException {
		Channel channel=ChannelUtils.getChannelInstance("Rabbit消息消费者");
		//声明队列(队列名，是否持久化，是否排他，是否自动删除，队列属性)
		AMQP.Queue.DeclareOk declareOk=channel.queueDeclare("rabbitMq.test.v1",true,false,false,new HashMap<String,Object>());
		//声明交换机(交换机名，交换机类型，是否持久化，是否自动删除，是否是内部交换机，交换机属性)
		channel.exchangeDeclare("rabbitMq.test", BuiltinExchangeType.DIRECT,true,false,false,new HashMap<String,Object>());
		//将队列Binding(绑定)到交换机上(队列名，交换机名，Routing key，绑定属性)
		channel.queueBind(declareOk.getQueue(),"rabbitMq.test", "add",new HashMap<String,Object>());
		//消费者订阅消息 监听如上声明的队列(队列名，是否自动应答(与消息可靠有关)，消费者标签，消费者)
		channel.basicConsume(declareOk.getQueue(),true,"RabbitMq业务操作逻辑消费者",new DefaultConsumer(channel) {
			public void handleDelivery(String consumerTag,Envelope envelope,AMQP.BasicProperties properties,byte[] body) {
				System.out.println(consumerTag);
				System.out.println(envelope.toString());
				System.out.println(properties.toString());
				System.out.println("消息内容："+new String(body));
			}
		});
	}
}
