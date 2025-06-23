
# 🔐 Cipherpunk

This project implements **AES (Advanced Encryption Standard)** encryption for secure data transmission using a **Java Spring Boot backend** (developed in IntelliJ) and a **React-based frontend** powered by **Vite**.

## 📂 Project Structure

```

AES-Encryption-Project/
├── aes-encryption-frontend/   # React + Vite user interface
└── aes-encryption/            # Java Spring Boot backend

````

## ⚙️ Features

- 🔒 AES Encryption and Decryption (128/192/256-bit)
- 🔁 Secure communication between frontend and backend
- 📦 JSON-based REST API
- 🌐 Fast, modern web interface using React and Vite
- 🔧 User can select key size: 128-bit, 192-bit, or 256-bit AES encryption

## 💻 Tech Stack

### 🖥 Frontend (React + Vite)
- React.js (with hooks)
- Vite (for fast build and hot reload)
- Axios (for API communication)
- Bootstrap / CSS for styling

### 🛠 Backend (Java Spring Boot)
- Java 11+
- Spring Boot Framework
- AES Encryption using `javax.crypto` libraries
- RESTful APIs for encryption and decryption

## 🔐 AES Key Size Selection

Users can choose from the following AES key sizes before encrypting:

- ✅ **128-bit** – Standard level security
- ✅ **192-bit** – Higher intermediate security
- ✅ **256-bit** – Maximum security level

> ⚠️ For 256-bit encryption, ensure JDK supports Unlimited Strength Policy (usually enabled by default in Java 9+).

### 📧 SMTP Setup (For Email Support)

To use SMTP with Gmail, generate an **App Password**:

1. Go to your [Google Account Security settings](https://myaccount.google.com/security).
2. Enable **2-Step Verification** if not already enabled.
3. Under "Signing in to Google", click **App Passwords**.
4. Select **Mail** as the app and **Other** as the device.
5. Generate and copy the 16-character app password.
6. Use this app password in your `application.properties` or environment variables for SMTP authentication.
   
## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/aes-encryption-project.git
cd aes-encryption-project
````

### 2. Run Backend (Java - IntelliJ)

#### Open in IntelliJ:

* Navigate to `aes-encryption` folder
* Ensure Spring Boot is configured properly

#### Build & Run:

```bash
./mvnw spring-boot:run
```

The backend will start at:
`http://localhost:8080`

### 3. Run Frontend (React + Vite)

```bash
cd aes-encryption-frontend
npm install
npm run dev
```

The frontend will run at:
`http://localhost:5173`

## 🔄 API Endpoints

| Method | Endpoint   | Description        |
| ------ | ---------- | ------------------ |
| POST   | `/encrypt` | Encrypts a message |
| POST   | `/decrypt` | Decrypts a message |

Example Request:

```json
{
  "message": "Your message here",
  "keySize": 256
}
```

## 📸 Screenshots

> ![WhatsApp Image 2025-06-23 at 10 49 41_d8354a84](https://github.com/user-attachments/assets/f94ed5c1-6003-45f1-bae3-34c670e1bd23)
> ![WhatsApp Image 2025-06-23 at 10 49 43_dd36e2ee](https://github.com/user-attachments/assets/3fbbc1dd-980b-4248-b0fc-444922040dc5)



## 🛡 Security Note

* AES algorithm in CBC mode with PKCS5 padding
* Randomly generated Initialization Vector (IV) for each session
* Keys managed securely at the backend
* Supports key size configuration: 128, 192, 256 bits

## 📜 License

This project is created for educational purposes and demonstration of secure encryption techniques.

## 👥 Authors

* **Swarnendu Roy**
* **Sagnik Bhunia**

## 📫 Contact

Feel free to connect on GitHub or email for collaboration, questions, or feedback.

```

