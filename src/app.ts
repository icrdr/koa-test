import "reflect-metadata";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import config from "./config";
import { User } from "./entity/user";
// import router from './router.js'
// import koajwt from 'koa-jwt'
// import permissionCheck from './middleware/permission.js'

import Router from "koa-router";

createConnection({
  type: "mysql",
  host: config.dbHost,
  port: 3306,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  entities: [__dirname + "/entity/*.ts"], //related dir
  synchronize: true, // sync table
  logging: false,
})
  .then((connection) => {
    console.log("database connection successful");
    const router = new Router();
    const app = new Koa();

    // log request URL:
    app.use(async (ctx, next) => {
      console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
      await next();
    });

    // catch error (from offical doc)
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
          msg: err.message,
        };
        // throw err on terminal
        ctx.app.emit("error", err, ctx);
      }
    });

    router.get("/", async (ctx) => {
      ctx.body = "ok";
    });
    // app.use(koajwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/users/login', '/users/signup'] }));

    // app.use(permissionCheck);

    // add router middleware:

    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(3000);
    console.log("app started at port 3000");
  })
  .catch((error) => console.log(error));
