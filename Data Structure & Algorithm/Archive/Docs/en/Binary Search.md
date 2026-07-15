# Binary Search

## Introduction

Understand the general concept of Binary Search.

Binary Search is one of the most fundamental and useful algorithms in Computer Science.
It describes the process of searching for a specific value in an ordered collection.

Terminology used in Binary Search:

Target - the value that you are searching for
Index - the current location that you are searching
Left, Right - the indicies from which we use to maintain our search Space
Mid - the index that we use to apply a condition to determine if we should search left or right

## How do we identify Binary Search?

As mentioned in earlier, Binary Search is an algorithm that divides the search space in 2 after every comparison. Binary Search should be considered every time you need to search for an index or element in a collection. If the collection is unordered, we can always sort it first before applying Binary Search.

## 3 Parts of a Successful Binary Search

Binary Search is generally composed of 3 main sections:

- Pre-processing - Sort if collection is unsorted.
- Binary Search - Using a loop or recursion to divide search space in half after each comparison.
- Post-processing - Determine viable candidates in the remaining space.

## 3 Templates for Binary Search

When we first learned Binary Search, we might struggle. We might study hundreds of Binary Search problems online and each time we looked at a developer's code, it seemed to be implemented slightly differently. Although each implementation divided the problem space in 1/2 at each step, one had numerous questions:

Why was it implemented slightly differently?
What was the developer thinking?
Which way was easier?
Which way is better?

After many failed attempts and lots of hair-pulling, we found 3 main templates for Binary Search.

## Skills

二分查找有几种规律可以用于解题：

1. 查找一个精确的值
2. 查找一个下边界 or 查找一个上边界
3. 查找一个区间 [x, y]

二分查找中比较难的题型是在一个没有绝对顺序的数组里使用二分查找，这种情况，需要找到规律，把无序变成有序。
