import { AUTH_FILE } from '@/configs';
import { CREDENTIALS, UI_ELEMENTS } from '@/constants';
import { LoginPage } from '@/pages/LoginPage';
import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo();

  // Perform authentication steps
  await loginPage.login(CREDENTIALS.valid.email, CREDENTIALS.valid.password);

  const dashboardLogo = page.getByRole('link', {
    name: UI_ELEMENTS.POCKETBASE_LOGO,
  });

  await expect(dashboardLogo).toBeVisible();

  // End of authentication steps
  await page.context().storageState({ path: AUTH_FILE });
});
