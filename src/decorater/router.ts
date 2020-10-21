// https://github.com/lichangwei/koa-router-decorators

import glob from "glob";
import Koa from "koa";
import Router from "koa-router";
import { logger } from "../logger";
import path from "path";

type HTTPMethod = "get" | "put" | "del" | "post" | "patch";

// route decorator
let route = (
  method: HTTPMethod,
  path: string,
  ...middlewares: Array<Koa.Middleware>
) => {
  return (target: any, property: string, descriptor: PropertyDescriptor) => {};
};

export const get = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  route("get", path, ...middlewares);
export const post = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  route("post", path, ...middlewares);
export const put = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  route("put", path, ...middlewares);
export const del = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  route("del", path, ...middlewares);
export const patch = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  route("patch", path, ...middlewares);

// controller class decorator
export const controller = (
  path: string = "",
  ...middlewares: Array<Koa.Middleware>
) => {
  return (target: any) => {
    target.isControllerClass = true;
    target.path = path;
    target.middlewares = middlewares;
  };
};

export const loadRouter = async (
  routerPath: string,
  controllerFolder: string,
  ...routerMiddlewares: Array<Koa.Middleware>
) => {
  const router = new Router();

  // rebuild route decorator before loading all controller
  route = (
    method: HTTPMethod,
    path: string,
    ...middlewares: Array<Koa.Middleware>
  ) => {
    return (target: any, property: string, descriptor: PropertyDescriptor) => {
      console.log(descriptor);
      if (!target.isControllerClass) return;

      let middlewareArray: Array<Koa.Middleware> = [];

      // add loader middleware
      middlewareArray = routerMiddlewares
        ? middlewareArray.concat(routerMiddlewares)
        : middlewareArray;

      // add class middleware
      middlewareArray = target.middlewares
        ? middlewareArray.concat(target.middlewares)
        : middlewareArray;

      // add controller middleware
      middlewareArray = middlewares
        ? middlewareArray.concat(middlewares)
        : middlewareArray;

      // add controller
      middlewareArray.push(target[property]);

      const url = routerPath + target.path + path;
      logger.info(`Register router: ${url}`);
      router[method](url, ...middlewareArray);
    };
  };

  // dynamic import all controller in the folder
  glob.sync(path.join(controllerFolder, `./**/*ts`)).forEach((item) => {
    import(item);
  });
  return router;
};
