import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  QueryParams,
  Delete,
  NotFoundError,
  ForbiddenError,
} from "routing-controllers";
import { UserService } from "./user.service";
import { UserCreate, GetUsersQuery } from "./user.dto";
import { Inject } from "typedi";

@JsonController("/users")
export class UserController {
  @Inject()
  userService!: UserService;

  @Get("/:id")
  async getOne(@Param("id") id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundError(`User was not found.`);
    return user;
  }

  @Get()
  async getAll(@QueryParams() query: GetUsersQuery) {
    const users = await this.userService.getUsers(query.perpage, query.page);
    return users;
  }

  @Post()
  async create(@Body() userPost: UserCreate) {
    const user = await this.userService.getUserByUsername(userPost.username);
    if (user) {
      throw new ForbiddenError(`Username existed`);
    } else {
      return this.userService.createUser(userPost.username, userPost.password);
    }
  }

  @Delete("/:id")
  async deleteOne(@Param("id") id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundError(`User was not found.`);
    await this.userService.deleteUserById(id);
    return { message: "Deleted" };
  }
}
