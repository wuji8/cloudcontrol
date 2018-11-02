package com.cloud.cc.tools;

/**
 * 解析支付宝查询订单号的返回�?�bean
 * @author javasan
 */
public class AlipayBean {
	private AlipayBeanTwo alipay_trade_query_response;
	private String sign;
	public AlipayBean(AlipayBeanTwo alipay_trade_query_response, String sign) {
		super();
		this.alipay_trade_query_response = alipay_trade_query_response;
		this.sign = sign;
	}
	public AlipayBeanTwo getAlipay_trade_query_response() {
		return alipay_trade_query_response;
	}
	public void setAlipay_trade_query_response(
			AlipayBeanTwo alipay_trade_query_response) {
		this.alipay_trade_query_response = alipay_trade_query_response;
	}
	public String getSign() {
		return sign;
	}
	public void setSign(String sign) {
		this.sign = sign;
	}
}
