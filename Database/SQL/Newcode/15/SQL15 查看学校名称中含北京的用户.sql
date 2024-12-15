-- SQL15 查看学校名称中含北京的用户
-- 描述
-- 题目：现在运营想查看所有大学中带有"北京"的用户的信息(device_id,age,university)，请你取出相应数据。
-- 示例：用户信息表：user_profile
-- id	device_id	gender	age	university	gpa
-- 1	2138	male	21	北京大学	3.4
-- 2	3214	male	
-- 复旦大学	4.0
-- 3	6543	female	20	北京大学	3.2
-- 4	2315	female	23	浙江大学	3.6
-- 5	5432	male	25	山东大学	3.8
-- 6	2131	male	28	北京师范大学	3.3
-- 根据示例，你的查询应返回如下结果：
-- device_id	age	university
-- 2138	21	北京大学
-- 6543	20	北京大学
-- 2131	28	北京师范大学
-- 示例1
-- 输入：
-- drop table if exists user_profile;
-- CREATE TABLE `user_profile` (
-- `id` int NOT NULL,
-- `device_id` int NOT NULL,
-- `gender` varchar(14) NOT NULL,
-- `age` int ,
-- `university` varchar(32) NOT NULL,
-- `gpa` float);
-- INSERT INTO user_profile VALUES(1,2138,'male',21,'北京大学',3.4);
-- INSERT INTO user_profile VALUES(2,3214,'male',null,'复旦大学',4.0);
-- INSERT INTO user_profile VALUES(3,6543,'female',20,'北京大学',3.2);
-- INSERT INTO user_profile VALUES(4,2315,'female',23,'浙江大学',3.6);
-- INSERT INTO user_profile VALUES(5,5432,'male',25,'山东大学',3.8);
-- INSERT INTO user_profile VALUES(6,2131,'male',28,'北京师范大学',3.3);
-- 复制
-- 输出：
-- 2138|21|北京大学
-- 6543|20|北京大学
-- 2131|28|北京师范大学
select
  device_id,
  age,
  university
from
  user_profile
where
  university like "%北京%"