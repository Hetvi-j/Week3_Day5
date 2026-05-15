import checkDuplicateUser from "../components/CheckDuplicateUser";

describe("checkDuplicateUser", () => {
  const users = [
    { id: 1, name: "Hetvi", email: "hetvi@gmail.com" },
    { id: 2, name: "Asha", email: "asha@gmail.com" },
  ];

  it("finds duplicate emails", () => {
    expect(checkDuplicateUser(users, "hetvi@gmail.com")).toBe(true);
  });

  it("ignores the current user when editing", () => {
    expect(checkDuplicateUser(users, "hetvi@gmail.com", 1)).toBe(false);
  });

  it("returns false for a new email", () => {
    expect(checkDuplicateUser(users, "new@gmail.com")).toBe(false);
  });
});
