from __future__ import annotations
import math


class Value:
    """stores a single scalar value and its gradient"""

    def __init__(self, data: float, _children: tuple[Value, ...] = (), _op: str = ""):
        # basic scalar value
        self.data = data
        self._op = _op

        # previous nodes in computation graph
        self._prev = set(_children)

        # the gradient of this node
        self.grad = 0.0
        # the function to compute the gradient of this node
        self._backward = lambda: None

    def __add__(self, other: int | float | Value) -> Value:
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other), "+")

        def _backward():
            self.grad += 1 * out.grad
            other.grad += 1 * out.grad

        out._backward = _backward

        return out

    def __mul__(self, other: int | float | "Value") -> "Value":
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), "*")

        def _backward():

            self.grad += other.data * out.grad
            other.grad += self.data * out.grad

        out._backward = _backward

        return out

    def __pow__(self, other: int | float) -> "Value":
        assert isinstance(
            other, (int, float)
        ), "only supporting int/float powers for now"
        out = Value(self.data**other, (self,), f"**{other}")

        def _backward():
            self.grad += (other * self.data ** (other - 1)) * out.grad

        out._backward = _backward

        return out

    def relu(self) -> "Value":
        """Applies the ReLU (Rectified Linear Unit) activation function to the value."""
        out = Value(0 if self.data < 0 else self.data, (self,), "ReLU")

        def _backward():
            self.grad += (out.data > 0) * out.grad

        out._backward = _backward

        return out

    def tanh(self) -> "Value":
        """Applies the tanh activation function to the value."""
        x = self.data
        t = (math.exp(2 * x) - 1) / (
            math.exp(2 * x) + 1
        )  # tanh(x) = (e^(2x) - 1) / (e^(2x) + 1)
        out = Value(t, (self,), "tanh")

        def _backward():
            self.grad += (1 - t**2) * out.grad  # derivative of tanh

        out._backward = _backward

        return out

    def __neg__(self) -> "Value":
        return self * -1

    def __radd__(self, other: int | float | "Value") -> "Value":  # other + self
        """__radd__ is called when the left operand does not support addition with the right operand."""
        return self + other

    def __sub__(self, other: int | float | "Value") -> "Value":  # self - other
        return self + (-other)

    def __rsub__(self, other: int | float | "Value") -> "Value":  # other - self
        return other + (-self)

    def __rmul__(self, other: int | float | "Value") -> "Value":  # other * self
        return self * other

    def __truediv__(self, other: int | float | "Value") -> "Value":  # self / other
        return self * other**-1

    def __rtruediv__(self, other: int | float | "Value") -> "Value":  # other / self
        return other * self**-1

    def __repr__(self) -> str:
        return f"Value(data={self.data}, grad={self.grad})"

    def backward(self) -> None:
        """
        Back Propagate the gradient through the computation graph.
        This method computes the gradients of all nodes in the graph with respect to this node.
        """
        # topological order all of the children in the graph
        topo: list[Value] = []
        visited = set()

        def build_topo(v: Value):
            if v not in visited:
                visited.add(v)
                for child in v._prev:
                    build_topo(child)
                topo.append(v)

        build_topo(self)

        # seed the output node's gradient, then apply the chain rule in reverse order
        self.grad = 1.0

        for v in reversed(topo):
            v._backward()
