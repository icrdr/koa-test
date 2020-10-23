import glob from "glob";
import Koa from "koa";
import Router from "koa-router";
import { logger } from "../logger";
import path from "path";

type HTTPMethod =
  | "get"
  | "put"
  | "del"
  | "post"
  | "patch"
  | "head"
  | "options"
  | "all";

interface methodRoute {
  method: HTTPMethod;
  path: string;
  middlewares: Array<Koa.Middleware>;
  controller: Koa.Middleware;
}

interface classRoute {
  path: string;
  middlewares: Array<Koa.Middleware>;
  controllers: Array<methodRoute>;
}

const routeMap: Record<string, classRoute> = {};

// route decorator
export const Route = (
  method: HTTPMethod,
  path: string,
  ...middlewares: Array<Koa.Middleware>
) => {
  return (target: any, property: string, descriptor: PropertyDescriptor) => {
    const className = target.name;
    const methodRoute = {
      method,
      path,
      middlewares,
      controller: target[property],
    };
    if (!routeMap[className]) {
      routeMap[className] = {
        path: "",
        middlewares: [],
        controllers: [],
      };
    }
    routeMap[className].controllers.push(methodRoute);
  };
};

export const Get = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  Route("get", path, ...middlewares);
export const Post = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  Route("post", path, ...middlewares);
export const Put = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  Route("put", path, ...middlewares);
export const Del = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  Route("del", path, ...middlewares);
export const Patch = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  Route("patch", path, ...middlewares);
export const Options = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  Route("options", path, ...middlewares);
export const Head = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  Route("head", path, ...middlewares);
export const All = (path: string, ...middlewares: Array<Koa.Middleware>) =>
  Route("all", path, ...middlewares);

// controller class decorator
export const Controller = (
  path: string,
  ...middlewares: Array<Koa.Middleware>
) => {
  return (target: any) => {
    const className = target.name;
    if (!routeMap[className]) {
      routeMap[className] = {
        path: "",
        middlewares: [],
        controllers: [],
      };
    }
    routeMap[className].path = path;
    routeMap[className].middlewares = middlewares;
  };
};

export const loadRouter = async (
  routerPath: string,
  controllerFolder: string,
  ...routerMiddlewares: Array<Koa.Middleware>
) => {
  const router = new Router();

  // dynamic import all controller in the folder
  const files = glob.sync(path.join(controllerFolder, `./**/*.controller.ts`));

  await Promise.all(
    files.map(async (file) => {
      await import(file);
    })
  );

  // register router
  for (const className in routeMap) {
    const classRoute = routeMap[className];
    for (const methodRoute of classRoute.controllers) {
      let middlewareArray: Array<Koa.Middleware> = [];

      // add loader middleware
      middlewareArray = middlewareArray.concat(routerMiddlewares);

      // add class middleware
      middlewareArray = middlewareArray.concat(classRoute.middlewares);

      // add controller middleware
      middlewareArray = middlewareArray.concat(methodRoute.middlewares);

      // add controller
      middlewareArray.push(methodRoute.controller);

      const url = routerPath + classRoute.path + methodRoute.path;
      logger.info(`Register router: ${url}`);
      router[methodRoute.method](url, ...middlewareArray);
    }
  }

  return router;
};
