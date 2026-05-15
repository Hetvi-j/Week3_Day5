"use client";

// import "./page.css";

import { useEffect, useState } from "react";

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

  const [editingId, setEditingId] = useState< number | null >(null);

  const [editName, setEditName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");


  // Delete Modal States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


  // Alert Modal States
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const [alertMessage, setAlertMessage] = useState<string>("");


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

    fetchUsers();

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
      editEmail//,
      // id
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

      <div className="main-card">

        <AddUserForm
          onAddUser={handleAddUser}
        />

        <hr />

        <UserList
          users={users}
          editingId={editingId}
          editName={editName}
          editEmail={editEmail}
          setEditName={setEditName}
          setEditEmail={setEditEmail}
          onEdit={handleEdit}
          onUpdate={handleUpdate}
          onDelete={handleDeleteClick}
          onCancel={() => setEditingId(null)}
        />

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