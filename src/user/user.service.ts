import { Permission, Role, User } from "./user.entity";
import { EntityManager, getConnection, getManager, Repository } from "typeorm";
import { Service } from "typedi";
import { hash } from "../utils";
import { config } from "../config";
import jwt from "jsonwebtoken";

@Service()
export class UserService {
  manager: EntityManager;

  constructor() {
    this.manager = getManager();
  }

  async getUserById(id: number) {
    return await this.manager.findOne(User, id);
  }

  async getUserByUsername(username: string) {
    return await this.manager.findOne(User, { username: username });
  }

  async createUser(username: string, password: string, roles: Role[] | undefined []) {
    // if (!roles)
    //   roles = [await this.manager.findOne(Role, { name: "default" })];
    const user = new User();
    user.username = username;
    user.password = hash(username + password);
    user.fullName = username;
    await this.manager.save(user);
    return user;
  }

  async getUsers(perPage: number, page: number) {
    return await this.manager.findAndCount(User, {
      take: perPage,
      skip: page,
    });
  }

  async authUser(username: string, password: string) {
    const user = await this.manager.findOne(User, {
      username: username,
      password: hash(username + password),
    });

    if (!user) return undefined;

    const payload = {
      id: user.id,
      permissions: ["common.user"],
    };

    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: "24h",
    });
  }

  async deleteUserById(id: number) {
    await this.manager.delete(User, id);
  }

  async createRole(name: string, permissions: Permission[] = []) {
    const role = new Role();
    role.name = name;
    role.permissions = permissions;
    await this.manager.save(role);
    return role;
  }

  async createPermission(code: string) {
    const permission = new Permission();
    permission.code = code;
    await this.manager.save(permission);
    return permission;
  }
}
