// Loader.jsx
import animationGif from "../assets/Animation.gif";
import "../css/Loader.css";

export default function Loader() {
  return (
    <div className="loader-overlay">
      <img src={animationGif} alt="Loading..." className="loader-gif" />
    </div>
  );
}
