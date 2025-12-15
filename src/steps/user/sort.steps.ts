import { Given, When, Then } from "@/fixtures/users.fixture";
import { isAscending, isDescending } from "@/utils";
import { expect } from "@playwright/test";

/**
 * Navigate to users list page
 */
Given("the user is on the users list page", async ({ sortUsersPage }) => {
  await sortUsersPage.waitForPageLoad();
});

/**
 * Sort descending
 */
When(
  "the user clicks the {string} column header to sort in descending order",
  async ({ sortUsersPage }, field) => {
    const response = await sortUsersPage.waitForApiResponse(
      "GET",
      async () => await sortUsersPage.table.clickHeader(field),
    );

    expect(response.status()).toBe(200);
  },
);

/**
 * Verify descending order
 */
Then(
  "the user should see users sorted in descending order by {string}",
  async ({ sortUsersPage }, locator) => {
    const values = await sortUsersPage.table.getColumnValues(locator);
    expect(isDescending(values)).toBeTruthy();
  },
);

/**
 * Sort ascending
 */
When(
  "the user clicks the {string} column header to sort in ascending order",
  async ({ sortUsersPage }, field) => {
    const response = await sortUsersPage.waitForApiResponse(
      "GET",
      async () => await sortUsersPage.table.clickHeader(field),
    );

    expect(response.status()).toBe(200);
  },
);

/**
 * Verify ascending order
 */
Then(
  "the user should see users sorted in ascending order by {string}",
  async ({ sortUsersPage }, locator) => {
    const values = await sortUsersPage.table.getColumnValues(locator);
    expect(isAscending(values)).toBeTruthy();
  },
);
