-- SQL4 查询结果限制返回行数
-- 描述
-- 题目：现在运营只需要查看前2个用户明细设备ID数据，请你从用户信息表 user_profile 中取出相应结果。
-- 示例：
-- id	device_id	gender	age	university	province
-- 1	2138	male	21	北京大学	Beijing
-- 2	3214	male	
-- 复旦大学	Shanghai
-- 3	6543	female	20	北京大学	Beijing
-- 4	2315	female	23	浙江大学	ZheJiang
-- 5	5432	male	25	山东大学	Shandong
-- 根据输入，你的查询应返回以下结果：
-- device_id
-- 2138
-- 3214
-- 示例1
-- 输入：
-- drop table if exists user_profile;
-- CREATE TABLE `user_profile` (
-- `id` int NOT NULL,
-- `device_id` int NOT NULL,
-- `gender` varchar(14) NOT NULL,
-- `age` int ,
-- `university` varchar(32) NOT NULL,
-- `province` varchar(32)  NOT NULL);
-- INSERT INTO user_profile VALUES(1,2138,'male',21,'北京大学','BeiJing');
-- INSERT INTO user_profile VALUES(2,3214,'male',null,'复旦大学','Shanghai');
-- INSERT INTO user_profile VALUES(3,6543,'female',20,'北京大学','BeiJing');
-- INSERT INTO user_profile VALUES(4,2315,'female',23,'浙江大学','ZheJiang');
-- INSERT INTO user_profile VALUES(5,5432,'male',25,'山东大学','Shandong');
-- 复制
-- 输出：
-- 2138
-- 3214
select
  device_id
from
  user_profile
limit
  2