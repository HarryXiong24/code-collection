-- SQL30 统计每种性别的人数
-- 描述
-- 题目：现在运营举办了一场比赛，收到了一些参赛申请，表数据记录形式如下所示，现在运营想要统计每个性别的用户分别有多少参赛者，请取出相应结果
-- 示例：user_submit
-- device_id	profile	blog_url
-- 2138	180cm,75kg,27,male	http:/url/bigboy777
-- 3214	165cm,45kg,26,female	http:/url/kittycc
-- 6543	178cm,65kg,25,male	http:/url/tiger
-- 4321	171cm,55kg,23,female	http:/url/uhksd
-- 2131	168cm,45kg,22,female	http:/urlsydney
-- 根据示例，你的查询应返回以下结果：
-- gender	number
-- male	2
-- female	3
-- 示例1
-- 输入：
-- drop table if exists user_submit;
-- CREATE TABLE `user_submit` (
-- `id` int NOT NULL,
-- `device_id` int NOT NULL,
-- `profile` varchar(100) NOT NULL,
-- `blog_url` varchar(100) NOT NULL
-- );
-- INSERT INTO user_submit VALUES(1,2138,'180cm,75kg,27,male','http:/url/bisdgboy777');
-- INSERT INTO user_submit VALUES(1,3214,'165cm,45kg,26,female','http:/url/dkittycc');
-- INSERT INTO user_submit VALUES(1,6543,'178cm,65kg,25,male','http:/url/tigaer');
-- INSERT INTO user_submit VALUES(1,4321,'171cm,55kg,23,female','http:/url/uhsksd');
-- INSERT INTO user_submit VALUES(1,2131,'168cm,45kg,22,female','http:/url/sysdney');
-- 输出：
-- male|2
-- female|3
select
  case
    when profile like '%,male' then 'male'
    when profile like '%,female' then 'female'
  end as gender,
  count(device_id) as number
from
  user_submit
group by
  gender