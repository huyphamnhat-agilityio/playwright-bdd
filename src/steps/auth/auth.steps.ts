import {
  CREDENTIALS,
  ERROR_MESSAGES,
  UI_ELEMENTS,
  URL_PATTERNS,
} from '@/constants';
import { Given, Then, When } from '@/fixtures/auth.fixture';
import { expect } from '@playwright/test';

Given('the user is on the login page', async ({ loginPage }) => {
  await loginPage.navigateTo();
});

Given('the user is logged in', async ({ loginPage }) => {
  await loginPage.login(CREDENTIALS.valid.email, CREDENTIALS.valid.password);
});

When(
  'the user fills the email field with {string} and the password field with {string}',
  async ({ loginPage }, email: string, password) => {
    await loginPage.emailField.fill(email ?? '');
    await loginPage.passwordField.fill(password ?? '');
  },
);

When('the user clicks the login button', async ({ loginPage }) => {
  await loginPage.loginButton.click();
});

Then('the user should navigate to the dashboard page', async ({ page }) => {
  const dashboardLogo = page.getByRole('link', {
    name: UI_ELEMENTS.POCKETBASE_LOGO,
  });
  await expect(dashboardLogo).toBeVisible();
});

Then('the user should stay on the login page', async ({ page }) => {
  await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
});

Then('the user should see invalid credentials error', async ({ page }) => {
  await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
  await expect(
    page.getByText(ERROR_MESSAGES.INVALID_CREDENTIALS),
  ).toBeVisible();
});

When('the user clicks the user menu button', async ({ dashboardPage }) => {
  await dashboardPage.userMenuButton.click();
});

When('the user clicks the logout button', async ({ dashboardPage }) => {
  await dashboardPage.logoutButton.click();
});

Then('the user should be redirected to the login page', async ({ page }) => {
  await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
});
