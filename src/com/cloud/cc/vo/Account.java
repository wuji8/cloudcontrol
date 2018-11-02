package com.cloud.cc.vo;

import java.util.Date;

public class Account {
    private Integer accid;

    private String account;

    private String pass;

    private Integer userid;

    private String cuid;

    private Date createtime;

    private String apoint;

    public Integer getAccid() {
        return accid;
    }

    public void setAccid(Integer accid) {
        this.accid = accid;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account == null ? null : account.trim();
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass == null ? null : pass.trim();
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getCuid() {
        return cuid;
    }

    public void setCuid(String cuid) {
        this.cuid = cuid == null ? null : cuid.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public String getApoint() {
        return apoint;
    }

    public void setApoint(String apoint) {
        this.apoint = apoint == null ? null : apoint.trim();
    }
}