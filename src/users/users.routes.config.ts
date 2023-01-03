import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import usersController from "./users.controller";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes() {
    this.app
      .route("/users")
      .get(usersController.getUsers)
      .post(usersController.createUser);

    this.app
      .route("/users/:id")
      .get(usersController.getUser)
      .patch(usersController.patchUser)
      .delete(usersController.deleteUser);

    return this.app;
  }
}
