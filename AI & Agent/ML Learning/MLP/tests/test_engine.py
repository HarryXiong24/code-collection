"""Tests for the autograd engine, migrated from the old __main__ print-cases."""

import pytest

from micro_grad.engine import Value


def test_add_mul_backward():
    # f = a * b + c
    a = Value(2.0)
    b = Value(-3.0)
    c = Value(10.0)
    f = a * b + c
    f.backward()

    assert f.data == pytest.approx(4.0)  # 2*-3 + 10
    assert a.grad == pytest.approx(-3.0)  # df/da = b
    assert b.grad == pytest.approx(2.0)  # df/db = a
    assert c.grad == pytest.approx(1.0)  # df/dc = 1


def test_pow_and_div_backward():
    # g = x**2 / y
    x = Value(3.0)
    y = Value(4.0)
    g = x**2 / y
    g.backward()

    assert g.data == pytest.approx(2.25)  # 9/4
    assert x.grad == pytest.approx(1.5)  # 2x/y = 6/4
    assert y.grad == pytest.approx(-0.5625)  # -x**2/y**2 = -9/16


def test_reused_variable_accumulates_grad():
    # h = q + q * q  -> dh/dq = 1 + 2q
    q = Value(5.0)
    h = q + q * q
    h.backward()

    assert h.data == pytest.approx(30.0)  # 5 + 25
    assert q.grad == pytest.approx(11.0)  # 1 + 2*5


def test_sub_neg_and_rops():
    # k = 2 - n + 3 * n  -> dk/dn = -1 + 3
    n = Value(7.0)
    k = 2 - n + 3 * n
    k.backward()

    assert k.data == pytest.approx(16.0)  # 2 - 7 + 21
    assert n.grad == pytest.approx(2.0)  # -1 + 3


def test_small_expression_graph():
    # L = a1*w1 + a2*w2 + bias
    a1, a2 = Value(1.0), Value(-2.0)
    w1, w2 = Value(3.0), Value(4.0)
    bias = Value(0.5)
    L = a1 * w1 + a2 * w2 + bias
    L.backward()

    assert L.data == pytest.approx(-4.5)  # 3 - 8 + 0.5
    assert w1.grad == pytest.approx(1.0)  # dL/dw1 = a1
    assert w2.grad == pytest.approx(-2.0)  # dL/dw2 = a2
    assert a1.grad == pytest.approx(3.0)  # dL/da1 = w1


def test_relu_returns_value_and_grad():
    # ReLU is 0 for negatives (grad 0), identity for positives (grad 1)
    neg = Value(-2.0).relu()
    neg.backward()
    assert neg.data == 0
    assert neg._prev  # relu must wire up the child node (regression: it once returned None)

    pos = Value(3.0)
    out = pos.relu()
    out.backward()
    assert out.data == pytest.approx(3.0)
    assert pos.grad == pytest.approx(1.0)


def test_tanh_backward():
    # d/dx tanh(x) = 1 - tanh(x)**2
    x = Value(0.5)
    out = x.tanh()
    out.backward()
    assert x.grad == pytest.approx(1 - out.data**2)


def test_backward_can_be_called_independently_on_fresh_graphs():
    # Each forward builds a fresh graph; gradients start at 0 and seed correctly.
    x = Value(3.0)
    (x * 2).backward()
    assert x.grad == pytest.approx(2.0)
