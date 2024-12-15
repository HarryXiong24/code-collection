-- SQL31 提取博客URL中的用户名
-- 描述
-- 题目：对于申请参与比赛的用户，blog_url字段中url字符后的字符串为用户个人博客的用户名，现在运营想要把用户的个人博客用户字段提取出单独记录为一个新的字段，请取出所需数据。
-- 示例：user_submit
-- device_id
-- profile
-- blog_url
-- 2138	180cm,75kg,27,male
-- http:/url/bisdgboy777
-- 3214	165cm,45kg,26,female
-- http:/url/dkittycc
-- 6543	178cm,65kg,25,male
-- http:/url/tigaer
-- 4321	171 cm,55kg,23,female
-- http:/url/uhksd
-- 2131	168cm,45kg,22,female
-- http:/url/sydney
-- 根据示例，你的查询应返回以下结果：
-- device_id
-- user_name
-- 2138	bisdgboy777
-- 3214	dkittycc
-- 6543	tigaer
-- 4321	uhsksd
-- 2131	sydney
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
-- 2138|bisdgboy777
-- 3214|dkittycc
-- 6543|tigaer
-- 4321|uhsksd
-- 2131|sysdney
SELECT
  device_id,
  SUBSTRING_INDEX (blog_url, "/", -1) AS user_name
FROM
  user_submit;

-- 替换法 replace(string, '被替换部分','替换后的结果')
-- 截取法 substr(string, start_point, length*可选参数*)
-- 删除法 trim('被删除字段' from 列名)
-- 字段切割法 substring_index(string, '切割标志', 位置数（负号：从后面开始）)