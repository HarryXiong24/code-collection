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

## Stack and DFS

Similar to BFS, Depth-First Search (DFS) can also be used to find the path from the root node to the target node. In this article, we provide an example to explain how DFS works and how a stack helps with DFS step by step.

After watching the animation above, let's answer the following questions:

1. What is the processing order of the nodes?

In the example above, we start from the root node A. Firstly, we choose the path to the node B and trace-back till we reach the node E where we have no way to go deeper. Then we backtrack to A and choose the second path to the node C. From C, We try the first path to E but E has been visited. So we go back to C and try another path to F. Finally, we find G.

Overall, we only trace-back and try another path after we reach the deepest node.

As a result, the first path you found in DFS is not always the shortest path. For instance, in the example above, we successfully found a path A->C->F->G and stop the DFS. But this is not the shortest path from A to G.

2. What is the push and pop order of the stack?

As shown in the animation above, we first push the root node to the stack; then we try the first neighbor B and push node B to the stack; so on and so forth. When we reach the deepest node E, we need to trace back. And when we trace back, we will pop the deepest node from the stack which is actually the last node pushed to the stack.

The processing order of the nodes is the exact opposite order as how they were added to the stack, which is Last-in-First-out (LIFO). That's why we use a stack in DFS.
