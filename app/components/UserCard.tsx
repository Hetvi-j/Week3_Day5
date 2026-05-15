import EditUserForm from "./EditUserForm";

interface User{
  id: number;
  name: string;
  email: string;
}

interface card{
  user: User;
  editingId: number | null;
  editName: string;
  editEmail: string;
  setEditName : (value:string) => void;
  setEditEmail: (value:string) => void;
  onEdit: (user: User) => void;
  onUpdate: (value: number) => void;
  onDelete: (id: number) => void;
  onCancel: () => void;
}

export default function UserCard({
  user,
  editingId,
  editName,
  editEmail,
  setEditName,
  setEditEmail,
  onEdit,
  onUpdate,
  onDelete,
  onCancel,
}:card ) {

  return (

    <div className="user-card">

      {editingId === user.id ? (

        <EditUserForm
          editName={editName}
          editEmail={editEmail}
          setEditName={setEditName}
          setEditEmail={setEditEmail}
          onUpdate={() => onUpdate(user.id)}
          onCancel={onCancel}
        />

      ) : (

        <div className="user-content">

          <div>

            <h3 className="user-name">
              {user.name}
            </h3>

            <p className="user-email">
              {user.email}
            </p>

          </div>

          <div className="button-group">

            <button
              type="button"
              onClick={() => onEdit(user)}
              className="update-btn"
            >
              Update
            </button>

            <button
              type="button"
              onClick={() => onDelete(user.id)}
              className="delete-btn"
            >
              Delete
            </button>

          </div>

        </div>

      )}

    </div>
  );
}