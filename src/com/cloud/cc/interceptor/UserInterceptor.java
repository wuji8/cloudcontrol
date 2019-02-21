package com.cloud.cc.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.cloud.cc.tools.ResPrint;
import com.cloud.cc.vo.Users;

public class UserInterceptor implements HandlerInterceptor{

	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object arg2, ModelAndView arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) throws Exception {
		// TODO Auto-generated method stub
		Users user=(Users)request.getSession().getAttribute("user");
		if(user==null){
			ResPrint.print("您还未登录，请登录", 500, response);
			return false;
		}
		if(user.getStatus()!=1){
			ResPrint.print("您账号已冻结", 502, response);
			return false;
		}
		return true;
	}

}
