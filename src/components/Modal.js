import '../styles/modal.css';
import { useAppDispatch } from '../redux/app/hooks';
import { saveIsAddingNewItem } from '../redux/features/task-board-slice';
import { useEffect } from 'react';

export default function Modal({ content, title, isOpen, height, clickEffect }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  return (
    <div className='modal-wrapper' style={{display: !isOpen && 'none'}}>
      <div className="modal" style={{height: height}}>
        <button
          type="button"
          className="close-modal-btn"
          title="Close add task modal"
          tabIndex={0}
          onClick={() => {
            clickEffect(isOpen);
            // dispatch(saveIsAddingNewItem(!isOpen));
          }}
        >
          X
        </button>
        {title && <span className="modal-title">{title}</span>}
        <div className="modal-content">
          {content}
        </div>
      </div>
    </div>
  );
}
