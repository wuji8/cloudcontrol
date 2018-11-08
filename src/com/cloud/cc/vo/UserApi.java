package com.cloud.cc.vo;

import java.util.Date;

public class UserApi {
    private Integer apiid;

    private Integer type;

    private Integer tableid;

    private String api;

    private String guid;

    private Integer paramnum;

    private String apijson;
    
    private UserTable userTable;
    
    private Integer limitTop;
    
    public Integer getLimitTop() {
		return limitTop;
	}

	public void setLimitTop(Integer limitTop) {
		this.limitTop = limitTop;
	}

	private CloudProjects cloudProject;

    public CloudProjects getCloudProject() {
		return cloudProject;
	}

	public void setCloudProject(CloudProjects cloudProject) {
		this.cloudProject = cloudProject;
	}

	public UserTable getUserTable() {
		return userTable;
	}

	public void setUserTable(UserTable userTable) {
		this.userTable = userTable;
	}

	private String sqlquery;

    private Integer userid;

    private Date createtime;

    private String apiname;

    private Integer blocktime;

    private String prop;

    public Integer getApiid() {
        return apiid;
    }

    public void setApiid(Integer apiid) {
        this.apiid = apiid;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getTableid() {
        return tableid;
    }

    public void setTableid(Integer tableid) {
        this.tableid = tableid;
    }

    public String getApi() {
        return api;
    }

    public void setApi(String api) {
        this.api = api == null ? null : api.trim();
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid == null ? null : guid.trim();
    }

    public Integer getParamnum() {
        return paramnum;
    }

    public void setParamnum(Integer paramnum) {
        this.paramnum = paramnum;
    }

    public String getApijson() {
        return apijson;
    }

    public void setApijson(String apijson) {
        this.apijson = apijson == null ? null : apijson.trim();
    }

    public String getSqlquery() {
        return sqlquery;
    }

    public void setSqlquery(String sqlquery) {
        this.sqlquery = sqlquery == null ? null : sqlquery.trim();
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public String getApiname() {
        return apiname;
    }

    public void setApiname(String apiname) {
        this.apiname = apiname == null ? null : apiname.trim();
    }

    public Integer getBlocktime() {
        return blocktime;
    }

    public void setBlocktime(Integer blocktime) {
        this.blocktime = blocktime;
    }

    public String getProp() {
        return prop;
    }

    public void setProp(String prop) {
        this.prop = prop == null ? null : prop.trim();
    }
}