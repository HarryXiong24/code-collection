-- SQL12 高级操作符练习 (2)
-- 描述
-- 题目：现在运营想要找到学校为北大或GPA在3.7以上(不包括3.7)的用户进行调研，请你取出相关数据（使用OR实现）
-- 示例：user_profile
-- id	device_id	gender	age	university	gpa
-- 1	2138	male	21	北京大学	3.4
-- 2	3214	male	
-- 复旦大学	4.0
-- 3	6543	female	20	北京大学	3.2
-- 4	2315	female	23	浙江大学	3.6
-- 5	5432	male	25	山东大学	3.8
-- 根据输入，你的查询应返回以下结果：
-- device_id	gender	age	university	gpa
-- 2138	male	21	北京大学	3.4
-- 3214	male	
-- 复旦大学	4.0
-- 6543	female	20	北京大学	3.2
-- 5432	male	25	山东大学	3.8
-- 示例1
-- 输入：
-- drop table if exists user_profile;
-- CREATE TABLE `user_profile` (
-- `id` int NOT NULL,
-- `device_id` int NOT NULL,
-- `gender` varchar(14) NOT NULL,
-- `age` int ,
-- `university` varchar(32) NOT NULL,
-- `province` varchar(32)  NOT NULL,
-- `gpa` float);
-- INSERT INTO user_profile VALUES(1,2138,'male',21,'北京大学','BeiJing',3.4);
-- INSERT INTO user_profile VALUES(2,3214,'male',null,'复旦大学','Shanghai',4.0);
-- INSERT INTO user_profile VALUES(3,6543,'female',20,'北京大学','BeiJing',3.2);
-- INSERT INTO user_profile VALUES(4,2315,'female',23,'浙江大学','ZheJiang',3.6);
-- INSERT INTO user_profile VALUES(5,5432,'male',25,'山东大学','Shandong',3.8);
-- 复制
-- 输出：
-- 2138|male|21|北京大学|3.4
-- 3214|male|None|复旦大学|4.0
-- 6543|female|20|北京大学|3.2
-- 5432|male|25|山东大学|3.8
select
  device_id,
  gender,
  age,
  university,
  gpa
from
  user_profile
where
  university = "北京大学"
  or gpa > 3.7