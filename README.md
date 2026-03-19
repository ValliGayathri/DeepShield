🚀 DeepShield – Secure File Sharing System

📌 Project Overview

DeepShield is a full-stack web application designed to provide secure file sharing using AES encryption and modern web technologies.
The system ensures data confidentiality, secure authentication, and protected file storage.

---

🎯 Key Features

- 🔐 AES-based File Encryption & Decryption (Flask Microservice)
- 📧 OTP-Based User Authentication (Email)
- 🔑 JWT Secure Session Management
- ☁️ Cloud Storage Integration (Cloudinary)
- 📊 User Activity Logging

---

📁 Project Structure

DeepShield/
│
├── Deepshield Frontend/         # React Application (UI)
├── Deepshield Backend/          # Node.js + Express API
├── Deepshield AES algorithm/    # Flask API (Encryption/Decryption)
│
└── README.md

---

🧰 Technology Stack

Frontend

- React.js
- Axios
- React Router

Backend

- Node.js
- Express.js
- MongoDB / Supabase
- JWT Authentication
- Nodemailer

Encryption Service

- Python (Flask)
- AES-GCM Encryption
- PBKDF2 Key Derivation
- Chaotic S-Box

Cloud

- Supabase

---

⚙️ Prerequisites

Ensure the following are installed:

- Node.js (v16 or above)
- npm
- Python (3.8+)
- pip
- Git

---

🔐 Environment Variables

Create a ".env" file inside Deepshield Backend/:

PORT=5000

MONGO_URI=your_database_url
JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret

CLIENT_URL=http://localhost:3000

⚠️ Important:

- Use Gmail App Password, not your normal password
- Enable 2-Step Verification

---

📦 Installation

Step 1: Clone Repository

git clone <repository-url>
cd DeepShield

---

▶️ Execution Steps (Run the Project)

🔹 Step 1: Start AES Encryption Service (Flask)

cd "Deepshield AES algorithm"

Create Virtual Environment

python -m venv venv

Activate Environment

Windows:

venv\Scripts\activate

Mac/Linux:

source venv/bin/activate

Install Dependencies

pip install flask flask-cors cryptography

Run Flask Server

python app.py

✅ Output:

Running on http://0.0.0.0:5001/

---

🔹 Step 2: Start Backend Server

Open a new terminal:

cd "Deepshield Backend"
npm install
npm start

✅ Output:

Server running on port 5000
Database Connected

---

🔹 Step 3: Start Frontend

Open another terminal:

cd "Deepshield Frontend"
npm install
npm start

🌐 Application URL:

http://localhost:3000

---

🔄 System Execution Flow

1. User registers/logs in (OTP verification)
2. Frontend sends file → Backend
3. Backend calls Flask AES API
4. Flask encrypts/decrypts data
5. File stored/retrieved from Cloudinary
6. Activity logged securely

---

📦 Required Dependencies

🔹 Backend

npm install express mongoose dotenv cors jsonwebtoken bcryptjs nodemailer multer cloudinary axios

🔹 Frontend

npm install axios react-router-dom

🔹 AES Service

pip install flask flask-cors cryptography

---

🧪 Testing the Application

- Open: http://localhost:3000
- Register user
- Verify OTP via email
- Upload file (encrypted)
- Decrypt file
- Check activity logs

---

🐛 Common Errors & Solutions

Issue| Solution
OTP not sending| Use Gmail App Password
Unauthorized Email| Check credentials
SMTP Timeout| Use port 587
Flask not connecting| Ensure port 5001 is running
Upload fails| Check Cloudinary config

---

🔐 Security Features

- AES-GCM Encryption
- PBKDF2 Key Derivation
- Secure Password Hashing (bcrypt)
- Token-Based Authentication (JWT)
- Protected API Routes

---

☁️ Deployment Notes

Backend (Render)

- Build: "npm install"
- Start: "npm start"

Important:

const PORT = process.env.PORT || 5000;

---

🚀 Future Enhancements

- Role-Based Access Control
- File Expiry Links
- AI-Based Threat Detection
- Multi-user File Sharing

---

👨‍💻 Conclusion

DeepShield is a secure, scalable, and practical file protection system demonstrating real-world implementation of encryption, authentication, and cloud integration.

---

⭐ Final Notes

- Start services in this order:
  
  1. AES Flask Service
  2. Backend Server
  3. Frontend

- Do not expose ".env" file

- Ensure all ports are running correctly

---


🎤 Viva explanation for AES + flow

📄 Convert to Word/PDF report format


Just tell 👍
