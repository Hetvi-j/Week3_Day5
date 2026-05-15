import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import AddUserForm from "../components/AddUserForm";

describe("AddUserForm", () => {
  it("submits the entered user data", async () => {
    const user = userEvent.setup();
    const onAddUser = vi.fn().mockResolvedValue(undefined);

    render(<AddUserForm onAddUser={onAddUser} />);

    await user.type(screen.getByPlaceholderText(/enter name/i), "Asha");
    await user.type(screen.getByPlaceholderText(/enter email/i), "asha@example.com");
    await user.click(screen.getByRole("button", { name: /add user/i }));

    expect(onAddUser).toHaveBeenCalledWith({
      name: "Asha",
      email: "asha@example.com",
    });
  });

  it("clears the form after a successful submit", async () => {
    const user = userEvent.setup();
    const onAddUser = vi.fn().mockResolvedValue(undefined);

    render(<AddUserForm onAddUser={onAddUser} />);

    const nameInput = screen.getByPlaceholderText(/enter name/i);
    const emailInput = screen.getByPlaceholderText(/enter email/i);

    await user.type(nameInput, "Asha");
    await user.type(emailInput, "asha@example.com");
    await user.click(screen.getByRole("button", { name: /add user/i }));

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  });
});
