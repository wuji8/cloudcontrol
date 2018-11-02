package com.cloud.cc.vo;

import java.util.Date;

public class Devices {
    private Integer deviceid;

    private String udid;

    private String remark;

    private String ip;

    private Date livetime;

    private Integer status;

    private Integer lasttask;

    private Integer groupid;

    private Integer userid;

    private Date createtime;

    public Integer getDeviceid() {
        return deviceid;
    }

    public void setDeviceid(Integer deviceid) {
        this.deviceid = deviceid;
    }

    public String getUdid() {
        return udid;
    }

    public void setUdid(String udid) {
        this.udid = udid == null ? null : udid.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip == null ? null : ip.trim();
    }

    public Date getLivetime() {
        return livetime;
    }

    public void setLivetime(Date livetime) {
        this.livetime = livetime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getLasttask() {
        return lasttask;
    }

    public void setLasttask(Integer lasttask) {
        this.lasttask = lasttask;
    }

    public Integer getGroupid() {
        return groupid;
    }

    public void setGroupid(Integer groupid) {
        this.groupid = groupid;
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