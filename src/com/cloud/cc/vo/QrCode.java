package com.cloud.cc.vo;

import java.util.Date;

public class QrCode {
    private Integer qrid;

    private String url;

    private String udid;

    private Integer taskid;

    private String codeimg;

    private Integer status;

    private Date createtime;

    public Integer getQrid() {
        return qrid;
    }

    public void setQrid(Integer qrid) {
        this.qrid = qrid;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }

    public String getUdid() {
        return udid;
    }

    public void setUdid(String udid) {
        this.udid = udid == null ? null : udid.trim();
    }

    public Integer getTaskid() {
        return taskid;
    }

    public void setTaskid(Integer taskid) {
        this.taskid = taskid;
    }

    public String getCodeimg() {
        return codeimg;
    }

    public void setCodeimg(String codeimg) {
        this.codeimg = codeimg == null ? null : codeimg.trim();
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
}