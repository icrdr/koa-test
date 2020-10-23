import { Connection, createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { config } from "./config";
import { logger } from "./logger";

import app from "./app";
import { connection } from "./db";

connection.create().then(() => {
  logger.info("Successfully connect to database.");
  // const app = await createApp();
  app.listen(config.port);
  logger.info(`App started at port http://localhost:${config.port}`);
});
