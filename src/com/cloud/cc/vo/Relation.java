package com.cloud.cc.vo;

import java.util.Date;

public class Relation {
    private Integer relationId;

    private String relationName;

    private String relationUrl;

    private String relationDescription;

    private Integer parentId;

    private Date createTime;

    public Integer getRelationId() {
        return relationId;
    }

    public void setRelationId(Integer relationId) {
        this.relationId = relationId;
    }

    public String getRelationName() {
        return relationName;
    }

    public void setRelationName(String relationName) {
        this.relationName = relationName == null ? null : relationName.trim();
    }

    public String getRelationUrl() {
        return relationUrl;
    }

    public void setRelationUrl(String relationUrl) {
        this.relationUrl = relationUrl == null ? null : relationUrl.trim();
    }

    public String getRelationDescription() {
        return relationDescription;
    }

    public void setRelationDescription(String relationDescription) {
        this.relationDescription = relationDescription == null ? null : relationDescription.trim();
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}