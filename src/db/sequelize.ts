import { DataTypes, Dialect, Sequelize } from "sequelize";
import { loadConfig } from "../config/config";
import { TodoInstance, initTodoInstance } from "./models/todo.model";

const appConfig = loadConfig();
export const connectDB = async () => {
  console.log("connecting to db...", {
    ...appConfig.db,
  });
  const sequelizeConnection = new Sequelize(
    appConfig.db.database,
    appConfig.db.username,
    appConfig.db.password,
    {
      host: appConfig.db.host,
      port: appConfig.db.port,
      dialect: "mysql",
    }
  );
  sequelizeConnection
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.log("Unable to connect to the database:", err);
    });

  initTodoInstance(sequelizeConnection);
  if (appConfig.db.syncAlter || appConfig.db.syncForce) {
    await syncDB(sequelizeConnection);
  }
  return sequelizeConnection;
};
export const syncDB = async (sequelizeConnection: Sequelize) => {
  sequelizeConnection
    .sync()
    .then(() => {
      console.log("synced models to db");
    })
    .catch((error) => {
      console.error(`error syncing models to db: ${error.message}`);
    });
};
