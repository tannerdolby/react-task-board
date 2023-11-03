import { useEffect } from 'react';
import '../styles/modal.css';

export default function Modal({ content, title, isOpen, height, clickEffect, styles }) {
  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = 'hidden';
    }

    return () => (window.document.body.style.overflow = 'auto');
  }, [isOpen]);

  return (
    <div className='modal-wrapper' style={{display: !isOpen && 'none'}}>
      <div className="modal" style={{height: height}}>
        <button
          type="button"
          className="close-modal-btn"
          title="Close modal"
          tabIndex={0}
          onClick={() => {
            clickEffect(isOpen);
          }}
        >
          X
        </button>
        {title && <span className="modal-title">{title}</span>}
        <div className="modal-content" style={styles}>
          {content}
        </div>
      </div>
    </div>
  );
}
