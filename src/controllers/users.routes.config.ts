import express from "express";
import * as Joi from "joi";
import { createValidator } from "express-joi-validation";
import { CommonRoutesConfig } from "../config/common.routes.config";
import usersController from "./users.controller";

const validator = createValidator();

const createUserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().integer().min(4).max(130).required(),
});

const updateUserSchema = Joi.object({
  login: Joi.string(),
  password: Joi.string().alphanum(),
  age: Joi.number().integer().min(4).max(130),
});

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes() {
    this.app
      .route("/users")
      .get(usersController.getUsers)
      .post(validator.body(createUserSchema), usersController.createUser);

    this.app
      .route("/users/:id")
      .get(usersController.getUser)
      .patch(validator.body(updateUserSchema), usersController.patchUser)
      .delete(usersController.deleteUser);

    return this.app;
  }
}
