package com.cloud.cc.vo;

import java.util.Date;

public class RoleRelation {
    private Integer rlId;

    private Integer roleId;

    private Integer relationId;

    private Date createtime;
    
    private Integer userId;

    public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getRlId() {
        return rlId;
    }

    public void setRlId(Integer rlId) {
        this.rlId = rlId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getRelationId() {
        return relationId;
    }

    public void setRelationId(Integer relationId) {
        this.relationId = relationId;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }
}