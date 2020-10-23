import "reflect-metadata";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { requestLogger } from "./logger";
import { loadRouter } from "./decorater";

const app = new Koa();

// Enable bodyParser
app.use(bodyParser());

// Enable requestLogger and error catcher
app.use(requestLogger);

loadRouter("/api", __dirname + "/").then((router)=>{
  app.use(router.routes()).use(router.allowedMethods());
})
// Enable all router
// const router = await loadRouter("/api", __dirname + "/");
// app.use(router.routes()).use(router.allowedMethods());

export default app
