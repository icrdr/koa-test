import dotenv from "dotenv";
dotenv.config();

export const config = {
  dbDatabase: process.env.DB_DATABASE,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET,
  logLevel: process.env.NODE_ENV === "production" ? "http" : "debug",
  port:process.env.PORT || 3000
};
