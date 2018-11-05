package com.cloud.cc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.cloud.cc.service.DevicesService;

@Controller
public class DevicesController {

	@Autowired
	private DevicesService devicesServiceImpl;
}
