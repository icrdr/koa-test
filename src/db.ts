import { createConnection, getConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { config } from "./config";

export const connection = {
  create: async () => {
    await createConnection({
      type: "mysql",
      host: config.dbHost,
      port: 3306,
      username: config.dbUsername,
      password: config.dbPassword,
      database: config.dbDatabase,
      entities: [__dirname + "/entity/*.ts"], //related dir only
      synchronize: true, // sync table
      namingStrategy: new SnakeNamingStrategy(),
      logging: false,
    });
  },

  close: async () => {
    await getConnection().close();
  },

  clear: async () => {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
