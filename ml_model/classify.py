
import tensorflow as tf 
import numpy as np     
from tensorflow.keras.applications.mobilenet_v2 import (
    MobileNetV2,        
    preprocess_input,   
    decode_predictions   
)
from tensorflow.keras.preprocessing import image 
from PIL import Image     
import json              
import sys
import io
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow logs
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')               

def load_and_prepare_image(img_path):
    img = Image.open(img_path).convert('RGB')
    img = img.resize((224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

def predict(img_path):
    model = MobileNetV2(weights='imagenet')

    processed_img = load_and_prepare_image(img_path)

    predictions = model.predict(processed_img, verbose=0)

    decoded = decode_predictions(predictions, top=1)[0][0]

    label = decoded[1]

    confidence = float(decoded[2]) * 100

    result = {
        "label": label,
        "confidence": round(confidence, 1) 
    }

    return result

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({ "error": "Image path argument missing." }))
        sys.exit(1)
    else:
        try:
            img_path = sys.argv[1]
            output = predict(img_path)
            print(json.dumps(output))
        except Exception as e:
            print(json.dumps({ "error": str(e) }))
            sys.exit(1)