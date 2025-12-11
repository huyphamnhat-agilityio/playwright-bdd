import { UsersPage } from "@/pages/UsersPage";
import { testAuth } from "./auth.fixture"; // <-- extend this fixture
import { createBdd } from "playwright-bdd";
import { User } from "@/types";

type Ctx = {
  createdUser: User | null;
};

type UsersFixtures = {
  usersPage: UsersPage;
  ctx: Ctx;
};

export const testUser = testAuth.extend<UsersFixtures>({
  // eslint-disable-next-line no-empty-pattern
  ctx: async ({}, use) => {
    const ctx: Ctx = { createdUser: null };
    await use(ctx);
  },

  usersPage: async ({ page }, use) => {
    const usersPage = new UsersPage(page);
    await usersPage.navigateTo();
    await use(usersPage);
  },
});

export const { Given, When, Then, After } = createBdd(testUser);
