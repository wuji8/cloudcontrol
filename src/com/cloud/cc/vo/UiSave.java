package com.cloud.cc.vo;

public class UiSave {
    private Integer uisid;

    private Integer uitid;

    private Integer userid;

    private Integer taskid;

    private String uisave;

    public Integer getUisid() {
        return uisid;
    }

    public void setUisid(Integer uisid) {
        this.uisid = uisid;
    }

    public Integer getUitid() {
        return uitid;
    }

    public void setUitid(Integer uitid) {
        this.uitid = uitid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Integer getTaskid() {
        return taskid;
    }

    public void setTaskid(Integer taskid) {
        this.taskid = taskid;
    }

    public String getUisave() {
        return uisave;
    }

    public void setUisave(String uisave) {
        this.uisave = uisave == null ? null : uisave.trim();
    }
}