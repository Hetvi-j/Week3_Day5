import UserCard from "./UserCard";

interface User{
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
  editingId: number | null;
  editName: string;
  editEmail: string;
  setEditName: (value: string) => void;
  setEditEmail: (value: string) => void;
  onEdit: (user: User) => void;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
  onCancel: () => void;
}


export default function UserList({
  users,
  editingId,
  editName,
  editEmail,
  setEditName,
  setEditEmail,
  onEdit,
  onUpdate,
  onDelete,
  onCancel,
  }: UserListProps) {

  return (

    <div>

      <h2 className="section-title">
        All Users
      </h2>

      <div className="users-list">

        {users.map((user) => (

          <UserCard
            key={user.id}
            user={user}
            editingId={editingId}
            editName={editName}
            editEmail={editEmail}
            setEditName={setEditName}
            setEditEmail={setEditEmail}
            onEdit={onEdit}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onCancel={onCancel}
          />

        ))}

      </div>

    </div>
  );
}