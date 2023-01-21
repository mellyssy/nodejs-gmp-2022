import { CRUD } from "../common/crud.interface";
import { UserData } from "../common/common.types";
import Users from "./users.dao";

class UserService implements CRUD {
  create(resource: UserData) {
    return Users.createUser(resource);
  }

  autosuggest(substr: string, limit: number) {
    return Users.getAutoSuggestUsers(substr, limit);
  }

  readById(id: string) {
    return Users.getUser(id);
  }

  updateById(id: string, data: Partial<UserData>) {
    return Users.editUser(id, data);
  }

  deleteById(id: string) {
    return Users.deleteUser(id);
  }
}

export default new UserService();
