# 📱 Smart Image Classifier with WordPress Blog Sync

A full-stack cross-platform app using **React Native**, **Node.js**, and **Python** with a pre-trained **MobileNetV2** model for image classification. Users can upload an image, receive a prediction locally, and sync the result as a blog draft to a WordPress site.

---

## ✨ Features

- Upload image from camera or gallery  
- Classify image using Python script (MobileNetV2)  
- Display predicted label and confidence score  
- Sync result to WordPress via REST API  
- Optional: Local history of classifications  

---

## 🛠 Tech Stack

- **Frontend:** React Native (Native CLI)  
- **Backend:** Node.js + Express  
- **Image Classifier:** Python + torchvision (MobileNetV2)  
- **WordPress Integration:** REST API + Application Passwords  
- **Local Storage:** JSON/SQLite  

---

## 📁 Folder Structure

```
smart-image-classifier/
├── mobile       # React Native app 
├── server       # Node.js backend 
└── ml_model     # Python image classification script
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-image-classifier.git
cd smart-image-classifier
```

---

### 2. Setup Python Classifier (`/ml_model`)

```bash
cd ml_model
pip install torch torchvision pillow
python classify.py path_to_image.jpg
```

---

### 3. Setup Backend (`/server`)

```bash
cd ../server
npm install
node server.js
```

Update `routes/wordpress.js` with:

- WordPress site URL  
- Username  
- Application Password  

---

### 4. Setup Mobile App (`/mobile`)

```bash
cd ../mobile
npm install
npx react-native run-android   # or run-ios
```

---

### 🔐 WordPress Setup

1. Use a test WordPress site  
2. Enable Application Passwords plugin or feature  
3. Ensure your site uses HTTPS  
4. Update credentials in `/server/routes/wordpress.js`

---

## 📌 Known Issues

- HTTPS is required for uploading images to WordPress  
- Ensure Python and Node.js versions are compatible  

--
