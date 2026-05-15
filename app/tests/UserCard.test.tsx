import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import UserCard from "../components/UserCard";

describe("UserCard", () => {
  const user = {
    id: 1,
    name: "Hetvi",
    email: "hetvi@gmail.com",
  };

  it("shows user details and action buttons", () => {
    render(
      <UserCard
        user={user}
        editingId={null}
        editName=""
        editEmail=""
        setEditName={vi.fn()}
        setEditEmail={vi.fn()}
        onEdit={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByText("Hetvi")).toBeInTheDocument();
    expect(screen.getByText("hetvi@gmail.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("calls edit and delete handlers", async () => {
    const userInteraction = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <UserCard
        user={user}
        editingId={null}
        editName=""
        editEmail=""
        setEditName={vi.fn()}
        setEditEmail={vi.fn()}
        onEdit={onEdit}
        onUpdate={vi.fn()}
        onDelete={onDelete}
        onCancel={vi.fn()}
      />
    );

    await userInteraction.click(screen.getByRole("button", { name: /update/i }));
    await userInteraction.click(screen.getByRole("button", { name: /delete/i }));

    expect(onEdit).toHaveBeenCalledWith(user);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("shows the edit form when the user is being edited", () => {
    render(
      <UserCard
        user={user}
        editingId={1}
        editName="Hetvi"
        editEmail="hetvi@gmail.com"
        setEditName={vi.fn()}
        setEditEmail={vi.fn()}
        onEdit={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });
});
