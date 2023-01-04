import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";

export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface UserData extends Omit<User, "id" | "isDeleted"> {}

// schema interfaces
export interface UserPostRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UserData;
}

export interface UserPatchRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Partial<UserData>;
  [ContainerTypes.Params]: {
    id: string;
  };
}
