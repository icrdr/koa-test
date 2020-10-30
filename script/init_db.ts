import { createConnection } from "../src/db";
import path from "path";
createConnection([path.join(__dirname, "../src/**/*.entity.ts")])
  .then(async (connect) => {
    try {
      await connect.clear();
      console.log("database cleared");
      await connect.init();
      console.log("database updated");
    } catch (error) {
      console.log(error);
    }
  })
  .finally(() => {
    process.exit(0);
  });
