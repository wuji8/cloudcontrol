/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.5.40 : Database - cloundcontrol
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cloundcontrol` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `cloundcontrol`;

/*Table structure for table `account` */

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `accid` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `cuId` varchar(50) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `apoint` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`accid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `account` */

/*Table structure for table `additionals` */

DROP TABLE IF EXISTS `additionals`;

CREATE TABLE `additionals` (
  `additId` int(11) NOT NULL AUTO_INCREMENT,
  `additName` text,
  `expiretime` datetime DEFAULT NULL,
  `additvalue` int(11) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `remark` text,
  `additType` int(11) DEFAULT NULL,
  PRIMARY KEY (`additId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `additionals` */

/*Table structure for table `bvkn6fqq` */

DROP TABLE IF EXISTS `bvkn6fqq`;

CREATE TABLE `bvkn6fqq` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lockingTime` datetime DEFAULT NULL,
  `zxczve` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

/*Data for the table `bvkn6fqq` */

insert  into `bvkn6fqq`(`id`,`lockingTime`,`zxczve`) values (44,'2019-03-09 17:19:58',0),(45,'2019-03-09 17:14:47',0);

/*Table structure for table `cloudprojects` */

DROP TABLE IF EXISTS `cloudprojects`;

CREATE TABLE `cloudprojects` (
  `cloudId` int(11) NOT NULL AUTO_INCREMENT,
  `cloudName` varchar(50) DEFAULT NULL,
  `cuid` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `createTime` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`cloudId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `cloudprojects` */

/*Table structure for table `devicepool` */

DROP TABLE IF EXISTS `devicepool`;

CREATE TABLE `devicepool` (
  `dpId` int(11) NOT NULL AUTO_INCREMENT,
  `udId` varchar(50) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`dpId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `devicepool` */

/*Table structure for table `devices` */

DROP TABLE IF EXISTS `devices`;

CREATE TABLE `devices` (
  `deviceId` int(11) NOT NULL AUTO_INCREMENT,
  `UDID` varchar(50) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `IP` varchar(50) DEFAULT NULL,
  `liveTime` datetime DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `lastTask` int(11) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`deviceId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `devices` */

/*Table structure for table `group` */

DROP TABLE IF EXISTS `group`;

CREATE TABLE `group` (
  `groupId` int(11) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(50) DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`groupId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `group` */

insert  into `group`(`groupId`,`groupName`,`remark`,`userId`,`createTime`) values (1,'ghj',NULL,9,'2019-03-02 18:41:26'),(2,'dfg',NULL,9,'2019-03-02 18:42:09'),(4,'sad',NULL,1,'2019-03-04 12:23:07'),(7,'dfgdf',NULL,9,'2019-03-05 18:32:42');

/*Table structure for table `logs` */

DROP TABLE IF EXISTS `logs`;

CREATE TABLE `logs` (
  `logId` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `content` text,
  `createtime` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`logId`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;

/*Data for the table `logs` */

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL AUTO_INCREMENT,
  `orderCode` varchar(50) DEFAULT NULL,
  `Num` int(11) DEFAULT NULL,
  `amount` decimal(8,2) DEFAULT NULL,
  `propId` int(11) DEFAULT NULL,
  `propNum` float DEFAULT NULL,
  `payType` int(11) DEFAULT NULL,
  `paySource` int(11) DEFAULT NULL,
  `tradeNo` varchar(50) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `payTime` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `orders` */

/*Table structure for table `qrcell` */

DROP TABLE IF EXISTS `qrcell`;

CREATE TABLE `qrcell` (
  `cellId` int(11) NOT NULL AUTO_INCREMENT,
  `wallId` int(11) DEFAULT NULL,
  `UDID` varchar(50) DEFAULT NULL,
  `sortNo` int(11) DEFAULT NULL,
  PRIMARY KEY (`cellId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrcell` */

/*Table structure for table `qrcode` */

DROP TABLE IF EXISTS `qrcode`;

CREATE TABLE `qrcode` (
  `qrId` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(200) DEFAULT NULL,
  `UDID` varchar(50) DEFAULT NULL,
  `taskId` int(11) DEFAULT NULL,
  `codeImg` varchar(500) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`qrId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrcode` */

/*Table structure for table `qrtask` */

DROP TABLE IF EXISTS `qrtask`;

CREATE TABLE `qrtask` (
  `taskId` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(100) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `UDID` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`taskId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrtask` */

/*Table structure for table `qrwall` */

DROP TABLE IF EXISTS `qrwall`;

CREATE TABLE `qrwall` (
  `wallId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL,
  `counts` int(11) DEFAULT NULL,
  `padding` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`wallId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `qrwall` */

/*Table structure for table `relation` */

DROP TABLE IF EXISTS `relation`;

CREATE TABLE `relation` (
  `relation_id` int(11) NOT NULL AUTO_INCREMENT,
  `relation_name` varchar(50) DEFAULT NULL,
  `relation_url` varchar(50) DEFAULT NULL,
  `relation_description` varchar(200) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`relation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `relation` */

/*Table structure for table `role_relation` */

DROP TABLE IF EXISTS `role_relation`;

CREATE TABLE `role_relation` (
  `rl_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `relation_id` int(11) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`rl_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `role_relation` */

/*Table structure for table `softcode` */

DROP TABLE IF EXISTS `softcode`;

CREATE TABLE `softcode` (
  `codeId` int(11) NOT NULL AUTO_INCREMENT,
  `accId` int(11) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  `taskId` varchar(100) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `assist` varchar(100) DEFAULT NULL,
  `result` int(11) DEFAULT NULL,
  PRIMARY KEY (`codeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `softcode` */

/*Table structure for table `systemfundrecords` */

DROP TABLE IF EXISTS `systemfundrecords`;

CREATE TABLE `systemfundrecords` (
  `fundId` int(11) NOT NULL AUTO_INCREMENT,
  `fundCode` varchar(100) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `orderCode` varchar(100) DEFAULT NULL,
  `capital` decimal(8,2) DEFAULT NULL,
  `fundTime` datetime DEFAULT NULL,
  PRIMARY KEY (`fundId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `systemfundrecords` */

/*Table structure for table `task` */

DROP TABLE IF EXISTS `task`;

CREATE TABLE `task` (
  `taskId` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `cloudId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `uiSave` text,
  PRIMARY KEY (`taskId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `task` */

/*Table structure for table `task_device_ass` */

DROP TABLE IF EXISTS `task_device_ass`;

CREATE TABLE `task_device_ass` (
  `tdaId` int(11) NOT NULL AUTO_INCREMENT,
  `taskId` int(11) DEFAULT NULL,
  `deviceId` int(11) DEFAULT NULL,
  `dotimes` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`tdaId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `task_device_ass` */

/*Table structure for table `uisave` */

DROP TABLE IF EXISTS `uisave`;

CREATE TABLE `uisave` (
  `uisId` int(11) NOT NULL AUTO_INCREMENT,
  `uitId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `taskId` int(11) DEFAULT NULL,
  `uisave` text,
  PRIMARY KEY (`uisId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `uisave` */

/*Table structure for table `uitable` */

DROP TABLE IF EXISTS `uitable`;

CREATE TABLE `uitable` (
  `uitId` int(11) NOT NULL AUTO_INCREMENT,
  `uitName` text,
  `createTime` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `uiJson` text,
  `cloudId` int(11) DEFAULT NULL,
  PRIMARY KEY (`uitId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `uitable` */

/*Table structure for table `useraddits` */

DROP TABLE IF EXISTS `useraddits`;

CREATE TABLE `useraddits` (
  `uaid` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `additvalue` decimal(8,2) DEFAULT NULL,
  `additTime` datetime DEFAULT NULL,
  `additType` int(11) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`uaid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `useraddits` */

/*Table structure for table `userapi` */

DROP TABLE IF EXISTS `userapi`;

CREATE TABLE `userapi` (
  `apiId` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `tableId` int(11) DEFAULT NULL,
  `api` text,
  `guid` varchar(50) DEFAULT NULL,
  `paramNum` int(11) DEFAULT NULL,
  `apiJson` text,
  `sqlQuery` text,
  `userId` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `apiName` varchar(50) DEFAULT NULL,
  `blockTime` int(11) DEFAULT NULL,
  `prop` text,
  `limitTop` int(11) DEFAULT NULL,
  PRIMARY KEY (`apiId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `userapi` */

/*Table structure for table `userprops` */

DROP TABLE IF EXISTS `userprops`;

CREATE TABLE `userprops` (
  `upropid` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `coins` int(11) DEFAULT NULL,
  `regTime` datetime DEFAULT NULL,
  `regIp` varchar(50) DEFAULT NULL,
  `Ulogo` varchar(200) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `lastIp` varchar(200) DEFAULT NULL,
  `times` int(11) DEFAULT NULL,
  `questionId1` int(11) DEFAULT NULL,
  `questionId2` int(11) DEFAULT NULL,
  `questionId3` int(11) DEFAULT NULL,
  `answer1` varchar(200) DEFAULT NULL,
  `answer2` varchar(200) DEFAULT NULL,
  `answer3` varchar(200) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`upropid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `userprops` */

/*Table structure for table `userrole` */

DROP TABLE IF EXISTS `userrole`;

CREATE TABLE `userrole` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `userrole` */

insert  into `userrole`(`role_id`,`role_name`,`parent_id`,`create_time`,`description`) values (1,'超级管理员',0,'2018-02-21 00:00:00','权限最大者'),(2,'普通用户',1,'2018-02-26 00:00:00',NULL);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) DEFAULT NULL,
  `userPass` varchar(50) DEFAULT NULL,
  `nickName` varchar(50) DEFAULT NULL,
  `token` varchar(50) DEFAULT NULL,
  `m_token` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `cloudId` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT '2',
  `ccid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`userId`,`userName`,`userPass`,`nickName`,`token`,`m_token`,`status`,`cloudId`,`role_id`,`ccid`) values (1,'admin','123456',NULL,NULL,NULL,1,8,1,'97E45E173F4446FF810CE0A91EA23499');

/*Table structure for table `usertable` */

DROP TABLE IF EXISTS `usertable`;

CREATE TABLE `usertable` (
  `tableId` int(11) NOT NULL AUTO_INCREMENT,
  `tableName` varchar(50) DEFAULT NULL,
  `dbTable` varchar(50) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `cloudId` int(11) DEFAULT NULL,
  `deleteTime` datetime DEFAULT NULL,
  `deleted` int(11) DEFAULT '0',
  PRIMARY KEY (`tableId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `usertable` */

/*Table structure for table `usertabledelete` */

DROP TABLE IF EXISTS `usertabledelete`;

CREATE TABLE `usertabledelete` (
  `utbId` int(11) NOT NULL AUTO_INCREMENT,
  `tableId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `deleteTime` datetime DEFAULT NULL,
  PRIMARY KEY (`utbId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `usertabledelete` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
