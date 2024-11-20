-- SQL21 浙江大学用户题目回答情况
-- 描述
-- 题目：现在运营想要查看所有来自浙江大学的用户题目回答明细情况，请你取出相应数据
-- 示例 ：question_practice_detail
-- id	device_id	question_id
-- result
-- 1	2138	111	wrong
-- 2	3214
-- 112	wrong
-- 3	3214
-- 113	wrong
-- 4	6543	114	right
-- 5	2315	115	right
-- 6	2315	116	right
-- 7	2315	117	wrong
-- 第一行表示:id为1的用户的常用信息为使用的设备id为2138，在question_id为111的题目上，回答错误
-- ....
-- 最后一行表示:id为7的用户的常用信息为使用的设备id为2315，在question_id为117的题目上，回答错误
-- 示例：user_profile
-- id	device_id	gender	age	university	gpa	active_days_within_30
-- question_cnt
-- answer_cnt
-- 1	2138	male	21	北京大学	3.4	7	2	12
-- 2	3214	male	
-- 复旦大学	4.0	15	5	25
-- 3	6543	female	20	北京大学	3.2	12	3	30
-- 4	2315	female	23	浙江大学	3.6	5	1	2
-- 5	5432	male	25	山东大学	3.8	20	15	70
-- 6	2131	male	28	山东大学	3.3	15	7	13
-- 7	4321	female	26	复旦大学	3.6	9	6	52
-- 第一行表示:id为1的用户的常用信息为使用的设备id为2138，性别为男，年龄21岁，北京大学，gpa为3.4在过去的30天里面活跃了7天，发帖数量为2，回答数量为12
-- 。。。
-- 最后一行表示:id为7的用户的常用信息为使用的设备id为4321，性别为男，年龄26岁，复旦大学，gpa为3.6在过去的30天里面活跃了9天，发帖数量为6，回答数量为52
-- 根据示例，你的查询应返回以下结果，查询结果根据question_id升序排序：
-- 解释:
-- 根据题目的数据只有1个浙江大学的用户，那么把浙江大学这个用户所有答题数据查询出来就行
-- 示例1
-- 输入：
-- drop table if exists `user_profile`;
-- drop table if  exists `question_practice_detail`;
-- CREATE TABLE `user_profile` (
-- `id` int NOT NULL,
-- `device_id` int NOT NULL,
-- `gender` varchar(14) NOT NULL,
-- `age` int ,
-- `university` varchar(32) NOT NULL,
-- `gpa` float,
-- `active_days_within_30` int ,
-- `question_cnt` int ,
-- `answer_cnt` int 
-- );
-- CREATE TABLE `question_practice_detail` (
-- `id` int NOT NULL,
-- `device_id` int NOT NULL,
-- `question_id`int NOT NULL,
-- `result` varchar(32) NOT NULL
-- );
-- INSERT INTO user_profile VALUES(1,2138,'male',21,'北京大学',3.4,7,2,12);
-- INSERT INTO user_profile VALUES(2,3214,'male',null,'复旦大学',4.0,15,5,25);
-- INSERT INTO user_profile VALUES(3,6543,'female',20,'北京大学',3.2,12,3,30);
-- INSERT INTO user_profile VALUES(4,2315,'female',23,'浙江大学',3.6,5,1,2);
-- INSERT INTO user_profile VALUES(5,5432,'male',25,'山东大学',3.8,20,15,70);
-- INSERT INTO user_profile VALUES(6,2131,'male',28,'山东大学',3.3,15,7,13);
-- INSERT INTO user_profile VALUES(7,4321,'male',28,'复旦大学',3.6,9,6,52);
-- INSERT INTO question_practice_detail VALUES(1,2138,111,'wrong');
-- INSERT INTO question_practice_detail VALUES(2,3214,112,'wrong');
-- INSERT INTO question_practice_detail VALUES(3,3214,113,'wrong');
-- INSERT INTO question_practice_detail VALUES(4,6543,111,'right');
-- INSERT INTO question_practice_detail VALUES(5,2315,115,'right');
-- INSERT INTO question_practice_detail VALUES(6,2315,116,'right');
-- INSERT INTO question_practice_detail VALUES(7,2315,117,'wrong');
-- INSERT INTO question_practice_detail VALUES(8,5432,118,'wrong');
-- INSERT INTO question_practice_detail VALUES(9,5432,112,'wrong');
-- INSERT INTO question_practice_detail VALUES(10,2131,114,'right');
-- INSERT INTO question_practice_detail VALUES(11,5432,113,'wrong');
-- 复制
-- 输出：
-- 2315|115|right
-- 2315|116|right
-- 2315|117|wrong
select
  device_id,
  question_id,
  result
from
  question_practice_detail
where
  device_id in (
    select
      device_id
    from
      user_profile
    where
      university = "浙江大学"
  )