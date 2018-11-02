package com.cloud.cc.vo;

import java.util.Date;

public class TaskDeviceAss {
    private Integer tdaid;

    private Integer taskid;

    private Integer deviceid;

    private Integer dotimes;

    private Date createtime;

    private Integer userid;

    public Integer getTdaid() {
        return tdaid;
    }

    public void setTdaid(Integer tdaid) {
        this.tdaid = tdaid;
    }

    public Integer getTaskid() {
        return taskid;
    }

    public void setTaskid(Integer taskid) {
        this.taskid = taskid;
    }

    public Integer getDeviceid() {
        return deviceid;
    }

    public void setDeviceid(Integer deviceid) {
        this.deviceid = deviceid;
    }

    public Integer getDotimes() {
        return dotimes;
    }

    public void setDotimes(Integer dotimes) {
        this.dotimes = dotimes;
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