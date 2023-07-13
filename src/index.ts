import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { loadConfig } from "./config/config";
import cors from "cors";
import morganMiddleware from "./middlewares/morgan.middleware";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const appConfig = loadConfig();
import logger from "./utils/logger";
const init = async () => {
  // console.log("Running Express + TypeScript Server using config:", appConfig);
  // const sequelizeConnection = await connectDB();
  app.use(cors({ origin: "*" }));
  app.use(morganMiddleware);
  app.use(express.json());
  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });
  app.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("pong");
  });
  app.post("/webhook", async (req: Request, res: Response) => {
    res.status(200).send("ok");
    logger.info(req.body);
  });

  app.listen(port, () => {
    console.log(
      `⚡️[server]: Typescript Server is running at http://localhost:${port}`
    );
  });
};
init();
