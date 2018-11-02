package com.cloud.cc.vo;

import java.util.Date;

public class UserProps {
    private Integer upropid;

    private String email;

    private String phone;

    private Integer coins;

    private Date regtime;

    private String regip;

    private String ulogo;

    private Integer sex;

    private String lastip;

    private Integer times;

    private Integer questionid1;

    private Integer questionid2;

    private Integer questionid3;

    private String answer1;

    private String answer2;

    private String answer3;

    private Integer userid;

    public Integer getUpropid() {
        return upropid;
    }

    public void setUpropid(Integer upropid) {
        this.upropid = upropid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public Integer getCoins() {
        return coins;
    }

    public void setCoins(Integer coins) {
        this.coins = coins;
    }

    public Date getRegtime() {
        return regtime;
    }

    public void setRegtime(Date regtime) {
        this.regtime = regtime;
    }

    public String getRegip() {
        return regip;
    }

    public void setRegip(String regip) {
        this.regip = regip == null ? null : regip.trim();
    }

    public String getUlogo() {
        return ulogo;
    }

    public void setUlogo(String ulogo) {
        this.ulogo = ulogo == null ? null : ulogo.trim();
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getLastip() {
        return lastip;
    }

    public void setLastip(String lastip) {
        this.lastip = lastip == null ? null : lastip.trim();
    }

    public Integer getTimes() {
        return times;
    }

    public void setTimes(Integer times) {
        this.times = times;
    }

    public Integer getQuestionid1() {
        return questionid1;
    }

    public void setQuestionid1(Integer questionid1) {
        this.questionid1 = questionid1;
    }

    public Integer getQuestionid2() {
        return questionid2;
    }

    public void setQuestionid2(Integer questionid2) {
        this.questionid2 = questionid2;
    }

    public Integer getQuestionid3() {
        return questionid3;
    }

    public void setQuestionid3(Integer questionid3) {
        this.questionid3 = questionid3;
    }

    public String getAnswer1() {
        return answer1;
    }

    public void setAnswer1(String answer1) {
        this.answer1 = answer1 == null ? null : answer1.trim();
    }

    public String getAnswer2() {
        return answer2;
    }

    public void setAnswer2(String answer2) {
        this.answer2 = answer2 == null ? null : answer2.trim();
    }

    public String getAnswer3() {
        return answer3;
    }

    public void setAnswer3(String answer3) {
        this.answer3 = answer3 == null ? null : answer3.trim();
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }
}