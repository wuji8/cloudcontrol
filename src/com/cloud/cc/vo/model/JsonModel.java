package com.cloud.cc.vo.model;

import java.util.List;

public class JsonModel {

	private List<Querys> querys;
	private List<Update> updates;
	public List<Update> getUpdates() {
		return updates;
	}
	public void setUpdates(List<Update> updates) {
		this.updates = updates;
	}
	public List<Querys> getQuerys() {
		return querys;
	}

	public void setQuerys(List<Querys> querys) {
		this.querys = querys;
	}
	private String[] fields;
	public String[] getFields() {
		return fields;
	}
	public void setFields(String[] fields) {
		this.fields = fields;
	}
	
}