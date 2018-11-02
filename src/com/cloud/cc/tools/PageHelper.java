package com.cloud.cc.tools;

import java.util.HashMap;
import java.util.List;

public class PageHelper<E> {
	
	public PageHelper(){
		this.params.put("pageSize",this.pageSize);
		this.params.put("pageNo",this.pageNo);
	}
	
	private Integer pageNo = 1; //当前页码
	private Integer pageSize = 10; //每页显示的数�?
	private HashMap<String,Object> params = new HashMap<String,Object>(); //查询条件
	private List<E> rows; //查询出的记录
	private Integer total;
	
	private Integer totalPage = 1;
	
	public Integer getPageNo() {
		return pageNo;
	}
	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
		this.params.put("pageNo",pageNo);
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
		this.params.put("pageSize",pageSize);
	}
	public HashMap<String, Object> getParams() {
		this.params.put("startRow",(pageNo-1)*pageSize);
		return params;
	}
	public void setParams(HashMap<String, Object> params) {
		this.params = params;
	}
	public List<E> getRows() {
		return rows;
	}
	public void setRows(List<E> rows) {
		this.rows = rows;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
		this.totalPage = this.total % this.pageSize == 0 ? this.total / this.pageSize : this.total / this.pageSize + 1;//记录总数
	}
	public Integer getTotalPage() {
		return this.totalPage;
	}
	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}
	
	
}
