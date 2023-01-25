import Router from "express";
import * as Joi from "joi";
import { createValidator } from "express-joi-validation";
import { CommonRoutesConfig } from "../config/common.routes.config";
import usersController from "./users.controller";

const validator = createValidator();
const passwordRegEx = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/g;

const createUserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().pattern(passwordRegEx).required(),
  age: Joi.number().integer().min(4).max(130).required(),
});

const updateUserSchema = Joi.object({
  login: Joi.string(),
  password: Joi.string().pattern(passwordRegEx),
  age: Joi.number().integer().min(4).max(130),
});

export class UsersRoutes extends CommonRoutesConfig {
  constructor() {
    super("UsersRoutes");
    this.app = Router();
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
