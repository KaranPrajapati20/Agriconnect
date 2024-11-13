from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import json

app = Flask(__name__)
CORS(app)


model = tf.keras.models.load_model('model.h5')


with open('class_indices.json', 'r') as f:
    class_names = json.load(f)

def preprocess_image(image):
    """Preprocess the image to fit the model input format."""
    image = image.resize((224, 224)) 
    image = np.array(image) 
    image = image / 255.0 
    image = np.expand_dims(image, axis=0)  
    return image

@app.route('/api/detect', methods=['POST'])
def detect_disease():
    """Handle disease detection from an uploaded image."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image = Image.open(io.BytesIO(file.read()))  
        processed_image = preprocess_image(image)  
        prediction = model.predict(processed_image) 

        class_index = np.argmax(prediction, axis=1)[0]  

        
        disease_name = class_names.get(str(class_index), "Unknown disease")
        
        return jsonify({'disease': disease_name}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
