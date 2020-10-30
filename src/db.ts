import Container, { Inject } from "typedi";
import * as typeorm from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { config } from "./config";
import { UserService } from "./user/user.service";
import { CreateUserDTO } from "./user/user.dto";

export class ConnectionDriver {
  @Inject()
  userService!: UserService;

  connection: typeorm.Connection;
  constructor(connection: typeorm.Connection) {
    this.connection = connection;
    this.userService = Container.get(UserService);
  }

  async init() {
    const permCommon = await this.userService.createPermission("common");
    const permAdmin = await this.userService.createPermission("admin");
    await this.userService.createRole("admin", [permAdmin, permCommon]);
    await this.userService.createRole("default", [permCommon]);
    // await this.userService.createUser("admin", "12345",);
  }

  async close() {
    await this.connection.close();
  }

  async clear() {
    await this.connection.dropDatabase();
    await this.connection.synchronize();
  }

  async createFakeUsers(users: CreateUserDTO[]) {
    for (const user of users) {
      await this.userService.createUser(user.username, user.password);
    }
  }
}

export const createConnection = async (entities: Function[] | string[]) => {
  const connection = await typeorm.createConnection({
    type: "mysql",
    host: config.dbHost,
    port: 3306,
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.dbDatabase,
    entities: entities,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
    logging: false,
  });
  return new ConnectionDriver(connection);
};
