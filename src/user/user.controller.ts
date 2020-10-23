import { Context, Next } from "koa";
import { Controller, Get } from "../decorater";

@Controller("/users")
export class UserController {
  @Get("")
  static async getUsers(ctx: Context) {
    ctx.request.body;
    ctx.status = 400;
    ctx.body = "xxx";
  }
}

export class UserController2 {
  @Get("/a")
  static async getUsers(ctx: Context) {
    ctx.request.body;
    ctx.status = 400;
    ctx.body = "xxx";
  }
}

export const sum = (a: number, b: number) => {
  return a + b;
};
