from tensorflow.keras.layers import Layer
import tensorflow as tf

class CustomScaleLayer(Layer):
    def __init__(self, scale=1.0, **kwargs): # Corrected: __init__ instead of _init_
        super(CustomScaleLayer, self).__init__(**kwargs)
        self.scale = scale

    def build(self, input_shape):
        super(CustomScaleLayer, self).build(input_shape)

    def call(self, inputs):
        # Handle both single and multi-input scenarios
        if isinstance(inputs, list):
            return [inp * self.scale for inp in inputs]
        else:
            return inputs * self.scale

    def compute_output_shape(self, input_shape):
        # Maintain the same shape as input(s)
        return input_shape

    def get_config(self):
        config = super().get_config()
        config.update({"scale": self.scale}) # Corrected: Include scale in config
        return config

    @classmethod
    def from_config(cls, config):
        return cls(**config)

from tensorflow.keras.models import load_model

# Load the model with the custom layer
model2 = load_model(
    "model.keras",
    custom_objects={'CustomScaleLayer': CustomScaleLayer} # Corrected: Pass custom_objects
)