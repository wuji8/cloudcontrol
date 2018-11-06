package com.cloud.cc.vo;

import java.util.Date;

public class UiTable {
    private Integer uitid;

    private String uitname;

    private Date createtime;

    private Integer userid;

    private String uijson;

    private Integer cloudid;

    public Integer getUitid() {
        return uitid;
    }

    public void setUitid(Integer uitid) {
        this.uitid = uitid;
    }

    public String getUitname() {
        return uitname;
    }

    public void setUitname(String uitname) {
        this.uitname = uitname == null ? null : uitname.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getUijson() {
        return uijson;
    }

    public void setUijson(String uijson) {
        this.uijson = uijson == null ? null : uijson.trim();
    }

    public Integer getCloudid() {
        return cloudid;
    }

    public void setCloudid(Integer cloudid) {
        this.cloudid = cloudid;
    }
}