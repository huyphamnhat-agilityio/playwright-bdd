import { UserFormData } from "./form";

export type User = {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisiblity: boolean;
  id: string;
  name: string;
  updated: string;
  username: string;
  verified: boolean;
  website: string;
};

export type UserCreatePayload = {
  email: string;
  password: string;
  passwordConfirm: string;
} & Omit<Partial<UserFormData>, "id">;
