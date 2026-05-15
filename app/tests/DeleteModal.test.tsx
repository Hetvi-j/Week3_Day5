import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import DeleteModal from "../components/DeleteModal";

describe("DeleteModal", () => {
  it("does not render when closed", () => {
    render(
      <DeleteModal
        isOpen={false}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.queryByText(/delete user/i)).not.toBeInTheDocument();
  });

  it("renders actions and calls callbacks", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onConfirm = vi.fn();

    render(
      <DeleteModal
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );

    expect(screen.getByText(/delete user/i)).toBeInTheDocument();
    expect(screen.getByText(/are you sure you want to delete this user permanently/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: /delete/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
