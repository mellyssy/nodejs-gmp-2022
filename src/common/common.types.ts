export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface UserData extends Omit<User, "id" | "isDeleted"> {}
