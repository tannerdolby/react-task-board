import { useState, useEffect } from "react";
import '../styles/alert.css';

export default function Alert({ text, show, onClick }) {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setShowAlert(show);
    }, [show]);

    return (
        <div className={`alert-banner ${!showAlert ? 'hidden' : ''}`}>
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
