package com.cloud.cc.tools;

import java.util.Date;
import java.util.Properties;

import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendEmail {

	// 发件人的邮箱账户
	private static final String myEmailAccount = "m18620942894@163.com";

	// 发件人的邮箱密码
	private static final String muEmailPwd = "a15920970874";

	// 发件人邮箱的SMTP服务器地�?
	private static final String myEmailSmtpHost = "smtp.163.com";

	/**
	 * 
	 * @param session
	 *            和服务器交互的会�?
	 * @param receiveMail
	 *            收件人的邮箱
	 * @param subject
	 *            标题
	 * @param code
	 *            验证�?
	 * @return
	 */
	public static MimeMessage emailMessage(Session session, String receiveMail, String subject, String code)
			throws Exception {
		MimeMessage message = new MimeMessage(session);
		// 发件�?
		message.setFrom(new InternetAddress(myEmailAccount, "", "UTF-8"));
		// 收件�?
		message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(receiveMail, "", "UTF-8"));
		message.setSubject(subject); // 标题
		message.setContent(
				"<p>您正在使用cw.teamven.cc</p><p>验证码：" + code
						+ "。该验证码非常重要，请勿将此邮件泄露给任何人�?</p><p>CoindWord运营团队</p><P>系统发言，请勿回信�??</P><p>CoinWord官网地址�?<a href='www.baidu.com'>www.baidu.com</a></p>",
				"text/html;charset=utf-8"); // 内容
		// 设置发件时间
		message.setSentDate(new Date());
		message.saveChanges();
		return message;
	}

	/**
	 * 
	 * @param receiveMail 收件人邮�?
	 * @param subject	标题
	 * @param code 随机�?
	 * @throws Exception
	 */
	public static void sendEmail(String receiveMail, String subject, String code) throws Exception {
		Properties props = new Properties();
		props.setProperty("mail.transport.protocol", "smtp");
		props.setProperty("mail.smtp.host", myEmailSmtpHost);
		props.setProperty("mail.smtp.auth", "true");
		Session session = Session.getInstance(props);
		session.setDebug(true);
		MimeMessage message = emailMessage(session, receiveMail, subject, code);
		Transport transport = session.getTransport();
		transport.connect(myEmailAccount, muEmailPwd);
		transport.sendMessage(message, message.getAllRecipients());
		transport.close();
	}

}
