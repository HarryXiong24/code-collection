-- SQL26 计算25岁以上和以下的用户数量
-- 描述
-- 题目：现在运营想要将用户划分为25岁以下和25岁及以上两个年龄段，分别查看这两个年龄段用户数量
-- 本题注意：age为null 也记为 25岁以下
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
-- 7	4321	male	26	复旦大学	3.6	9	6	52
-- 根据示例，你的查询应返回以下结果：
-- age_cut	number
-- 25岁以下	4
-- 25岁及以上
-- 3
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
-- CREATE TABLE `question_detail` (
-- `id` int NOT NULL,
-- `question_id`int NOT NULL,
-- `difficult_level` varchar(32) NOT NULL
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
-- INSERT INTO question_practice_detail VALUES(8,5432,117,'wrong');
-- INSERT INTO question_practice_detail VALUES(9,5432,112,'wrong');
-- INSERT INTO question_practice_detail VALUES(10,2131,113,'right');
-- INSERT INTO question_practice_detail VALUES(11,5432,113,'wrong');
-- INSERT INTO question_practice_detail VALUES(12,2315,115,'right');
-- INSERT INTO question_practice_detail VALUES(13,2315,116,'right');
-- INSERT INTO question_practice_detail VALUES(14,2315,117,'wrong');
-- INSERT INTO question_practice_detail VALUES(15,5432,117,'wrong');
-- INSERT INTO question_practice_detail VALUES(16,5432,112,'wrong');
-- INSERT INTO question_practice_detail VALUES(17,2131,113,'right');
-- INSERT INTO question_practice_detail VALUES(18,5432,113,'wrong');
-- INSERT INTO question_practice_detail VALUES(19,2315,117,'wrong');
-- INSERT INTO question_practice_detail VALUES(20,5432,117,'wrong');
-- INSERT INTO question_practice_detail VALUES(21,5432,112,'wrong');
-- INSERT INTO question_practice_detail VALUES(22,2131,113,'right');
-- INSERT INTO question_practice_detail VALUES(23,5432,113,'wrong');
-- INSERT INTO question_detail VALUES(1,111,'hard');
-- INSERT INTO question_detail VALUES(2,112,'medium');
-- INSERT INTO question_detail VALUES(3,113,'easy');
-- INSERT INTO question_detail VALUES(4,115,'easy');
-- INSERT INTO question_detail VALUES(5,116,'medium');
-- INSERT INTO question_detail VALUES(6,117,'easy');
-- 复制
-- 输出：
-- 25岁以下|4
-- 25岁及以上|3
SELECT
  CASE
    WHEN age < 25
    OR age IS NULL THEN '25岁以下'
    WHEN age >= 25 THEN '25岁及以上'
  END as age_cut,
  COUNT(*) number
FROM
  user_profile
GROUP BY
  age_cut