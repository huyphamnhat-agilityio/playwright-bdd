import {
  ERROR_MESSAGES,
  UI_ELEMENTS,
  URL_PATTERNS,
  VALID_CREDENTIALS,
  WRONG_CREDENTIALS,
} from "@/constants";
import { Given, Then, When } from "@/fixtures/auth.fixture";
import { expect } from "@playwright/test";

Given("the user is on the login page", async ({ loginPage }) => {
  await loginPage.navigateTo();
});

Given("the user is logged in", async ({ loginPage }) => {
  await loginPage.login(VALID_CREDENTIALS.email, VALID_CREDENTIALS.password);
});

/**
 * Email field
 */
When(
  "the user fills the email field with {string}",
  async ({ loginPage }, type) => {
    const value =
      type === "valid"
        ? VALID_CREDENTIALS.email
        : type === "wrong"
          ? WRONG_CREDENTIALS.email
          : type; // raw value from Scenario Outline

    console.warn("value", type);
    await loginPage.emailField.fill(value ?? "");
  },
);

/**
 * Password field
 */
When(
  "the user fills the password field with {string}",
  async ({ loginPage }, type) => {
    const value =
      type === "valid"
        ? VALID_CREDENTIALS.password
        : type === "wrong"
          ? WRONG_CREDENTIALS.password
          : type;

    await loginPage.passwordField.fill(value ?? "");
  },
);

/**
 * Login button
 */
When("the user clicks the login button", async ({ loginPage }) => {
  await loginPage.loginButton.click();
});

/**
 * Dashboard validation
 */
Then("the user should navigate to the dashboard page", async ({ page }) => {
  const dashboardLogo = page.getByRole("link", {
    name: UI_ELEMENTS.POCKETBASE_LOGO,
  });
  await expect(dashboardLogo).toBeVisible();
});

/**
 * Stay on login page
 */
Then("the user should stay on the login page", async ({ page }) => {
  await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
});

/**
 * Invalid credentials error
 */
Then("the user should see invalid credentials error", async ({ page }) => {
  await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
  await expect(
    page.getByText(ERROR_MESSAGES.INVALID_CREDENTIALS),
  ).toBeVisible();
});

/**
 * Logout
 */
When("the user clicks the user menu button", async ({ dashboardPage }) => {
  await dashboardPage.userMenuButton.click();
});

When("the user clicks the logout button", async ({ dashboardPage }) => {
  await dashboardPage.logoutButton.click();
});

Then("the user should be redirected to the login page", async ({ page }) => {
  await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
});
