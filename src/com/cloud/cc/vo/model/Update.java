package com.cloud.cc.vo.model;

public class Update{
	private String field;
	private String val;
	@Override
	public String toString() {
		return "Update [field=" + field + ", val=" + val + ", valtype=" + valtype + "]";
	}
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public String getVal() {
		return val;
	}
	public void setVal(String val) {
		this.val = val;
	}
	public String getValtype() {
		return valtype;
	}
	public void setValtype(String valtype) {
		this.valtype = valtype;
	}
	private String valtype;
}