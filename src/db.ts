import Container, { Inject, Service } from "typedi";
import * as typeorm from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { config } from "./config";
import { UserService } from "./user/user.service";
import { UserCreate } from "./user/user.dto";

// interface userCreate {
//   username:string
//   password:string
// }

export class ConnectionDriver {
  @Inject()
  userService!: UserService;

  connection: typeorm.Connection;
  constructor(connection: typeorm.Connection) {
    this.connection = connection;
    this.userService = Container.get(UserService);
  }

  async close() {
    await this.connection.close();
  }

  async clear() {
    await this.connection.dropDatabase();
  }

  async createFakeUsers(users: Array<UserCreate>) {
    for (const user of users) {
      await this.userService.createUser(user.username, user.password);
    }
  }
}

export const createConnection = async (entities: Array<string>) => {
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
