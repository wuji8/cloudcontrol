package com.cloud.cc.vo;

public class QrCell {
    private Integer cellid;

    private Integer wallid;

    private String udid;

    private Integer sortno;

    public Integer getCellid() {
        return cellid;
    }

    public void setCellid(Integer cellid) {
        this.cellid = cellid;
    }

    public Integer getWallid() {
        return wallid;
    }

    public void setWallid(Integer wallid) {
        this.wallid = wallid;
    }

    public String getUdid() {
        return udid;
    }

    public void setUdid(String udid) {
        this.udid = udid == null ? null : udid.trim();
    }

    public Integer getSortno() {
        return sortno;
    }

    public void setSortno(Integer sortno) {
        this.sortno = sortno;
    }
}