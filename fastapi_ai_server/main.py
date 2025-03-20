
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
import cv2
import io
from tensorflow.keras.models import load_model
from PIL import Image

# ✅ FastAPI App Initialization
app = FastAPI(title="Liver Ultrasound Diagnosis API", description="Upload ultrasound images for diagnosis.", version="1.1")

# ✅ Enable CORS for React frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Custom Scale Layer (Same as Your Working Code)
class CustomScaleLayer(tf.keras.layers.Layer):
    def __init__(self, scale=1.0, **kwargs):
        super(CustomScaleLayer, self).__init__(**kwargs)
        self.scale = scale

    def call(self, inputs):
        if isinstance(inputs, (list, tuple)):  # If inputs are a list/tuple of tensors
            return [tf.multiply(inp, self.scale) for inp in inputs]  # Use tf.multiply instead of `*`
        else:
            return tf.multiply(inputs, self.scale)  # Ensure tensor multiplication

    def get_config(self):
        config = super().get_config()
        config.update({"scale": self.scale})
        return config

    def compute_output_shape(self, input_shape):
        return input_shape  # Maintain the same shape as input


# ✅ Image Preprocessing for PNG/JPG Support
def preprocess_image(image: Image.Image):
    img = np.array(image.convert("L"))  # Convert to grayscale
    img_resized = cv2.resize(img, (299, 299))  # Resize to model input size
    img_rgb = np.stack([img_resized] * 3, axis=-1)  # Convert grayscale to 3-channel
    img_rgb = img_rgb.astype(np.float32) / 255.0  # Normalize

    # ✅ Debugging: Print shape to verify
    print("Processed Image Shape:", img_rgb.shape)

    return img_rgb

# ✅ Load Trained Model
model = load_model("model.keras", custom_objects={"CustomScaleLayer": CustomScaleLayer})

# ✅ Root API Route
@app.get("/")
def root():
    return {"message": "Liver Ultrasound Diagnosis API is running"}

# ✅ JSON Input Support (Same as Your Working Code)
class ModelInput(BaseModel):
    data: list  

@app.post("/predict")
def predict(input_data: ModelInput):
    try:
        input_array = np.array([preprocess_image(np.array(input_data.data, dtype=np.float32))])
        prediction_class, prediction_grade = model.predict(input_array)
        return {
            "fatty_liver_probability": float(prediction_class[0][0]),
            "steatosis_grade": float(prediction_grade[0][0])
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ New Route: Image Upload for PNG/JPG Ultrasounds
@app.post("/predict-image")
async def predict_image(file: UploadFile = File(...)):
    try:
        # ✅ Ensure fresh model session
        tf.keras.backend.clear_session()

        # ✅ Read the uploaded image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        # ✅ Process the image (resize & normalize)
        input_array = np.array([preprocess_image(image)], dtype=np.float32)

        # ✅ Ensure correct shape
        if input_array.shape != (1, 299, 299, 3):
            raise HTTPException(status_code=400, detail="Invalid image shape after preprocessing.")

        # ✅ Make predictions
        prediction_class, prediction_grade = model.predict(input_array)

        return {
            "fatty_liver_probability": float(prediction_class[0][0]),
            "steatosis_grade": float(prediction_grade[0][0])
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))





# from fastapi import FastAPI, HTTPException, File, UploadFile
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import numpy as np
# import tensorflow as tf
# import cv2
# import io
# from tensorflow.keras.models import load_model
# from PIL import Image

# # ✅ FastAPI App Initialization
# app = FastAPI(title="Liver Ultrasound Diagnosis API", description="Upload ultrasound images for diagnosis.", version="1.0")

# # ✅ Enable CORS for React frontend communication
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Change to ["http://localhost:3000"] for better security
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ✅ Custom Scale Layer (Same as Your Working Code)
# class CustomScaleLayer(tf.keras.layers.Layer):
#     def __init__(self, scale=1.0, **kwargs):
#         super(CustomScaleLayer, self).__init__(**kwargs)
#         self.scale = scale

#     def call(self, inputs):
#         if isinstance(inputs, list):
#             return [inp * self.scale for inp in inputs]
#         else:
#             return inputs * self.scale

#     def get_config(self):
#         config = super().get_config()
#         config.update({"scale": self.scale})
#         return config

# # ✅ Image Preprocessing for PNG/JPG Support
# def preprocess_image(image: Image.Image):
#     img = np.array(image.convert("L"))  # Convert to grayscale
#     img_resized = cv2.resize(img, (299, 299))  # Resize to model input size
#     img_rgb = np.stack([img_resized] * 3, axis=-1)  # Convert grayscale to 3-channel
#     return img_rgb / 255.0  # Normalize

# # ✅ Load Trained Model
# model = load_model("model.keras", custom_objects={"CustomScaleLayer": CustomScaleLayer})

# # ✅ Root API Route
# @app.get("/")
# def root():
#     return {"message": "Liver Ultrasound Diagnosis API is running"}

# # ✅ JSON Input Support (Same as Your Working Code)
# class ModelInput(BaseModel):
#     data: list  

# @app.post("/predict")
# def predict(input_data: ModelInput):
#     try:
#         input_array = np.array([preprocess_image(np.array(input_data.data, dtype=np.float32))])
#         prediction_class, prediction_grade = model.predict(input_array)
#         return {
#             "fatty_liver_probability": float(prediction_class[0][0]),
#             "steatosis_grade": float(prediction_grade[0][0])
#         }
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # ✅ New Route: Image Upload for PNG/JPG Ultrasounds
# @app.post("/predict-image")
# async def predict_image(file: UploadFile = File(...)):
#     try:
#         # Read the uploaded image
#         image = Image.open(io.BytesIO(await file.read()))

#         # Process the image (resize & normalize)
#         input_array = np.array([preprocess_image(image)], dtype=np.float32)

#         # Make predictions
#         prediction_class, prediction_grade = model.predict(input_array)

#         return {
#             "fatty_liver_probability": float(prediction_class[0][0]),
#             "steatosis_grade": float(prediction_grade[0][0])
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
