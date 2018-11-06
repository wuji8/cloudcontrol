package com.cloud.cc.vo;

import java.util.Date;

public class CloudProjects {
    private Integer cloudid;

    private String cloudname;

    private String cuid;

    private Integer status;

    private Date createtime;

    private Integer userid;

    public Integer getCloudid() {
        return cloudid;
    }

    public void setCloudid(Integer cloudid) {
        this.cloudid = cloudid;
    }

    public String getCloudname() {
        return cloudname;
    }

    public void setCloudname(String cloudname) {
        this.cloudname = cloudname == null ? null : cloudname.trim();
    }

    public String getCuid() {
        return cuid;
    }

    public void setCuid(String cuid) {
        this.cuid = cuid == null ? null : cuid.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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
}