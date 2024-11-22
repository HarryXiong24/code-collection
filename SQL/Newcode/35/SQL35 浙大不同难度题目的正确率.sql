-- SQL35 浙大不同难度题目的正确率
-- 描述
-- 题目：现在运营想要了解浙江大学的用户在不同难度题目下答题的正确率情况，请取出相应数据，并按照准确率升序输出。
-- 示例： user_profile
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
-- 示例： question_practice_detail
-- id	device_id	question_id	result
-- 1	2138	111	wrong
-- 2	3214	112	wrong
-- 3	3214	113	wrong
-- 4	6543	111	right
-- 5	2315	115	right
-- 6	2315	116	right
-- 7	2315	117	wrong
-- 示例： question_detail
-- question_id	difficult_level
-- 111	hard
-- 112	medium
-- 113	easy
-- 115	easy
-- 116	medium
-- 117	easy
-- 根据示例，你的查询应返回以下结果：
-- difficult_level	correct_rate
-- easy
-- 0.5000
-- medium
-- 1.0000
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
-- easy|0.5000
-- medium|1.0000
select distinct
  question_detail.difficult_level,
  (
    right_table.right_count / (right_table.right_count + wrong_table.wrong_count)
  ) as correct_rate
from
  question_detail
  join (
    select
      difficult_level,
      count(
        case
          when result = 'right' then 1
          else null
        end
      ) as right_count
    from
      question_practice_detail
      join user_profile on question_practice_detail.device_id = user_profile.device_id
      join question_detail on question_detail.question_id = question_practice_detail.question_id
    where
      user_profile.university = '浙江大学'
    group by
      difficult_level
  ) as right_table on question_detail.difficult_level = right_table.difficult_level
  join (
    select
      difficult_level,
      count(
        case
          when result = 'wrong' then 1
          else null
        end
      ) as wrong_count
    from
      question_practice_detail
      join user_profile on question_practice_detail.device_id = user_profile.device_id
      join question_detail on question_detail.question_id = question_practice_detail.question_id
    where
      user_profile.university = '浙江大学'
    group by
      difficult_level
  ) as wrong_table on question_detail.difficult_level = wrong_table.difficult_level
  and right_table.difficult_level = wrong_table.difficult_level
order by
  correct_rate asc