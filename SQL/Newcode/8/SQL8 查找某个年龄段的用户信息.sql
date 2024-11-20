-- SQL8 查找某个年龄段的用户信息
-- 描述
-- 题目：现在运营想要针对20岁及以上且23岁及以下的用户开展分析，请你取出满足条件的设备ID、性别、年龄。
-- 用户信息表：user_profile
-- id	device_id	gender	age	university	province
-- 1	2138	male	21	北京大学	Beijing
-- 2	3214	male	
-- 复旦大学	Shanghai
-- 3	6543	female	20	北京大学	Beijing
-- 4	2315	female	23	浙江大学	ZheJiang
-- 5	5432	male	25	山东大学	Shandong
-- 根据输入，你的查询应返回以下结果：
-- device_id	gender	age
-- 2138	male	21
-- 6543	female	20
-- 2315	female	23
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
-- 2138|male|21
-- 6543|female|20
-- 2315|female|23
select
  device_id,
  gender,
  age
from
  user_profile
where
  age >= 20
  and age <= 23