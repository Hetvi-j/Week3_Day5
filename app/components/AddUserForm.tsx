"use client";

import React from "react";  // to use formevents like onsubmit,e,etc
import { useState } from "react";


// User Input Type
interface UserInput {
  name: string;
  email: string;
}

// Component Props Type
interface AddUserFormProps {
  onAddUser: (
    userData: UserInput
  ) => Promise<void>;
}

export default function AddUserForm({ onAddUser }:AddUserFormProps) {

  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");


// Submit Form
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>): Promise<void>{

    e.preventDefault();

    await onAddUser({
      name,
      email,
    });


// Clear Inputs
    setName("");
    setEmail("");
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="form-container"
    >

      <h2 className="section-title" >
        USER MANAGEMENT
      </h2>

      <div className="input-grid">

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />

      </div>

      <button
        type="submit"
        className="primary-btn"
      >
        Add User
      </button>

    </form>
  );
}