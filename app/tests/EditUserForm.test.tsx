import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { vi } from "vitest";

import EditUserForm from "../components/EditUserForm";

describe("EditUserForm", () => {
  it("calls the field setters and action buttons", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    const onCancel = vi.fn();

    function Harness() {
      const [editName, setEditName] = useState("Hetvi");
      const [editEmail, setEditEmail] = useState("hetvi@gmail.com");

      return (
        <EditUserForm
          editName={editName}
          editEmail={editEmail}
          setEditName={setEditName}
          setEditEmail={setEditEmail}
          onUpdate={onUpdate}
          onCancel={onCancel}
        />
      );
    }

    render(<Harness />);

    const inputs = screen.getAllByRole("textbox");

    expect(inputs[0]).toHaveValue("Hetvi");
    expect(inputs[1]).toHaveValue("hetvi@gmail.com");

    await user.clear(inputs[0]);
    await user.type(inputs[0], "Asha");
    await user.clear(inputs[1]);
    await user.type(inputs[1], "asha@gmail.com");

    expect(inputs[0]).toHaveValue("Asha");
    expect(inputs[1]).toHaveValue("asha@gmail.com");

    await user.click(screen.getByRole("button", { name: /save/i }));
    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
