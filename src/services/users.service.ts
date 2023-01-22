import { CRUD } from "../common/crud.interface";
import { UserCreationAttributes } from "../common/common.types";
import Users from "../data-access/users.dao";

class UserService implements CRUD {
  create(resource: UserCreationAttributes) {
    return Users.createUser(resource);
  }

  async autosuggest(substr: string, limit: number) {
    return await Users.getAutoSuggestUsers(substr, limit);
  }

  async readById(id: string) {
    return await Users.getUser(id);
  }

  async updateById(id: string, data: UserCreationAttributes) {
    return await Users.editUser(id, data);
  }

  async deleteById(id: string) {
    return await Users.deleteUser(id);
  }
}

export default new UserService();
