/*
Navicat MySQL Data Transfer

Source Server         : database
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : shop

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-01-12 13:35:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for card
-- ----------------------------
DROP TABLE IF EXISTS `card`;
CREATE TABLE `card` (
  `goodsid` int(10) unsigned NOT NULL COMMENT '商品id',
  `user` int(10) unsigned NOT NULL COMMENT '用户id',
  `addtime` datetime NOT NULL,
  `num` int(11) NOT NULL COMMENT '数量',
  `type` int(1) unsigned NOT NULL,
  UNIQUE KEY `card_index3` (`goodsid`,`user`,`type`) USING BTREE,
  KEY `card_index1` (`goodsid`) USING BTREE,
  KEY `card_index2` (`user`) USING BTREE,
  KEY `card_index4` (`addtime`) USING BTREE,
  CONSTRAINT `card_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `card_ibfk_2` FOREIGN KEY (`goodsid`) REFERENCES `platform` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of card
-- ----------------------------
INSERT INTO `card` VALUES ('4', '1', '2018-01-11 17:23:45', '1', '1');

-- ----------------------------
-- Table structure for platform
-- ----------------------------
DROP TABLE IF EXISTS `platform`;
CREATE TABLE `platform` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `name` varchar(22) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品名',
  `price` float(10,2) NOT NULL COMMENT '商品价格',
  `type` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品类型',
  `img` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品图片',
  PRIMARY KEY (`id`),
  KEY `platform1` (`name`) USING BTREE,
  KEY `platform2` (`price`) USING BTREE,
  KEY `platform3` (`type`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of platform
-- ----------------------------
INSERT INTO `platform` VALUES ('1', '爱普诗巧克力礼盒', '6.00', '辣条', '1.png');
INSERT INTO `platform` VALUES ('4', '比利时进口酒心巧克力', '12.00', '巧克力', '2.png');
INSERT INTO `platform` VALUES ('5', '丹麦进口蓝罐曲奇', '13.00', '曲奇', '3.png');
INSERT INTO `platform` VALUES ('6', '丹麦曲奇', '15.00', '曲奇', '4.png');
INSERT INTO `platform` VALUES ('7', '费列罗糖果巧克力礼盒', '18.00', '巧克力', '5.png');
INSERT INTO `platform` VALUES ('8', '国产巧克力礼盒', '20.00', '巧克力', '6.png');
INSERT INTO `platform` VALUES ('9', '韩国进口迷你海苔', '17.00', '海苔', '7.png');
INSERT INTO `platform` VALUES ('10', '韩国进口清净园海苔', '15.00', '海苔', '8.png');
INSERT INTO `platform` VALUES ('11', '金贝壳巧克力贝壳', '22.00', '巧克力', '9.png');
INSERT INTO `platform` VALUES ('12', '马来西亚进口麦阿斯曲奇', '33.00', '曲奇', '10.png');
INSERT INTO `platform` VALUES ('13', '美国进口精选坚果', '25.00', '坚果', '11.png');
INSERT INTO `platform` VALUES ('14', '美国进口夹心饼干', '22.00', '饼干', '12.png');
INSERT INTO `platform` VALUES ('15', '牛扎饼', '15.00', '饼干', '13.png');
INSERT INTO `platform` VALUES ('16', '泰国进口混合坚果', '16.00', '坚果', '14.png');
INSERT INTO `platform` VALUES ('17', '泰国进口榴莲干', '18.00', '水果干', '15.png');
INSERT INTO `platform` VALUES ('18', '蛮脆果', '15.00', '水果干', '16.png');
INSERT INTO `platform` VALUES ('19', '威化饼干', '14.00', '饼干', '17.png');
INSERT INTO `platform` VALUES ('20', '香蕉片', '18.00', '水果干', '18.png');
INSERT INTO `platform` VALUES ('21', '榛仁夹心饼干', '20.00', '饼干', '19.png');
INSERT INTO `platform` VALUES ('22', '意大利进口芝士蛋卷', '22.00', '蛋卷', '20.png');
INSERT INTO `platform` VALUES ('23', '张君雅小妹妹休闲零食', '36.00', '零食', '21.png');

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `goodsid` int(10) unsigned NOT NULL,
  `time` datetime NOT NULL,
  `num` int(11) unsigned NOT NULL,
  `user` int(10) unsigned NOT NULL,
  `type` int(1) unsigned NOT NULL,
  KEY `record_index1` (`goodsid`) USING BTREE,
  KEY `record_index2` (`time`) USING BTREE,
  KEY `record_index4` (`num`) USING BTREE,
  KEY `record_key1` (`user`),
  KEY `record_index3` (`type`) USING BTREE,
  CONSTRAINT `record_key1` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES ('1', '2017-12-26 10:01:34', '1', '2', '1');
INSERT INTO `record` VALUES ('4', '2017-12-26 10:01:34', '1', '1', '1');
INSERT INTO `record` VALUES ('1', '2017-12-26 14:31:30', '1', '1', '1');
INSERT INTO `record` VALUES ('4', '2017-12-26 14:31:30', '1', '1', '1');
INSERT INTO `record` VALUES ('1', '2017-12-28 18:11:39', '1', '1', '1');
INSERT INTO `record` VALUES ('4', '2017-12-28 18:11:39', '1', '1', '1');
INSERT INTO `record` VALUES ('6', '2017-12-28 18:11:39', '1', '1', '1');
INSERT INTO `record` VALUES ('1', '2017-12-29 09:51:41', '22', '1', '1');
INSERT INTO `record` VALUES ('4', '2017-12-29 09:51:41', '22', '1', '1');
INSERT INTO `record` VALUES ('1', '2018-01-02 15:37:15', '5', '1', '1');
INSERT INTO `record` VALUES ('4', '2018-01-02 15:37:15', '1', '1', '1');
INSERT INTO `record` VALUES ('1', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('4', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('5', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('6', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('7', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('8', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('9', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('10', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('11', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('12', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('13', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('14', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('23', '2018-01-02 16:02:13', '100', '1', '1');
INSERT INTO `record` VALUES ('1', '2018-01-03 15:41:01', '1', '1', '1');
INSERT INTO `record` VALUES ('4', '2018-01-03 15:41:01', '22', '1', '1');
INSERT INTO `record` VALUES ('4', '2018-01-03 16:10:08', '20', '1', '2');
INSERT INTO `record` VALUES ('1', '2018-01-03 17:50:53', '1', '1', '1');
INSERT INTO `record` VALUES ('1', '2018-01-03 18:07:49', '1', '1', '2');
INSERT INTO `record` VALUES ('1', '2018-01-03 18:26:42', '1', '1', '2');
INSERT INTO `record` VALUES ('1', '2018-01-03 18:29:50', '1', '1', '2');
INSERT INTO `record` VALUES ('4', '2018-01-03 18:30:01', '1', '1', '2');
INSERT INTO `record` VALUES ('1', '2018-01-04 11:43:11', '1', '1', '1');
INSERT INTO `record` VALUES ('4', '2018-01-04 11:43:11', '1', '1', '1');
INSERT INTO `record` VALUES ('5', '2018-01-04 11:43:11', '1', '1', '1');
INSERT INTO `record` VALUES ('1', '2018-01-09 17:57:13', '1', '1', '2');
INSERT INTO `record` VALUES ('1', '2018-01-09 17:58:17', '2', '1', '1');
INSERT INTO `record` VALUES ('1', '2018-01-09 17:58:40', '1', '1', '1');
INSERT INTO `record` VALUES ('1', '2018-01-09 18:11:27', '3', '1', '2');
INSERT INTO `record` VALUES ('1', '2018-01-09 18:18:19', '1', '1', '1');
INSERT INTO `record` VALUES ('1', '2018-01-09 18:18:55', '1', '1', '2');
INSERT INTO `record` VALUES ('1', '2018-01-09 18:19:27', '1', '1', '1');
INSERT INTO `record` VALUES ('1', '2018-01-09 18:19:52', '1', '1', '1');
INSERT INTO `record` VALUES ('1', '2018-01-09 18:20:03', '2', '1', '2');
INSERT INTO `record` VALUES ('1', '2018-01-09 18:20:34', '1', '1', '1');
INSERT INTO `record` VALUES ('1', '2018-01-09 18:20:53', '1', '1', '2');
INSERT INTO `record` VALUES ('4', '2018-01-09 18:23:00', '1', '1', '2');
INSERT INTO `record` VALUES ('4', '2018-01-09 18:35:14', '1', '1', '2');
INSERT INTO `record` VALUES ('4', '2018-01-09 18:35:23', '1', '1', '2');
INSERT INTO `record` VALUES ('4', '2018-01-10 09:50:17', '1', '1', '2');
INSERT INTO `record` VALUES ('4', '2018-01-10 11:59:25', '1', '1', '2');
INSERT INTO `record` VALUES ('4', '2018-01-10 12:01:29', '1', '1', '2');
INSERT INTO `record` VALUES ('4', '2018-01-10 12:01:39', '1', '1', '4');
INSERT INTO `record` VALUES ('4', '2018-01-10 12:01:57', '1', '1', '2');
INSERT INTO `record` VALUES ('4', '2018-01-10 12:50:07', '1', '1', '2');
INSERT INTO `record` VALUES ('4', '2018-01-10 12:51:42', '1', '1', '2');
INSERT INTO `record` VALUES ('4', '2018-01-10 12:51:57', '1', '1', '2');
INSERT INTO `record` VALUES ('4', '2018-01-10 12:52:06', '1', '1', '2');

-- ----------------------------
-- Table structure for store
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `goodsid` int(10) unsigned NOT NULL,
  `num` int(10) unsigned NOT NULL,
  `addtime` datetime DEFAULT NULL,
  `nulltime` datetime DEFAULT NULL,
  `user` int(10) unsigned NOT NULL,
  `isSale` int(2) NOT NULL,
  `salePrice` float(10,2) unsigned DEFAULT NULL,
  UNIQUE KEY `store_index3` (`goodsid`,`user`),
  KEY `store_index1` (`addtime`) USING BTREE,
  KEY `store_index2` (`nulltime`) USING BTREE,
  KEY `store_key1` (`user`),
  KEY `store_index4` (`isSale`) USING BTREE,
  CONSTRAINT `store_key1` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of store
-- ----------------------------
INSERT INTO `store` VALUES ('1', '0', '2018-01-09 18:20:34', '2018-01-09 18:20:53', '1', '0', '12.00');
INSERT INTO `store` VALUES ('4', '57', '2018-01-04 11:43:11', null, '1', '1', '111.00');
INSERT INTO `store` VALUES ('4', '1', '2018-01-02 15:37:15', null, '2', '0', null);
INSERT INTO `store` VALUES ('5', '221', '2018-01-04 11:43:11', null, '1', '1', '22.00');
INSERT INTO `store` VALUES ('6', '100', '2018-01-02 16:02:13', null, '1', '1', '33.00');
INSERT INTO `store` VALUES ('7', '100', '2018-01-02 16:02:13', null, '1', '1', '22.00');
INSERT INTO `store` VALUES ('8', '100', '2018-01-02 16:02:13', null, '1', '1', '22.00');
INSERT INTO `store` VALUES ('9', '100', '2018-01-02 16:02:13', null, '1', '1', '22.00');
INSERT INTO `store` VALUES ('10', '100', '2018-01-02 16:02:13', null, '1', '1', '22.00');
INSERT INTO `store` VALUES ('11', '100', '2018-01-02 16:02:13', null, '1', '1', '23.00');
INSERT INTO `store` VALUES ('12', '100', '2018-01-02 16:02:13', null, '1', '1', '44.00');
INSERT INTO `store` VALUES ('13', '100', '2018-01-02 16:02:13', null, '1', '1', '26.00');
INSERT INTO `store` VALUES ('14', '100', '2018-01-02 16:02:13', null, '1', '1', '24.00');
INSERT INTO `store` VALUES ('23', '100', '2018-01-02 16:02:13', null, '1', '1', '44.00');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `user_password` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户密码',
  PRIMARY KEY (`user_id`),
  KEY `user_name` (`user_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '小明', '123');
INSERT INTO `user` VALUES ('2', '小花', '123');
