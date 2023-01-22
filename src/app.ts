import express from "express";
import * as http from "http";
import { CommonRoutesConfig } from "./config/common.routes.config";
import { UsersRoutes } from "./controllers/users.routes.config";
import config from "./config";
import { sequelize } from "./models/users.model";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = config.port;
const routes: CommonRoutesConfig[] = [];

app.use(express.json());

sequelize.sync().then(() => {
  console.log("All models were synchronized successfully.");
});

routes.push(new UsersRoutes(app));

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Hello world`);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
