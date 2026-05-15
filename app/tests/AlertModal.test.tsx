import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import AlertModal from "../components/AlertModal";

describe("AlertModal", () => {
  it("does not render when closed", () => {
    render(
      <AlertModal
        isOpen={false}
        message="Something happened"
        onClose={vi.fn()}
      />
    );

    expect(screen.queryByText(/notification/i)).not.toBeInTheDocument();
  });

  it("renders the message and calls onClose", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <AlertModal
        isOpen={true}
        message="Something happened"
        onClose={onClose}
      />
    );

    expect(screen.getByText(/notification/i)).toBeInTheDocument();
    expect(screen.getByText(/something happened/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /ok/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
