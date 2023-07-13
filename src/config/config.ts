import { development_config } from "./development";

interface configInterface {
  mode: string;
  db: {
    host: string;
    database: string;
    port: number;
    username: string;
    password: string;
    seekAccount: boolean;
    syncForce: boolean;
    syncAlter: boolean;
    seek: { username: string; password: string; companyName: string };
  };
}
export const loadConfig = (mode?: string) => {
  let envConfig: configInterface;
  switch (mode || "development") {
    case "development":
      envConfig = development_config;
      break;
  }
  return envConfig;
};
