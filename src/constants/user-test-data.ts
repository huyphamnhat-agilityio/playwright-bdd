export const USER_CREATION_TEST_DATA = {
  email: "testuser@example.com",
  password: "testpassword",
  passwordConfirm: "testpassword",
};

export const USER_INVALID_FORM_TEST_DATA = [
  {
    description: "empty email, password and confirm password",
    email: "",
    password: "",
    passwordConfirm: "",
  },
  {
    description: "empty password and confirm password",
    email: "testuser@example.com",
    password: "",
    passwordConfirm: "",
  },
  {
    description: "empty confirm password",
    email: "testuser@example.com",
    password: "test",
    passwordConfirm: "",
  },
  {
    description: "empty password",
    email: "testuser@example.com",
    password: "",
    passwordConfirm: "test",
  },
];

export const USER_WRONG_VALUE_TEST_DATA = [
  {
    description: "password less than 8 characters",
    email: "wronguser@example.com",
    password: "123456",
    passwordConfirm: "123456",
    expectedError: "Must be at least 8 character(s).",
  },
  {
    description: "password confirm mismatch with password",
    email: "erroruser1@example.com",
    password: "12345678",
    passwordConfirm: "123456789",
    expectedError: "Values don't match.",
  },
];

export const USER_EDIT_TEST_DATA = {
  originalEmail: "testuseredit@example.com",
  originalPassword: "123456789",
  newEmail: "testuser1@example.com",
  newPassword: "12345678",
  newPasswordConfirm: "12345678",
};

export const USER_EDIT_INVALID_TEST_DATA = [
  {
    description: "empty email",
    originalEmail: "testuseredit1@example.com",
    originalPassword: "123456789",
    newEmail: "",
    newPassword: "12345678",
    newPasswordConfirm: "12345678",
  },
  {
    description: "empty password",
    originalEmail: "testuseredit2@example.com",
    originalPassword: "123456789",
    newEmail: "testuseredit2@example.com",
    newPassword: "",
    newPasswordConfirm: "12345678",
  },
  {
    description: "empty confirm password",
    originalEmail: "testuseredit3@example.com",
    originalPassword: "123456789",
    newEmail: "testuseredit3@example.com",
    newPassword: "12345678",
    newPasswordConfirm: "",
  },
];

export const USER_EDIT_WRONG_VALUE_TEST_DATA = [
  {
    description: "password less than 8 characters",
    originalEmail: "testuseredit4@example.com",
    originalPassword: "123456789",
    newEmail: "testuseredit4@example.com",
    newPassword: "123456",
    newPasswordConfirm: "123456",
    expectedError: "Must be at least 8 character(s).",
  },
  {
    description: "confirm password mismatch with password",
    originalEmail: "testuseredit5@example.com",
    originalPassword: "123456789",
    newEmail: "testuseredit5@example.com",
    newPassword: "123456789",
    newPasswordConfirm: "12345678",
    expectedError: "Values don't match.",
  },
];

export const USER_DELETE_TEST_DATA = [
  {
    email: "testdelete1@example.com",
    password: "123456789",
  },
  {
    email: "testdelete2@example.com",
    password: "123456789",
  },
];

export const USER_SORT_TEST_DATA = {
  testUsers: [
    { email: "charlie@example.com", password: "testpass123" },
    { email: "alice@example.com", password: "testpass123" },
    { email: "bob@example.com", password: "testpass123" },
  ],
  sortOptions: [
    { field: " email ", locator: "email" },
    { field: " username ", locator: "username" },
    { field: " created ", locator: "created" },
  ],
};

export const USER_SEARCH_TEST_DATA = [
  {
    email: "searchbyemail@example.com",
    password: "12345678",
    username: "usersearchbyemail",
  },
  {
    email: "searchbyname@example.com",
    password: "12345678",
    username: "usersearchbyname",
  },
];
