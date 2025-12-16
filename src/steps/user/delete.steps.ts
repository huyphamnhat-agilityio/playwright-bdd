import { Given, Then, When } from '@/fixtures/users.fixture';
import { expect } from '@playwright/test';

/**
 * Navigate to delete users page
 */
Given('the user is on the delete users page', async ({ deleteUsersPage }) => {
  await deleteUsersPage.navigateTo();
});

When('the user selects a user to delete', async ({ deleteUsersPage, ctx }) => {
  ctx.selectedUser = deleteUsersPage.userList[0];

  const checkbox = deleteUsersPage.getUserDeleteCheckbox(ctx.selectedUser.id);

  await checkbox.click();
});

When(
  'the user selects multiple users to delete',
  async ({ deleteUsersPage }) => {
    for (const user of deleteUsersPage.userList) {
      const checkbox = deleteUsersPage.getUserDeleteCheckbox(user.id);
      await checkbox.waitFor({ state: 'visible', timeout: 5000 });
      await checkbox.click();
    }
  },
);

/**
 * Click delete selected
 */
When(
  'the user clicks the "Delete selected" button',
  async ({ deleteUsersPage }) => {
    await deleteUsersPage.deleteButton.click();
  },
);

/**
 * Confirm deletion and verify API
 */
When('the user confirms the deletion', async ({ deleteUsersPage }) => {
  const response = await deleteUsersPage.waitForApiResponse(
    'DELETE',
    async () => await deleteUsersPage.confirmDeleteButton.click(),
  );

  expect(response.status()).toBe(204);
});

/**
 * Verify user is removed from UI
 */
Then(
  'the deleted user should no longer appear in the user list',
  async ({ deleteUsersPage, ctx }) => {
    const userElement = await deleteUsersPage.getUserByEmail(
      ctx.selectedUser!.email,
    );

    await expect(userElement).not.toBeVisible();
  },
);

Then(
  'the deleted users should no longer appear in the user list',
  async ({ deleteUsersPage }) => {
    for (const selectedUser of deleteUsersPage.userList) {
      const userElement = await deleteUsersPage.getUserByEmail(
        selectedUser.email,
      );

      await expect(userElement).not.toBeVisible();
    }
  },
);
