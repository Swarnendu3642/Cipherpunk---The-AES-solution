import decryptSuccessGif from "../assets/DecryptSuccess.gif";
import "../css/SuccessPopup.css";

export default function DecryptSuccessPopup({ message }) {
  return (
    <div className="success">
      <img src={decryptSuccessGif} alt="✅ Success" className="success-gif" />
    </div>
  );
}
