-- SQL18 分组计算练习题
-- 描述
-- 题目：现在运营想要对每个学校不同性别的用户活跃情况和发帖数量进行分析，请分别计算出每个学校每种性别的用户数、30天内平均活跃天数和平均发帖数量。
-- 用户信息表：user_profile
-- 30天内活跃天数字段（active_days_within_30）
-- 发帖数量字段（question_cnt）
-- 回答数量字段（answer_cnt）
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
-- 7	4321	male	26	复旦大学	3.6	9	6	52
-- 第一行表示:id为1的用户的常用信息为使用的设备id为2138，性别为男，年龄21岁，北京大学，gpa为3.4在过去的30天里面活跃了7天，发帖数量为2，回答数量为12
-- 。。。
-- 最后一行表示:id为7的用户的常用信息为使用的设备id为4321，性别为男，年龄26岁，复旦大学，gpa为3.6在过去的30天里面活跃了9天，发帖数量为6，回答数量为52
-- 你的查询返回结果需要对性别和学校分组，示例如下，结果保留1位小数，1位小数之后的四舍五入,查询出来的结果按照gender、university升序排列：
-- 解释:
-- 第一行表示：北京大学的男性用户个数为1，平均活跃天数为7天，平均发帖量为2
-- 。。。
-- 最后一行表示：山东大学的男性用户个数为2，平均活跃天数为17.5天，平均发帖量为11
-- 示例1
-- 输入：
-- drop table if exists user_profile;
-- CREATE TABLE `user_profile` (
-- `id` int NOT NULL,
-- `device_id` int NOT NULL,
-- `gender` varchar(14) NOT NULL,
-- `age` int ,
-- `university` varchar(32) NOT NULL,
-- `gpa` float,
-- `active_days_within_30` float,
-- `question_cnt` float,
-- `answer_cnt` float
-- );
-- INSERT INTO user_profile VALUES(1,2138,'male',21,'北京大学',3.4,7,2,12);
-- INSERT INTO user_profile VALUES(2,3214,'male',null,'复旦大学',4.0,15,5,25);
-- INSERT INTO user_profile VALUES(3,6543,'female',20,'北京大学',3.2,12,3,30);
-- INSERT INTO user_profile VALUES(4,2315,'female',23,'浙江大学',3.6,5,1,2);
-- INSERT INTO user_profile VALUES(5,5432,'male',25,'山东大学',3.8,20,15,70);
-- INSERT INTO user_profile VALUES(6,2131,'male',28,'山东大学',3.3,15,7,13);
-- INSERT INTO user_profile VALUES(7,4321,'male',28,'复旦大学',3.6,9,6,52);
-- 复制
-- 输出：
-- gender|university|user_num|avg_active_day|avg_question_cnt
-- female|北京大学|1|12.0|3.0
-- female|浙江大学|1|5.0|1.0
-- male|北京大学|1|7.0|2.0
-- male|复旦大学|2|12.0|5.5
-- male|山东大学|2|17.5|11.0
select
  gender,
  university,
  count(gender) as user_num,
  avg(active_days_within_30) as avg_active_day,
  avg(question_cnt) as avg_question_cnt
from
  user_profile
group by
  gender,
  university
order by
  gender asc,
  university asc