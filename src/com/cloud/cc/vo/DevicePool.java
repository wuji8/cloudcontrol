package com.cloud.cc.vo;

import java.util.Date;

public class DevicePool {
    private Integer dpid;

    private String udid;

    private Integer userid;

    private Date createtime;

    public Integer getDpid() {
        return dpid;
    }

    public void setDpid(Integer dpid) {
        this.dpid = dpid;
    }

    public String getUdid() {
        return udid;
    }

    public void setUdid(String udid) {
        this.udid = udid == null ? null : udid.trim();
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
}