"""Tests for the neural-net layer, migrated from the old __main__ demo."""

import random

from micro_grad.engine import Value
from micro_grad.nn import MLP, Layer, Neuron


def test_neuron_outputs_scalar_value():
    out = Neuron(3)([2.0, 3.0, -1.0])
    assert isinstance(out, Value)


def test_neuron_parameter_count():
    # n weights + 1 bias
    assert len(Neuron(3).parameters()) == 4


def test_layer_returns_list_for_multiple_neurons():
    out = Layer(3, 4)([2.0, 3.0, -1.0])
    assert isinstance(out, list)
    assert len(out) == 4
    assert all(isinstance(o, Value) for o in out)


def test_layer_returns_scalar_for_single_neuron():
    # a 1-neuron layer should unwrap to a single Value, not a length-1 list
    out = Layer(3, 1)([2.0, 3.0, -1.0])
    assert isinstance(out, Value)


def test_mlp_final_output_is_scalar():
    # last layer has 1 neuron -> output must be a Value, so `yout - ygt` works
    out = MLP(3, [4, 4, 1])([2.0, 3.0, -1.0])
    assert isinstance(out, Value)


def test_mlp_parameter_count():
    # layers: (3->4), (4->4), (4->1)
    # params = 4*(3+1) + 4*(4+1) + 1*(4+1) = 16 + 20 + 5 = 41
    assert len(MLP(3, [4, 4, 1]).parameters()) == 41


def test_training_reduces_loss():
    random.seed(1337)  # deterministic init so the test is reproducible
    mlp = MLP(3, [4, 4, 1])
    xs = [
        [2.0, 3.0, -1.0],
        [3.0, -1.0, 0.5],
        [0.5, 1.0, 1.0],
        [1.0, 1.0, -1.0],
    ]
    ys = [1.0, -1.0, -1.0, 1.0]

    def total_loss():
        y_pred = [mlp(x) for x in xs]
        return sum((yo - yg) ** 2 for yo, yg in zip(y_pred, ys))

    start = total_loss().data
    for _ in range(50):
        loss = total_loss()
        mlp.zero_grad()
        loss.backward()
        for p in mlp.parameters():
            p.data -= 0.05 * p.grad
    end = total_loss().data

    assert end < start  # gradient descent should make the loss go down


def test_zero_grad_clears_parameter_gradients():
    mlp = MLP(3, [4, 4, 1])
    out = mlp([1.0, 2.0, 3.0])
    out.backward()
    assert any(p.grad != 0.0 for p in mlp.parameters())  # some grads got populated

    mlp.zero_grad()
    assert all(p.grad == 0.0 for p in mlp.parameters())
