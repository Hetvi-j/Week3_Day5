interface DeleteInterface{
  isOpen:Boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}:DeleteInterface) {

  if (!isOpen) {
    return null;
  }

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2 className="modal-title">
          Delete User?
        </h2>

        <p className="modal-text">
          Are you sure you want to delete this user permanently?
        </p>

        <div className="modal-buttons">

          <button
            onClick={onClose}
            className="cancel-btn"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="delete-btn"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}