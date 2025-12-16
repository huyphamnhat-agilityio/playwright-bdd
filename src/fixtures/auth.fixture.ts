import { DashboardPage } from '@/pages/dashboard';
import { LoginPage } from '@/pages/login';
import { test as base, createBdd } from 'playwright-bdd';

type AuthFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const testAuth = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export const { Given, When, Then } = createBdd(testAuth);
