import encryptSuccessGif from "../assets/EncryptSuccess.gif";
import "../css/SuccessPopup.css";

export default function EncryptSuccessPopup({ message }) {
  return (
    <div className="success">
      <img src={encryptSuccessGif} alt="✅ Success" className="success-gif" />
    </div>
  );
}
