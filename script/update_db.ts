import { createConnection } from "../src/db";
import path from "path";
createConnection([path.join(__dirname, "../src/**/*.entity.ts")])
  .then((connect) => {
    connect.clear();
    console.log("database updated");
  })
  .finally(() => {
    process.exit(0);
  });
