package com.cloud.cc.vo;

import java.util.Date;

public class UserRole {
    private Integer roleId;

    private String roleName;

    private Integer parentId;

    private Date createTime;

    private String description;
    
    private Relation relation;
    private RoleRelation roleRelation;

    public Relation getRelation() {
		return relation;
	}

	public void setRelation(Relation relation) {
		this.relation = relation;
	}

	public RoleRelation getRoleRelation() {
		return roleRelation;
	}

	public void setRoleRelation(RoleRelation roleRelation) {
		this.roleRelation = roleRelation;
	}

	public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }
}