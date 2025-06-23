import { useState, useRef, useEffect } from "react";
import Loader from "./Loader";
import SuccessPopup from "./EncryptSuccessPopup";
import axios from "axios";
import "../css/FormContainer.css";
import { useNavigate } from 'react-router-dom';

export default function EncryptPage() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [keySize, setKeySize] = useState(""); // Default key size
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => setSuccess(false), 1800);
      return () => clearTimeout(timeout);
    }
  }, [success]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !email || !keySize) return alert("Please fill in all fields");

    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    formData.append("keySize", keySize); // 👈 Append key size

    try {
      const res = await axios.post("http://localhost:8080/api/encrypt", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      const filename = file.name.replace(/\.[^/.]+$/, "") + "_encrypted.txt";
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setFile(null);
      setEmail("");
      setKeySize("128"); // reset to default
      if (fileInputRef.current) fileInputRef.current.value = "";

      setTimeout(() => {
        setSuccess(true);
      }, 300);
    } catch (err) {
      alert("Encryption failed");
    } finally {
      setLoading(false);
    }
  };

  const blurClass = loading || success ? "page-content blurred" : "page-content";

  return (
    <div>
      <div className={blurClass}>
        <div className="form-container">
          <h2>Encrypt a File</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              required
            />

            <div className="keysize-button-group">
              {["128", "192", "256"].map((size) => (
                <button
                  type="button"
                  key={size}
                  className={`keysize-button ${keySize === size ? "selected" : ""}`}
                  onClick={() => setKeySize(size)}
                >
                  {size}-bit
                </button>
              ))}
            </div>

            <button type="submit" className="encrypt-button" disabled={loading}>
              Encrypt
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
              style={{ backgroundColor: '#e74c3c' }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>

      {loading && <Loader />}
      {success && <SuccessPopup message="File encrypted and mail sent successfully!" />}
    </div>
  );
}
