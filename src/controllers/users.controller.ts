import express from "express";
import { ValidatedRequest } from "express-joi-validation";
import {
  UserPatchRequestSchema,
  UserPostRequestSchema,
} from "../common/common.types";
import { isEmpty } from "../common/common.utils";
import usersService from "../services/users.service";

class UsersController {
  async getUsers(req: express.Request, res: express.Response) {
    let login = "";
    let limit = undefined;

    if (!isEmpty(req.query)) {
      login = String(req.query.login);

      if (req.query.limit && Number(req.query.limit) > 0) {
        limit = Number(req.query.limit);
      }
    }

    const users = await usersService.autosuggest(login, limit);
    res.status(200).json(users);
  }

  async getUser(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const user = await usersService.readById(id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    res.status(200).json(user);
  }

  async patchUser(
    req: ValidatedRequest<UserPatchRequestSchema>,
    res: express.Response
  ) {
    const { id } = req.params;
    const data = req.body;
    const result = await usersService.updateById(id, data);
    res.status(200).send(result);
  }

  async deleteUser(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const result = await usersService.deleteById(id);
    res.status(200).send(result);
  }

  async createUser(
    req: ValidatedRequest<UserPostRequestSchema>,
    res: express.Response
  ) {
    const data = req.body;
    const id = await usersService.create(data);
    res.status(201).send(id);
  }
}

export default new UsersController();
