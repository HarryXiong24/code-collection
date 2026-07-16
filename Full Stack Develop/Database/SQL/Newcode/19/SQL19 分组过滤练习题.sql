-- SQL19 分组过滤练习题
-- 描述
-- 题目：现在运营想查看每个学校用户的平均发贴和回帖情况，寻找低活跃度学校进行重点运营，请取出平均发贴数低于5的学校或平均回帖数小于20的学校。
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
-- 根据示例，你的查询应返回以下结果，请你保留3位小数(系统后台也会自动校正)，3位之后四舍五入：
-- university	avg_question_cnt	avg_answer_cnt
-- 北京大学	2.5000	21.000
-- 浙江大学	1.000	2.000
-- 解释: 平均发贴数低于5的学校或平均回帖数小于20的学校有2个
-- 属于北京大学的用户的平均发帖量为2.500，平均回答数量为21.000
-- 属于浙江大学的用户的平均发帖量为1.000，平均回答数量为2.000
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
-- `active_days_within_30` int ,
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
-- university|avg_question_cnt|avg_answer_cnt
-- 北京大学|2.500|21.000
-- 浙江大学|1.000|2.000
select
  university,
  avg(question_cnt) as avg_question_cnt,
  avg(answer_cnt) as avg_answer_cnt
from
  user_profile
group by
  university
having
  avg_question_cnt < 5
  or avg_answer_cnt < 20