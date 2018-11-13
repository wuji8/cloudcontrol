package com.cloud.cc.vo.model;

public class TableJsonModel {
	private String type;
	private String field;
	public String getType() {
		return type;
	}
	@Override
	public String toString() {
		return "TableJsonModel [type=" + type + ", field=" + field + "]";
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
}
