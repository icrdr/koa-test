import { get } from "http";
import { Context } from "koa";

export default class UserController {
  static async getUsers(ctx: Context) {
    for (const iterator of ctx.request.body) {
      
    }
    ctx.request.body
    ctx.status = 400;
    ctx.body = "xxx";
  }
}
