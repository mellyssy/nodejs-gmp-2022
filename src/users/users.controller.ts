import express from "express";
import { isEmpty } from "../common/common.utils";
import usersService from "./users.service";

// validation ?

class UsersController {
  getUsers(req: express.Request, res: express.Response) {
    const login = isEmpty(req.query) ? "" : String(req.query.login);
    const limit = isEmpty(req.query)
      ? undefined
      : typeof req.query.limit !== "number"
      ? undefined
      : req.query.limit;
    const users = usersService.autosuggest(login, limit);
    res.status(200).send(users);
  }

  getUser(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const user = usersService.readById(id);
    res.status(200).send(user);
  }

  patchUser(req: express.Request, res: express.Response) {
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

  createUser(req: express.Request, res: express.Response) {
    const data = req.body;
    const id = usersService.create(data);
    res.status(200).send(id);
  }
}

export default new UsersController();
