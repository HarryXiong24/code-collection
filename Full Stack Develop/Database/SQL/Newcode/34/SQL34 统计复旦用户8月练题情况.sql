-- SQL34 统计复旦用户8月练题情况
-- 描述
-- 题目： 现在运营想要了解复旦大学的每个用户在8月份练习的总题目数和回答正确的题目数情况，请取出相应明细数据，对于在8月份没有练习过的用户，答题数结果返回0.
-- 示例：用户信息表user_profile
-- id	device_id	gender	age	university	gpa	active_days_within_30
-- 1	2138	male	21	北京大学	3.4	7
-- 2	3214	male		复旦大学	4.0	15
-- 3	6543	female	20	北京大学	3.2	12
-- 4	2315	female	23	浙江大学	3.6	5
-- 5	5432	male	25	山东大学	3.8	20
-- 6	2131	male	28	山东大学	3.3	15
-- 7	4321	female	28	复旦大学	3.6	9
-- 示例：question_practice_detail
-- id	device_id	question_id	result	date
-- 1	2138	111	wrong	2021-05-03
-- 2	3214	112	wrong
-- 2021-05-09
-- 3	3214	113	wrong
-- 2021-06-15
-- 4	6543	111	right	2021-08-13
-- 5	2315	115	right
-- 2021-08-13
-- 6	2315	116	right
-- 2021-08-14
-- 7	2315	117	wrong
-- 2021-08-15
-- ……	
-- 根据示例，你的查询应返回以下结果：
-- device_id
-- university	question_cnt	right_question_cnt
-- 3214	复旦大学	3	0
-- 4321	复旦大学	0	0
-- 示例1
-- 输入：
-- drop table if exists `user_profile`;
-- drop table if  exists `question_practice_detail`;
-- drop table if  exists `question_detail`;
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
-- `result` varchar(32) NOT NULL,
-- `date` date NOT NULL
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
-- INSERT INTO question_practice_detail VALUES(1,2138,111,'wrong','2021-05-03');
-- INSERT INTO question_practice_detail VALUES(2,3214,112,'wrong','2021-05-09');
-- INSERT INTO question_practice_detail VALUES(3,3214,113,'wrong','2021-06-15');
-- INSERT INTO question_practice_detail VALUES(4,6543,111,'right','2021-08-13');
-- INSERT INTO question_practice_detail VALUES(5,2315,115,'right','2021-08-13');
-- INSERT INTO question_practice_detail VALUES(6,2315,116,'right','2021-08-14');
-- INSERT INTO question_practice_detail VALUES(7,2315,117,'wrong','2021-08-15');
-- INSERT INTO question_practice_detail VALUES(8,3214,112,'wrong','2021-05-09');
-- INSERT INTO question_practice_detail VALUES(9,3214,113,'wrong','2021-08-15');
-- INSERT INTO question_practice_detail VALUES(10,6543,111,'right','2021-08-13');
-- INSERT INTO question_practice_detail VALUES(11,2315,115,'right','2021-08-13');
-- INSERT INTO question_practice_detail VALUES(12,2315,116,'right','2021-08-14');
-- INSERT INTO question_practice_detail VALUES(13,2315,117,'wrong','2021-08-15');
-- INSERT INTO question_practice_detail VALUES(14,3214,112,'wrong','2021-08-16');
-- INSERT INTO question_practice_detail VALUES(15,3214,113,'wrong','2021-08-18');
-- INSERT INTO question_practice_detail VALUES(16,6543,111,'right','2021-08-13');
-- INSERT INTO question_detail VALUES(1,111,'hard');
-- INSERT INTO question_detail VALUES(2,112,'medium');
-- INSERT INTO question_detail VALUES(3,113,'easy');
-- INSERT INTO question_detail VALUES(4,115,'easy');
-- INSERT INTO question_detail VALUES(5,116,'medium');
-- INSERT INTO question_detail VALUES(6,117,'easy');
-- 复制
-- 输出：
-- device_id|university|question_cnt|right_question_cnt
-- 3214|复旦大学|3|0
-- 4321|复旦大学|0|0
select
  a.device_id,
  a.university,
  COALESCE(b.question_cnt, 0) as question_cnt,
  COALESCE(b.right_question_cnt, 0) as right_question_cnt
from
  user_profile as a
  left join (
    select
      device_id,
      count(question_id) as question_cnt,
      count(
        case
          when result = 'right' then 1
          else NULL
        end
      ) as right_question_cnt
    from
      question_practice_detail
    where
      month (date) = 8
    group by
      device_id
  ) as b on a.device_id = b.device_id
where
  university = '复旦大学'