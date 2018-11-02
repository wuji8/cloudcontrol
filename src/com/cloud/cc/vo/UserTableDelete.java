package com.cloud.cc.vo;

import java.util.Date;

public class UserTableDelete {
    private Integer utbid;

    private Integer tableid;

    private Integer userid;

    private Date deletetime;

    public Integer getUtbid() {
        return utbid;
    }

    public void setUtbid(Integer utbid) {
        this.utbid = utbid;
    }

    public Integer getTableid() {
        return tableid;
    }

    public void setTableid(Integer tableid) {
        this.tableid = tableid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Date getDeletetime() {
        return deletetime;
    }

    public void setDeletetime(Date deletetime) {
        this.deletetime = deletetime;
    }
}