# Hash Table

## Introduction

Hash Table is a data structure which organizes data using hash functions in order to support quick insertion and search.

There are two different kinds of hash tables: hash set and hash map.

The hash set is one of the implementations of a set data structure to store no repeated values.

The hash map is one of the implementations of a map data structure to store (key, value) pairs.

It is easy to use a hash table with the help of standard template libraries. Most common languages such as Java, C++ and Python support both hash set and hash map.

By choosing a proper hash function, the hash table can achieve wonderful performance in both insertion and search.

## The Principle of Hash Table

As we mentioned in the introduction, Hash Table is a data structure which organizes data using hash functions in order to support quick insertion and search. In this article, we will take a look at the principle of the hash table.

The key idea of Hash Table is to use a hash function to map keys to buckets. To be more specific,

When we insert a new key, the hash function will decide which bucket the key should be assigned and the key will be stored in the corresponding bucket;
When we want to search for a key, the hash table will use the same hash function to find the corresponding bucket and search only in the specific bucket.

## Keys to Design a Hash Table

1. Hash Function

The hash function is the most important component of a hash table which is used to map the key to a specific bucket. In the example in the previous article, we use y = x % 5 as a hash function, where x is the key value and y is the index of the assigned bucket.

The hash function will depend on the range of key values and the number of buckets.

It is an open problem to design a hash function. The idea is to try to assign the key to the bucket as uniformly as you can. Ideally, a perfect hash function will be a one-one mapping between the key and the bucket. However, in most cases, a hash function is not perfect and it is a tradeoff between the amount of buckets and the capacity of a bucket.

2. Collision Resolution

Ideally, if our hash function is a perfect one-one mapping, we will not need to handle collisions. Unfortunately, in most cases, collisions are almost inevitable. For instance, in our previous hash function (y = x % 5), both 1987 and 2 are assigned to bucket 2. That is a collision.

A collision resolution algorithm should solve the following questions:

How to organize the values in the same bucket?
What if too many values are assigned to the same bucket?
How to search for a target value in a specific bucket?
These questions are related to the capacity of the bucket and the number of keys which might be mapped into the same bucket according to our hash function.

Let's assume that the bucket, which holds the maximum number of keys, has N keys.

Typically, if N is constant and small, we can simply use an array to store keys in the same bucket. If N is variable or large, we might need to use height-balanced binary search tree instead.

## Complexity Analysis - Hash Table

In this article, we are going to discuss the performance of hash table.

Complexity Analysis

If there are M keys in total, we can achieve the space complexity of O(M) easily when using a hash table.

However, you might have noticed that the time complexity of hash table has a strong relationship with the design.

Most of us might have used an array in each bucket to store values in the same bucket. Ideally, the bucket size is small enough to be regarded as a constant. The time complexity of both insertion and search will be O(1).

But in the worst case, the maximum bucket size will be N. And the time complexity will be O(1) for insertion but O(N) for search.

The Principle of Built-in Hash Table

The typical design of built-in hash table is:

The key value can be any hashable type. And a value which belongs to a hashable type will have a hashcode. This code will be used in the mapping function to get the bucket index.

Each bucket contains an array to store all the values in the same bucket initially.

If there are too many values in the same bucket, these values will be maintained in a height-balanced binary search tree instead.

The average time complexity of both insertion and search is still O(1). And the time complexity in the worst case is O(logN) for both insertion and search by using height-balanced BST. It is a trade-off between insertion and search.

## Design the Key

Let's look at an example:

Given an array of strings, group anagrams together.

As we know, a hash map can perform really well in grouping information by key. But we cannot use the original string as key directly. We have to design a proper key to present the type of anagrams. For instance, there are two strings "eat" and "ate" which should be in the same group. While "eat" and "act" should not be grouped together.

Actually, designing a key is to build a mapping relationship by yourself between the original information and the actual key used by hash map. When you design a key, you need to guarantee that:

1. All values belong to the same group will be mapped in the same group.

2. Values which needed to be separated into different groups will not be mapped into the same group.

This process is similar to design a hash function, but here is an essential difference. A hash function satisfies the first rule but might not satisfy the second one. But your mapping function should satisfy both of them.

In the example above, our mapping strategy can be: sort the string and use the sorted string as the key. That is to say, both "eat" and "ate" will be mapped to "aet".

The mapping strategy can be really tricky sometimes. We provide some exercise for you in this chapter and will give a summary after that.

## Design the Key - Summary

Here are some takeaways about how to design the key for you.

1. When the order of each element in the string/array doesn't matter, you can use the sorted string/array as the key.
2. If you only care about the offset of each value, usually the offset from the first value, you can use the offset as the key.
3. In a tree, you might want to directly use the TreeNode as key sometimes. But in most cases, the serialization of the subtree might be a better idea.
4. In a matrix, you might want to use the row index or the column index as key.
5. In a Sudoku, you can combine the row index and the column index to identify which block this element belongs to.
6. Sometimes, in a matrix, you might want to aggregate the values in the same diagonal line.
