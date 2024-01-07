import {useEffect} from 'react';
import '../styles/modal.css';

export default function Modal({ content, title, footer, hideHeader, isOpen, height, maxHeight, clickEffect, styles }) {
  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = 'hidden';
    }

    return () => (window.document.body.style.overflow = 'auto');
  }, [isOpen]);

  return (
    <div className='modal-wrapper' style={{display: !isOpen && 'none'}}>
      <div className="modal" style={{height: height, maxHeight: maxHeight}}>
        {!hideHeader && <div className="modal-header">
          {title && <span className="modal-title">{title}</span>}
        </div>}
        <div className="modal-content" style={styles}>
          {content}
        </div>
        {footer && <div className="modal-footer">
          {footer}
        </div>}
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
      </div>
    </div>
  );
}
