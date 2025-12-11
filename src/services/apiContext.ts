import { request as baseRequest } from "@playwright/test";
import userAuthState from "../../playwright/.auth/user.json";

export const createAuthenticatedRequest = async () => {
  return await baseRequest.newContext({
    baseURL: process.env.REQUEST_URL || "",
    extraHTTPHeaders: {
      Authorization: JSON.parse(
        userAuthState.origins[0].localStorage.find(
          (key) => key.name === "__pb_superuser_auth__",
        )?.value ?? "",
      ).token,
    },
  });
};
