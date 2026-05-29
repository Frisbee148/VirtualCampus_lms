// Valid login modes — must match the user_role enum in schema.sql and the
// ROLES list in client/src/auth/LoginPage.jsx.
export const ROLES = [
  "student",
  "faculty",
  "director",
  "registrar",
  "admin",
  "admin-officer",
  "guardian",
  "staff",
  "hod",
  "librarian",
  "library-operator",
];

export const isValidRole = (role) => ROLES.includes(role);
