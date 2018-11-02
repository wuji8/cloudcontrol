package com.cloud.cc.tools;

/**
 * 解析支付宝查询订单号的返回�?�bean
 * @author javasan
 */
public class AlipayBeanTwo {
	private String code;
	private String msg;
	private String buyer_logon_id;
	private String buyer_pay_amount;
	private String buyer_user_id;
	private String invoice_amount;
	private String out_trade_no;
	private String point_amount;
	private String receipt_amount;
	private String send_pay_date;
	private Double total_amount;
	private String trade_no;
	private String trade_status;
	public AlipayBeanTwo(String code, String msg, String buyer_logon_id,
			String buyer_pay_amount, String buyer_user_id,
			String invoice_amount, String out_trade_no, String point_amount,
			String receipt_amount, String send_pay_date, Double total_amount,
			String trade_no, String trade_status) {
		super();
		this.code = code;
		this.msg = msg;
		this.buyer_logon_id = buyer_logon_id;
		this.buyer_pay_amount = buyer_pay_amount;
		this.buyer_user_id = buyer_user_id;
		this.invoice_amount = invoice_amount;
		this.out_trade_no = out_trade_no;
		this.point_amount = point_amount;
		this.receipt_amount = receipt_amount;
		this.send_pay_date = send_pay_date;
		this.total_amount = total_amount;
		this.trade_no = trade_no;
		this.trade_status = trade_status;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getBuyer_logon_id() {
		return buyer_logon_id;
	}
	public void setBuyer_logon_id(String buyer_logon_id) {
		this.buyer_logon_id = buyer_logon_id;
	}
	public String getBuyer_pay_amount() {
		return buyer_pay_amount;
	}
	public void setBuyer_pay_amount(String buyer_pay_amount) {
		this.buyer_pay_amount = buyer_pay_amount;
	}
	public String getBuyer_user_id() {
		return buyer_user_id;
	}
	public void setBuyer_user_id(String buyer_user_id) {
		this.buyer_user_id = buyer_user_id;
	}
	public String getInvoice_amount() {
		return invoice_amount;
	}
	public void setInvoice_amount(String invoice_amount) {
		this.invoice_amount = invoice_amount;
	}
	public String getOut_trade_no() {
		return out_trade_no;
	}
	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}
	public String getPoint_amount() {
		return point_amount;
	}
	public void setPoint_amount(String point_amount) {
		this.point_amount = point_amount;
	}
	public String getReceipt_amount() {
		return receipt_amount;
	}
	public void setReceipt_amount(String receipt_amount) {
		this.receipt_amount = receipt_amount;
	}
	public String getSend_pay_date() {
		return send_pay_date;
	}
	public void setSend_pay_date(String send_pay_date) {
		this.send_pay_date = send_pay_date;
	}
	public Double getTotal_amount() {
		return total_amount;
	}
	public void setTotal_amount(Double total_amount) {
		this.total_amount = total_amount;
	}
	public String getTrade_no() {
		return trade_no;
	}
	public void setTrade_no(String trade_no) {
		this.trade_no = trade_no;
	}
	public String getTrade_status() {
		return trade_status;
	}
	public void setTrade_status(String trade_status) {
		this.trade_status = trade_status;
	}
}
