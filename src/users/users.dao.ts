import { v4 as uuid } from "uuid";
import { User, UserData } from "../common/common.types";
import initial from "./users.mocks";

const allowedFields = ["login", "password", "age"];

class Users {
  users: Array<User> = [...initial];

  constructor() {
    console.log("users new instance created");
  }

  createUser(data: UserData) {
    const user: User = {
      ...data,
      id: uuid(),
      isDeleted: false,
    };

    this.users.push(user);

    return user.id;
  }

  getAutoSuggestUsers(substr = "", limit?: number) {
    const arr = this.users.filter(({ login }) => login.includes(substr)).sort();
    return arr.slice(0, limit);
  }

  getUser(uid: string) {
    const user = this.users.find(({ id }) => id === uid);
    if (!user) {
      console.log("user not found");
      return false;
    }

    return user;
  }

  editUser(uid: string, data: Partial<UserData>) {
    const user = this.getUser(uid);
    if (!user) return false;

    Object.entries(data).forEach(([key, value]) => {
      const isFieldAllowed = allowedFields.includes(key);

      if (!isFieldAllowed) {
        console.log("field not found");
        return;
      }
      user[key] = value;
    });

    return true;
  }

  deleteUser(uid: string) {
    const user = this.getUser(uid);
    if (!user) return false;

    user.isDeleted = true;
    return true;
  }
}

export default new Users();
