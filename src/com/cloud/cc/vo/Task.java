package com.cloud.cc.vo;

import java.util.Date;

public class Task {
    private Integer taskid;

    private Integer cloudid;

    private Integer userid;

    private Date createtime;

    public Integer getTaskid() {
        return taskid;
    }

    public void setTaskid(Integer taskid) {
        this.taskid = taskid;
    }

    public Integer getCloudid() {
        return cloudid;
    }

    public void setCloudid(Integer cloudid) {
        this.cloudid = cloudid;
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