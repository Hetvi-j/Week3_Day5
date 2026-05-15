import validateUser from "../components/ValidateUser";

describe("validateUser", () => {
  it("rejects empty fields", () => {
    expect(validateUser("", "")).toEqual({
      valid: false,
      message: "All fields are required!",
    });
  });

  it("rejects non-gmail addresses", () => {
    expect(validateUser("Asha", "asha@example.com")).toEqual({
      valid: false,
      message: "Enter a valid Gmail address!",
    });
  });

  it("accepts valid gmail addresses", () => {
    expect(validateUser("Asha", "asha@gmail.com")).toEqual({
      valid: true,
      message: "",
    });
  });
});
