package com.cloud.cc.vo;

import java.math.BigDecimal;
import java.util.Date;

public class Additionals {
    private Integer additid;

    private String additname;

    private Date expiretime;

    private Integer additvalue;

    private BigDecimal price;

    private String remark;

    private Integer addittype;

    public Integer getAdditid() {
        return additid;
    }

    public void setAdditid(Integer additid) {
        this.additid = additid;
    }

    public String getAdditname() {
        return additname;
    }

    public void setAdditname(String additname) {
        this.additname = additname == null ? null : additname.trim();
    }

    public Date getExpiretime() {
        return expiretime;
    }

    public void setExpiretime(Date expiretime) {
        this.expiretime = expiretime;
    }

    public Integer getAdditvalue() {
        return additvalue;
    }

    public void setAdditvalue(Integer additvalue) {
        this.additvalue = additvalue;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public Integer getAddittype() {
        return addittype;
    }

    public void setAddittype(Integer addittype) {
        this.addittype = addittype;
    }
}