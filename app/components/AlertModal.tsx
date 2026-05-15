interface AlertModalProps{
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export default function AlertModal({
  isOpen,
  message,
  onClose,
}:AlertModalProps) {

  if (!isOpen) {
    return null;
  }

  return (

    <div className="modal-overlay">

      <div className="alert-box">

        <h2 className="alert-title">
          Notification
        </h2>

        <p className="alert-message">
          {message}
        </p>

        <button
          onClick={onClose}
          className="primary-btn"
        >
          OK
        </button>

      </div>

    </div>
  );
}