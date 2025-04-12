
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

    predictions = model.predict(processed_img)

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
        print("Usage: python predict_image.py <image_path>")
    else:

        img_path = sys.argv[1]

        output = predict(img_path)

        print(json.dumps(output, indent=2))
