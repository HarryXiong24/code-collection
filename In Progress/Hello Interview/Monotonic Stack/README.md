# Monotonic Stack

Here are some key points I summarized for the Monotonic Stack

## Forms

- Monotonic decreasing stack, which finds the **next greater** element
- Monotonic increasing stack, which finds the **next smaller** element

## Tricks

### The form is decided by one comparison, so do not memorize two templates

The two forms share the same skeleton, and the only difference is the direction of the comparison in the `while` condition:

| Goal              | Pop while              | Stack order (bottom to top) | Problem                                   |
| ----------------- | ---------------------- | --------------------------- | ----------------------------------------- |
| Next greater      | `curr > arr[top]`      | decreasing                  | `Next Greater Element`, `Daily Temperatures` |
| Next smaller      | `curr < arr[top]`      | increasing                  | `Largest Rectangle in Histogram`           |

An easy way to remember it without mixing them up: the stack is monotonic in the **opposite** direction of what you are looking for. You are looking for something greater, so anything already in the stack that is smaller gets kicked out, and what survives is decreasing.

So the only thing to ask when starting is: do I want the first bigger one on the right, or the first smaller one on the right? Then write the comparison and everything else follows.

### Always push the index, never the value

All three problems push the index and read the value back with `arr[top]`. This is not a style choice, it is because at pop time the index gives you both, while the value gives you only itself.

`Daily Temperatures` is the clearest proof, since the answer is `i - top`, a distance that simply does not exist if the stack only holds temperatures. This is the same rule as in the plain Stack notes: the moment the answer is a length or a distance, indices are mandatory.

### Every pop resolves exactly one element, and at that moment both of its boundaries are known

This is the core idea of the whole pattern. When element `top` gets popped by the current element `i`:

- the **right** boundary is `i`, because `i` is the first element that broke the monotonic order, so it is by definition the next greater or next smaller
- the **left** boundary is the new stack top after popping, because everything between them was already popped for being worse

```
left = stack[-1] after pop   (previous smaller/greater)
right = i                    (next smaller/greater)
```

Getting the left side for free is what people miss. `Largest Rectangle in Histogram` depends on it entirely, because the rectangle whose height is `heights[mid]` can extend to exactly those two boundaries, giving `w = right - left` with the popped bar's own height as `h`.

This is also the reason the whole thing is O(n) even though there is a loop inside a loop. Each index is pushed once and popped once, so the inner `while` cannot run more than n times in total across the entire outer loop.

### The skeleton is fixed, so only decide what to record at the pop

The three problems are the same code with one different line inside the `while`:

```
Next Greater Element   ->  result[top] = curr        (record the value)
Daily Temperatures     ->  result[top] = i - top     (record the distance)
Largest Rectangle      ->  max_area = max(..., w*h)  (record a computed answer)
```

So when meeting a new monotonic stack problem, do not re-derive the loop, just ask what should be written down at the moment the popped element finally meets its neighbor.

### Decide in advance what happens to the elements that are never popped

Whatever is still in the stack at the end has no next greater or next smaller element. There are two ways to deal with it, and both appear here:

- **Let the default answer stand.** `Next Greater Element` pre-fills the result with `-1` and `Daily Temperatures` relies on Go's zero value, so the leftovers are already correct and no cleanup is needed.
- **Append a sentinel to force a flush.** `Largest Rectangle in Histogram` appends a `0` to the heights, which is smaller than every real bar and therefore pops the entire stack. This is the cleaner trick when the leftovers still contribute to the answer, since it avoids duplicating the pop logic after the loop.

### Strict vs non-strict comparison only matters when duplicates carry meaning

`Largest Rectangle in Histogram` pushes when `heights[i] >= heights[top]`, so equal bars stack up instead of popping each other. It is still correct because the last bar of an equal run is popped with the full width, and the earlier ones only produce smaller areas that lose the `max`.

That tolerance exists because the question asks for a maximum. If a problem asks for the exact boundary of each element instead, equal values have to be resolved deliberately, so it is worth pausing on `>` vs `>=` rather than copying it from the previous problem.
