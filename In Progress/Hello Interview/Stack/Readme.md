# Stack

Here are some key points I summarized for the Stack

## Forms

- Pushing value into the stack
- Pushing index into the stack

## Tricks

### Decide the form by looking at what the answer is, not at what the input is

Both forms iterate the string once and push/pop the same way. The only real question is what you store, and the answer type tells you:

| The question asks for                | Push  | Why                                     |
| ------------------------------------ | ----- | --------------------------------------- |
| "Is it valid?" / the rebuilt content | value | You only need to compare or concatenate |
| A length / span / distance / range   | index | `length = right - left`                 |

`Valid Parentheses` asks "is it balanced", so a stack of characters is enough. `Longest Valid Parentheses` asks "how long", and a length can only come from two positions, so the same algorithm has to carry indices instead.

The trap is trying to answer a length question by counting. Counting matched pairs does not work, because pairs can be valid but not adjacent:

```
"()(()"   ->   2 matched pairs, but the longest valid substring is only 2
```

The unmatched `(` in the middle breaks contiguity, and a counter cannot see that. An index can.

### When pushing index, the bottom of the stack is a barrier

This is the idea that makes `Longest Valid Parentheses` work. Read the stack from bottom to top:

```
[ barrier ] [ unmatched '(' index ] [ unmatched '(' index ] ...
```

The bottom is the last position that can never be inside a valid answer (an unmatched `)`), and everything above it is still waiting to be matched. The useful invariant is that **whatever sits strictly between two adjacent stack entries is already fully matched**. So after popping, `index - stack[-1]` is exactly the valid length ending here, without scanning back.

Two habits come out of this:

- Initialize the stack with a sentinel `-1`, a virtual barrier before the string starts. It removes the special case for an answer that starts at index 0: `"()"` gives `1 - (-1) = 2`.
- Pop first, then check whether the stack is empty. If it is empty, what you popped was the barrier, so the current index becomes the new barrier and gets pushed back. That push is the "reset" step.

### When pushing value, the stack is suspended context, not just data

In `Decode String` the stack does not hold characters to compare, it holds the outer state you are not finished with yet. On `[` you park the current string and count and start a fresh one, and on `]` you restore the parked state and merge the finished piece into it.

That is manual recursion. The stack replaces the call stack, one frame per nesting level. So whenever a problem is nested rather than merely paired, ask what a recursive call would need to remember, and push exactly that.

### All the real work happens on pop

The push branch is almost always trivial. Every computation, comparison, and answer update lives in the pop branch, because a pop is the moment two things finally meet and the pending decision can be resolved.

This is the general reason to reach for a stack: **you are postponing a decision until you have enough information to make it**, and the stack keeps the postponed items in exactly the order you will be able to resolve them, most recent first.
