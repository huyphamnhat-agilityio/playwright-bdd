import { expect } from "@playwright/test";

import {
  USER_CREATION_TEST_DATA,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from "@/constants";
import { ApiErrorResponse } from "@/types";
import { After, Given, Then, When } from "@/fixtures/users.fixture";
import { deleteUser } from "@/services";

/**
 * Navigation
 */
Given("the user is on the Users page", async ({ usersPage }) => {
  await usersPage.navigateTo();
});

/**
 * Button actions
 */
When('the user clicks the "New Record" button', async ({ usersPage }) => {
  await usersPage.newRecordButton.click();
});

/**
 * Fill fields using test constants
 */
When(
  "the user fills the email field with valid data",
  async ({ usersPage, browserName }) => {
    const email = `${USER_CREATION_TEST_DATA.email}${browserName}`;
    await usersPage.emailField.fill(email);
    await expect(usersPage.emailField).toHaveValue(email);
  },
);

When(
  "the user fills the password field with valid data",
  async ({ usersPage }) => {
    await usersPage.passwordField.fill(USER_CREATION_TEST_DATA.password);
    await expect(usersPage.passwordField).toHaveValue(
      USER_CREATION_TEST_DATA.password,
    );
  },
);

When(
  "the user fills the password confirm field with valid data",
  async ({ usersPage }) => {
    await usersPage.passwordConfirmField.fill(
      USER_CREATION_TEST_DATA.passwordConfirm,
    );
    await expect(usersPage.passwordConfirmField).toHaveValue(
      USER_CREATION_TEST_DATA.passwordConfirm,
    );
  },
);

When(
  "the user fills the confirm password field with {string}",
  async ({ usersPage }, passwordConfirm) => {
    await usersPage.passwordConfirmField.fill(passwordConfirm ?? "");
    await expect(usersPage.passwordConfirmField).toHaveValue(
      passwordConfirm ?? "",
    );
  },
);

When(
  'the user clicks the "Create" button to submit the form',
  async ({ usersPage, browserName, ctx }) => {
    const response = await usersPage.waitForApiResponse("POST", () =>
      usersPage.createButton.click(),
    );

    ctx.createdUser = await response.json();

    expect(response.status()).toBe(200);
    expect(ctx.createdUser?.email).toBe(
      `${USER_CREATION_TEST_DATA.email}${browserName}`,
    );
    expect(ctx.createdUser?.id).toBeDefined();
  },
);

When('the user clicks the "Create" button', async ({ usersPage }) => {
  await usersPage.createButton.click();
});

Then(
  "the user should see the created user in the list",
  async ({ usersPage, ctx: { createdUser } }) => {
    await usersPage.verifySuccessMessage(SUCCESS_MESSAGES.CREATE_SUCCESS);

    const userInList = await usersPage.getUserByEmail(createdUser!.email);
    await expect(userInList).toBeVisible();
    await expect(userInList).toContainText(createdUser!.email);
  },
);

Then(
  "the API should return success for user creation",
  async ({ ctx: { createdUser } }) => {
    expect(createdUser).not.toBeNull();
  },
);

Then(
  "the UI result should match the API response",
  async ({ usersPage, ctx }) => {
    const userInList = await usersPage.getUserByEmail(ctx.createdUser!.email);
    await expect(userInList).toContainText(ctx.createdUser!.email);
  },
);

Then(
  "the user should still see the Create User form",
  async ({ usersPage }) => {
    await expect(usersPage.createButton).toBeVisible();
  },
);

Then(
  'the user clicks the "Create" button and receives an API error',
  async ({ usersPage }) => {
    const response = await usersPage.waitForApiResponse(
      "POST",
      async () => await usersPage.createButton.click(),
    );

    const apiErrorResponse: ApiErrorResponse = await response.json();

    expect(response.status()).toBe(400);
    expect(apiErrorResponse.message).toBeDefined();
  },
);

Then(
  "the user should see the input error message {string}",
  async ({ page }, expectedError) => {
    const inputError = page.getByText(expectedError);
    expect(await inputError.textContent()).toContain(expectedError);
  },
);

Then("the user should see an error toast message", async ({ page }) => {
  const errorMessage = page.getByText(ERROR_MESSAGES.CREATE_FAIL);
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
});

/**
 * Cleanup after create user scenarios
 */
After(
  { tags: "@TC_USERS_001 or @TC_USERS_002 or @TC_USERS_003" },
  async ({ ctx }) => {
    if (ctx.createdUser?.id) {
      await deleteUser(ctx.createdUser.id);
      ctx.createdUser = null;
    }
  },
);
