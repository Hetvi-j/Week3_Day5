import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import UserList from "../components/UserList";

describe("UserList", () => {
  const users = [
    { id: 1, name: "Hetvi", email: "hetvi@gmail.com" },
    { id: 2, name: "Asha", email: "asha@gmail.com" },
  ];

  it("shows the empty state when there are no users", () => {
    render(
      <UserList
        users={[]}
        editingId={null}
        editName=""
        editEmail=""
        setEditName={vi.fn()}
        setEditEmail={vi.fn()}
        onEdit={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        onCancel={vi.fn()}
        hasActiveFilters={false}
      />
    );

    expect(screen.getByText(/no users yet/i)).toBeInTheDocument();
    expect(screen.getByText(/add the first user/i)).toBeInTheDocument();
  });

  it("shows the filtered empty state when filters are active", () => {
    render(
      <UserList
        users={[]}
        editingId={null}
        editName=""
        editEmail=""
        setEditName={vi.fn()}
        setEditEmail={vi.fn()}
        onEdit={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        onCancel={vi.fn()}
        hasActiveFilters={true}
      />
    );

    expect(screen.getByText(/no matching users found/i)).toBeInTheDocument();
    expect(screen.getByText(/try a different keyword/i)).toBeInTheDocument();
  });

  it("renders each user card", () => {
    render(
      <UserList
        users={users}
        editingId={null}
        editName=""
        editEmail=""
        setEditName={vi.fn()}
        setEditEmail={vi.fn()}
        onEdit={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        onCancel={vi.fn()}
        hasActiveFilters={false}
      />
    );

    expect(screen.getByText("Hetvi")).toBeInTheDocument();
    expect(screen.getByText("Asha")).toBeInTheDocument();
  });
});
