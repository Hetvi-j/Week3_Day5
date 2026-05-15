
interface editUser{
  editName: string;
  editEmail: string;
  setEditName: (value:string) => void;
  setEditEmail: (value:string) => void;
  onUpdate: () => void;
  onCancel: () => void;
}

export default function EditUserForm({
  editName,
  editEmail,
  setEditName,
  setEditEmail,
  onUpdate,
  onCancel,
}:editUser) {

  return (

    <div className="edit-form">

      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        className="input-field"
      />

      <input
        type="email"
        value={editEmail}
        onChange={(e) => setEditEmail(e.target.value)}
        className="input-field"
      />

      <div className="button-group">

        <button
          type="button"
          onClick={onUpdate}
          className="save-btn"
        >
          Save
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="cancel-btn"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}
