# Array and String

## Array

An array is a basic data structure to store a collection of elements sequentially.

Elements can be accessed randomly since each element in the array can be identified by an array index.

An array can have one or more dimensions.

Like one-dimensional array, which is also called the linear array.

And two-dimensional array. Similar to a one-dimensional array, a two-dimensional array also consists of a sequence of elements. But the elements can be laid out in a rectangular grid rather than a line.

## Array-related Techniques

There are more array-related data structures or techniques you might want to know. We will not go deeper into most of the concepts in this card but provide the links to the corresponding card in this article.

1. There are some other data structures which are similar to the array but have some different properties:
   String (has been introduced in this card)
   Hash Table
   Linked List
   Queue
   Stack

2. As we mentioned, we can call the built-in function to sort an array. But it is useful to understand the principle of some widely-used sorting algorithms and their complexity.

3. Binary search is also an important technique used to search a specific element in a sorted array.

4. We have introduced two-pointer technique in this chapter. It is not easy to use this technique flexibly. This technique can also be used to solve:

Slow-pointer and fast-pointer problem in Linked List
Sliding Window Problem 5. The two-pointer technique sometimes will relate to Greedy Algorithm which helps us design our pointers' movement strategy.

## String

A string is actually an array of unicode characters. You can perform almost all the operations we used in an array. You can try it out by yourself.

However, there are some differences. In this article, we will go through some of them which you should be aware of when dealing with a string. These features might vary a lot from one language to another.

### Compare Function

String has its own compare function (we will show you the usage of compare function in the code below).

However, there is a problem:

Can we use "==" to compare two strings?

It depends on the answer to the question:

Does the language support operator overloading?

If the answer is yes (like C++), we may use "==" to compare two strings.
If the answer is no (like Java), we may not use "==" to compare two strings. When we use "==", it actually compares whether these two objects are the same object.

### Immutable or Mutable

Immutable means that you can't change the content of the string once it's initialized.

In some languages (like C++), the string is mutable. That is to say, you can modify the string just like what you did in an array.

In some other languages (like Java), the string is immutable. This feature will bring several problems. We will illustrate the problems and solutions in the next article.

You can determine whether the string in your favorite language is immutable or mutable by testing the modification operation.

## Extra Operations

Compare to an array, there are some extra operations we can perform on a string.

You should be aware of the time complexity of these built-in operations.

For instance, if the length of the string is N, the time complexity of both finding operation and substring operation is O(N).

Also, in languages which the string is immutable, you should be careful with the concatenation operation.

You should know whether the string in your favorite language is immutable or not in the previous article. If the string is immutable, it will bring some problems. Hopefully, we will also provide the solution at the end.

Obviously, an immutable string cannot be modified. If you want to modify just one of the characters, you have to create a new string.

Never forget to take the time complexity of built-in operations into consideration when you compute the time complexity for your solution.

## Skills

对于二维数组的题，更多的是需要找规律，然后用代码实现规律。
可见 题 54，题 498。

对与双指针的题目，分为 快慢指针 和 左右指针。
对于数组或字符串元素的内部变动，可以优先考虑双指针的办法。

另外，对于涉及到一个区块的问题、或者是和大小有关的问题，可以考虑优先使用左右指针会不会更有效率，通过缩短区块的大小来解决。比如 题 167，题 209。

同时可以注意，数组在遍历的时候，其实本身就可以看作一个快指针，这个特性有时候可以利用上，比如 题 27。
