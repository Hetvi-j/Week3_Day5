export default function validateUser(name:string, email:string) {


// Remove extra spaces
  const trimmedName = name.trim();

  const trimmedEmail = email.trim();


// Empty Validation
  if (!trimmedName || !trimmedEmail) {

    return {
      valid: false,
      message: "All fields are required!",
    };
  }


// Email Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!emailRegex.test(trimmedEmail)) {

    return {
      valid: false,
      message: "Enter a valid Gmail address!",
    };
  }


// Everything valid
  return {
    valid: true,
    message: "",
  };
}