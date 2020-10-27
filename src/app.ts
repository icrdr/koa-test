import "reflect-metadata";
import { errorHandler, requestLogger } from "./logger";
import { createKoaServer } from "routing-controllers";
import { useContainer as rcUseContainer } from "routing-controllers";
import { useContainer as typeOrmUseContainer } from "typeorm";
import { Container } from "typedi";

rcUseContainer(Container);
typeOrmUseContainer(Container);

export const createApp = (controllers: Array<string>) => {
  const app = createKoaServer({
    routePrefix: "/api",
    defaultErrorHandler: false,
    controllers: controllers,
    middlewares: [requestLogger, errorHandler],
  });
  return app;
};
