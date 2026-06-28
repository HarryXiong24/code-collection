import random
from . import engine


class Neuron:
    """A single neuron in a neural network"""

    def __init__(self, number_of_inputs: int):
        # Initialize weights and bias for the neuron
        self.weights = [
            engine.Value(random.uniform(-1, 1)) for _ in range(number_of_inputs)
        ]  # number_of_inputs is the number of inputs
        self.bias = engine.Value(random.uniform(-1, 1))  # bias is a single value

    def __call__(self, x: list[float]) -> engine.Value:
        # sum the weighted inputs and add the bias
        weighted_sum = engine.Value(0)
        for weight, xi in zip(self.weights, x):
            weighted_sum += weight * xi
        act = weighted_sum + self.bias  # Add the bias to the weighted sum
        out = act.tanh()  # Apply the tanh activation function
        return out  # Return the output of the neuron

    def parameters(self) -> list[engine.Value]:
        # Return the parameters (weights and bias) of the neuron
        return self.weights + [self.bias]


class Layer:
    """A layer of neurons in a neural network"""

    def __init__(self, number_of_inputs: int, number_of_neurons: int):
        # Initialize a layer with a specified number of neurons
        self.neurons = [Neuron(number_of_inputs) for _ in range(number_of_neurons)]

    def __call__(self, x: list[float]) -> engine.Value | list[engine.Value]:
        # Pass the input through each neuron in the layer
        outputs = [neuron(x) for neuron in self.neurons]
        # if the layer has a single neuron, return the scalar Value directly
        return outputs[0] if len(outputs) == 1 else outputs

    def parameters(self) -> list[engine.Value]:
        # Return the parameters of all neurons in the layer
        params = []
        for neuron in self.neurons:
            params.extend(neuron.parameters())
        return params


class MLP:
    """Multi-Layer Perceptron"""

    def __init__(self, number_of_inputs: int, number_of_outputs: list[int]):
        """number_of_inputs: number of inputs to the MLP
        number_of_outputs: list of number of neurons in each layer
        """
        sz = [number_of_inputs] + number_of_outputs
        self.layers = [Layer(sz[i], sz[i + 1]) for i in range(len(number_of_outputs))]

    def __call__(self, x: list[float]) -> list[engine.Value]:
        for layer in self.layers:
            x = layer(x)
        return x  # Return the final output after passing through all layers

    def parameters(self) -> list[engine.Value]:
        # Return the parameters of all layers in the MLP
        params = []
        for layer in self.layers:
            params.extend(layer.parameters())
        return params

    def zero_grad(self) -> None:
        # Reset the gradient of every parameter to zero before a backward pass
        for p in self.parameters():
            p.grad = 0.0
