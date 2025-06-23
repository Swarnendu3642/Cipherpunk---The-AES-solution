# 🔐 Cipherpunk

This project implements **AES (Advanced Encryption Standard)** encryption for secure data transmission using a **Java Spring Boot backend** (developed in IntelliJ) and a **React-based frontend**.

## 📂 Project Structure

```

AES-Encryption-Project/
├── aes-encryption-frontend/   # React-based user interface
└── aes-encryption/            # Java Spring Boot backend

````

## ⚙️ Features

- 🔒 AES Encryption and Decryption (128/192/256-bit)
- 🔁 Secure communication between frontend and backend
- 📦 JSON-based REST API
- 🌐 User-friendly web interface for message input/output
- 🧩 User can choose between 128-bit, 192-bit, or 256-bit encryption key size

## 💻 Tech Stack

### 🖥 Frontend (React)
- React.js (with hooks)
- Axios (for API calls)
- Bootstrap / CSS for styling

### 🛠 Backend (Java Spring Boot)
- Java 11+
- Spring Boot Framework
- AES Encryption using `javax.crypto` libraries
- REST API implementation

## 🔐 AES Key Size Selection

The application allows users to select the **AES key size** based on their encryption needs:

- ✅ 128-bit (standard security)
- ✅ 192-bit (intermediate security)
- ✅ 256-bit (highest security)

Key size selection can be done through the frontend before encryption. Ensure Java Cryptography Extension (JCE) Unlimited Strength Policy is enabled for 256-bit keys if using older JDK versions.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/aes-encryption-project.git
cd aes-encryption-project
````

### 2. Run Backend (Java - IntelliJ)

#### Open in IntelliJ:

* Open the `aes-encryption` folder in IntelliJ
* Make sure `Spring Boot` is configured

#### Build & Run:

```bash
./mvnw spring-boot:run
```

The backend will run at:
`http://localhost:8080`

### 3. Run Frontend (React)

```bash
cd aes-encryption-frontend
npm install
npm run dev
```

The frontend will run at:
`http://localhost:3000`

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

> ![WhatsApp Image 2025-06-23 at 10 49 41_ac6dde19](https://github.com/user-attachments/assets/7a995a61-b1f2-4bca-ae86-73e4dfe532d9)
> ![WhatsApp Image 2025-06-23 at 10 49 43_dd5d43b8](https://github.com/user-attachments/assets/d22ffd0d-972a-4290-9df8-f9d1c06b3a13)



## 🛡 Security Note

* AES encryption is performed in CBC mode with PKCS5 padding
* Initialization Vector (IV) is dynamically generated for each session
* Secret key is stored securely in backend configuration or generated on the fly
* Supports configurable key lengths: 128, 192, 256 bits

## 📜 License

This project is for educational purposes only.

## 🙋‍♂️ Author

**Sagnik Bhunia & Swarnendu Roy**
Developed as part of a secure information handling project using AES encryption.

## 📫 Contact

Feel free to reach out on GitHub or via email for feedback or collaboration.


