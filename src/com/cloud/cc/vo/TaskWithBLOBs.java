package com.cloud.cc.vo;

public class TaskWithBLOBs extends Task {
    private String content;

    private String uisave;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public String getUisave() {
        return uisave;
    }

    public void setUisave(String uisave) {
        this.uisave = uisave == null ? null : uisave.trim();
    }
}