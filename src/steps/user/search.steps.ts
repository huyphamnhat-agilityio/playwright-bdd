import { Given, When, Then } from "@/fixtures/users.fixture";
import { expect } from "@playwright/test";
import { ApiResponse } from "@/types";

/**
 * Navigate to search page
 */
Given("the user is on the users search page", async ({ searchUsersPage }) => {
  await searchUsersPage.navigateTo();
});

/**
 * Fill search input
 */
When(
  "the user enters {string} into the search input",
  async (
    { searchUsersPage, browserName, $workerInfo: { workerIndex } },
    keyword,
  ) => {
    await searchUsersPage.searchInput.fill(
      `${keyword}${workerIndex}${browserName}`,
    );
  },
);

/**
 * Click search button + wait for API
 */
When("the user clicks the search button", async ({ searchUsersPage, ctx }) => {
  const response = await searchUsersPage.waitForApiResponse(
    "GET",
    async () => await searchUsersPage.searchButton.click(),
  );

  ctx.searchApiResponse = await response.json();
  expect(response.status()).toBe(200);
});

/**
 * Validate UI + API results
 */
Then(
  "the user should see search results matching {string} in the {string} column",
  async (
    { searchUsersPage, browserName, ctx, $workerInfo: { workerIndex } },
    keyword,
    column,
  ) => {
    const apiResult = ctx.searchApiResponse as ApiResponse<{ id: string }>;

    // Validate API returned at least one item
    expect(apiResult.items.length).toBeGreaterThan(0);

    const userId = apiResult.items[0].id;

    // Verify ID exists in UI
    await expect(searchUsersPage.page.getByText(userId)).toBeVisible();

    // Validate column values
    const values = await searchUsersPage.table.getColumnValues(column);

    expect(values).toContain(`${keyword}${workerIndex}${browserName}`);
  },
);
