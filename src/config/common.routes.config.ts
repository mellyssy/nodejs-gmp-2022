import express from "express";
export abstract class CommonRoutesConfig {
  app: express.Router;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  getName() {
    return this.name;
  }

  abstract configureRoutes(): express.Router;
}
