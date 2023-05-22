# Stack

## Last-in-first-out Data Structure

In a LIFO data structure, the newest element added to the queue will be processed first.

Different from the queue, the stack is a LIFO data structure. Typically, the insert operation is called push in a stack. Similar to the queue, a new element is always added at the end of the stack. However, the delete operation, pop, will always remove the last element which is opposite from the queue.

Example - Stack

1. Push: you can click Push button below to see how a new element 6 is added to the stack.

2. Pop: you can click Pop button below to see which element will be removed when you pop an element from the stack.

## Stack Uasge

Most popular languages provide built-in stack library so you don't have to reinvent the wheel.
Besides initialization, we need to know how to use the two most important operations, pop and push.
Also, you should be able to get the top element from the stack. Below are some code examples for your reference:

```java
// "static void main" must be defined in a public class.
public class Main {
    public static void main(String[] args) {
        // 1. Initialize a stack.
        Stack<Integer> s = new Stack<>();
        // 2. Push new element.
        s.push(5);
        s.push(13);
        s.push(8);
        s.push(6);
        // 3. Check if stack is empty.
        if (s.empty() == true) {
            System.out.println("Stack is empty!");
            return;
        }
        // 4. Pop an element.
        s.pop();
        // 5. Get the top element.
        System.out.println("The top element is: " + s.peek());
        // 6. Get the size of the stack.
        System.out.println("The size is: " + s.size());
    }
}
```

From now on, we are able to use the built-in stack library to solve problems more conveniently.
Let's start with an interesting problem (Min Stack) to help you review the useful operations.
Then we will take a look at some classic Stack problems.
When you want to process the last element first, the stack will be the most appropriate data structure.
