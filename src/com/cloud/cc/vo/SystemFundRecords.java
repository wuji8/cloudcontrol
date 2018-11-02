package com.cloud.cc.vo;

import java.math.BigDecimal;
import java.util.Date;

public class SystemFundRecords {
    private Integer fundid;

    private String fundcode;

    private Integer type;

    private String ordercode;

    private BigDecimal capital;

    private Date fundtime;

    public Integer getFundid() {
        return fundid;
    }

    public void setFundid(Integer fundid) {
        this.fundid = fundid;
    }

    public String getFundcode() {
        return fundcode;
    }

    public void setFundcode(String fundcode) {
        this.fundcode = fundcode == null ? null : fundcode.trim();
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getOrdercode() {
        return ordercode;
    }

    public void setOrdercode(String ordercode) {
        this.ordercode = ordercode == null ? null : ordercode.trim();
    }

    public BigDecimal getCapital() {
        return capital;
    }

    public void setCapital(BigDecimal capital) {
        this.capital = capital;
    }

    public Date getFundtime() {
        return fundtime;
    }

    public void setFundtime(Date fundtime) {
        this.fundtime = fundtime;
    }
}