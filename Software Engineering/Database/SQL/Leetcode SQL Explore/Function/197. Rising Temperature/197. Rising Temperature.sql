-- 197. Rising Temperature
-- Table: Weather
-- +---------------+---------+
-- | Column Name   | Type    |
-- +---------------+---------+
-- | id            | int     |
-- | recordDate    | date    |
-- | temperature   | int     |
-- +---------------+---------+
-- id is the column with unique values for this table.
-- This table contains information about the temperature on a certain day.
-- Write a solution to find all dates' Id with higher temperatures compared to its previous dates (yesterday).
-- Return the result table in any order.
-- The result format is in the following example.
-- Example 1:
-- Input: 
-- Weather table:
-- +----+------------+-------------+
-- | id | recordDate | temperature |
-- +----+------------+-------------+
-- | 1  | 2015-01-01 | 10          |
-- | 2  | 2015-01-02 | 25          |
-- | 3  | 2015-01-03 | 20          |
-- | 4  | 2015-01-04 | 30          |
-- +----+------------+-------------+
-- Output: 
-- +----+
-- | id |
-- +----+
-- | 2  |
-- | 4  |
-- +----+
-- Explanation: 
-- In 2015-01-02, the temperature was higher than the previous day (10 -> 25).
-- In 2015-01-04, the temperature was higher than the previous day (20 -> 30).
SELECT
  w2.id
FROM
  Weather w1,
  Weather w2
WHERE
  DATEDIFF (w2.recordDate, w1.recordDate) = 1
  AND w2.temperature > w1.temperature;

--or
SELECT
  w1.id
FROM
  Weather w1
WHERE
  w1.temperature > (
    SELECT
      w2.temperature
    FROM
      Weather w2
    WHERE
      w2.recordDate = DATE_SUB (w1.recordDate, INTERVAL 1 DAY)
  );

--or
WITH
  PreviousWeatherData AS (
    SELECT
      id,
      recordDate,
      temperature,
      LAG (temperature, 1) OVER (
        ORDER BY
          recordDate
      ) AS PreviousTemperature,
      LAG (recordDate, 1) OVER (
        ORDER BY
          recordDate
      ) AS PreviousRecordDate
    FROM
      Weather
  )
SELECT
  id
FROM
  PreviousWeatherData
WHERE
  temperature > PreviousTemperature
  AND recordDate = DATE_ADD (PreviousRecordDate, INTERVAL 1 DAY);