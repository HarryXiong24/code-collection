"""Runnable demo: train a tiny MLP on a 4-sample toy dataset with gradient descent."""

from micro_grad.nn import MLP


def main():
    mlp = MLP(3, [4, 4, 1])

    xs = [
        [2.0, 3.0, -1.0],
        [3.0, -1.0, 0.5],
        [0.5, 1.0, 1.0],
        [1.0, 1.0, -1.0],
    ]
    ys = [1.0, -1.0, -1.0, 1.0]  # ground-truth labels

    for step in range(20):
        # forward pass
        y_pred = [mlp(x) for x in xs]
        loss = sum((yout - ygt) ** 2 for yout, ygt in zip(y_pred, ys))

        # backward pass: zero grads -> backprop -> gradient-descent step
        mlp.zero_grad()
        loss.backward()
        for p in mlp.parameters():
            p.data -= 0.01 * p.grad

        print(f"step {step:2d}  loss {loss.data:.6f}")


if __name__ == "__main__":
    main()
