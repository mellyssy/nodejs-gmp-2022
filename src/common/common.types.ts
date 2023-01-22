import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import { Optional } from "sequelize";

export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isdeleted: boolean;
}

export type UserCreationAttributes = Optional<User, "id" | "isdeleted">;

// schema interfaces
export interface UserPostRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UserCreationAttributes;
}

export interface UserPatchRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UserCreationAttributes;
  [ContainerTypes.Params]: {
    id: string;
  };
}
