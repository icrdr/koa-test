import "reflect-metadata";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { config } from "./config";

// import router from './router.js'
// import koajwt from 'koa-jwt'
// import permissionCheck from './middleware/permission.js'

import Router from "koa-router";
import { logger, requestLogger } from "./logger";
import { loadRouter } from "./decorater/router";

const router = new Router();
const app = new Koa();

createConnection({
  type: "mysql",
  host: config.dbHost,
  port: 3306,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  entities: [__dirname + "/entity/*.ts"], //related dir only
  synchronize: true, // sync table
  namingStrategy: new SnakeNamingStrategy(),
  logging: false,
})
  .then(async (connection) => {
    logger.info("Successfully connect to database.");

    // Enable bodyParser
    app.use(bodyParser());

    // Enable requestLogger and error catcher
    app.use(requestLogger);

    // Enable all router
    const router = await loadRouter("/api", __dirname + "/controller");
    app.use(router.routes()).use(router.allowedMethods());

    // app.use(koajwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/users/login', '/users/signup'] }));
    // app.use(permissionCheck);
    // add router middleware:

    app.listen(config.port);
    logger.info(`App started at port http://localhost:${config.port}`);
  })
  .catch((err) => logger.error(err));
