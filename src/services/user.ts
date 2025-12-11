import { User, UserCreatePayload } from "@/types";
import { createAuthenticatedRequest } from "./apiContext";
import { API_ENDPOINTS } from "@/constants";
export const createUser = async (payload: UserCreatePayload) => {
  const request = await createAuthenticatedRequest();

  try {
    const response = await request.post(API_ENDPOINTS.RECORDS, {
      data: payload,
    });
    const user = (await response.json()) as User;

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteUser = async (userId: string) => {
  const request = await createAuthenticatedRequest();

  try {
    await request.delete(`${API_ENDPOINTS.RECORDS}/${userId}`);
  } catch (error) {
    console.error(error);
  }
};
