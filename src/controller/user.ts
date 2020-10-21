import { Context, Next } from "koa";
import { controller, get } from "../decorater/router";

@controller("/users")
export class UserController {
  @get("")
  static async getUsers(ctx: Context) {
    ctx.request.body;
    ctx.status = 400;
    ctx.body = "xxx";
  }
}

@controller()
export class UserController2 {
  @get("/a")
  static async getUsers(ctx: Context) {
    ctx.request.body;
    ctx.status = 400;
    ctx.body = "xxx";
  }
}
