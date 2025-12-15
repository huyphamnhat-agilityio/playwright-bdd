import { UsersPage } from "@/pages/UsersPage";
import { testAuth } from "./auth.fixture"; // <-- extend this fixture
import { createBdd } from "playwright-bdd";
import { User } from "@/types";
import { USER_DELETE_TEST_DATA, USER_SORT_TEST_DATA } from "@/constants";
import { createUser, deleteUser } from "@/services";

type Ctx = {
  createdUser: User | null;
  selectedUser?: Pick<User, "email" | "id">;
};

type UsersFixtures = {
  usersPage: UsersPage;
  deleteUsersPage: UsersPage & {
    userList: { email: string; id: string }[];
  };
  sortUsersPage: UsersPage & {
    userList: { email: string; id: string }[];
    sortOptions: { field: string; locator: string }[];
  };
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

  deleteUsersPage: async ({ page, browserName }, use) => {
    const usersPage = new UsersPage(page);

    const userList: { email: string; id: string }[] = [];

    // Prepare data before delete test
    for (const payload of USER_DELETE_TEST_DATA) {
      const timestamp = Date.now();
      const user = await createUser({
        ...payload,
        email: `${payload.email}${timestamp}${browserName}`,
        passwordConfirm: payload.password,
      });

      if (user?.id) {
        userList.push({ email: user.email, id: user.id });
      }
    }

    await usersPage.navigateTo();

    // Pass a combined object into the fixture
    await use(Object.assign(usersPage, { userList }));

    // Cleanup any remaining users after test
    for (const { id } of userList) {
      try {
        await deleteUser(id);
      } catch (error) {
        // User might already be deleted by the test
        console.warn(`Failed to cleanup user ${id}:`, error);
      }
    }
  },

  sortUsersPage: async ({ page, browserName }, use) => {
    const usersPage = new UsersPage(page);

    const userList: { email: string; id: string }[] = [];

    // Prepare data before sort test
    for (const payload of USER_SORT_TEST_DATA.testUsers) {
      const timestamp = Date.now();
      const user = await createUser({
        ...payload,
        email: `${payload.email}${timestamp}${browserName}`,
        passwordConfirm: payload.password,
      });

      if (user?.id) {
        userList.push({ email: user.email, id: user.id });
      }
    }

    await usersPage.navigateTo();

    // Pass a combined object into the fixture
    await use(
      Object.assign(usersPage, {
        userList,
        sortOptions: USER_SORT_TEST_DATA.sortOptions,
      }),
    );

    // Clear user data after test
    for (const { id } of userList) {
      await deleteUser(id);
    }
  },
});

export const { Given, When, Then, After } = createBdd(testUser);
