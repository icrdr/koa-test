import { Context, Next } from "koa";
import chalk from "chalk";
import { transports, format, createLogger } from "winston";
import "winston-daily-rotate-file";
import { config } from "./config";

const loggerContent = (isColored: boolean) => {
  return format.printf((info) => {
    const prefix = `${chalk.gray(info.timestamp)} `;
    const level = info.level.toUpperCase();
    let suffix: string;
    switch (level) {
      case "ERROR":
        suffix = `${chalk.bgRed.black(level)} \n${chalk.red(info.stack)}`;
        break;
      case "WARN":
        suffix = `${chalk.bgYellow.black(level)} ${chalk.yellow(info.message)}`;
        break;
      case "INFO":
        suffix = `${chalk.bgGreen.black(level)} ${chalk.green(info.message)}`;
        break;
      case "HTTP":
        suffix = `${chalk.bgCyan.black(level)} ${chalk.cyan(info.message)}`;
        break;
      case "DEBUG":
        suffix = `${chalk.bgGrey.black(level)} ${chalk.grey(info.message)}`;
        break;
      default:
        suffix = `${chalk.bgRed.black(level)} ${chalk.red(info.message)}`;
        break;
    }
    if (isColored) {
      return prefix + suffix;
    } else {
      return (prefix + suffix).replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        ""
      );
    }
  });
};

const logger = createLogger({
  level: config.logLevel,
  format: format.combine(
    format.timestamp({
      format: "YY-MM-DD HH:MM:SS",
    }),
    format.errors({ stack: true })
  ),
  transports: [
    new transports.DailyRotateFile({
      format: format.combine(loggerContent(false)),
      filename: "%DATE%.log",
      dirname:'log',
      datePattern: "YYYY-MM-DD",
      level:'http'
    }),
    new transports.Console({
      format: format.combine(loggerContent(true)),
    }),
  ],
});

const requestLogger = async (ctx: Context, next: Next) => {
  const start = new Date().getTime();
  logger.debug("Request Body: \n" + JSON.stringify(ctx.request.body, null, 2));

  try {
    await next();
  } catch (error) {
    //catch ctx.throw
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = {
      msg: error.message,
    };
    // console error on terminal
    if (ctx.status >= 500) {
      logger.error(error);
    }
    // console error on terminal (official)
    // ctx.app.emit("error", error, ctx);
  } finally {
    const duration = new Date().getTime() - start;
    logger.http(
      `${ctx.status} ${ctx.method} ${ctx.originalUrl} +${duration}ms`
    );
    logger.debug("Respond Body: \n" + JSON.stringify(ctx.body, null, 2));
  }
};

export { logger, requestLogger };
