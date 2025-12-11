import { UsersPage } from "@/pages/UsersPage";
import { testAuth } from "./auth.fixture"; // <-- extend this fixture
import { createBdd } from "playwright-bdd";

type UsersFixtures = {
  usersPage: UsersPage;
};

export const testUser = testAuth.extend<UsersFixtures>({
  usersPage: async ({ page }, use) => {
    const usersPage = new UsersPage(page);
    await usersPage.navigateTo();
    await use(usersPage);
  },
});

export const { Given, When, Then, After } = createBdd(testUser);
