import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/FormContainer.css';
import Loader from './Loader';
import SuccessPopup from './DecryptSuccessPopup';
import { useNavigate } from 'react-router-dom';

export default function DecryptPage() {
  const [encFile, setEncFile] = useState(null);
  const [keyFile, setKeyFile] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [decryptedData, setDecryptedData] = useState(null);
  const [error, setError] = useState(null);
  const [downloadFileName, setDownloadFileName] = useState('decrypted_file.txt');

  // Auto-hide success popup after 1750 ms
  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [success]);
  
  const navigate = useNavigate();
  const handleCancel = () => {
  navigate(-1); // Go to the previous page
};

  // Auto-download decrypted file when decryptedData is set, then clear form and URL
  useEffect(() => {
    if (decryptedData) {
      const link = document.createElement('a');
      link.href = decryptedData;
      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(decryptedData);
        setDecryptedData(null);

        // Clear form AFTER download
        clearForm();
      }, 1000);
    }
  }, [decryptedData, downloadFileName]);

  const clearForm = () => {
    setEncFile(null);
    setKeyFile(null);
    setEmail('');
    setDownloadFileName('decrypted_file.txt');

    // Clear file inputs manually
    const encInput = document.getElementById('encFile');
    const keyInput = document.getElementById('keyFile');
    if (encInput) encInput.value = '';
    if (keyInput) keyInput.value = '';
  };

  const handleDecrypt = async (e) => {
    e.preventDefault();

    if (!encFile || !keyFile || !email) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData();
    formData.append("encryptedFile", encFile);
    formData.append("keyFile", keyFile);
    formData.append("email", email);

    try {
      const startTime = Date.now();

      const response = await axios.post('http://localhost:8080/api/decrypt', formData, {
        responseType: 'blob',
      });

      const elapsed = Date.now() - startTime;
      if (elapsed < 2000) {
        await new Promise(resolve => setTimeout(resolve, 2000 - elapsed));
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Compute dynamic filename by replacing extension of original encrypted file with .txt
      let originalName = encFile.name;
      let baseName = originalName.lastIndexOf('.') !== -1
        ? originalName.substring(0, originalName.lastIndexOf('.'))
        : originalName;

      setDownloadFileName(`${baseName}_decrypted.txt`);
      setDecryptedData(url);
      setSuccess(true);

      // DO NOT clearForm here anymore (moved to useEffect)
    } catch (err) {
      console.error("Decryption failed:", err);
      setError("Decryption failed. Ensure your email is correct and files are valid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Decrypt a File</h2>
      <form onSubmit={handleDecrypt}>
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label htmlFor="encFile">Upload Encrypted file:</label>
        <input
          id="encFile"
          type="file"
          onChange={(e) => setEncFile(e.target.files[0])}
          accept=".txt"
          required
        />
        <label htmlFor="keyFile">Upload KeyInfo file:</label>
        <input
          id="keyFile"
          type="file"
          onChange={(e) => setKeyFile(e.target.files[0])}
          accept=".pdf"
          required
        />
        <button
  type="submit"
  className="decrypt-button"
  disabled={loading}
>
  {loading ? "Decrypting..." : "Decrypt"}
</button>
    
         {/* Cancel Button */}
        <button type="button" onClick={handleCancel} className="cancel-button">
          Cancel
        </button>
      </form>
    

      {loading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      {success && (
        <SuccessPopup message="File decrypted successfully!">
          <a href={decryptedData} download={downloadFileName}>Download Decrypted File</a>
        </SuccessPopup>
      )}
    </div>
  );
}
