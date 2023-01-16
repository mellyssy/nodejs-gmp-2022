import express from "express";
import { ValidatedRequest } from "express-joi-validation";
import {
  UserPatchRequestSchema,
  UserPostRequestSchema,
} from "../common/common.types";
import { isEmpty } from "../common/common.utils";
import usersService from "./users.service";

class UsersController {
  getUsers(req: express.Request, res: express.Response) {
    let login = "";
    let limit = undefined;

    if (!isEmpty(req.query)) {
      login = String(req.query.login);

      if (typeof req.query.limit === "number") {
        limit = req.query.limit;
      }
    }

    const users = usersService.autosuggest(login, limit);
    res.status(200).json(users);
  }

  getUser(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const user = usersService.readById(id);
    res.status(200).json(user);
  }

  patchUser(
    req: ValidatedRequest<UserPatchRequestSchema>,
    res: express.Response
  ) {
    const { id } = req.params;
    const data = req.body;
    const result = usersService.updateById(id, data);
    res.status(200).send(result);
  }

  deleteUser(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const result = usersService.deleteById(id);
    res.status(200).send(result);
  }

  createUser(
    req: ValidatedRequest<UserPostRequestSchema>,
    res: express.Response
  ) {
    const data = req.body;
    const id = usersService.create(data);
    res.status(201).send(id);
  }
}

export default new UsersController();
