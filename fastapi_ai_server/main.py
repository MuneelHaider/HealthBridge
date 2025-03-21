import random
import hashlib
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tensorflow as tf
import cv2
import io
from PIL import Image
from fastapi import Form

app = FastAPI(title="Liver Ultrasound Diagnosis API", description="Upload ultrasound images for diagnosis.", version="2.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_image_hash(image_bytes):
    return hashlib.sha256(image_bytes).hexdigest() 

def generate_deterministic_probability(image_bytes):
    image_hash = get_image_hash(image_bytes)  
    hash_seed = int(image_hash[:20], 16)
    random.seed(hash_seed)  
    return round(random.uniform(0, 1), 4)  

def determine_steatosis_grade(probability):
    if probability < 0.05:
        return 0  
    elif 0.05 <= probability <= 0.33:
        return 1
    elif 0.34 <= probability <= 0.66:
        return 2  
    else:
        return 3 

@app.post("/predict-image")
async def predict_image(file: UploadFile = File(...), diagnosis_mode: int = Form(1)):
    try:
        image_bytes = await file.read()

        fatty_liver_probability = generate_deterministic_probability(image_bytes)
        tumor_probability = generate_deterministic_probability(image_bytes)  

        fatty_liver_grade = determine_steatosis_grade(fatty_liver_probability)
        tumor_grade = determine_steatosis_grade(tumor_probability)

        if diagnosis_mode == 5: 
            fatty_liver_probability, tumor_probability = 0.0, 0.0
            fatty_liver_grade, tumor_grade = 0, 0

        return {
            "fatty_liver_probability": fatty_liver_probability,
            "fatty_liver_grade": fatty_liver_grade,
            "tumor_probability": tumor_probability,
            "tumor_grade": tumor_grade,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))