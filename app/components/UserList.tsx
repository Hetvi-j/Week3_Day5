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
  hasActiveFilters: boolean;
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
  hasActiveFilters,
  }: UserListProps) {

  return (

    <section className="user-list-section">

      {users.length === 0 ? (

        <div className="empty-state">
          <h3>
            {hasActiveFilters ? "No matching users found" : "No users yet"}
          </h3>
          <p>
            {hasActiveFilters
              ? "Try a different keyword or switch the filter back to all fields."
              : "Add the first user to start building the directory."}
          </p>
        </div>

      ) : null}

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

    </section>
  );
}
