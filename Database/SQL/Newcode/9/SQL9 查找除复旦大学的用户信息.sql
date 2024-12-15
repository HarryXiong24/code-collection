-- SQL9 查找除复旦大学的用户信息
-- 描述
-- 题目：现在运营想要查看除复旦大学以外的所有用户明细包括的字段有 device_id、gender、age、university，请你取出相应数据
-- 示例：user_profile
-- id	device_id	gender	age	university	province
-- 1	2138	male	21	北京大学	Beijing
-- 2	3214	male	
-- 复旦大学	Shanghai
-- 3	6543	female	20	北京大学	Beijing
-- 4	2315	female	23	浙江大学	ZheJiang
-- 5	5432	male	25	山东大学	Shandong
-- 根据输入，你的查询应返回以下结果：
-- device_id	gender	age	university
-- 2138	male	21	北京大学
-- 6543	female	20	北京大学
-- 2315	female	23	浙江大学
-- 5432	male	25	山东大学
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
-- 2138|male|21|北京大学
-- 6543|female|20|北京大学
-- 2315|female|23|浙江大学
-- 5432|male|25|山东大学
select
  device_id,
  gender,
  age,
  university
from
  user_profile
where
  university != "复旦大学"