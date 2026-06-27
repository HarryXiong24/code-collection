class Value:
    """stores a single scalar value and its gradient"""

    def __init__(self, data, _children=(), _op=""):
        # basic scalar value
        self.data = data
        self._op = _op

        # previous nodes in computation graph
        self._prev = set(_children)

        # the gradient of this node
        self.grad = 0.0
        # the function to compute the gradient of this node
        self._backward = lambda: None

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other), "+")

        def _backward():
            self.grad += 1 * out.grad
            other.grad += 1 * out.grad

        out._backward = _backward

        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), "*")

        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad

        out._backward = _backward

        return out

    def __pow__(self, other):
        assert isinstance(other, (int, float)), "only supporting int/float powers for now"
        out = Value(self.data**other, (self,), f"**{other}")

        def _backward():
            self.grad += (other * self.data ** (other - 1)) * out.grad

        out._backward = _backward

        return out

    def relu(self):
        """Applies the ReLU (Rectified Linear Unit) activation function to the value."""
        out = Value(0 if self.data < 0 else self.data, (self,), "ReLU")

        def _backward():
            self.grad += (out.data > 0) * out.grad

        out._backward = _backward

        return out

    def __neg__(self):
        return self * -1

    def __radd__(self, other):  # other + self
        """__radd__ is called when the left operand does not support addition with the right operand."""
        return self + other

    def __sub__(self, other):  # self - other
        return self + (-other)

    def __rsub__(self, other):  # other - self
        return other + (-self)

    def __rmul__(self, other):  # other * self
        return self * other

    def __truediv__(self, other):  # self / other
        return self * other**-1

    def __rtruediv__(self, other):  # other / self
        return other * self**-1

    def __repr__(self):
        return f"Value(data={self.data}, grad={self.grad})"

    def backward(self):
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

        # reset gradients so repeated backward() calls don't accumulate
        for v in topo:
            v.grad = 0.0

        # seed the output node's gradient, then apply the chain rule in reverse order
        self.grad = 1.0

        for v in reversed(topo):
            v._backward()


# case
if __name__ == "__main__":
    # case 1: basic add and multiply
    # f = a * b + c
    a = Value(2.0)
    b = Value(-3.0)
    c = Value(10.0)
    f = a * b + c
    f.backward()
    print("case 1: f = a * b + c")
    print(f"  f    = {f.data}")  # 2*-3 + 10 = 4
    print(f"  df/da = {a.grad}")  # b = -3
    print(f"  df/db = {b.grad}")  # a = 2
    print(f"  df/dc = {c.grad}")  # 1
    print()

    # case 2: power and division
    # g = x**2 / y
    x = Value(3.0)
    y = Value(4.0)
    g = x**2 / y
    g.backward()
    print("case 2: g = x**2 / y")
    print(f"  g     = {g.data}")  # 9/4 = 2.25
    print(f"  dg/dx = {x.grad}")  # 2x/y = 6/4 = 1.5
    print(f"  dg/dy = {y.grad}")  # -x**2/y**2 = -9/16 = -0.5625
    print()

    # case 3: reused variable (gradient accumulates)
    # h = q + q * q
    q = Value(5.0)
    h = q + q * q
    h.backward()
    print("case 3: h = q + q * q")
    print(f"  h     = {h.data}")  # 5 + 25 = 30
    print(f"  dh/dq = {q.grad}")  # 1 + 2q = 11
    print()

    # case 4: subtraction, negation and right-hand operators
    # k = 2 - n + 3 * n
    n = Value(7.0)
    k = 2 - n + 3 * n
    k.backward()
    print("case 4: k = 2 - n + 3 * n")
    print(f"  k     = {k.data}")  # 2 - 7 + 21 = 16
    print(f"  dk/dn = {n.grad}")  # -1 + 3 = 2
    print()

    # case 5: small expression graph
    # L = (a1 * w1 + a2 * w2 + bias)
    a1, a2 = Value(1.0), Value(-2.0)
    w1, w2 = Value(3.0), Value(4.0)
    bias = Value(0.5)
    L = a1 * w1 + a2 * w2 + bias
    L.backward()
    print("case 5: L = a1*w1 + a2*w2 + bias")
    print(f"  L      = {L.data}")  # 3 - 8 + 0.5 = -4.5
    print(f"  dL/dw1 = {w1.grad}")  # a1 = 1
    print(f"  dL/dw2 = {w2.grad}")  # a2 = -2
    print(f"  dL/da1 = {a1.grad}")  # w1 = 3
