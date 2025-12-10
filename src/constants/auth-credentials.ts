export const INVALID_CREDENTIALS = [
  {
    description: "empty email",
    email: "",
    password: "invalid",
  },
  {
    description: "empty password",
    email: "wrongcredential@example.com",
    password: "",
  },
  {
    description: "empty email and empty password",
    email: "",
    password: "",
  },
];

export const WRONG_CREDENTIALS = {
  description: "Email: notfounduser@example.com, Password: notfoundpassword",
  email: "notfounduser@example.com",
  password: "notfoundpassword",
};

export const VALID_CREDENTIALS = {
  email: process.env.TEST_EMAIL || "test@example.com",
  password: process.env.TEST_PASSWORD || "123456",
};
