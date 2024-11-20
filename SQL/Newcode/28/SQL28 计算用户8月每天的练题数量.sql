-- SQL28 计算用户8月每天的练题数量
-- 题目：现在运营想要计算出2021年8月每天用户练习题目的数量，请取出相应数据。
-- 示例：question_practice_detail
-- 根据示例，你的查询应返回以下结果：
-- day	question_cnt
-- 13	5
-- 14	2
-- 15	3
-- 16	1
-- 18	1
-- 示例1
-- 输入：
-- drop table if  exists `question_practice_detail`;
-- CREATE TABLE `question_practice_detail` (
-- `id` int NOT NULL,
-- `device_id` int NOT NULL,
-- `question_id`int NOT NULL,
-- `result` varchar(32) NOT NULL,
-- `date` date NOT NULL
-- );
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
-- 复制
-- 输出：
-- day|question_cnt
-- 13|5
-- 14|2
-- 15|3
-- 16|1
-- 18|1
select
  day (date) as day,
,
  count(question_id) as question_cnt
from
  question_practice_detail
where
  month (date) = 8
  and year (date) = 2021
group by