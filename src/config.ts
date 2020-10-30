import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const config = {
  dbDatabase: process.env.DB_DATABASE,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET || "app",
  logLevel: process.env.NODE_ENV === "prod" ? "http" : "debug",
  logSilent: process.env.NODE_ENV === "test",
  port: process.env.PORT || 3000,
};
