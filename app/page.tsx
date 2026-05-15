"use client";

// import "./page.css";

import { useEffect, useMemo, useState } from "react";

import AddUserForm from "./components/AddUserForm";
import UserList from "./components/UserList";
import DeleteModal from "./components/DeleteModal";
import AlertModal from "./components/AlertModal";
import checkDuplicateUser from "./components/CheckDuplicateUser";
import validateUser from "./components/ValidateUser";

interface User{
  id: number;
  name: string;
  email: string;
}

interface validateResult{
  valid: boolean;
  message: string;
}

interface UserInput {
  name: string;
  email: string;
}

export default function UsersPage() {

  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [editingId, setEditingId] = useState< number | null >(null);

  const [editName, setEditName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");


  // Delete Modal States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


  // Alert Modal States
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const [alertMessage, setAlertMessage] = useState<string>("");

  const filteredUsers = useMemo(() => {

    const query = searchTerm.trim().toLowerCase();

    if (!query) {

      return users;
    }

    return users.filter((user) => {

      const nameMatch = user.name.toLowerCase().includes(query);
      const emailMatch = user.email.toLowerCase().includes(query);

      return nameMatch || emailMatch;
    });
  }, [searchTerm, users]);


  // Show Alert Helper
  function showAlert(message : string):void {

    setAlertMessage(message);

    setIsAlertOpen(true);
  }


  // Fetch Users
  async function fetchUsers(): Promise<void> {

    const response = await fetch("/api/users");

    const data: User[] = await response.json();

    setUsers(data);
  }


  // Load Users
  useEffect(() => {

    let isMounted = true;

    async function loadUsers(): Promise<void> {

      const response = await fetch("/api/users");

      const data: User[] = await response.json();

      if (isMounted) {

        setUsers(data);
      }
    }

    void loadUsers();

    return () => {

      isMounted = false;
    };

  }, []);


  // Add User
  async function handleAddUser(userData: UserInput): Promise<void> {

    // Validate Inputs
    const validation:validateResult = validateUser(
      userData.name,
      userData.email
    );

    // Stop if invalid
    if (!validation.valid) {

      showAlert(validation.message);

      return;
    }


    // Check duplicate user
    const userExists: boolean = checkDuplicateUser(
      users,
      userData.email
    );

    if (userExists) {

      showAlert("User already exists!");

      return;
    }


    // Add User
    await fetch("/api/users", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    });

    fetchUsers();
  }


  // Start Editing
  function handleEdit(user: User) {

    setEditingId(user.id);

    setEditName(user.name);

    setEditEmail(user.email);
  }


  // Update User
  async function handleUpdate(id: number): Promise<void> {

    // Validate Inputs
    const validation:validateResult = validateUser(
      editName,
      editEmail
    );

    // Stop if invalid
    if (!validation.valid) {

      showAlert(validation.message);

      return;
    }

    // Check duplicate email
    const userExists: boolean = checkDuplicateUser(
      users,
      editEmail,
      id
    );

    if (userExists) {

      showAlert("Another user already has this email!");

      return;
    }


    // Update User
    await fetch(`/api/users/${id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: editName,
        email: editEmail,
      }),
    });

    setEditingId(null);

    fetchUsers();
  }


  // Open Delete Modal
  function handleDeleteClick(id:number) {

    setSelectedUserId(id);

    setIsModalOpen(true);
  }


  // Confirm Delete
  async function confirmDelete(): Promise<void> {

    await fetch(`/api/users/${selectedUserId}`, {
      method: "DELETE",
    });

    fetchUsers();

    setIsModalOpen(false);

    setSelectedUserId(null);
  }


  // Close Delete Modal
  function closeModal(): void {

    setIsModalOpen(false);

    setSelectedUserId(null);
  }

  return (

    <div className="page-container">

      <header className="page-header">
        <div>

          <h1 className="page-title">User Management Dashboard</h1>
        </div>
      </header>

      <div className="workspace-grid">

        <section className="workspace-panel control-panel">
          <div className="toolbar-card">
            <div className="toolbar-head">
              <div>
                <h2 className="toolbar-title">Find users faster</h2>
              </div>
              <button
                type="button"
                className="ghost-btn"
                onClick={() => {
                  setSearchTerm("");
                }}
              >
                Clear filters
              </button>
            </div>

            <label className="field-group">
              <span>Search</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email"
                className="input-field"
              />
            </label>

            <p className="toolbar-note">
              {searchTerm.trim()
                ? `Showing ${filteredUsers.length} result${filteredUsers.length === 1 ? "" : "s"} for "${searchTerm.trim()}".`
                : "Use the search box or filter to narrow the user list."}
            </p>
          </div>

          <AddUserForm
            onAddUser={handleAddUser}
          />
        </section>

        <section className="workspace-panel users-panel">
          <div className="users-panel-head">
            <div>
              <h2 className="toolbar-title">All Users</h2>
            </div>
           
          </div>

          <div className="users-panel-body">
            <UserList
              users={filteredUsers}
              editingId={editingId}
              editName={editName}
              editEmail={editEmail}
              setEditName={setEditName}
              setEditEmail={setEditEmail}
              onEdit={handleEdit}
              onUpdate={handleUpdate}
              onDelete={handleDeleteClick}
              onCancel={() => setEditingId(null)}
              hasActiveFilters={Boolean(searchTerm.trim())}
            />
          </div>
        </section>

      </div>


      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />


      {/* Alert Modal */}
      <AlertModal
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={() => setIsAlertOpen(false)}
      />

    </div>
  );
}
