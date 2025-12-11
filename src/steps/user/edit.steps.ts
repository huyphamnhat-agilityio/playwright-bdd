import { SUCCESS_MESSAGES } from "@/constants";
import { Given, When, Then, After } from "@/fixtures/users.fixture";
import { createUser, deleteUser } from "@/services";
import { User } from "@/types";
import { expect } from "@playwright/test";

/**
 * Background: Create user before scenario
 */
Given("a test user exists for editing", async ({ browserName, ctx }) => {
  const timestamp = Date.now();
  const payload = {
    email: `testuseredit-${timestamp}@example.com${browserName}`,
    password: "123456789",
    passwordConfirm: "123456789",
  };

  ctx.createdUser = await createUser(payload);
  expect(ctx.createdUser?.id).toBeDefined();
});

Given(
  "a test user exists for editing invalid cases",
  async ({ browserName, ctx }) => {
    const timestamp = Date.now();
    const payload = {
      email: `testuserinvalid-${timestamp}@example.com${browserName}`,
      password: "123456789",
      passwordConfirm: "123456789",
    };
    ctx.createdUser = await createUser(payload);
    expect(ctx.createdUser?.id).toBeDefined();
  },
);

/**
 * Always navigate to the users page before scenario logic
 */
Given("the user is on the users page", async ({ usersPage, ctx }) => {
  await usersPage.navigateTo();
  const row = await usersPage.getUserByEmail(ctx.createdUser!.email);
  await expect(row).toBeVisible();
});

When(
  "the user clicks the created user for editing",
  async ({ usersPage, ctx }) => {
    await usersPage.editUserByEmail(ctx.createdUser!.email);
  },
);

/**
 * Form appears
 */
Then("the edit form should be displayed", async ({ page }) => {
  const formHeading = page.getByRole("heading", {
    name: "Edit users record",
  });
  await expect(formHeading).toBeVisible();
});

/**
 * Update email
 */
When(
  "the user updates the email to {string}",
  async ({ usersPage }, newEmail) => {
    await usersPage.emailField.click();
    await usersPage.emailField.fill(newEmail);
    await expect(usersPage.emailField).toHaveValue(newEmail);
  },
);

/**
 * Check change password
 */
When("the user enables password editing", async ({ usersPage }) => {
  await usersPage.clickChangePasswordCheckbox();
});

/**
 * Update password
 */
When(
  "the user updates the password to {string}",
  async ({ usersPage }, newPassword) => {
    await usersPage.passwordField.click();
    await usersPage.passwordField.fill(newPassword);
    await expect(usersPage.passwordField).toHaveValue(newPassword);
  },
);

When(
  "the user updates the password confirm to {string}",
  async ({ usersPage }, newPasswordConfirm) => {
    await usersPage.passwordConfirmField.click();
    await usersPage.passwordConfirmField.fill(newPasswordConfirm);
    await expect(usersPage.passwordConfirmField).toHaveValue(
      newPasswordConfirm,
    );
  },
);

/**
 * Save changes + capture API response
 */
When(
  'the user clicks the "Save changes" button and receives a valid API response',
  async ({ usersPage, ctx }) => {
    const response = await usersPage.waitForApiResponse(
      "PATCH",
      async () => await usersPage.saveChangesButton.click(),
    );

    const apiResponse: User = await response.json();

    expect(response.status()).toBe(200);
    expect(apiResponse.id).toBe(ctx.createdUser?.id);

    ctx.createdUser = apiResponse;
  },
);

When(
  'the user clicks the "Save changes" button with invalid data',
  async ({ usersPage }) => {
    await usersPage.saveChangesButton.click();
  },
);

/**
 * Verify list + toast
 */
Then(
  "the user should see the updated user in the list",
  async ({ usersPage, ctx }) => {
    await usersPage.verifySuccessMessage(SUCCESS_MESSAGES.UPDATE_SUCCESS);

    const userInList = await usersPage.getUserByEmail(ctx.createdUser!.email);
    await expect(userInList).toBeVisible();
    await expect(userInList).toContainText(ctx.createdUser!.email);
  },
);

/**
 * Validate API + UI consistency
 */
Then(
  "the updated UI result should match the API response",
  async ({ usersPage, ctx }) => {
    const userInList = await usersPage.getUserByEmail(ctx.createdUser!.email);
    await expect(userInList).toContainText(ctx.createdUser!.email);
  },
);

Then("the form should not be submitted", async ({ usersPage }) => {
  await expect(usersPage.saveChangesButton).toBeVisible();
  await usersPage.cancelButton.click();
});

/**
 * Cleanup after edit user scenarios
 */
After({ tags: "@TC_USERS_004 or @TC_USERS_005" }, async ({ ctx }) => {
  if (ctx.createdUser?.id) {
    await deleteUser(ctx.createdUser.id);
    ctx.createdUser = null;
  }
});
