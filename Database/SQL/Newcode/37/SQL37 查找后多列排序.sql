-- SQL37 查找后多列排序
-- 描述
-- 题目：现在运营想要取出用户信息表中的device_id、年龄和gpa数据，并先按照gpa升序排序，再按照年龄升序排序输出，请取出相应数据。
-- 用户信息表：user_profile
-- id	device_id	gender	age	university	gpa
-- 1	2138	male	21	北京大学	3.4
-- 2	3214	male	23	复旦大学	4
-- 3	6543	female	20	北京大学	3.2
-- 4	2315	female	23	浙江大学	3.6
-- 5	5432	male	25	山东大学	3.8
-- 6	2131	male	28	北京师范大学	3.3
-- 你的查询应返回以下结果：
-- device_id	gpa	age
-- 6534	3.2	20
-- 2131	3.3	28
-- 2138	3.4	21
-- 2315	3.6	23
-- 5432	3.8	25
-- 3214	4	23
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
-- INSERT INTO user_profile VALUES(2,3214,'male',23,'复旦大学',4.0);
-- INSERT INTO user_profile VALUES(3,6543,'female',20,'北京大学',3.2);
-- INSERT INTO user_profile VALUES(4,2315,'female',23,'浙江大学',3.6);
-- INSERT INTO user_profile VALUES(5,5432,'male',25,'山东大学',3.8);
-- INSERT INTO user_profile VALUES(6,2131,'male',28,'北京师范大学',3.3);
-- 复制
-- 输出：
-- 6543|3.200|20
-- 2131|3.300|28
-- 2138|3.400|21
-- 2315|3.600|23
-- 5432|3.800|25
-- 3214|4.000|23
select
  device_id,
  gpa,
  age
from
  user_profile
order by
  gpa asc,
  age asc