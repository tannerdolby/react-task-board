import { useState, useEffect } from "react";
import '../styles/alert.css';

export default function Alert({ text, show, onClick }) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(show);
  }, [show]);

  if (!show) {
    return '';
  }

  return (
    <div className={`alert-banner ${!showAlert ? 'hidden' : ''}`.trim()}>
      <span>{text}</span>
      <button
        onClick={() => {
          setShowAlert(!show)
          if (onClick) onClick();
        }}
      >
        x
      </button>
    </div>
  );
}
