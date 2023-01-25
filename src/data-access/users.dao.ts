import { UserCreationAttributes } from "../common/common.types";
import { User } from "../models/users.model";
import { Op } from "sequelize";

class Users {
  constructor() {
    console.log("users new instance created");
  }

  async createUser(data: UserCreationAttributes) {
    const user = await User.create(data);

    return user.id;
  }

  async getUser(id: string) {
    const user = await User.findByPk(id);
    if (!user) {
      return false;
    }

    return user;
  }

  async editUser(id: string, data: UserCreationAttributes) {
    const user = await User.findByPk(id);
    if (!user) return false;

    user.set(data);
    await user.save();

    return true;
  }

  async deleteUser(id: string) {
    const user = await User.findByPk(id);
    if (!user) return false;

    user.set({ isdeleted: true });
    await user.save();

    return true;
  }

  async getAutoSuggestUsers(substr = "", limit?: number) {
    const users = await User.findAll({
      where: {
        login: {
          [Op.substring]: substr,
        },
      },
      limit,
      order: [["login", "ASC"]],
    });

    return users;
  }

  async getAllUsers() {
    const users = await User.findAll({
      order: [["login", "ASC"]],
    });

    return users;
  }
}

export default new Users();
