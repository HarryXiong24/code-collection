-- SQL33 找出每个学校GPA最低的同学
-- 描述
-- 题目：现在运营想要找到每个学校gpa最低的同学来做调研，请你取出每个学校的最低gpa。
-- 示例：user_profile
-- id	device_id	gender	age	university	gpa	active_days_within_30
-- question_cnt
-- answer_cnt
-- 1	2138	male	21	北京大学	3.4	7	2	12
-- 2	3214	male		复旦大学	4	15	5	25
-- 3	6543	female	20	北京大学	3.2	12	3	30
-- 4	2315	female	23	浙江大学	3.6	5	1	2
-- 5	5432	male	25	山东大学	3.8	20	15	70
-- 6	2131	male	28	山东大学	3.3	15	7	13
-- 7	4321	female	26	复旦大学	3.6	9	6	52
-- 根据示例，你的查询结果应参考以下格式，输出结果按university升序排序：
-- device_id
-- university
-- gpa
-- 6543
-- 北京大学
-- 3.2
-- 4321	复旦大学	3.6
-- 2131	山东大学
-- 3.3
-- 2315	浙江大学
-- 3.6
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
-- `question_cnt` int ,
-- `answer_cnt` int 
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
-- device_id|university|gpa
-- 6543|北京大学|3.2
-- 4321|复旦大学|3.6
-- 2131|山东大学|3.3
-- 2315|浙江大学|3.6
select
  a.device_id,
  a.university,
  a.gpa
from
  user_profile as a
  join (
    select
      university,
      min(gpa) as gpa
    from
      user_profile
    group by
      university
  ) as b on b.university = a.university
  and a.gpa = b.gpa
order by
  a.university