package com.cloud.cc.vo;

import java.math.BigDecimal;
import java.util.Date;

public class UserAddits {
    private Integer uaid;

    private Integer userid;

    private BigDecimal additvalue;

    private Date addittime;

    private Integer addittype;

    private Date updatetime;

    public Integer getUaid() {
        return uaid;
    }

    public void setUaid(Integer uaid) {
        this.uaid = uaid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public BigDecimal getAdditvalue() {
        return additvalue;
    }

    public void setAdditvalue(BigDecimal additvalue) {
        this.additvalue = additvalue;
    }

    public Date getAddittime() {
        return addittime;
    }

    public void setAddittime(Date addittime) {
        this.addittime = addittime;
    }

    public Integer getAddittype() {
        return addittype;
    }

    public void setAddittype(Integer addittype) {
        this.addittype = addittype;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }
}