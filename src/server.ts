import { config } from "./config";
import { logger } from "./logger";

import { createApp } from "./app";
import { createConnection } from "./db";

createConnection([__dirname + "/**/*.entity.ts"]).then(() => {
  logger.info("Successfully connect to database.");
  const app = createApp([__dirname + "/**/*.controller.ts"]);
  app.listen(config.port);
  logger.info(`App started at port http://localhost:${config.port}`);
});
