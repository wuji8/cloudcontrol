package com.cloud.cc.vo;

import java.util.Date;

public class UserTable {
    private Integer tableid;

    private String tablename;

    private String dbtable;

    private Integer userid;

    private Date createtime;

    private Integer cloudid;
    
    private Integer deleted;
    
    private Integer count; 	//数据条数

    public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Integer getDeleted() {
		return deleted;
	}

	public void setDeleted(Integer deleted) {
		this.deleted = deleted;
	}

	private Date deletetime;

    public Integer getTableid() {
        return tableid;
    }

    public void setTableid(Integer tableid) {
        this.tableid = tableid;
    }

    public String getTablename() {
        return tablename;
    }

    public void setTablename(String tablename) {
        this.tablename = tablename == null ? null : tablename.trim();
    }

    public String getDbtable() {
        return dbtable;
    }

    public void setDbtable(String dbtable) {
        this.dbtable = dbtable == null ? null : dbtable.trim();
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Integer getCloudid() {
        return cloudid;
    }

    public void setCloudid(Integer cloudid) {
        this.cloudid = cloudid;
    }

    public Date getDeletetime() {
        return deletetime;
    }

    public void setDeletetime(Date deletetime) {
        this.deletetime = deletetime;
    }
}