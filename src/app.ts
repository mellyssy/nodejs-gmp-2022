import express from "express";
import * as http from "http";
import { UsersRoutes } from "./controllers/users.routes.config";
import config from "./config";
import { sequelize } from "./models/users.model";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = config.port;

app.use(express.json());

sequelize.sync().then(() => {
  console.log("All models were synchronized successfully.");
});

const usersRoutes = new UsersRoutes();
app.use(usersRoutes.configureRoutes());

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Hello world`);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
